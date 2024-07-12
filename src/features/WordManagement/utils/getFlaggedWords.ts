import { FlaggableWordsObject } from "../../../constants/flaggableWords";
import { FlaggedWords } from "../types/wordManagementTypes";

export function getFlaggedWords(wordsObj: FlaggableWordsObject): FlaggedWords {
  return Object.entries(wordsObj).reduce((acc, [word, wordData]) => {
    acc[word] = {
      ...wordData,
      isFlagged: true,
      occurances: 0,
    };

    return acc;
  }, {} as FlaggedWords);
}

// !TODO: You'll eventually want to find the root word first but for now it works fine because the root word is always first in FlaggableWordsObj
