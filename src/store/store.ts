import { configureStore } from "@reduxjs/toolkit";

import songSearchReducer from "./features/songSearch/songSearchSlice";
import bottomSheetReducer from "./features/bottomSheet/bottomSheetSlice";
import flagManagerReducer from "./features/flagManager/flagManagerSlice";

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
