import { FlaggableWordsObject } from "../../../constants/flaggableWords";
import { FlaggedWords, WordFamiliesObj } from "../types/wordManagementTypes";

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

export default function getFlaggedFamilies(
  wordsObj: FlaggableWordsObject,
): WordFamiliesObj {
  return Object.entries(wordsObj).reduce((acc, [word, wordData]) => {
    // if the family doesn't exist, initialize it
    if (!acc[wordData.family]) {
      acc[wordData.family] = {
        id: wordData.id,
        vulgarityLvl: wordData.vulgarityLvl,
        category: wordData.category,
        family: wordData.family,

        isInPreset: false,
        familyWords: [{ word: word, wordIsFlagged: true }],
        occurances: 0,
      };
    } else {
      // if it already exists, then just push the word to the array
      acc[wordData.family].familyWords.push({
        word: word,
        wordIsFlagged: true,
      });
    }
    return acc;
  }, {} as WordFamiliesObj);
}
// !TODO: You'll eventually want to find the root word first but for now it works fine because the root word is always first in FlaggableWordsObj
