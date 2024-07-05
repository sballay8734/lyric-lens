import { FaRegFlag } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { showFlagManagerModal } from "../redux/modalManagementSlice";

export default function ManageFlagsBtn(): React.JSX.Element {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(showFlagManagerModal())}
      className={`flex items-center justify-center rounded-md text-black bg-gradient-to-r from-primary to-secondary px-2 py-2 w-full`}
    >
      <span className="flex w-full items-center justify-center gap-1">
        <span>Manage Flags</span>
        <FaRegFlag size={11} />
      </span>
    </button>
  );
}
