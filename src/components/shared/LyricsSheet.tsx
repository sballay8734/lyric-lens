import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { hideLyricsSheet } from "../../store/features/bottomSheet/bottomSheetSlice";
import { useEffect, useState } from "react";

export default function LyricsSheet(): React.JSX.Element {
  const dispatch = useDispatch();
  const lyricsSheetIsVis = useAppSelector(
    (state: RootState) => state.btmSheet.lyricsSheetIsVis,
  );
  const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);

  const [formattedLyrics, setFormattedLyrics] = useState<
    React.JSX.Element[] | null
  >(null);

  // TODO: Needs to be fixed PRIOR to this
  // TODO: Highlight flagged words in lyrics
  function formatLyrics() {
    console.log(lyrics);
    const songSections = lyrics?.split("\n\n");

    return songSections?.map((section, sectionIndex) => {
      const songLines = section.split("\n");

      return (
        <div key={sectionIndex}>
          {songLines.map((line, lineIndex) => (
            <span className="text-xs" key={lineIndex}>
              {line}
              <br />
            </span>
          ))}
        </div>
      );
    });
  }

  useEffect(() => {
    const fLyrics = formatLyrics();
    if (fLyrics) {
      setFormattedLyrics(fLyrics);
    }
  }, [lyrics]);

  return (
    <dialog
      open={lyricsSheetIsVis}
      className={`modal modal-bottom ${lyricsSheetIsVis ? "visible" : "invisible"}`}
    >
      {/* MODAL CONTENT */}
      <div className="modal-box h-full bg-base-100 flex flex-col gap-2 pt-3">
        {/* Sheet header */}
        <div className="w-full flex justify-end text-error">
          <button
            onClick={() => dispatch(hideLyricsSheet())}
            className="p-2 rounded-sm hover:text-error/70 active:text-error/50 transition-colors duration-100"
          >
            Close
          </button>
        </div>
        {/* Lyrics */}
        <p className="flex text-center flex-col gap-8">{formattedLyrics}</p>
      </div>
      {/* OVERLAY TO HANDLE CLOSE CLOSE ON OUTSIDE CLICK */}
      <form
        onClick={() => dispatch(hideLyricsSheet())}
        method="dialog"
        className="modal-backdrop bg-black/50"
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
