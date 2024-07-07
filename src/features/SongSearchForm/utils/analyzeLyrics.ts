import { Dispatch } from "@reduxjs/toolkit";

import {
  DefaultFlagPreset,
  UserFlagPreset,
} from "../../../constants/defaultProfiles";
import {
  setFlaggedFamilies,
  setLyricsHashMap,
} from "../../FlagManagement/redux/flagManagementSlice";
import findFlaggedFamilies from "../../FlagManagement/utils/findFlaggedFamilies";
import { updateFlaggedFamilies } from "../../FlagManagement/utils/updateFlaggedFamilies";
import { HashMap } from "../../SongAnalysisGraph/types/graphTypes";
import { setAnalysisResult } from "../redux/songSearchFormSlice";

export function analyzeLyrics(
  lyrics: string,
  dispatch: Dispatch,
  currentPreset: DefaultFlagPreset | UserFlagPreset | null,
) {
  const formattedLyrics = lyrics
    .replace(/\[.*?\]/g, "") // removes [Verse 2: ... ] [Chorus: ... ]
    .replace(/-/g, " ") // replace hyphens with spaces for words like "A-goddamn", "cock-block", etc...
    .replace(/\n/g, " ") // replace newlines
    .replace(/[?!.,'")()]/g, "") // replace punctuation (? ! . , ')
    .replace(/ {2,}/g, " ") // replace 2 or more consecutive spaces
    .trim();

  // console.log("FINAL:", formattedLyrics);

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
  dispatch(setLyricsHashMap(hashMap));

  const flaggedFamilies = currentPreset && findFlaggedFamilies(currentPreset);

  if (!flaggedFamilies) {
    console.error("Something went wrong");
    return;
  }

  // check users flagged words against lyrics hashMap
  const updatedFlags = updateFlaggedFamilies(flaggedFamilies, hashMap);

  dispatch(setFlaggedFamilies(updatedFlags.flaggedFamilies));

  // set result of song analysis
  if (updatedFlags.totalFlaggedWords === 0) {
    dispatch(
      setAnalysisResult({
        result: "pass",
        totalFlaggedWords: 0,
      }),
    );
  } else {
    dispatch(
      setAnalysisResult({
        result: "fail",
        totalFlaggedWords: updatedFlags.totalFlaggedWords,
      }),
    );
  }
}
