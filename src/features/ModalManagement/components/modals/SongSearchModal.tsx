import { IoMdClose } from "react-icons/io";
import { LuMicroscope } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import LoadingModal from "./LoadingModal";
import { useAppSelector } from "../../../../hooks/hooks";
import { RootState } from "../../../../store/store";
import ArtistInput from "../../../SongSearchForm/components/ArtistInput";
import LyricsInput from "../../../SongSearchForm/components/LyricsInput";
import SongInput from "../../../SongSearchForm/components/SongInput";
import {
  setLyrics,
  setSelectedArtist,
  setSelectedSong,
} from "../../../SongSearchForm/redux/songSearchFormSlice";
import { hideSongSearchModal } from "../../redux/modalManagementSlice";

export default function SongSearchModal(): React.JSX.Element {
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const songSearchModalIsVis = useAppSelector(
    (state: RootState) => state.modalManagement.songSearchModalIsVis,
  );
  const lyricsLoading = useAppSelector(
    (state: RootState) => state.songSearchForm.lyricsLoading,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  // lyric analysis already starts automatically when lyrics load into Redux
  // So the only thing you need to do here is show loading and close the sheet
  function handleAnalyzeLyrics() {
    if (lyricsLoading) {
      // mTODO: show loading spinner
      console.log("Loading...");
    } else {
      // close dropdown
      dispatch(hideSongSearchModal());

      // if not on home page, navigate there
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }

  function handleClearFields() {
    dispatch(setSelectedArtist(null));
    dispatch(setSelectedSong(null));
    dispatch(setLyrics(null));
  }

  return (
    <dialog
      open={songSearchModalIsVis}
      className={`modal modal-bottom h-full rounded-none ${songSearchModalIsVis ? "visible" : "invisible"}`}
    >
      {/* MODAL CONTENT */}
      <div className="song-search-modal modal-box flex h-full flex-col gap-2 bg-base-100 px-2 py-2">
        {/* How to use */}
        <div className="mb-2 flex w-full flex-col gap-2 rounded-md bg-base-200 px-2 py-4">
          <h2 className="text-2xl font-bold text-primary underline">
            How To Use
          </h2>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
            ratione obcaecati eaque. Officia, possimus vero fuga, nostrum
            ratione recusandae et asperiores ullam sunt nobis sequi. Magnam
            expedita ullam quis animi?
          </p>
        </div>
        {/* INPUT GROUP */}
        <div className="flex w-full flex-col gap-2">
          <ArtistInput />
          <SongInput />
          <div className="divider my-2 flex items-center">OR</div>
          <LyricsInput />
        </div>
        {/* ANALYZE BUTTON */}
        <div className="flex h-full items-center justify-center">
          <button
            disabled={lyricsLoading || !selectedSong}
            onClick={handleAnalyzeLyrics}
            className={`relative flex h-full w-full items-center rounded-sm py-4 text-4xl text-black hover:opacity-80 active:opacity-70 disabled:pointer-events-none ${
              lyricsLoading || !selectedSong
                ? "bg-gray-700 text-gray-800 opacity-50"
                : "bg-gradient-to-r from-primary to-secondary"
            } transition-opacity duration-200`}
          >
            <LuMicroscope size={30} className="absolute left-4 opacity-80" />
            <span className="w-full font-bold">ANALYZE</span>
            <LuMicroscope
              size={30}
              className="absolute right-4 scale-x-[-1] opacity-80"
            />
          </button>
        </div>
        <LoadingModal />
        {/* Btns */}
        {/* !TODO: Close btn overflows slightly on wider screens (could be a scroll bar issue with the html tag) */}
        <div className="mt-auto flex min-h-14 w-full gap-2 text-error">
          <button
            onClick={handleClearFields}
            className="btn h-full flex-[10_10_0%] rounded-sm text-error"
          >
            Clear Form
          </button>
          <button
            disabled={lyricsLoading}
            onClick={() => dispatch(hideSongSearchModal())}
            className={`btn btn-error m-0 flex h-full flex-[1_1_0%] items-center justify-center rounded-sm transition-colors duration-100 ${lyricsLoading ? "pointer-events-none opacity-30" : "pointer-events-auto opacity-100"}`}
          >
            <IoMdClose size={20} />
          </button>
        </div>
      </div>
    </dialog>
  );
}
