import React from "react";
import { SkillControlProps } from "../types";
import ControlButtons from "./ControlButtons";

const SkillControl: React.FC<SkillControlProps> = ({
  name,
  points,
  modifier,
  modifierName,
  total,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="skill-control">
      <span className="skill-info">
        {name}: {points} (Modifier: {modifierName}): {modifier}
      </span>
      <ControlButtons onIncrement={onIncrement} onDecrement={onDecrement} />
      <span className="skill-total">total: {total}</span>
    </div>
  );
};

export default SkillControl;
