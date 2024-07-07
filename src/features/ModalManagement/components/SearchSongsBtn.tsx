import { LuSearch } from "react-icons/lu";
import { useDispatch } from "react-redux";

import { showSongSearchModal } from "../redux/modalManagementSlice";

export default function SearchSongsBtn(): React.JSX.Element {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(showSongSearchModal())}
      className={`btn col-span-1 flex h-full w-full items-center justify-center rounded-sm bg-slate-800/50 px-2 py-2 text-primary`}
    >
      <LuSearch size={18} />
    </button>
  );
}
