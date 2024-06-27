import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";

export type WordObject = {
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
  flaggedWords: WordObject;
}

const initialState: FlagManagerState = {
  flaggedWords: {},
};

export const flagManagerSlice = createSlice({
  name: "flagManager",
  initialState,
  reducers: {
    addFlaggedWord: (state, action: PayloadAction<WordObject>) => {
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
  },
});

export const { addFlaggedWord, setOccurances } = flagManagerSlice.actions;

export default flagManagerSlice.reducer;
