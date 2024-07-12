import { FlaggableWordsObject } from "../../../constants/flaggableWords";
import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";

export type WordInFam = { word: string; wordIsFlagged: boolean };

export type LyricHash = {
  [word: string]: number; // number of occurances
};

export type WordFamiliesObj = {
  [family: string]: {
    id: string;
    family: string;
    familyWords: WordInFam[]; // TODO: Eventually you will use this to allow users to select/deselect specific words in a family (they might not want to flag all of them)
    occurances: number;
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
    isInPreset: boolean;
  };
};

export interface FlagPreset {
  userId?: string;
  presetId: string;
  presetName: string;
  presetDescription: string;
  flaggedWords: FlaggableWordsObject;
}

export interface FlaggedWords {
  [word: string]: {
    id: string;
    vulgarityLvl: VulgarityLevel; // 0-10
    category: SensitiveWordCategory[];
    family: string;
    isRootWord: boolean;

    isFlagged: boolean;
    occurances: number;
  };
}
