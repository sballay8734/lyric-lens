import { useDispatch } from "react-redux";

import { useAppSelector } from "../../hooks/hooks";
import { showLyricsSheet } from "../../store/features/bottomSheet/bottomSheetSlice";
import { RootState } from "../../store/store";

export default function SongArtistOverlay(): React.JSX.Element {
  const dispatch = useDispatch();
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearch.selectedSong,
  );
  const analysisResult = useAppSelector(
    (state: RootState) => state.songSearch.analysisResult,
  );
  const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);

  return (
    <div className="absolute w-full h-full top-0 pointer-events-none flex justify-center">
      <div
        className={`bg-slate-500/10 w-fit max-w-[80%] h-fit px-4 py-2 rounded-md mt-20 backdrop-blur-sm flex flex-col items-center min-w-60 ${!selectedSong ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
      >
        <h2 className="font-bold text-white mb-1">{`"${selectedSong?.title}"`}</h2>
        <h2 className="text-faded text-sm bg-slate-900/80 px-2 py-1 rounded-sm w-fit">
          {selectedSong?.artist_names}
        </h2>
        <div className="divider m-0"></div>
        <h2 className="text-xs flex w-full">
          {analysisResult?.result === "pass" ? (
            <span className="text-green-500 bg-green-950/80 px-2 py-1 rounded-sm">
              CLEAN
            </span>
          ) : (
            <span className="text-red-500 bg-red-950/80 px-2 py-1 rounded-sm">
              CAUTION
            </span>
          )}
          <button
            disabled={lyrics === null}
            onClick={() => dispatch(showLyricsSheet())}
            className="bg-gradient-to-r from-primary to-secondary text-black px-2 py-1 ml-auto pointer-events-auto"
          >
            View Lyrics
          </button>
        </h2>
      </div>
    </div>
  );
}
