import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { sensitiveWordsMap } from "../../../../data/sensitiveWordMap";
import { useAppSelector } from "../../../../hooks/hooks";
import { RootState } from "../../../../store/store";
import { hideLyricsModal } from "../../redux/modalManagementSlice";

const MATCH_HEADER_LINES = /\[.*?\]/;

export default function LyricsModal(): React.JSX.Element {
  const dispatch = useDispatch();
  const lyricsModalIsVis = useAppSelector(
    (state: RootState) => state.modalManagement.lyricsModalIsVis,
  );
  const lyrics = useAppSelector(
    (state: RootState) => state.songSearchForm.lyrics,
  );

  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  const flaggedFamilies = useAppSelector(
    (state: RootState) => state.flagManagement.flaggedFamilies,
  );

  const [formattedLyrics, setFormattedLyrics] = useState<
    React.JSX.Element[] | null
  >(null);

  function formatLyrics() {
    const songSections = lyrics?.split("\n\n");
    return songSections?.map((section, sectionIndex) => {
      const songLines = section.split("\n");

      return (
        <div key={sectionIndex}>
          {songLines.map((line, lineIndex) => {
            const lineIsHeaderLine = MATCH_HEADER_LINES.test(line);

            // if line is header, style appropriately
            if (lineIsHeaderLine) {
              return (
                <div
                  className="text-xs font-bold text-white text-left"
                  key={lineIndex}
                >
                  {line}
                  <br />
                </div>
              );
            } else {
              // TODO: This is where you have to copy the line
              // const originalLine = line;
              // highlight words that are flagged
              const words = line
                .replace(/-/g, " ") // replace hyphens with spaces for words like "A-goddamn", "cock-block", etc...
                .replace(/\n/g, " ") // replace newlines
                .replace(/[?!.,'")()]/g, "") // replace punctuation (? ! . , ')
                .replace(/ {2,}/g, " ") // replace 2 or more consecutive spaces
                .trim()
                .split(" ");

              return (
                <div className="text-xs text-left" key={lineIndex}>
                  {words.map((word, wordIndex) => {
                    const formattedWord = word.toLowerCase();

                    // if word is not in global word map
                    if (!sensitiveWordsMap.hasOwnProperty(formattedWord)) {
                      return <span key={wordIndex}>{word} </span>;
                    }

                    // if user has flagged the words family
                    if (
                      flaggedFamilies.hasOwnProperty(
                        sensitiveWordsMap[formattedWord].family,
                      )
                    ) {
                      return (
                        <span
                          key={wordIndex}
                          className="text-secondary bg-primary-content rounded-sm"
                        >
                          {word}{" "}
                        </span>
                      );
                    }

                    return <span key={wordIndex}>{word} </span>;
                  })}
                  <br />
                </div>
              );
            }
          })}
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
      open={lyricsModalIsVis}
      className={`modal modal-bottom h-full ${lyricsModalIsVis ? "visible" : "invisible"}`}
    >
      {/* MODAL CONTENT */}
      <div className="modal-box lyrics-sheet-modal h-full bg-base-100 flex flex-col gap-2 pt-3 px-4">
        {/* Sheet header */}
        <div className="w-full flex justify-end text-error">
          <button
            onClick={() => dispatch(hideLyricsModal())}
            className={`p-2 rounded-sm hover:text-error/70 active:text-error/50 transition-colors duration-100`}
          >
            Close
          </button>
        </div>
        {/* Song Title and Artists */}
        <div className="flex flex-col items-center justify-center mb-4 bg-base-300 py-4 rounded-sm px-2">
          <h2 className="font-bold text-white">{`"${selectedSong?.title}"`}</h2>
          <h2 className="text-faded text-sm rounded-sm w-fit">
            {selectedSong?.artist_names}
          </h2>
        </div>
        {/* Lyrics */}
        <div className="flex flex-col gap-4 leading-4 bg-base-200 py-4 rounded-sm h-full overflow-hidden">
          <div className="overflow-auto flex flex-col gap-4 leading-4 rounded-sm h-full px-4">
            {formattedLyrics}
          </div>
        </div>
      </div>
      {/* OVERLAY TO HANDLE CLOSE CLOSE ON OUTSIDE CLICK */}
      <form
        onClick={() => dispatch(hideLyricsModal())}
        method="dialog"
        className="modal-backdrop bg-black/50"
      >
        <button>close</button>
      </form>
    </dialog>
  );
}

// !TODO: What you ACTUALLY need to do is somehow store the original line before you format it, then highlight the original word like "fuckin'". You strip the apostrophes during comparision and are currently displaying the stripped version.

// TODO: DOUBLE CHECK THAT HIGHLIGHTED WORDS ARE CORRECT

// TODO: Tooltips over flagged words to show details of some sort
