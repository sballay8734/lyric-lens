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
