import React from "react";
import ControlButtons from "./ControlButtons";
import { AttributeControlProps } from "../types";

const AttributeControl: React.FC<AttributeControlProps> = ({
  name,
  value,
  modifier,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div>
      <span>
        {name}: {value} (Modifier: {modifier})
      </span>
      <ControlButtons onIncrement={onIncrement} onDecrement={onDecrement} />
    </div>
  );
};

export default AttributeControl;
