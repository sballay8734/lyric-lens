import { Outlet } from "react-router-dom";
import "./App.css";
import Drawer from "./components/shared/Drawer";
import BottomSheet from "./components/shared/BottomSheet";
import FloatingToggle from "./components/shared/FloatingToggle";

function App() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center pt-[72px] px-4">
      <Drawer />
      <BottomSheet />
      <FloatingToggle />
      <Outlet />
    </div>
  );
}

export default App;

// FRIDAY TODO:
// Move inputs to modal
// Make custom input component (daisyUI styles are being really annoying)
// Selecting words should also popover (maybe from top?)

// !TODO: Fix theme

// !TODO: Persist word selections

// !TODO: Search inputs should be a modal that pops up, when a song is selected it should automatically close showing only the graph

// !TODO: Tabing inside of the inputs causes some weird behavior

// !TODO: Lyric input should not have dropdown

// TODO: Song input should also exist that will be updated with only the selected artists songs

// TODO: Dropdown should update as user types into the input

// mTODO: Should you add song title field too?

// mTODO: Add user feedback if lyric field is empty

// NOTE: Search should NOT be case sensitive

// MAIN USER FLOW ************************************************************

/*
Flow 1 (user knows artist and song name)
1. Can't pull all artists on load so send requests as user is typing in input
2. Artist is selected (user)
3. artists songs are pulled in (api)
4. Song is selected (user)
5. Lyrics are displayed based on preference 

Flow 2 (user knows artist and some lyrics)
1. Pull all artists in on app load (api)
2. Artist is selected (user)
3. artists songs are pulled in (api)
4. User types in some lyrics (user)
5. Songs are filtered by best match 
6. Select song (user)
7. Show graph (app)

Flow 3 (user only knows some lyrics)
1. User types in some lyrics (user)
2. User presses search (user)
3. Songs are filtered by best match



*/
