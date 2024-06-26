import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Home from "./routes/Home.tsx";
import ManageFlags from "./routes/ManageFlags.tsx";
import { store } from "./store/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // mTODO: Add error catch element here
    errorElement: <div>ERROR</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/manage-flags",
        element: <ManageFlags />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// MVP TODO *******************************************************************
// SATURDAY

// !TODO: Viewing lyrics after analyzing should highlight the flagged words in the song
// TODO: Add loading states for LOTS of stuff
// TODO: On desktop, searchSheet and lyricsSheet should be modals NOT popovers

// TUESDAY
// !TODO: REFACTOR!!!!! (PROJECT IS GETTING MESSY)
// TODO: Lots of things need to be renamed
// TODO: Organize files, types, mockData, project structure, components etc...
// TODO: Tabbing inside of the inputs causes some weird behavior
// TODO: Add toggle to switch between song search and word selection
// TODO: Complete a default flaggedWords object (just any word over 2 vLvl)
// TODO: Fix weird padding thing when artist dropdown is loading
// mTODO: flagged words not in song should congregate together somewhere and not on the sides of the screen
// mTODO: maybe move "View Lyrics" btn somewhere else
// mTODO: Add loading feedback when song is changed and lyrics are loading
// mTODO: Words above around lvl 8 probably don't even need to be shown on graph

// V 1.0    *******************************************************************
// !TODO: OPTIMIZATIONS FOR API REQUESTS
// !TODO: Optimizations for logic and looping through families, words, etc...
// !TODO: each bubble should be clickable and show more details like all the words (not just the family which is what they currently show)
// !TODO: All songs with the same title should be grouped and a "Versions" dropdown should show. Songs are labeled like "Count Me Out (Music Video)" where the music video is often much cleaner than the official song
// TODO: You have to handle words like "shitll" (from "shit'll" but you currently are removing punctuation). This might end up not being that bad. Keeping in the opostrophes or spliting words differently might not be too hard
// TODO: Account creation to save preferences
// TODO: Flag "Presets" so users can quickly switch to different preferences
// TODO: Look into clean vs. explicit versions and how Genius handles them
// TODO: Persist word selections for users without account (local storage)

// V 1.x (Near term features) *************************************************

// V 2.0 (Long term features) *************************************************
