import { IoMdClose } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { RootState } from "../../../../store/store";
import { hideFlagManagerModal } from "../../redux/modalManagementSlice";

export default function FlagManagerModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const flagManagerModalIsVis = useAppSelector(
    (state: RootState) => state.modalManagement.flagManagerModalIsVis,
  );
  return (
    <dialog
      open={flagManagerModalIsVis}
      className={`modal modal-bottom h-full ${flagManagerModalIsVis ? "visible" : "invisible"}`}
    >
      {/* MODAL CONTENT */}
      <div className="lyrics-sheet-modal modal-box flex h-full flex-col gap-2 bg-base-100 p-2">
        <div className="flex h-full items-center justify-center bg-base-200">
          <h2>FLAG MANAGER FOR X PROFILE</h2>
        </div>
        <div className="mt-auto flex min-h-14 w-full gap-2 text-error">
          <button
            onClick={() => console.log("Not configured")}
            className="btn h-full flex-[10_10_0%] rounded-sm text-error"
          >
            DOES NOTHING
          </button>
          <button
            onClick={() => dispatch(hideFlagManagerModal())}
            className={`btn btn-error m-0 flex h-full flex-[1_1_0%] items-center justify-center rounded-sm transition-colors duration-100`}
          >
            <IoMdClose size={20} />
          </button>
        </div>
      </div>

      {/* !TODO: Modals now all take up full screen so you probably don't need the form below on ALL modals */}
      {/* OVERLAY TO HANDLE CLOSE CLOSE ON OUTSIDE CLICK */}
      <form
        onClick={() => dispatch(hideFlagManagerModal())}
        method="dialog"
        className="modal-backdrop bg-black/50"
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
