import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./routes/Home.tsx";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import ManageFlags from "./routes/ManageFlags.tsx";

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
// !TODO: Tabbing inside of the inputs causes some weird behavior
// !TODO: Add toggle to switch between song search and word selection
// !TODO: Viewing lyrics after analyzing should highlight the flagged words in the song
// TODO: Complete a default flaggedWords object (just any word over 2 vLvl)
// TODO: Fix weird padding thing when artist dropdown is loading
// TODO: Add loading states for LOTS of stuff
// TODO: Fix the fetching and formatting of lyrics all the way up to displaying them for the user
// mTODO: Lyrics for display aren't quite formatting properly due to inconsitencies of the html markup
// mTODO: flagged words not in song should congregate together somewhere and not on the sides of the screen
// mTODO: maybe move "View Lyrics" btn somewhere else
// mTODO: disable "close" btn in searchSheet if lyrics are loading/analyzing

// V 1.0    *******************************************************************
// !TODO: OPTIMIZATIONS FOR API REQUESTS
// !TODO: All songs with the same title should be grouped and a "Versions" dropdown should show. Songs are labeled like "Count Me Out (Music Video)" where the music video is often much cleaner than the official song
// TODO: You have to handle words like "shitll" (from "shit'll" but you currently are removing punctuation). This might end up not being that bad. Keeping in the opostrophes or spliting words differently might not be too hard
// TODO: Account creation to save preferences
// TODO: Flag "Presets" so users can quickly switch to different preferences
// TODO: Look into clean vs. explicit versions and how Genius handles them
// TODO: Persist word selections for users without account (local storage)

// V 1.x (Near term features) *************************************************

// V 2.0 (Long term features) *************************************************
