import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
import { showBtmSheet } from "../../store/features/bottomSheet/bottomSheetSlice";
import { RootState } from "../../store/store";

import { LuSearch } from "react-icons/lu";

export default function FloatingToggle(): React.JSX.Element {
  const dispatch = useDispatch();
  const sheetIsVis = useAppSelector(
    (state: RootState) => state.btmSheet.sheetIsVis,
  );

  // TODO: Make this a pretty gradient background
  return (
    <button
      onClick={() => dispatch(showBtmSheet())}
      className={`flex items-center justify-center h-14 w-14 rounded-full text-black bg-gradient-to-r from-primary to-secondary absolute bottom-5 right-5 z-[999] shadow-sm shadow-accent ${
        sheetIsVis ? "opacity-0" : "opacity-100"
      } transition-opacity duration-200`}
    >
      <LuSearch size={22} />
    </button>
  );
}
