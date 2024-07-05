import { LuSearch } from "react-icons/lu";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { showSearchSheet } from "../redux/modalManagementSlice";

export default function FloatingToggle(): React.JSX.Element {
  const dispatch = useDispatch();
  const searchSheetIsVis = useAppSelector(
    (state: RootState) => state.modalManagement.searchSheetIsVis,
  );

  return (
    <button
      onClick={() => dispatch(showSearchSheet())}
      className={`flex items-center justify-center h-14 w-14 rounded-full text-black bg-gradient-to-r from-primary to-secondary absolute bottom-4 right-4 z-[999] shadow-sm shadow-accent ${
        searchSheetIsVis ? "opacity-0" : "opacity-100"
      } transition-opacity duration-200`}
    >
      <LuSearch size={22} />
    </button>
  );
}
