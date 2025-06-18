import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setError } from '@/store/slices/contractSlice';
import { Button } from '@/components/atoms/button';
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx';
import { parseContractText, parseInstruction } from '@/services/api';
import { Shield, BarChart3, FileText } from 'lucide-react';

interface ParsedSection {
  id: string;
  type: string;
  content: string;
  level: number;
  number: string | null;
  style?: {
    bold?: boolean;
    italics?: boolean;
    underline?: boolean;
    headingLevel?: number;
    font?: string;
  };
}

// Helper: get next letter (A -> B, Z -> AA, etc.)
function nextAlpha(str: string) {
  if (!str) return 'A';
  let carry = 1;
  let res = '';
  for (let i = str.length - 1; i >= 0; i--) {
    let code = str.charCodeAt(i) - 65 + carry;
    if (code === 26) {
      res = 'A' + res;
      carry = 1;
    } else {
      res = String.fromCharCode(65 + (code % 26)) + res;
      carry = 0;
    }
  }
  if (carry) res = 'A' + res;
  return res;
}

// Helper: renumber siblings (A, B, C...)
function renumberAlpha(sections: ParsedSection[], indices: number[]) {
  let letter = 'A';
  for (const idx of indices) {
    if (sections[idx].number && /^[A-Z]+$/.test(sections[idx].number)) {
      sections[idx].number = letter;
      letter = nextAlpha(letter);
    }
  }
}

// Helper: extract style from a section
function extractStyle(section: ParsedSection): ParsedSection['style'] {
  // Heuristic: heading -> bold, heading level, font, etc.
  if (section.type === 'heading') {
    return {
      bold: true,
      headingLevel: section.level === 1 ? 1 : 2,
      font: 'Times New Roman',
    };
  }
  return {
    bold: false,
    headingLevel: undefined,
    font: 'Times New Roman',
  };
}

const STOPWORDS = [
  'the', 'this', 'a', 'an', 'that', 'which', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'to', 'from', 'as', 'and',
  'these', 'those', 'them'
];

function extractTargetFromInstruction(instruction: string, keyword: string): string | null {
  // Try quoted phrase
  const quoted = instruction.match(new RegExp(`${keyword} (?:section )?[“"]([^"]+)["]`, 'i'));
  if (quoted) return quoted[1].trim();
  // Try capitalized phrase (not a stopword)
  const cap = instruction.match(new RegExp(`${keyword} (?:section )?([A-Z][A-Za-z0-9 .]+)`, 'i'));
  if (cap) {
    const candidate = cap[1].trim().split(' ')[0].toLowerCase();
    if (!STOPWORDS.includes(candidate)) return cap[1].trim();
  }
  // Fallback: null
  return null;
}

