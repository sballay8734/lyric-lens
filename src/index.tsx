import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Entry from "./routes/Entry.tsx";
import Home from "./routes/Home.tsx";
import ManageFlags from "./routes/ManageFlags.tsx";
import { store } from "./store/store.ts";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Entry />,
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
// NEXT WORK SESSION
// TODO: NEW PLAN - All possible families should ALWAYS be rendered on the screen (only their opacity and position should change) This means you won't have to keep setting flagged words and cause re-rendering. Just change a flag (that you need to add) to true or false based on if the word is in the song.

// So new flow looks like this...
// 1. On initial load, set the flagged families to ALL possible flagged families
// 2. When a preset is selected, JUST update the preset and maybe an "isInPreset" flag inside flagged families
// 3. When a song is selected, set all occurances to 0, loop through the words and the preset, but only do something if the words family "isInPreset"

// !TODO: Make box for words that are not in the song but are in the flagged list (this is good for user feedback)

// !TODO: Node positions should NOT reset on song change or preset change.

// !TODO: Smooth out animations

// !TODO: Might have to check out d3 bindings and how they work

// !TODO: Re-rendering is happening too much when changing preset and causing a very janky animation

// !TODO: Check Kendrick Lamar's "We Cry Together" on maximum filter (One node is not connected for some reason - probably because you recently added some words wrong to the master list)

// TODO: Words not in song should be visible in their own area

// TODO: Fix theme and colors (search dropdowns etc..)

// TODO: Add loading for when artists are being fetched (inside input)
// TODO: Fix weird padding thing when artist dropdown is loading
// mTODO: Also close profile select dropdown on outside click
// mTODO: Words above around lvl 8 probably don't even need to be shown on graph
// mTODO: Lyric input should be an accordion
// mTODO: Manage z-indexes better
// mTODO: Why are spaces after flagged words being highlighted in lyrics sheet
// mTODO: Show words that are NOT flagged also

// AFTER SAT July 6th
// !TODO: Users should be able to search by Song Title WITHOUT artist
// TODO: nodes not in song should group up somewhere and not spread around the screen
// TODO: dropdowns should scroll back to the top when a new song is selected
// TODO: On desktop, searchSheet and LyricsModal should be modals NOT popovers
// TODO: Tabbing inside of the inputs causes some weird behavior
// mTODO: Move Graph and Graph Wrapper to separate components
// mTODO: Refactor/Extract logic inside useEffect (the d3 stuff)
// mTODO: Set minimum amount of time for loading modal to pop up (maybe 2 seconds) - it sometimes flashes too quickly
// mTODO: Add loading feedback when song is changed and lyrics are loading

// V 1.0    *******************************************************************
// !TODO: Really need to refactor logic for flaggedFamilies and current flag Profile. It's messy and sloppy and all over the place

// !TODO: Update cors config (right now you're just using https://corsproxy.io/)
// !TODO: OPTIMIZATIONS FOR API REQUESTS
// !TODO: Optimizations for logic and looping through families, words, etc...
// !TODO: each bubble should be clickable and show more details like all the words (not just the family which is what they currently show)
// !TODO: All songs with the same title should be grouped and a "Versions" dropdown should show. Songs are labeled like "Count Me Out (Music Video)" where the music video is often much cleaner than the official song
// !TODO: Refactor modal logic to use IDs or something similar rather than having separate open and close actions for each modal
// TODO: Account creation to save preferences
// TODO: Look into clean vs. explicit versions and how Genius handles them
// TODO: Persist word selections for users without account (local storage)
// V 1.x (Near term features) *************************************************

// V 2.0 (Long term features) *************************************************

// REMEMBER: Dispatches are synchronous as long as the function are pure.
// So if you need to dispatch 2 actions with the second action depending on the state from the first action, THAT IS FINE as long as they are PURE
