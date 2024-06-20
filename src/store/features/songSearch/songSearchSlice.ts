import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SongSearchState {
  artistQuery: string;
  selectedArtist: string;

  songQuery: string;
  selectedSong: string;

  lyrics: string;
}

// Define the initial state using that type
const initialState: SongSearchState = {
  artistQuery: "",
  selectedArtist: "",
  songQuery: "",
  selectedSong: "",
  lyrics: "",
};

export const songSearchSlice = createSlice({
  name: "songSearch",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setArtistQuery: (state, action: PayloadAction<string>) => {
      state.artistQuery = action.payload;
    },
    setSelectedArtist: (state, action: PayloadAction<string>) => {
      state.selectedArtist = action.payload;
    },
    setSongQuery: (state, action: PayloadAction<string>) => {
      state.songQuery = action.payload;
    },
    setSelectedSong: (state, action: PayloadAction<string>) => {
      state.selectedSong = action.payload;
    },
    setLyrics: (state, action: PayloadAction<string>) => {
      state.lyrics = action.payload;
    },
  },
});

export const {
  setArtistQuery,
  setSelectedArtist,
  setSongQuery,
  setSelectedSong,
  setLyrics,
} = songSearchSlice.actions;

export default songSearchSlice.reducer;
