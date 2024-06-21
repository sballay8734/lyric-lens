import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { hideBtmSheet } from "../../store/features/bottomSheet/bottomSheetSlice";

export default function BottomSheet(): React.JSX.Element {
  const dispatch = useDispatch();
  const sheetIsVis = useAppSelector(
    (state: RootState) => state.btmSheet.sheetIsVis,
  );

  console.log(sheetIsVis);

  return (
    <dialog open={sheetIsVis} className={`modal modal-bottom`}>
      {/* MODAL CONTENT */}
      <div className="modal-box h-full bg-base-100">
        <h3 className="font-bold text-lg">This is a headers</h3>
        <p className="py-4">This is the Content</p>
      </div>
      {/* OVERLAY TO HANDLE CLOSE CLOSE ON OUTSIDE CLICK */}
      <form
        onClick={() => dispatch(hideBtmSheet())}
        method="dialog"
        className="modal-backdrop bg-black/50"
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
