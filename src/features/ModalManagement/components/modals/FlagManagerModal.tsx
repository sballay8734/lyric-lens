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
      <div className="modal-box lyrics-sheet-modal h-full bg-base-100 flex flex-col gap-2 pt-3 px-4">
        {/* Sheet header */}
        <div className="w-full flex justify-end text-error">
          <button
            onClick={() => dispatch(hideFlagManagerModal())}
            className={`p-2 rounded-sm hover:text-error/70 active:text-error/50 transition-colors duration-100`}
          >
            Close
          </button>
        </div>
        <div>
          <h2>FLAG MANAGER FOR X PROFILE</h2>
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
