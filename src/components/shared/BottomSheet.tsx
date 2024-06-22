import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { hideBtmSheet } from "../../store/features/bottomSheet/bottomSheetSlice";
import ArtistInput from "../Search/ArtistInput";
import SongInput from "../Search/SongInput";
import LyricsInput from "../Search/LyricsInput";
import { LuMicroscope } from "react-icons/lu";

export default function BottomSheet(): React.JSX.Element {
  const dispatch = useDispatch();

  // const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);
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
    }
  }

  return (
    <dialog open={sheetIsVis} className={`modal modal-bottom`}>
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

// !TODO: Song analysis should TECHNICALLY start as soon as the song title is selected (BUT don't show loading spinner until user has clicked analyze - this will give the illusion that it's faster than it is)

// !TODO: Add toggle to switch between song search and word selection

// TODO: Need to somehow communicate that searching only for lyrics is possible or searching for artist and lyrics is possible but that artist and song title will automatically close the modal when the song is selected or when click "analize"

// !TODO: Closing modal should still preserve state (in case user accidentally closes modal it would suck if everything was gone especially if they typed in a lot of lyrics)
