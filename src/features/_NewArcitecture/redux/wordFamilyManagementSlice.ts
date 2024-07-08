import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";

export type wordInFam = { word: string; wordIsFlagged: boolean };

export type WordFamiliesObj = {
  [family: string]: {
    id: string;
    family: string;
    words?: wordInFam[]; // TODO: Eventually you will use this to allow users to select/deselect specific words in a family (they might not want to flag all of them)
    occurances: number;
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
    isInPreset: boolean;
  };
};

interface FlagPreset {
  userId?: string;
  presetId: string;
  presetName: string;
  presetDescription: string;
  flaggedWords: WordFamiliesObj;
}

// Define type for slice state
interface WordFamilyManagementState {
  wordFamilies: WordFamiliesObj | null;
  activePreset: FlagPreset | null;
}

// Define initial state
const initialState: WordFamilyManagementState = {
  wordFamilies: null,
  activePreset: null,
};

export const wordFamilyManagementSlice = createSlice({
  name: "wordFamilyManagement",
  initialState,
  reducers: {
    // This should only run on initial load. After initial load, "isInPreset" will be changed to reflect active Families
    setWordFamilies: (state, action: PayloadAction<WordFamiliesObj | null>) => {
      state.wordFamilies = action.payload;
    },

    setPreset: (state) => {
      // loop through wordFamilies keys
      // if (wordFamily[key]) is in preset
      // set isInPreset = true for that family
    },

    updateOccurances: (state) => {
      // loop through wordFamily keys
      // if wordFamily[key] is NOT in preset
      // SKIP
      // otherwise, set the occurances for that family
    },
  },
});

export const { setWordFamilies, setPreset, updateOccurances } =
  wordFamilyManagementSlice.actions;

export default wordFamilyManagementSlice.reducer;
