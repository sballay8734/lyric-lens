import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";

export default function SongArtistOverlay(): React.JSX.Element {
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearch.selectedSong,
  );
  const analysisResult = useAppSelector(
    (state: RootState) => state.songSearch.analysisResult,
  );

  return (
    <div className="absolute w-full h-full top-0 pointer-events-none flex justify-center">
      <div
        className={`bg-slate-500/10 w-fit h-fit px-4 py-2 rounded-md mt-20 ${!selectedSong ? "opacity-0" : "opacity-100"}`}
      >
        <h2 className="font-bold text-white">{`"${selectedSong?.title}"`}</h2>
        <h2 className="text-faded text-sm">{selectedSong?.artist_names}</h2>
        <div className="divider m-0"></div>
        <h2 className="text-xs">
          {analysisResult === "pass" ? (
            <span className="text-green-500">CLEAN</span>
          ) : (
            <span className="text-red-500">FLAGGED</span>
          )}
        </h2>
      </div>
    </div>
  );
}
