import { Outlet } from "react-router-dom";

import "./App.css";
// import Drawer from "./components/Drawer";
import FloatingToggle from "../features/ModalManagement/components/FloatingToggle";
import SongSearchModal from "../features/ModalManagement/components/SongSearchModal";

function Entry() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      {/* <Drawer /> */}
      <SongSearchModal />
      <FloatingToggle />
      <Outlet />
    </div>
  );
}

export default Entry;
