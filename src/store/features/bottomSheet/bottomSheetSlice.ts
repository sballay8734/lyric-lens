import { createSlice } from "@reduxjs/toolkit";

interface BtmSheetState {
  searchSheetIsVis: boolean;
  lyricsSheetIsVis: boolean;
}

const initialState: BtmSheetState = {
  searchSheetIsVis: false,
  lyricsSheetIsVis: false,
};

export const btmSheetSlice = createSlice({
  name: "btmSheet",
  initialState,
  reducers: {
    hideSearchSheet: (state) => {
      state.searchSheetIsVis = false;
    },
    showSearchSheet: (state) => {
      state.searchSheetIsVis = true;
    },

    hideLyricsSheet: (state) => {
      state.lyricsSheetIsVis = false;
    },
    showLyricsSheet: (state) => {
      state.lyricsSheetIsVis = true;
    },
  },
});

export const {
  hideSearchSheet,
  showSearchSheet,
  hideLyricsSheet,
  showLyricsSheet,
} = btmSheetSlice.actions;

export default btmSheetSlice.reducer;
