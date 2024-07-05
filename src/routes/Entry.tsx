import { Outlet } from "react-router-dom";

import "../index.css";
// import Drawer from "./components/Drawer";
import SongSearchModal from "../features/ModalManagement/components/modals/SongSearchModal";
import BottomBtnsWrapper from "../features/ModalManagement/containers/BottomBtnsWrapper";

function Entry() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      {/* <Drawer /> */}
      <SongSearchModal />
      <BottomBtnsWrapper />
      <Outlet />
    </div>
  );
}

export default Entry;
