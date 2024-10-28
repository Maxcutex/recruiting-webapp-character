export type Attributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type AttributeControlProps = {
  name: string;
  value: number;
  modifier: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export type ClassDisplayProps = {
  name: string;
  isEligible: boolean;
  onClick: () => void;
};

export type SkillControlProps = {
  name: string;
  points: number;
  modifier: number;
  modifierName: string;
  total: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export type CharacterCardProps = {
  identifier: number;
  initialAttributes: Attributes;
  onSave: (characterData: {
    attributes: Attributes;
    skills: Record<string, number>;
  }) => void;
};

export type SkillCheckProps = {
  skills: Record<string, number>;
  getSkillModifier: (skillName: string) => number;
};

export type Character = {
  id: string;
  attributes: Attributes;
  skills: Record<string, number>;
};

export type CharacterPayload = {
  id: string;
  characterData: {
    attributes: Attributes;
    skills: Record<string, number>;
  };
};
export type SkillRollResult = {
  skillModifier: number;
  randomRoll: number;
  skillTotal: number;
  total: number;
  success: boolean;
};
