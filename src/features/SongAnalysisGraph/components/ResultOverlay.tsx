import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";

export default function ResultOverlay(): React.JSX.Element {
  const analysisResult = useAppSelector(
    (state: RootState) => state.wordFamilyManagement.analysisResult,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 h-full w-full transition-colors duration-200 ${!selectedSong ? "" : analysisResult?.result === "pass" ? "animate-pulse-shadow-green" : "animate-pulse-shadow-red"}`}
    ></div>
  );
}
