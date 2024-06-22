import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ArtistSimple, SongFromApi } from "../../../types/api";

// Define a type for the slice state
interface SongSearchState {
  artistQuery: string;
  selectedArtist: ArtistSimple | null;

  songQuery: string; // THIS IS NOT REALLY USED RIGHT NOW
  songsLoading: boolean;
  selectedSong: SongFromApi | null;

  lyrics: string;
  lyricsLoading: boolean;
}

// Define the initial state using that type
const initialState: SongSearchState = {
  artistQuery: "",
  selectedArtist: null,
  songQuery: "",
  songsLoading: false,
  selectedSong: null,
  lyrics: "",
  lyricsLoading: false,
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
    setSongsLoading: (state, action: PayloadAction<boolean>) => {
      state.songsLoading = action.payload;
    },
    setSelectedSong: (state, action: PayloadAction<SongFromApi | null>) => {
      state.selectedSong = action.payload;
    },

    setLyrics: (state, action: PayloadAction<string>) => {
      state.lyrics = action.payload;
    },
    setLyricsLoading: (state, action: PayloadAction<boolean>) => {
      state.lyricsLoading = action.payload;
    },
  },
});

export const {
  setArtistQuery,
  setSelectedArtist,
  setSongQuery,
  setSelectedSong,
  setLyrics,
  setLyricsLoading,
  setSongsLoading,
} = songSearchSlice.actions;

export default songSearchSlice.reducer;

// TODO: You will probably need to track if the current lyric has already been analyzed or not. This will make it easier to handle certain state related to the UI in the btmSheet
