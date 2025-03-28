import React from 'react';

interface RoundedButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  onClick,
  text,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-button ${className} ${disabled ? 'disabled' : ''}`}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
