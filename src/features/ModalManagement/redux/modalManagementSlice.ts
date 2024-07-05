import { createSlice } from "@reduxjs/toolkit";

interface ModalManagementState {
  searchSheetIsVis: boolean;
  lyricsSheetIsVis: boolean;
}

const initialState: ModalManagementState = {
  searchSheetIsVis: false,
  lyricsSheetIsVis: false,
};

export const modalManagementSlice = createSlice({
  name: "modalManagement",
  initialState,
  reducers: {
    hideSearchSheet: (state) => {
      state.searchSheetIsVis = false;
    },
    showSearchSheet: (state) => {
      state.searchSheetIsVis = true;
    },

    hideLyricsModal: (state) => {
      state.lyricsSheetIsVis = false;
    },
    showLyricsModal: (state) => {
      state.lyricsSheetIsVis = true;
    },
  },
});

export const {
  hideSearchSheet,
  showSearchSheet,
  hideLyricsModal,
  showLyricsModal,
} = modalManagementSlice.actions;

export default modalManagementSlice.reducer;
