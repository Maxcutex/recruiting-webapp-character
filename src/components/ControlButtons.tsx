import React from "react";

interface ControlButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onIncrement,
  onDecrement,
}) => {
  return (
    <div>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

export default ControlButtons;
