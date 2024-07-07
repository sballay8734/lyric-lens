import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import ManageFlagsBtn from "../components/ManageFlagsBtn";
import SearchSongsBtn from "../components/SearchSongsBtn";
import { showLyricsModal } from "../redux/modalManagementSlice";

export default function BottomBtnsWrapper(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const songSearchModalIsVis = useAppSelector(
    (state: RootState) => state.modalManagement.songSearchModalIsVis,
  );
  const flagManagerModalisVis = useAppSelector(
    (state: RootState) => state.modalManagement.flagManagerModalIsVis,
  );
  const lyrics = useAppSelector(
    (state: RootState) => state.songSearchForm.lyrics,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  const modalIsShowing = songSearchModalIsVis || flagManagerModalisVis;

  // don't show "View Lyrics" if there is no song selected
  if (!selectedSong) {
    return (
      <div
        className={`grid h-full w-full grid-cols-2 gap-2 ${
          modalIsShowing
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        } transition-opacity duration-200`}
      >
        <ManageFlagsBtn />
        <SearchSongsBtn />
      </div>
    );
  }

  return (
    <div
      className={`grid h-full max-h-16 w-full grid-cols-5 gap-2 ${
        modalIsShowing
          ? "pointer-events-none opacity-0"
          : "pointer-events-auto opacity-100"
      } transition-opacity duration-200`}
    >
      <ManageFlagsBtn />
      <button
        disabled={lyrics === null}
        onClick={() => dispatch(showLyricsModal())}
        className="btn btn-primary relative col-span-3 flex h-full w-full items-center justify-center rounded-sm bg-primary/50 px-2 py-2 text-black"
      >
        <span className="absolute left-0 top-0 animate-pulse bg-primary"></span>
        <span className="relative">VIEW LYRICS</span>
      </button>
      <SearchSongsBtn />
    </div>
  );
}
