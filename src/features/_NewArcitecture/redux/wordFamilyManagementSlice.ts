import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FlaggableWordsObject } from "../../../constants/flaggableWords";
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

// Define type for slice state
interface WordFamilyManagementState {
  wordFamilies: WordFamiliesObj | null;
  flaggedWords: FlaggedWords | null;
  activePreset: FlagPreset | null;
  lyricHash: LyricHash | null;
}

// Define initial state
const initialState: WordFamilyManagementState = {
  wordFamilies: null,
  flaggedWords: null,
  activePreset: null,
  lyricHash: null,
};

export const wordFamilyManagementSlice = createSlice({
  name: "wordFamilyManagement",
  initialState,
  reducers: {
    setWordFamilies: (state, action: PayloadAction<WordFamiliesObj | null>) => {
      state.wordFamilies = action.payload;
    },

    // this should ONLY run on initial load. update should be used after
    setFlaggedWords: (state, action: PayloadAction<FlaggedWords | null>) => {
      state.flaggedWords = action.payload;
    },

    // will never be set to null
    setPreset: (state, action: PayloadAction<FlagPreset>) => {
      const preset = action.payload;
      state.activePreset = preset;

      const flaggedWords = state.flaggedWords;

      if (flaggedWords) {
        Object.entries(flaggedWords).forEach(([word, wordData]) => {
          // only set to true if it needs to be true and is false
          if (preset.flaggedWords[word] && !flaggedWords[word].isFlagged) {
            flaggedWords[word].isFlagged = true;
          } else if (
            !preset.flaggedWords[word] &&
            flaggedWords[word].isFlagged
          ) {
            flaggedWords[word].isFlagged = false;
          } else {
            // do nothing
          }
        });
      }
    },
    // when song changes (setLyricsHash SHOULD BE DISPATCHED RIGHT BEFORE)
    updateOccurances: (state) => {
      const flaggedWords = state.flaggedWords;
      const lyricHash = state.lyricHash;

      if (flaggedWords && lyricHash) {
        Object.entries(flaggedWords).forEach(([word, wordData]) => {
          // if word isn't flagged, skip (ACTUALLY, you probably still want to keep track of this, just don't count it in the final count)
          // if (wordData.isFlagged === false) return

          if (lyricHash[word]) {
            flaggedWords[word].occurances = lyricHash[word];
          } else {
            flaggedWords[word].occurances = 0;
          }
        });
      }
    },

    // will only be null on initial load so payload CANNOT be null
    setLyricsHash: (state, action: PayloadAction<LyricHash>) => {
      state.lyricHash = action.payload;
    },
  },
});

export const {
  setWordFamilies,
  setFlaggedWords,
  setPreset,
  setLyricsHash,
  updateOccurances,
} = wordFamilyManagementSlice.actions;

export default wordFamilyManagementSlice.reducer;
