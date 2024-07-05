import { createSlice } from "@reduxjs/toolkit";

interface ModalManagementState {
  songSearchModalIsVis: boolean;
  lyricsModalIsVis: boolean;
  flagManagerModalIsVis: boolean;
}

const initialState: ModalManagementState = {
  songSearchModalIsVis: false,
  lyricsModalIsVis: false,
  flagManagerModalIsVis: false,
};

export const modalManagementSlice = createSlice({
  name: "modalManagement",
  initialState,
  reducers: {
    // song search form modal
    hideSongSearchModal: (state) => {
      state.songSearchModalIsVis = false;
    },
    showSongSearchModal: (state) => {
      state.songSearchModalIsVis = true;
    },

    // lyrics modal
    hideLyricsModal: (state) => {
      state.lyricsModalIsVis = false;
    },
    showLyricsModal: (state) => {
      state.lyricsModalIsVis = true;
    },

    // Flag manager modal
    hideFlagManagerModal: (state) => {
      state.flagManagerModalIsVis = false;
    },
    showFlagManagerModal: (state) => {
      state.flagManagerModalIsVis = true;
    },
  },
});

export const {
  hideSongSearchModal,
  showSongSearchModal,
  hideLyricsModal,
  showLyricsModal,
  hideFlagManagerModal,
  showFlagManagerModal,
} = modalManagementSlice.actions;

export default modalManagementSlice.reducer;
