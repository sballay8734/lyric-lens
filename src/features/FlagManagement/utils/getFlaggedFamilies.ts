import { FlaggableWordsObject } from "../../../constants/flaggableWords";
import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";
import { WordInFam } from "../../_NewArcitecture/redux/wordFamilyManagementSlice";

interface FlaggableFamilies {
  [family: string]: {
    id: string;
    vulgarityLvl: VulgarityLevel; // 0-10
    category: SensitiveWordCategory[];
    family: string;

    isInPreset: boolean;
    familyWords: WordInFam[];
    occurances: number;
  };
}

export default function getFlaggedFamilies(
  wordsObj: FlaggableWordsObject,
): FlaggableFamilies {
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
  }, {} as FlaggableFamilies);
}

// !TODO: You'll eventually want to find the root word first but for now it works fine because the root word is always first in FlaggableWordsObj
