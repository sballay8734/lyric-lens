import { LuSearch } from "react-icons/lu";
import { useDispatch } from "react-redux";

import { showSongSearchModal } from "../redux/modalManagementSlice";

export default function SearchSongsBtn(): React.JSX.Element {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(showSongSearchModal())}
      className={`flex items-center justify-center rounded-md text-black bg-gradient-to-r from-primary to-secondary px-2 py-2 w-full`}
    >
      <span className="flex w-full items-center justify-center gap-1">
        <span>Search Songs</span>
        <LuSearch size={12} />
      </span>
    </button>
  );
}
