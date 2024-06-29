import { configureStore } from "@reduxjs/toolkit";

import bottomSheetReducer from "./features/bottomSheet/bottomSheetSlice";
import flagManagerReducer from "./features/flagManager/flagManagerSlice";
import songSearchReducer from "./features/songSearch/songSearchSlice";

export const store = configureStore({
  reducer: {
    songSearch: songSearchReducer,
    btmSheet: bottomSheetReducer,
    flagManager: flagManagerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
