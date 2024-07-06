import { Dispatch } from "@reduxjs/toolkit";

import { sensitiveWordsMap } from "../../../data/sensitiveWordMap";
import {
  FlaggedFamiliesObject,
  setFamilyOccurances,
  setLyricsHashMap,
} from "../../FlagManagement/redux/flagManagementSlice";
import { HashMap } from "../../SongAnalysisGraph/types/graphTypes";
import { setAnalysisResult } from "../redux/songSearchFormSlice";

export function analyzeLyrics(
  lyrics: string,
  dispatch: Dispatch,
  flaggedFamilies: FlaggedFamiliesObject,
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

  let totalFlaggedWords = 0;

  // check users flagged words against lyrics hashMap
  Object.keys(flaggedFamilies).forEach((fam) => {
    let totalFamilyOccurances = 0;
    // get all words in current family
    const allFamilyWords = Object.entries(sensitiveWordsMap).filter(
      ([_, wordData]) => {
        return wordData.family === fam;
      },
    );

    // check hash map for each word
    allFamilyWords.forEach(([word, _]) => {
      // if word IS in song, add occurances to family
      if (hashMap[word]) {
        totalFamilyOccurances += hashMap[word];
      }
    });

    dispatch(
      setFamilyOccurances({
        family: fam,
        occurances: totalFamilyOccurances,
      }),
    );

    // updated total flaggedWords in song
    totalFlaggedWords += totalFamilyOccurances;
  });

  // set result of song analysis
  if (totalFlaggedWords === 0) {
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
        totalFlaggedWords: totalFlaggedWords,
      }),
    );
  }
}
