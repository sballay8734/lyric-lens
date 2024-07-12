import { Dispatch } from "@reduxjs/toolkit";

import {
  setLyricsHash,
  updateWordOccurances,
} from "../../WordManagement/redux/wordManagementSlice";
import {
  FlaggedFamiliesObject,
  setLyricsHashMap,
} from "../../FlagManagement/redux/flagManagementSlice";
import { HashMap } from "../../Graph/types/graphTypes";

export function analyzeLyrics(
  lyrics: string,
  dispatch: Dispatch,
  flaggedFamilies: FlaggedFamiliesObject | null,
) {
  if (!flaggedFamilies) return null;

  const formattedLyrics = lyrics
    .replace(/\[.*?\]/g, "") // removes [Verse 2: ... ] [Chorus: ... ]
    .replace(/-/g, " ") // replace hyphens with spaces for words like "A-goddamn", "cock-block", etc...
    .replace(/\n/g, " ") // replace newlines
    .replace(/[?!.,'")()]/g, "") // replace punctuation (? ! . , ')
    .replace(/ {2,}/g, " ") // replace 2 or more consecutive spaces
    .trim();

  // split lyrics into array
  const wordArray: string[] = formattedLyrics.split(" ");

  // initialize hash map
  const hashMap: HashMap = {};

  // loop through lyrics
  wordArray.forEach((word) => {
    const formattedWord = word.toLocaleLowerCase();
    // increment count if word exists
    if (hashMap[formattedWord]) {
      hashMap[formattedWord] += 1;
      // add word to hashMap if it isn't in there already
    } else {
      hashMap[formattedWord] = 1;
    }
  });

  // store hashMap for highlighting words on lyrics sheet
  dispatch(setLyricsHash(hashMap));

  dispatch(updateWordOccurances());
}
