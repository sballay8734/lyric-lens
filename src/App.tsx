import { Outlet } from "react-router-dom";
import "./App.css";
import Drawer from "./components/shared/Drawer";
import BottomSheet from "./components/shared/BottomSheet";
import FloatingToggle from "./components/shared/FloatingToggle";

function App() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center pt-[72px]">
      <Drawer />
      <BottomSheet />
      <FloatingToggle />
      <Outlet />
    </div>
  );
}

export default App;

// !TODO: Persist word selections

// !TODO: Look into clean vs. explicit versions and how Genius handles them

// !TODO: Search inputs should be a modal that pops up, when a song is selected it should automatically close showing only the graph

// !TODO: Tabing inside of the inputs causes some weird behavior

// mTODO: Selecting words should also be in sheet (maybe from have a toggle?)
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
