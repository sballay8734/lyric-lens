import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
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
                  className="text-left text-xs font-bold text-white"
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
                <div className="text-left text-xs" key={lineIndex}>
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
                          className="rounded-sm bg-primary-content text-secondary"
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
      <div className="lyrics-sheet-modal modal-box flex h-full flex-col gap-2 bg-base-100 p-2">
        {/* Song Title and Artists */}
        <div className="flex flex-col items-center justify-center rounded-sm bg-base-300 px-2 py-4">
          <h2 className="font-bold text-white">{`"${selectedSong?.title}"`}</h2>
          <h2 className="text-faded w-fit rounded-sm text-sm">
            {selectedSong?.artist_names}
          </h2>
        </div>
        {/* Lyrics */}
        <div className="flex h-full flex-col gap-4 overflow-hidden rounded-sm bg-base-200 py-2 leading-4">
          <div className="flex h-full flex-col gap-4 overflow-auto rounded-sm px-2 leading-4">
            {formattedLyrics}
          </div>
        </div>
        <div className="mt-auto flex min-h-14 w-full gap-2 text-error">
          <button
            onClick={() => console.log("Not configured")}
            className="btn h-full flex-[10_10_0%] rounded-sm text-error"
          >
            DOES NOTHING
          </button>
          <button
            onClick={() => dispatch(hideLyricsModal())}
            className={`btn btn-error m-0 flex h-full flex-[1_1_0%] items-center justify-center rounded-sm transition-colors duration-100`}
          >
            <IoMdClose size={20} />
          </button>
        </div>
      </div>
    </dialog>
  );
}

// !TODO: What you ACTUALLY need to do is somehow store the original line before you format it, then highlight the original word like "fuckin'". You strip the apostrophes during comparision and are currently displaying the stripped version.

// TODO: DOUBLE CHECK THAT HIGHLIGHTED WORDS ARE CORRECT

// TODO: Tooltips over flagged words to show details of some sort
