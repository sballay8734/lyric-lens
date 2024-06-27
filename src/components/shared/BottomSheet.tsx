import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { hideBtmSheet } from "../../store/features/bottomSheet/bottomSheetSlice";
import ArtistInput from "../Search/ArtistInput";
import SongInput from "../Search/SongInput";
import LyricsInput from "../Search/LyricsInput";
import { LuMicroscope } from "react-icons/lu";
import {
  setLyrics,
  setSelectedArtist,
  setSelectedSong,
} from "../../store/features/songSearch/songSearchSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomSheet(): React.JSX.Element {
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const sheetIsVis = useAppSelector(
    (state: RootState) => state.btmSheet.sheetIsVis,
  );
  const lyricsLoading = useAppSelector(
    (state: RootState) => state.songSearch.lyricsLoading,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearch.selectedSong,
  );

  // lyric analysis already starts automatically when lyrics load into Redux
  // So the only thing you need to do here is show loading and close the sheet
  function handleAnalyzeLyrics() {
    if (lyricsLoading) {
      // mTODO: show loading spinner
      console.log("Loading...");
    } else {
      // close dropdown
      dispatch(hideBtmSheet());

      // if not on home page, navigate there
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }

  function handleClearFields() {
    // REVIEW: double check this won't interrupt requests and mess with loading

    dispatch(setSelectedArtist(null));
    dispatch(setSelectedSong(null));
    dispatch(setLyrics(null));
  }

  return (
    <dialog
      open={sheetIsVis}
      className={`modal modal-bottom ${sheetIsVis ? "visible" : "invisible"}`}
    >
      {/* MODAL CONTENT */}
      <div className="modal-box h-full bg-base-100 flex flex-col gap-2 pt-3">
        {/* Sheet header */}
        <div className="w-full flex justify-end text-error">
          <button
            onClick={() => dispatch(hideBtmSheet())}
            className="p-2 rounded-sm hover:text-error/70 active:text-error/50 transition-colors duration-100"
          >
            Close
          </button>
        </div>
        {/* INPUT GROUP */}
        <div className="w-full flex flex-col gap-2">
          <ArtistInput />
          <SongInput />
          <div className="divider flex items-center">OR</div>
          <LyricsInput />
          <button onClick={handleClearFields} className="btn text-error">
            Clear Fields
          </button>
        </div>
        {/* ANALYZE BUTTON */}
        <button
          disabled={lyricsLoading || !selectedSong}
          onClick={handleAnalyzeLyrics}
          className={`w-full mt-auto flex items-center relative text-black py-4 rounded-sm hover:opacity-80 active:opacity-70 disabled:pointer-events-none ${
            lyricsLoading || !selectedSong
              ? "bg-gray-700 opacity-50 text-gray-800"
              : "bg-gradient-to-r from-primary to-secondary"
          } transition-opacity duration-200`}
        >
          <LuMicroscope size={20} className="absolute left-4 opacity-80" />
          <span className="w-full font-bold">ANALYZE</span>
          <LuMicroscope
            size={20}
            className="absolute right-4 opacity-80 scale-x-[-1]"
          />
        </button>
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