// Helper: Insert clause using LLM's insertion plan
function insertClauseWithPlan(
  sections: ParsedSection[],
  clauseText: string,
  plan: any
): ParsedSection[] {
  // Example plan fields: targetType, targetNumber, position, childType, childNumber, style, contentPosition
  let newSections = [...sections];
  // Find target index
  let targetIdx = -1;
  if (plan.targetNumber) {
    targetIdx = newSections.findIndex(s => s.number && s.number.toLowerCase() === String(plan.targetNumber).toLowerCase());
  }
  if (targetIdx === -1 && plan.targetContent) {
    targetIdx = newSections.findIndex(s => s.content.trim().toLowerCase() === String(plan.targetContent).trim().toLowerCase());
  }
  if (targetIdx === -1) {
    targetIdx = 0; // fallback: start
  }
  // Determine insertion point
  let insertAt = targetIdx;
  if (plan.position === 'after') insertAt = targetIdx + 1;
  if (plan.position === 'before') insertAt = targetIdx;
  if (plan.position === 'in' || plan.position === 'under' || plan.position === 'within') {
    // Insert as last immediate child
    const parentLevel = newSections[targetIdx].level;
    let childEnd = targetIdx + 1;
    while (
      childEnd < newSections.length &&
      newSections[childEnd].level > parentLevel
    ) {
      if (newSections[childEnd].level === parentLevel + 1) break;
      childEnd++;
    }
    while (
      childEnd < newSections.length &&
      newSections[childEnd].level === parentLevel + 1
    ) {
      childEnd++;
    }
    insertAt = childEnd;
  }
  // If withinContent, split content
  if (plan.position === 'withinContent' && plan.contentPosition && targetIdx !== -1) {
    let contentArr = newSections[targetIdx].content.match(/[^.!?]+[.!?]+|[^.!?]+$/g) as RegExpMatchArray | null;
    if (!contentArr) contentArr = [newSections[targetIdx].content] as unknown as RegExpMatchArray;
    let insertPos = 1;
    if (/first/i.test(plan.contentPosition)) insertPos = 1;
    if (/last/i.test(plan.contentPosition)) insertPos = contentArr.length;
    // Insert clauseText at the specified position
    contentArr = [
      ...contentArr.slice(0, insertPos),
      clauseText,
      ...contentArr.slice(insertPos)
    ] as unknown as RegExpMatchArray;
    newSections[targetIdx].content = contentArr.join(' ');
    return newSections;
  }
  // Build new clause
  const newClause: ParsedSection = {
    id: `clause-${Date.now()}`,
    type: plan.childType || 'clause',
    content: clauseText,
    level: plan.childLevel || (newSections[targetIdx]?.level || 1),
    number: plan.childNumber || null,
    style: plan.style || undefined,
  };
  newSections.splice(insertAt, 0, newClause);
  // Only renumber if not withinContent
  if (plan.position !== 'withinContent') {
    const insertedLevel = newClause.level;
    const insertedType = newClause.type;
    const siblingIndices = newSections
      .map((s, idx) => ({ s, idx }))
      .filter(({ s }) => s.level === insertedLevel && s.type === insertedType)
      .map(({ idx }) => idx);
    if (siblingIndices.length > 1) {
      // All alpha?
      if (siblingIndices.every(idx => /^[A-Z]+$/.test(newSections[idx].number || ''))) {
        renumberAlpha(newSections, siblingIndices);
      }
      // All numeric?
      else if (siblingIndices.every(idx => /^[0-9]+$/.test(newSections[idx].number || ''))) {
        let num = 1;
        for (const idx of siblingIndices) {
          newSections[idx].number = String(num++);
        }
      }
    }
  }
  // Optionally: renumber if needed (not shown here for brevity)
  return newSections;
}

