import { createSlice } from "@reduxjs/toolkit";

import {
  DefaultFlagPreset,
  UserFlagPreset,
} from "../../../constants/defaultProfiles";
import { FLAGGABLE_WORDS_MASTER } from "../../../constants/flaggableWords";
import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";
import { HashMap } from "../../SongAnalysisGraph/types/graphTypes";
import findFlaggedFamilies from "../utils/getFlaggedFamilies";

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

interface FlagManagementState {
  flaggedFamilies: FlaggedFamiliesObject | null;
  currentPreset: DefaultFlagPreset | UserFlagPreset | null;
  defaultPresets: DefaultFlagPreset[] | null;
  userPresets: UserFlagPreset[] | null;
  lyricsHashMap: HashMap | null;
  analysisResult: { result: "pass" | "fail" | null; totalFlaggedWords: number };
  // TODO: Maybe add word exceptions here as an array
}

const initialState: FlagManagementState = {
  flaggedFamilies: null,
  currentPreset: null,
  defaultPresets: null, // !TODO: Don't load these if user doesn't want to
  userPresets: null,
  lyricsHashMap: null,
  analysisResult: { result: null, totalFlaggedWords: 0 },
};

export const flagManagementSlice = createSlice({
  name: "flagManagement",
  initialState,
  reducers: {
    setFlaggedFamilies: (
      state,
      action: PayloadAction<FlaggedFamiliesObject | null>,
    ) => {
      state.flaggedFamilies = action.payload;
    },

    setFamilyOccurances: (
      state,
      action: PayloadAction<{ family: string; occurances: number }>,
    ) => {
      // console.log(action.payload);
      const { family, occurances } = action.payload;

      if (state.flaggedFamilies) {
        state.flaggedFamilies[family].occurances = occurances;
      }
    },

    updateFamilyOccurances: (
      state,
      action: PayloadAction<{ hashMap: HashMap }>,
    ) => {
      const { hashMap } = action.payload;
      const flaggedFamilies = state.flaggedFamilies;

      if (flaggedFamilies) {
        let totalFlaggedWords = 0;
        Object.keys(flaggedFamilies).forEach((fam) => {
          // get all words in that family
          const allFamilyWords = Object.entries(FLAGGABLE_WORDS_MASTER).filter(
            ([_, wordData]) => wordData.family === fam,
          );

          // check hash map for each word
          const totalFamilyOccurrences = allFamilyWords.reduce(
            (sum, [word, _]) => {
              return sum + (hashMap[word] || 0);
            },
            0,
          );

          if (state.flaggedFamilies) {
            state.flaggedFamilies[fam].occurances = totalFamilyOccurrences;
            totalFlaggedWords += totalFamilyOccurrences;
          }
        });

        if (totalFlaggedWords === 0) {
          state.analysisResult.result = "pass";
          state.analysisResult.totalFlaggedWords = 0;
        } else {
          state.analysisResult.result = "fail";
          state.analysisResult.totalFlaggedWords = totalFlaggedWords;
        }
      }
    },

    setCurrentPreset: (
      state,
      action: PayloadAction<UserFlagPreset | DefaultFlagPreset | null>,
    ) => {
      const preset = action.payload;
      state.currentPreset = preset;

      const hashMap = state.lyricsHashMap;

      if (preset && hashMap) {
        const flaggedFamilies = findFlaggedFamilies(preset);

        state.flaggedFamilies = flaggedFamilies;

        let totalFlaggedWords = 0;
        Object.keys(flaggedFamilies).forEach((fam) => {
          // get all words in that family
          const allFamilyWords = Object.entries(FLAGGABLE_WORDS_MASTER).filter(
            ([_, wordData]) => wordData.family === fam,
          );

          // check hash map for each word
          const totalFamilyOccurrences = allFamilyWords.reduce(
            (sum, [word, _]) => {
              return sum + (hashMap[word] || 0);
            },
            0,
          );

          if (state.flaggedFamilies) {
            state.flaggedFamilies[fam].occurances = totalFamilyOccurrences;
            totalFlaggedWords += totalFamilyOccurrences;
          }
        });

        if (totalFlaggedWords === 0) {
          state.analysisResult.result = "pass";
          state.analysisResult.totalFlaggedWords = 0;
        } else {
          state.analysisResult.result = "fail";
          state.analysisResult.totalFlaggedWords = totalFlaggedWords;
        }
      } else if (preset) {
        const flaggedFamilies = findFlaggedFamilies(preset);

        state.flaggedFamilies = flaggedFamilies;
      }
    },

    resetAnalysisResult: (state) => {
      state.analysisResult.result = null;
      state.analysisResult.totalFlaggedWords = 0;
    },

    setLyricsHashMap: (state, action: PayloadAction<HashMap | null>) => {
      state.lyricsHashMap = action.payload;
    },

    // presets
    setDefaultPresets: (
      state,
      action: PayloadAction<DefaultFlagPreset[] | null>,
    ) => {
      state.defaultPresets = action.payload;
    },
    // TODO: Get presets from DB
    setUserPresets: (state, action: PayloadAction<UserFlagPreset[] | null>) => {
      state.userPresets = action.payload;
    },
    // !TODO: You'll also need an updateUserPreset action here
  },
});

export const {
  setFamilyOccurances,
  setLyricsHashMap,
  setDefaultPresets,
  setUserPresets,
  setFlaggedFamilies,
  setCurrentPreset,
  updateFamilyOccurances,
  resetAnalysisResult,
} = flagManagementSlice.actions;

export default flagManagementSlice.reducer;
