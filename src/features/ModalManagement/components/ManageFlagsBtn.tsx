import { FaRegFlag } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { showFlagManagerModal } from "../redux/modalManagementSlice";

export default function ManageFlagsBtn(): React.JSX.Element {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(showFlagManagerModal())}
      className={`btn col-span-1 flex h-full w-full items-center justify-center rounded-sm bg-slate-800/50 px-2 py-2 text-primary`}
    >
      <FaRegFlag size={16} />
    </button>
  );
}
