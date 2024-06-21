import { configureStore } from "@reduxjs/toolkit";

import songSearchReducer from "./features/songSearch/songSearchSlice";
import bottomSheetReducer from "./features/bottomSheet/bottomSheetSlice";

export const store = configureStore({
  reducer: {
    songSearch: songSearchReducer,
    btmSheet: bottomSheetReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
