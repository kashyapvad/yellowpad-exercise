
export interface ContractSection {
  id: string;
  type: 'heading' | 'clause' | 'subheading';
  content: string;
  level: number;
  number?: string;
}

export interface Contract {
  id: string;
  title: string;
  sections: ContractSection[];
}
