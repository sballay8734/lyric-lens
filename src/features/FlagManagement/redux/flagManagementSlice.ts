import { createSlice } from "@reduxjs/toolkit";

import {
  DefaultFlagPreset,
  UserFlagPreset,
} from "../../../constants/defaultProfiles";
import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";
import { HashMap } from "../../SongAnalysisGraph/types/graphTypes";

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
  // TODO: Maybe add word exceptions here as an array
}

const initialState: FlagManagementState = {
  flaggedFamilies: null,
  currentPreset: null,
  defaultPresets: null, // !TODO: Don't load these if user doesn't want to
  userPresets: null,
  lyricsHashMap: null,
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
      const { family, occurances } = action.payload;

      if (state.flaggedFamilies) {
        state.flaggedFamilies[family].occurances = occurances;
      }
    },

    setCurrentPreset: (
      state,
      action: PayloadAction<UserFlagPreset | DefaultFlagPreset | null>,
    ) => {
      state.currentPreset = action.payload;
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
} = flagManagementSlice.actions;

export default flagManagementSlice.reducer;
