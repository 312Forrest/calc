export interface CalculatorButtonProps {
  label: string;
  type: 'number' | 'operator' | 'equals' | 'clear' | 'decimal';
  span?: number; // Optional, for buttons spanning multiple columns
  onClick: (value: string, type: 'number' | 'operator' | 'equals' | 'clear' | 'decimal') => void;
}
