import { createSlice } from "@reduxjs/toolkit";

import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";

import type { PayloadAction } from "@reduxjs/toolkit";

export type FlaggedWordsObject = {
  [word: string]: {
    id: string;
    word: string;
    occurances: number;
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
    family: string;
    isRootWord: boolean; // is the word the main word of the family
  };
};

interface FlagManagerState {
  flaggedWords: FlaggedWordsObject;
}

const initialState: FlagManagerState = {
  flaggedWords: {},
};

export const flagManagerSlice = createSlice({
  name: "flagManager",
  initialState,
  reducers: {
    addFlaggedWord: (state, action: PayloadAction<FlaggedWordsObject>) => {
      const wordToAdd = action.payload;
      const [[word, wordData]] = Object.entries(wordToAdd);

      if (state.flaggedWords[word]) return;
      state.flaggedWords[word] = wordData;
    },

    // removeFlaggedWord
    setOccurances: (
      state,
      action: PayloadAction<{ word: string; occurances: number }>,
    ) => {
      const { word, occurances } = action.payload;

      state.flaggedWords[word].occurances = occurances;
    },
    zeroOccurances: (state, action: PayloadAction<string>) => {
      const wordToZero = action.payload;
      state.flaggedWords[wordToZero].occurances = 0;
    },
  },
});

export const { addFlaggedWord, setOccurances, zeroOccurances } =
  flagManagerSlice.actions;

export default flagManagerSlice.reducer;
