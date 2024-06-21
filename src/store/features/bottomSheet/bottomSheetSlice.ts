import { createSlice } from "@reduxjs/toolkit";

interface BtmSheetState {
  sheetIsVis: boolean;
}

const initialState: BtmSheetState = {
  sheetIsVis: false,
};

export const btmSheetSlice = createSlice({
  name: "btmSheet",
  initialState,
  reducers: {
    hideBtmSheet: (state) => {
      state.sheetIsVis = false;
    },
    showBtmSheet: (state) => {
      state.sheetIsVis = true;
    },
  },
});

export const { hideBtmSheet, showBtmSheet } = btmSheetSlice.actions;

export default btmSheetSlice.reducer;
