import { createSlice } from "@reduxjs/toolkit";

import { ArtistSimple, SongFromApi } from "../../../types/apiObjects";

import type { PayloadAction } from "@reduxjs/toolkit";

// Define type for slice state
interface SongSearchFormState {
  artistQuery: string;
  selectedArtist: ArtistSimple | null;

  songQuery: string; // THIS IS NOT REALLY USED RIGHT NOW
  songsLoading: boolean;
  selectedSong: SongFromApi | null;

  lyricQuery: string; // for searching by lyrics

  unFormattedLyrics: string | null;
  lyrics: string | null; // the string returned from lyric fetch & parse
  lyricsLoading: boolean; // status of fetch & parse
}

// Define initial state
const initialState: SongSearchFormState = {
  artistQuery: "",
  selectedArtist: null,

  songQuery: "",
  songsLoading: false,
  selectedSong: null,

  lyricQuery: "",

  unFormattedLyrics: null,
  lyrics: null,
  lyricsLoading: false,
};

export const songSearchFormSlice = createSlice({
  name: "songSearchForm",
  initialState,
  reducers: {
    // ARTIST
    setArtistQuery: (state, action: PayloadAction<string>) => {
      state.artistQuery = action.payload;
    },
    setSelectedArtist: (state, action: PayloadAction<ArtistSimple | null>) => {
      state.selectedArtist = action.payload;
    },

    // SONGS
    setSongQuery: (state, action: PayloadAction<string>) => {
      state.songQuery = action.payload;
    },
    setSongsLoading: (state, action: PayloadAction<boolean>) => {
      state.songsLoading = action.payload;
    },
    setSelectedSong: (state, action: PayloadAction<SongFromApi | null>) => {
      state.selectedSong = action.payload;
    },

    // LYRIC QUERY
    setLyricQuery: (state, action: PayloadAction<string>) => {
      state.lyricQuery = action.payload;
    },

    // LYRICS
    setLyrics: (state, action: PayloadAction<string | null>) => {
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
  setLyricQuery,
} = songSearchFormSlice.actions;

export default songSearchFormSlice.reducer;
