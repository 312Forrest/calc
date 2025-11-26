import { CalculatorButtonProps } from './types';

// Define the calculator buttons
export const CALCULATOR_BUTTONS: Omit<CalculatorButtonProps, 'onClick'>[] = [
  // Row 1: Clear and basic operators
  { label: 'C', type: 'clear' },
  { label: '/', type: 'operator' },
  { label: '*', type: 'operator' },
  { label: '-', type: 'operator' },

  // Row 2: Numbers 7, 8, 9, and Addition
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '+', type: 'operator' },

  // Row 3: Numbers 4, 5, 6, and Decimal
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '.', type: 'decimal' },

  // Row 4: Numbers 1, 2, 3, and Equals
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '=', type: 'equals' },

  // Row 5: Wide Zero (spans 2 columns), leaving two empty cells in a 4-column grid
  { label: '0', type: 'number', span: 2 },
];