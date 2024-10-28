import React, { useState } from "react";
import { SKILL_LIST } from "../consts";
import { SkillCheckProps, SkillRollResult } from "../types";

const SkillCheck: React.FC<SkillCheckProps> = ({
  skills,
  getSkillModifier,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string>(
    SKILL_LIST[0].name
  );
  const [dcValue, setDcValue] = useState<number>(10);
  const [rollDetails, setRollDetails] = useState<SkillRollResult | null>(null); // Use the new SkillRollResult type

  const handleRoll = () => {
    const randomRoll = Math.floor(Math.random() * 20) + 1;
    const skillModifier = getSkillModifier(selectedSkill);
    const skillTotal = skills[selectedSkill] + skillModifier;
    const total = randomRoll + skillTotal;
    const success = total >= dcValue;

    // Store the details in a state object to display in the JSX
    setRollDetails({
      skillModifier,
      randomRoll,
      skillTotal,
      total,
      success,
    });
  };

  return (
    <div className="skill-check-section">
      <h2>Skill Check</h2>
      <div className="skill-check-controls">
        <label>
          Skill:
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            {SKILL_LIST.map((skill) => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          DC:
          <input
            type="number"
            value={dcValue}
            onChange={(e) => setDcValue(parseInt(e.target.value, 10))}
            min="1"
          />
        </label>
        <button onClick={handleRoll}>Roll</button>
      </div>
      {
        // Implemented the check skills here. I felt it would be easier to check for
        // each character instead of scrolling back up to check results of skill check
      }
      {rollDetails && (
        <div>
          <h3>Skill Result</h3>
          <p>Skill: {selectedSkill}</p>
          <p>You Rolled: {rollDetails.randomRoll}</p>
          <p>The DC was: {dcValue}</p>
          <p>Result: {rollDetails.success ? "Success" : "Failure"}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheck;
