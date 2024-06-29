import { createSlice } from "@reduxjs/toolkit";

import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";
import { HashMap } from "../../../types/graph";

import type { PayloadAction } from "@reduxjs/toolkit";

export type FlaggedFamiliesObject = {
  [family: string]: {
    id: string;
    family: string;
    occurances: number;
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
  };
};

interface FlagManagerState {
  flaggedFamilies: FlaggedFamiliesObject;
  lyricsHashMap: HashMap | null;
  // TODO: Maybe add word exceptions here as an array
}

const initialState: FlagManagerState = {
  flaggedFamilies: {},
  lyricsHashMap: null,
};

export const flagManagerSlice = createSlice({
  name: "flagManager",
  initialState,
  reducers: {
    addFlaggedFamily: (state, action: PayloadAction<FlaggedFamiliesObject>) => {
      const wordToAdd = action.payload;
      const [[word, wordData]] = Object.entries(wordToAdd);

      if (state.flaggedFamilies[word]) return;
      state.flaggedFamilies[word] = wordData;
    },

    setFamilyOccurances: (
      state,
      action: PayloadAction<{ family: string; occurances: number }>,
    ) => {
      const { family, occurances } = action.payload;

      state.flaggedFamilies[family].occurances = occurances;
    },

    setLyricsHashMap: (state, action: PayloadAction<HashMap | null>) => {
      state.lyricsHashMap = action.payload;
    },
  },
});

export const { addFlaggedFamily, setFamilyOccurances, setLyricsHashMap } =
  flagManagerSlice.actions;

export default flagManagerSlice.reducer;
