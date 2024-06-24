import { createSlice } from "@reduxjs/toolkit";

interface FlagManagerState {}

const initialState: FlagManagerState = {};

export const flagManagerSlice = createSlice({
  name: "flagManager",
  initialState,
  reducers: {},
});

export const {} = flagManagerSlice.actions;

export default flagManagerSlice.reducer;
