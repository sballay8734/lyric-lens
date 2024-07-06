import { LuMicroscope } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

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
      className={`modal modal-bottom rounded-none ${songSearchModalIsVis ? "visible" : "invisible"}`}
    >
      {/* MODAL CONTENT */}
      <div className="modal-box song-search-modal h-full bg-base-100 flex flex-col gap-2 py-2 px-2">
        {/* How to use */}
        <div className="w-full flex flex-col gap-2 mb-2 px-2 py-4 bg-base-200 rounded-md">
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
        <div className="w-full flex flex-col gap-2">
          <ArtistInput />
          <SongInput />
          <div className="divider flex items-center my-2">OR</div>
          <LyricsInput />
        </div>
        {/* ANALYZE BUTTON */}
        <div className="h-full flex items-center justify-center">
          <button
            disabled={lyricsLoading || !selectedSong}
            onClick={handleAnalyzeLyrics}
            className={`w-full flex items-center rounded-sm relative text-black py-4 h-full hover:opacity-80 active:opacity-70 disabled:pointer-events-none text-4xl ${
              lyricsLoading || !selectedSong
                ? "bg-gray-700 opacity-50 text-gray-800"
                : "bg-gradient-to-r from-primary to-secondary"
            } transition-opacity duration-200`}
          >
            <LuMicroscope size={30} className="absolute left-4 opacity-80" />
            <span className="w-full font-bold">ANALYZE</span>
            <LuMicroscope
              size={30}
              className="absolute right-4 opacity-80 scale-x-[-1]"
            />
          </button>
        </div>
        <LoadingModal />
        {/* Btns */}
        {/* !TODO: Close btn overflows slightly on wider screens (could be a scroll bar issue with the html tag) */}
        <div className="w-full flex text-error mt-auto gap-2 min-h-14">
          <button
            onClick={handleClearFields}
            className="btn text-error rounded-sm flex-[10_10_0%] h-full"
          >
            Clear Form
          </button>
          <button
            disabled={lyricsLoading}
            onClick={() => dispatch(hideSongSearchModal())}
            className={`btn m-0 btn-error flex flex-[1_1_0%] h-full items-center justify-center rounded-sm transition-colors duration-100 ${lyricsLoading ? "opacity-30 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
          >
            <IoMdClose size={20} />
          </button>
        </div>
      </div>
    </dialog>
  );
}
