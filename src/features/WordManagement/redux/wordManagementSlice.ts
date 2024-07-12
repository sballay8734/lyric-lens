import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  FlagPreset,
  LyricHash,
  WordFamiliesObj,
  FlaggedWords,
} from "../types/wordManagementTypes";

// Define type for slice state
interface WordManagementState {
  wordFamilies: WordFamiliesObj | null;
  flaggedWords: FlaggedWords | null;
  activePreset: FlagPreset | null;
  lyricHash: LyricHash | null;
  analysisResult: { result: "pass" | "fail" | null; totalFlaggedWords: number };
}

// Define initial state
const initialState: WordManagementState = {
  wordFamilies: null,
  flaggedWords: null,
  activePreset: null,
  lyricHash: null,
  analysisResult: { result: null, totalFlaggedWords: 0 },
};

export const wordManagementSlice = createSlice({
  name: "wordManagement",
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

      // update "isFlagged" property in preset
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
    updateWordOccurances: (state) => {
      const flaggedWords = state.flaggedWords;
      const lyricHash = state.lyricHash;

      if (flaggedWords && lyricHash) {
        let totalFlaggedWords = 0;
        Object.entries(flaggedWords).forEach(([word, wordData]) => {
          // if word isn't flagged, skip (ACTUALLY, you probably still want to keep track of this, just don't count it in the final count)
          // if (wordData.isFlagged === false) return

          // if word is in song
          if (lyricHash[word]) {
            flaggedWords[word].occurances = lyricHash[word];

            totalFlaggedWords += flaggedWords[word].isFlagged
              ? lyricHash[word]
              : 0;
          } else {
            flaggedWords[word].occurances = 0;
          }
        });

        // set analysis result
        const result = totalFlaggedWords === 0 ? "pass" : "fail";

        state.analysisResult.result = result;
        state.analysisResult.totalFlaggedWords = totalFlaggedWords;
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
  updateWordOccurances,
} = wordManagementSlice.actions;

export default wordManagementSlice.reducer;
