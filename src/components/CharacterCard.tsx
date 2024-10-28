import React, { useState } from "react";
import AttributeControl from "./AttributeControl";
import SkillControl from "./SkillControl";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts";
import { Attributes, CharacterCardProps } from "../types";
import ClassDisplay from "./ClassDisplay";
import SkillCheck from "./SkillCheck";

const calculateModifier = (value: number): number => {
  return Math.floor((value - 10) / 2);
};

const generateInitialSkills = (): Record<string, number> => {
  const initialSkills: Record<string, number> = {};
  SKILL_LIST.forEach((skill) => (initialSkills[skill.name] = 0));
  return initialSkills;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  identifier,
  initialAttributes,
  onSave,
}) => {
  const [attributes, setAttributes] = useState<Attributes>(initialAttributes);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [skills, setSkills] = useState<Record<string, number>>(
    generateInitialSkills
  );

  const [showRequirements, setShowRequirements] = useState<boolean>(true);

  const handleIncrement = (attr: string) => {
    const total = Object.values(attributes).reduce((acc, val) => acc + val, 0);
    if (total < 70) {
      setAttributes((prev) => ({ ...prev, [attr]: prev[attr] + 1 }));
    } else {
      alert("A Character can have up to 70 Delegated Attribute Points");
    }
  };

  const handleDecrement = (attr: string) => {
    if (attributes[attr] > 0) {
      setAttributes((prev) => ({ ...prev, [attr]: prev[attr] - 1 }));
    }
  };

  const meetsClassRequirements = (requirements: Attributes): boolean => {
    return ATTRIBUTE_LIST.every(
      (attr) => attributes[attr] >= requirements[attr]
    );
  };

  const displayClassRequirements = (className: string) => {
    setSelectedClass(className);
    setShowRequirements(true);
  };

  const closeRequirementsView = () => {
    setShowRequirements(false);
  };

  const calculateSkillPoints = (): number => {
    const intelligenceModifier = calculateModifier(attributes["Intelligence"]);
    return 10 + 4 * intelligenceModifier;
  };

  const handleSkillIncrement = (skillName: string) => {
    const availablePoints =
      calculateSkillPoints() -
      Object.values(skills).reduce((acc, points) => acc + points, 0);
    if (availablePoints > 0) {
      setSkills((prev) => ({ ...prev, [skillName]: prev[skillName] + 1 }));
    } else {
      alert("You need more skill points! Upgrade intelligence to get more");
    }
  };

  const handleSkillDecrement = (skillName: string) => {
    if (skills[skillName] > 0) {
      setSkills((prev) => ({ ...prev, [skillName]: prev[skillName] - 1 }));
    }
  };

  const getSkillModifier = (
    skillName: string
  ): { name: string; value: number } => {
    const skill = SKILL_LIST.find((s) => s.name === skillName);
    if (!skill) return { name: "", value: 0 };
    const associatedAttribute = skill.attributeModifier;
    const modifierValue = calculateModifier(attributes[associatedAttribute]);
    return { name: associatedAttribute, value: modifierValue };
  };

  const getSkillTotal = (skillPoints: number, modifierValue: number) =>
    skillPoints + modifierValue;

  return (
    <section className="character-card">
      <h3>Character {identifier}</h3>
      <SkillCheck
        skills={skills}
        getSkillModifier={(skillName) => getSkillModifier(skillName).value}
      />

      <div className="character-card-sections">
        <div className="card-section">
          <h2>Attributes</h2>
          {Object.entries(attributes).map(([attr, value]) => (
            <AttributeControl
              key={attr}
              name={attr}
              value={value}
              modifier={calculateModifier(value)}
              onIncrement={() => handleIncrement(attr)}
              onDecrement={() => handleDecrement(attr)}
            />
          ))}
        </div>

        <div className="card-section">
          <h2>Classes</h2>
          {Object.entries(CLASS_LIST).map(([className, requirements]) => (
            <ClassDisplay
              key={className}
              name={className}
              isEligible={meetsClassRequirements(requirements)}
              onClick={() => displayClassRequirements(className)}
            />
          ))}
        </div>

        {selectedClass && showRequirements && (
          <div className="card-section">
            <h3>{selectedClass} Minimum Requirements:</h3>
            <ul>
              {Object.entries(CLASS_LIST[selectedClass]).map(
                ([attr, minValue]) => (
                  <li key={attr as string}>
                    {attr as string}: {minValue as number}
                  </li>
                )
              )}
            </ul>
            <button onClick={closeRequirementsView}>
              Close Requirement View
            </button>
          </div>
        )}

        <div className="card-section">
          <h2>
            {
              // I felt the available points should be reducing for the user so that
              // they can see what is left from the set available points
            }
            Skills (Available Points:{" "}
            {calculateSkillPoints() -
              Object.values(skills).reduce((acc, val) => acc + val, 0)}
            )
          </h2>
          {SKILL_LIST.map((skill) => {
            const { name: modifierName, value: modifierValue } =
              getSkillModifier(skill.name);
            return (
              <SkillControl
                key={skill.name}
                name={skill.name}
                points={skills[skill.name]}
                modifier={modifierValue}
                modifierName={modifierName}
                total={getSkillTotal(skills[skill.name], modifierValue)}
                onIncrement={() => handleSkillIncrement(skill.name)}
                onDecrement={() => handleSkillDecrement(skill.name)}
              />
            );
          })}
        </div>
      </div>

      <button onClick={() => onSave({ attributes, skills })}>
        Save Character
      </button>
    </section>
  );
};

export default CharacterCard;
