export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type Theme = 'ANIMALS' | 'VEHICLES' | 'SPACE';

export type MathKind = 'ADD' | 'SUB' | 'MUL' | 'DIV' | 'FRAC' | 'COORD';

export type MathQuestion = {
  kind: MathKind;
  prompt: string;   // "7 + 5 = ?"
  answer: string;   // compare as string
  choices?: string[];
};

export type Dot = {
  id: number;       // connection order
  x: number;        // 0..1 normalized
  y: number;        // 0..1 normalized
  q: MathQuestion;
};

export type Puzzle = {
  id: string;
  title: string;
  theme: Theme;
  difficulty: Difficulty;
  dots: Dot[];
  lines?: [number, number][]; // optional extra lines after completion
  tint?: string;              // celebration tint color
};

