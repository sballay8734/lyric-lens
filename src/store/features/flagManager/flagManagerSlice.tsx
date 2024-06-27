import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";

export type Word = {
  [word: string]: {
    id: string;
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
    family: string;
    isRootWord: boolean; // is the word the main word of the family
  };
};

type WordOccurance = {
  [word: string]: number;
};

interface FlagManagerState {
  flaggedWords: Word[];
  flaggedWordOccurance: WordOccurance;
}

const initialState: FlagManagerState = {
  flaggedWords: [],
  flaggedWordOccurance: {},
};

export const flagManagerSlice = createSlice({
  name: "flagManager",
  initialState,
  reducers: {
    addFlaggedWord: (state, action: PayloadAction<Word>) => {
      const wordToAdd = action.payload;
      state.flaggedWords.push(wordToAdd);
    },
    removeFlaggedWord: (state, action: PayloadAction<Word>) => {
      const wordToRemoveFamily = action.payload.family;

      // remove word and all related words
      const updatedWords = state.flaggedWords.filter(
        (word) => word.family !== wordToRemoveFamily,
      );

      state.flaggedWords = updatedWords;
    },
    addFlaggedWordOccurance: (state, action: PayloadAction<string>) => {
      state.flaggedWordOccurance[action.payload] = 1;
    },
    incrementOccuranceCount: (state, action: PayloadAction<string>) => {
      state.flaggedWordOccurance[action.payload] += 1;
    },
    clearFlaggedWords: (state) => {
      state.flaggedWordOccurance = {};
    },
  },
});

export const {
  addFlaggedWord,
  removeFlaggedWord,
  addFlaggedWordOccurance,
  incrementOccuranceCount,
  clearFlaggedWords,
} = flagManagerSlice.actions;

export default flagManagerSlice.reducer;
