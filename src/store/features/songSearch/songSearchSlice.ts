import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ArtistSimple, SongFromApi } from "../../../types/api";

// Define type for slice state
interface SongSearchState {
  artistQuery: string;
  selectedArtist: ArtistSimple | null;

  songQuery: string; // THIS IS NOT REALLY USED RIGHT NOW
  songsLoading: boolean;
  selectedSong: SongFromApi | null;

  lyricQuery: string; // for searching by lyrics

  lyrics: string | null; // the string returned from lyric fetch & parse
  lyricsLoading: boolean; // status of fetch & parse
}

// Define initial state
const initialState: SongSearchState = {
  artistQuery: "",
  selectedArtist: null,

  songQuery: "",
  songsLoading: false,
  selectedSong: null,

  lyricQuery: "",
  lyrics: null,
  lyricsLoading: false,
};

export const songSearchSlice = createSlice({
  name: "songSearch",
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
} = songSearchSlice.actions;

export default songSearchSlice.reducer;

// TODO: You will probably need to track if the current lyric has already been analyzed or not. This will make it easier to handle certain state related to the UI in the btmSheet
