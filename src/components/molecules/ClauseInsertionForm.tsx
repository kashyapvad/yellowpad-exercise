import React, { useState } from 'react';
import { Button } from '@/components/atoms/button';
import { Textarea } from '@/components/atoms/textarea';
import { Select } from '@/components/atoms/select';
import { ContractSection } from '@/types/contract';

interface ClauseInsertionFormProps {
  onInsertClause: (input: { instruction: string; content: string }) => void;
  availableHeadings: string[];
}

const ClauseInsertionForm: React.FC<ClauseInsertionFormProps> = ({
  onInsertClause,
  availableHeadings,
}) => {
  const [form, setForm] = useState({
    instruction: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsertClause({
      instruction: form.instruction,
      content: form.content,
    });
    setForm({ instruction: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="instruction-textarea" className="block font-medium mb-1">Instruction</label>
        <Textarea
          id="instruction-textarea"
          placeholder="Paste full instruction here..."
          value={form.instruction}
          onChange={(e) => setForm({ ...form, instruction: e.target.value })}
          className="min-h-[60px] mb-2"
          aria-label="Instruction for clause insertion"
        />
        <label htmlFor="clause-content-textarea" className="block font-medium mb-1 mt-2">Clause Content</label>
        <Textarea
          id="clause-content-textarea"
          placeholder="Enter clause content..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="min-h-[100px]"
          aria-label="Clause content to insert"
        />
      </div>
      <Button type="submit" className="w-full">
        Insert Clause
      </Button>
    </form>
  );
};

export default ClauseInsertionForm;