const Index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [contractText, setContractText] = useState('');
  const [parsedSections, setParsedSections] = useState<ParsedSection[] | null>(null);
  const [instruction, setInstruction] = useState('');
  const [clause, setClause] = useState('');
  const [updatedSections, setUpdatedSections] = useState<ParsedSection[] | null>(null);
  const [docxBlob, setDocxBlob] = useState<Blob | null>(null);

  const handleParseContract = async () => {
    if (!contractText.trim()) return;
    setParsing(true);
    setParsedSections(null);
    setUpdatedSections(null);
    setDocxBlob(null);
    try {
      const data = await parseContractText(contractText);
      setParsedSections(data.sections || []);
    } catch (err) {
      dispatch(setError('Failed to parse contract.'));
    } finally {
      setParsing(false);
    }
  };

  // Insert clause using LLM plan
  const handleInsertClause = async () => {
    if (!parsedSections || !instruction.trim() || !clause.trim()) return;
    setLoading(true);
    try {
      const plan = await parseInstruction(parsedSections, instruction, clause);
      const newSections = insertClauseWithPlan(parsedSections, clause, plan);
      setUpdatedSections(newSections);
      setDocxBlob(null);
    } catch (err) {
      dispatch(setError('Failed to insert clause.'));
    } finally {
      setLoading(false);
    }
  };

  // Generate docx from updatedSections
  const handleDownload = async () => {
    if (!updatedSections) return;
    const children: Paragraph[] = [];
    updatedSections.forEach(section => {
      let para;
      const style = section.style || {};
      if (section.type === 'heading') {
        para = new Paragraph({
          text: `${section.number ? section.number + ' ' : ''}${section.content}`,
          heading: style.headingLevel === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 200 },
          children: [
            new TextRun({
              text: `${section.number ? section.number + ' ' : ''}${section.content}`,
              bold: style.bold,
              italics: style.italics,
              font: style.font,
            })
          ]
        });
      } else {
        para = new Paragraph({
          children: [
            new TextRun({
              text: `${section.number ? section.number + ' ' : ''}${section.content}`,
              bold: style.bold,
              italics: style.italics,
              font: style.font,
            })
          ],
          spacing: { after: 100 },
        });
      }
      children.push(para);
    });
    const doc = new Document({ sections: [{ properties: {}, children }] });
    const blob = await Packer.toBlob(doc);
    setDocxBlob(blob);
    // Trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'updated_contract.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation to new pages */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sample Pages</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/kyc">
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                KYC Management
              </Button>
            </Link>
            <Link to="/credit-report">
              <Button variant="outline" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Credit Report
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Paste Contract Text</h2>
            <label htmlFor="contract-textarea" className="block font-medium mb-1">Contract Text</label>
            <textarea
              id="contract-textarea"
              placeholder="Paste contract text here..."
              value={contractText}
              onChange={e => setContractText(e.target.value)}
              className="w-full min-h-[200px] mb-2 p-2 border rounded"
              disabled={loading || parsing}
              aria-label="Contract text to parse"
            />
            <Button
              onClick={handleParseContract}
              disabled={parsing || !contractText.trim()}
              className="w-full mb-4"
            >
              {parsing ? 'Parsing...' : 'Parse Contract'}
            </Button>
            {parsedSections && (
              <div className="mb-4 p-2 border rounded bg-white max-h-64 overflow-y-auto">
                <div className="font-semibold mb-2">Parsed Sections:</div>
                <ul className="text-xs">
                  {parsedSections.map(section => (
                    <li key={section.id} className="mb-1">
                      <span className="font-bold">[{section.type}]</span> {section.number ? <span className="text-blue-600">{section.number} </span> : null}{section.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <label htmlFor="instruction-textarea" className="block font-medium mb-1">Instruction</label>
            <textarea
              id="instruction-textarea"
              placeholder="Paste full instruction here..."
              value={instruction}
              onChange={e => setInstruction(e.target.value)}
              className="w-full min-h-[60px] mb-2 p-2 border rounded"
              disabled={loading || parsing || !parsedSections}
              aria-label="Instruction for clause insertion"
            />
            <label htmlFor="clause-content-textarea" className="block font-medium mb-1 mt-2">Clause Content</label>
            <textarea
              id="clause-content-textarea"
              placeholder="Enter clause content..."
              value={clause}
              onChange={e => setClause(e.target.value)}
              className="w-full min-h-[100px] mb-2 p-2 border rounded"
              disabled={loading || parsing || !parsedSections}
              aria-label="Clause content to insert"
            />
            <Button
              onClick={handleInsertClause}
              disabled={loading || parsing || !parsedSections || !instruction.trim() || !clause.trim()}
              className="w-full mb-4"
            >
              Insert Clause
            </Button>
            {updatedSections && (
              <div className="mb-4 p-2 border rounded bg-white max-h-64 overflow-y-auto">
                <div className="font-semibold mb-2">Updated Parsed Sections:</div>
                <ul className="text-xs">
                  {updatedSections.map(section => (
                    <li key={section.id} className="mb-1">
                      <span className="font-bold">[{section.type}]</span> {section.number ? <span className="text-blue-600">{section.number} </span> : null}{section.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {updatedSections && (
              <Button onClick={handleDownload} className="w-full mt-2" aria-label="Download updated contract">
                Download Updated Contract
              </Button>
            )}
          </div>
          <div>
            <div className="text-gray-500">Paste your contract, parse it, then enter instruction and clause to insert. All logic is now handled in the frontend.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
