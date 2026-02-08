export type TextRange = {
  start: number;
  end: number; // exclusive
};

export type WordplayType =
  | "anagram"
  | "container"
  | "reversal"
  | "deletion"
  | "homophone"
  | "charade"
  | "hidden";

export type WordplayStep = {
  type: WordplayType;
  indicator: TextRange;
  fodder: TextRange | TextRange[];
  explanation: string;
};

export type ClueData = {
  id: string;
  clueText: string;
  answer: string;
  enumeration: number | number[];
  definition: TextRange;
  wordplay: WordplayStep[];
  fullExplanation: string;
  difficulty?: 1 | 2 | 3;
  videoUrl?: string;
};

export const CLUES: ClueData[] = [
  {
    id: "mc-001",
    clueText: "Aligagang ina, hindi pwede ang madilim!",
    answer: "ANINO",
    enumeration: 5,
    definition: { start: 30, end: 38 }, 
    wordplay: [
      {
        type: "anagram",
        indicator: { start: 0, end: 7 },
        fodder: { start: 10, end: 13 },
        explanation: "'ALIGAGA' indicates an anagram of INA."
      }
    ],
    fullExplanation:
      "'ALIGAGA' indicates an anagram of INA, 'HINDI PWEDE' is a wordplay for NO.",
    difficulty: 1
  },
];
