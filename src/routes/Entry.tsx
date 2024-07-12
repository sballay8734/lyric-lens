import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import "../index.css";
// import Drawer from "./components/Drawer";
import { useWindowSize } from "../features/Graph/hooks/graphHooks";
import FlagManagerModal from "../features/ModalManagement/components/modals/FlagManagerModal";
import SongSearchModal from "../features/ModalManagement/components/modals/SongSearchModal";

function Entry() {
  const windowSize = useWindowSize();

  useEffect(() => {}, [windowSize.height, windowSize.width, windowSize]);

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* <Drawer /> */}
      <SongSearchModal />
      <FlagManagerModal />
      {/* <BottomBtnsWrapper /> */}
      <Outlet />
    </div>
  );
}

export default Entry;
