import React, { useEffect, useRef } from 'react';
import { Contract, ContractSection } from '@/types/contract';

interface ContractViewerProps {
  contract: Contract;
  lastInsertedClauseId?: string | null;
}

const ContractViewer: React.FC<ContractViewerProps> = ({ contract, lastInsertedClauseId }) => {
  const clauseRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  useEffect(() => {
    if (lastInsertedClauseId && clauseRefs.current[lastInsertedClauseId]) {
      clauseRefs.current[lastInsertedClauseId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      clauseRefs.current[lastInsertedClauseId]?.focus?.(); // for accessibility
      console.log('VERIFY: Navigated to inserted clause');
    }
  }, [lastInsertedClauseId]);

  const renderSection = (section: ContractSection) => {
    const baseStyles = "font-['Times New Roman'] mb-4";
    const isHighlighted = section.id === lastInsertedClauseId;
    
    switch (section.type) {
      case 'heading':
        return (
          <h2 
            className={`${baseStyles} text-xl font-bold mt-6`}
            key={section.id}
          >
            {section.number} {section.content}
          </h2>
        );
      case 'subheading':
        return (
          <h3 
            className={`${baseStyles} text-lg font-semibold mt-4`}
            key={section.id}
          >
            {section.number} {section.content}
          </h3>
        );
      case 'clause':
        return (
          <p
            className={
              `${baseStyles} text-base leading-relaxed pl-${section.level * 4} ` +
              (isHighlighted ? ' bg-yellow-200 outline-none ring-2 ring-yellow-400 transition-all duration-500' : '')
            }
            key={section.id}
            ref={el => {
              if (el) clauseRefs.current[section.id] = el;
            }}
            tabIndex={isHighlighted ? 0 : -1}
            aria-live={isHighlighted ? 'polite' : undefined}
          >
            {section.number} {section.content}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">{contract.title}</h1>
      {contract.sections.map((section) => renderSection(section))}
    </div>
  );
};

export default ContractViewer;
