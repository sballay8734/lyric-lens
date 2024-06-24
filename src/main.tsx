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
        path: "/test",
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
// TODO: Add a "View full lyrics" option that shows the song formatted by section (verse, chorus, etc...) and highlights the words that were flagged
// TODO: Fix weird padding thing when artist dropdown is loading
// TODO: Add loading states for LOTS of stuff
// TODO: ALL of the user's flagged words should be visible on the graph but only the ones in the song should be connected to the graph (the others should be small, faded, and around the edges of the screen)
// mTODO: Lyrics for display aren't quite formatting properly due to inconsitencies of the html markup

// V 1.0    *******************************************************************
// !TODO: OPTIMIZATIONS FOR API REQUESTS
// TODO: You will probably need to track if the current lyric has already been analyzed or not. This will make it easier to handle certain state related to the UI in the btmSheet
// TODO: If song is clean, center circle should disappear, all words should fly towards the edge of the screen, and a message that it's clean should appear.
// TODO: Add a button to clear all inputs quickly
// TODO: You have to handle words like "shitll" (from "shit'll" but you currently are removing punctuation). This might end up not being that bad. Keeping in the opostrophes or spliting words differently might not be too hard
// TODO: Account creation to save preferences
// TODO: Flag "Presets" so users can quickly switch to different preferences
// TODO: Look into clean vs. explicit versions and how Genius handles them
// TODO: Persist word selections for users without account (local storage)
// TODO: Do we really need 35 pages of songs? Are they being fetched in order of popularity?

// V 1.x (Near term features) *************************************************

// V 2.0 (Long term features) *************************************************
