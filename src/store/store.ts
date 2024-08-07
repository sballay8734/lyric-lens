import { configureStore } from "@reduxjs/toolkit";

import modalManagementReducer from "../features/ModalManagement/redux/modalManagementSlice";
import songSearchFormReducer from "../features/SongSearchForm/redux/songSearchFormSlice";
import wordManagement from "../features/WordManagement/redux/wordManagementSlice";

export const store = configureStore({
  reducer: {
    songSearchForm: songSearchFormReducer,
    modalManagement: modalManagementReducer,
    wordManagement: wordManagement,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
