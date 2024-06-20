import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SongSearchState {
  artistName: string;
  songTitle: string;
  lyrics: string;
}

// Define the initial state using that type
const initialState: SongSearchState = {
  artistName: "",
  songTitle: "",
  lyrics: "",
};

export const songSearchSlice = createSlice({
  name: "songSearch",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateArtistName: (state, action: PayloadAction<string>) => {
      state.artistName === action.payload;
    },
    updateSongTitle: (state, action: PayloadAction<string>) => {
      state.songTitle === action.payload;
    },
    updateLyrics: (state, action: PayloadAction<string>) => {
      state.lyrics === action.payload;
    },
  },
});

export const { updateArtistName, updateSongTitle, updateLyrics } =
  songSearchSlice.actions;

export default songSearchSlice.reducer;
