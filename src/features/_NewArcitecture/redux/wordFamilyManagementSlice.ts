import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  FLAGGABLE_WORDS_MASTER,
  FlaggableWordsObject,
} from "../../../constants/flaggableWords";
import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";

export type WordInFam = { word: string; wordIsFlagged: boolean };

type LyricHash = {
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

interface FlagPreset {
  userId?: string;
  presetId: string;
  presetName: string;
  presetDescription: string;
  flaggedWords: FlaggableWordsObject;
}

// Define type for slice state
interface WordFamilyManagementState {
  wordFamilies: WordFamiliesObj | null;
  activePreset: FlagPreset | null;
  lyricHash: LyricHash | null;
}

// Define initial state
const initialState: WordFamilyManagementState = {
  wordFamilies: null,
  activePreset: null,
  lyricHash: null,
};

export const wordFamilyManagementSlice = createSlice({
  name: "wordFamilyManagement",
  initialState,
  reducers: {
    // This should only run on initial load. After initial load, "isInPreset" will be changed to reflect active Families
    setWordFamilies: (state, action: PayloadAction<WordFamiliesObj | null>) => {
      state.wordFamilies = action.payload;
    },

    // will never be set to null
    setPreset: (state, action: PayloadAction<FlagPreset>) => {
      const preset = action.payload;
      state.activePreset = preset;

      const wordFamilies = state.wordFamilies;

      if (wordFamilies) {
        Object.entries(wordFamilies).forEach(([fam, famData]) => {
          // if family is in preset, set isInPreset to true
          if (preset.flaggedWords[fam]) {
            wordFamilies[fam].isInPreset = true;
          } else {
            // otherwise set it to false
            wordFamilies[fam].isInPreset = false;
          }
        });
      }
    },

    // will only be null on initial load so payload CANNOT be null
    setLyricsHash: (state, action: PayloadAction<LyricHash>) => {
      state.lyricHash = action.payload;
    },

    // when song changes (setLyricsHash SHOULD BE DISPATCHED RIGHT BEFORE)
    updateOccurancesOnSongChange: (state) => {
      const flaggableWords = FLAGGABLE_WORDS_MASTER;
      const wordFamilies = state.wordFamilies;
      const lyricHash = state.lyricHash;

      Object.entries(flaggableWords).forEach(([word, wordData]) => {
        // if word is in hash AND wordFamilies
        if (
          lyricHash &&
          wordFamilies &&
          lyricHash[word] &&
          wordFamilies[word]
        ) {
          wordFamilies[word].occurances = lyricHash[word];
        } else if (lyricHash && wordFamilies) {
          // otherwise set it to false
          wordFamilies[word].occurances = 0;
        }
      });
    },

    // when song changes
    updateOccurancesPresetChange: (state) => {
      // loop through wordFamily keys
      // if wordFamily[key] is NOT in preset
      // SKIP
      // otherwise, set the occurances for that family
    },
  },
});

export const {
  setWordFamilies,
  setPreset,
  updateOccurancesOnSongChange,
  updateOccurancesPresetChange,
} = wordFamilyManagementSlice.actions;

export default wordFamilyManagementSlice.reducer;
