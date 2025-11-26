import React from 'react';
import { CalculatorButtonProps } from '../types';

const Button: React.FC<CalculatorButtonProps> = ({ label, type, span, onClick }) => {
  const baseClasses = `
    p-4 text-2xl font-semibold rounded-lg shadow-md
    text-white transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75
    active:scale-95
  `;

  // Apply blue background as requested for all buttons
  const typeClasses = `bg-blue-500 hover:bg-blue-600`;

  const spanClasses = span === 2 ? 'col-span-2' : '';

  return (
    <button
      className={`${baseClasses} ${typeClasses} ${spanClasses}`}
      onClick={() => onClick(label, type)}
    >
      {label}
    </button>
  );
};

export default Button;