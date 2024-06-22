import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ArtistSimple, SongFromApi } from "../../../types/api";

// Define a type for the slice state
interface SongSearchState {
  artistQuery: string;
  selectedArtist: ArtistSimple | null;

  songQuery: string;
  selectedSong: SongFromApi | null;

  lyrics: string;
}

// Define the initial state using that type
const initialState: SongSearchState = {
  artistQuery: "",
  selectedArtist: null,
  songQuery: "",
  selectedSong: null,
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
    setSelectedArtist: (state, action: PayloadAction<ArtistSimple>) => {
      state.selectedArtist = action.payload;
    },
    setSongQuery: (state, action: PayloadAction<string>) => {
      state.songQuery = action.payload;
    },
    setSelectedSong: (state, action: PayloadAction<SongFromApi>) => {
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
