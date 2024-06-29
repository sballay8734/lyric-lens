import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../hooks/hooks";
import { hideLyricsSheet } from "../../store/features/bottomSheet/bottomSheetSlice";
import { RootState } from "../../store/store";

const MATCH_HEADER_LINES = /\[.*?\]/;

export default function LyricsSheet(): React.JSX.Element {
  const dispatch = useDispatch();
  const lyricsSheetIsVis = useAppSelector(
    (state: RootState) => state.btmSheet.lyricsSheetIsVis,
  );
  const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);

  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearch.selectedSong,
  );

  const [formattedLyrics, setFormattedLyrics] = useState<
    React.JSX.Element[] | null
  >(null);

  // TODO: Needs to be fixed PRIOR to this
  // TODO: Highlight flagged words in lyrics
  function formatLyrics() {
    // console.log(lyrics);
    const songSections = lyrics?.split("\n\n");

    return songSections?.map((section, sectionIndex) => {
      const songLines = section.split("\n");

      return (
        <span key={sectionIndex}>
          {songLines.map((line, lineIndex) => {
            const lineIsHeaderLine = MATCH_HEADER_LINES.test(line);

            // if line is header, style appropriately
            if (lineIsHeaderLine) {
              return (
                <span
                  className="text-xs font-bold text-secondary"
                  key={lineIndex}
                >
                  {line}
                  <br />
                </span>
              );
            } else {
              return (
                <span className="text-xs" key={lineIndex}>
                  {line}
                  <br />
                </span>
              );
            }
          })}
        </span>
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
        {/* Song Title and Artists */}
        <div className="flex flex-col items-center justify-center mb-4 bg-base-300 py-4 rounded-sm">
          <h2 className="font-bold text-white">{`"${selectedSong?.title}"`}</h2>
          <h2 className="text-faded text-sm rounded-sm w-fit">
            {selectedSong?.artist_names}
          </h2>
        </div>
        {/* Lyrics */}
        <p className="flex text-center flex-col gap-4 leading-4">
          {formattedLyrics}
        </p>
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
