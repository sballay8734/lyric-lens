import { Outlet } from "react-router-dom";

import "./App.css";
import Drawer from "./components/Drawer";
import BottomSheet from "./features/ModalManagement/components/BottomSheet";
import FloatingToggle from "./features/ModalManagement/components/FloatingToggle";

function App() {
  return (
    <div className="flex flex-col w-full h-full items-center pt-[72px]">
      <Drawer />
      <BottomSheet />
      <FloatingToggle />
      <Outlet />
    </div>
  );
}

export default App;
