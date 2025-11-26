import React, { useState, useCallback, useEffect } from 'react';
import Button from './components/Button';
import { CALCULATOR_BUTTONS } from './constants';
import { CalculatorButtonProps } from './types';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewInput, setWaitingForNewInput] = useState<boolean>(true);

  // Function to perform calculations
  const calculate = useCallback((first: number, op: string, second: number): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        if (second === 0) {
          throw new Error('Division by zero');
        }
        return first / second;
      default:
        return second;
    }
  }, []);

  const handleButtonClick = useCallback((
    value: string,
    type: CalculatorButtonProps['type']
  ) => {
    if (type === 'number' || type === 'decimal') {
      // Handle number and decimal input
      if (waitingForNewInput || display === 'Error') {
        if (type === 'decimal' && value === '.') {
          setDisplay('0.');
        } else {
          setDisplay(value);
        }
        setWaitingForNewInput(false);
      } else {
        if (value === '.' && display.includes('.')) {
          // Do nothing if decimal already exists
          return;
        }
        setDisplay(prevDisplay => prevDisplay + value);
      }
    } else if (type === 'operator') {
      const input = parseFloat(display);

      if (currentValue === null || display === 'Error') {
        // First number entered or recovering from error
        setCurrentValue(input);
      } else if (operator) {
        // If an operator already exists, calculate the intermediate result
        try {
          const result = calculate(currentValue, operator, input);
          setCurrentValue(result);
          setDisplay(result.toString());
        } catch (e: any) {
          setDisplay('Error');
          setCurrentValue(null);
          setOperator(null);
          setWaitingForNewInput(true);
          return;
        }
      }
      setOperator(value);
      setWaitingForNewInput(true);
    } else if (type === 'equals') {
      if (currentValue !== null && operator !== null && !waitingForNewInput && display !== 'Error') {
        const input = parseFloat(display);
        try {
          const result = calculate(currentValue, operator, input);
          setDisplay(result.toString());
          setCurrentValue(result); // Store result for chained operations
          setOperator(null);
          setWaitingForNewInput(true);
        } catch (e: any) {
          setDisplay('Error');
          setCurrentValue(null);
          setOperator(null);
          setWaitingForNewInput(true);
        }
      }
    } else if (type === 'clear') {
      // Reset all state
      setDisplay('0');
      setCurrentValue(null);
      setOperator(null);
      setWaitingForNewInput(true);
    }
  }, [display, currentValue, operator, waitingForNewInput, calculate]);

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key >= '0' && key <= '9') {
        handleButtonClick(key, 'number');
      } else if (key === '.' || key === ',') {
        handleButtonClick('.', 'decimal');
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleButtonClick(key, 'operator');
      } else if (key === '=' || key === 'Enter') {
        event.preventDefault(); // Prevent default Enter key behavior (e.g., submitting forms)
        handleButtonClick('=', 'equals');
      } else if (key === 'Escape' || key === 'Delete') {
        handleButtonClick('C', 'clear');
      } else if (key === 'Backspace') {
        if (display === 'Error' || display.length === 1 || display === '0') {
          handleButtonClick('C', 'clear');
        } else {
          setDisplay(prevDisplay => prevDisplay.slice(0, -1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, handleButtonClick]); // Add display as dependency for Backspace logic

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-sm">
      {/* Calculator Display */}
      <div className="bg-gray-200 text-right p-4 sm:p-6 mb-6 rounded-lg shadow-inner">
        <div className="text-4xl sm:text-5xl font-light text-gray-800 break-words overflow-hidden">
          {display}
        </div>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-4 gap-4">
        {CALCULATOR_BUTTONS.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            type={button.type}
            span={button.span}
            onClick={handleButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default App;