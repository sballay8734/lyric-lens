import { Outlet } from "react-router-dom";
import "./App.css";
import Drawer from "./components/shared/Drawer";

function App() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center pt-[72px] px-4">
      <Drawer />
      <Outlet />
    </div>
  );
}

export default App;

// !TODO: Artist and Song Title state needs to be moved to context so you can access it globally

// !TODO: Lyric input should not have dropdown

// TODO: Song input should also exist that will be updated with only the selected artists songs

// TODO: Dropdown should update as user types into the input

// mTODO: Should you add song title field too?

// mTODO: Add user feedback if lyric field is empty

// NOTE: Search should NOT be case sensitive
// NOTE:
