import { FLAGGABLE_WORDS_MASTER } from "../../../constants/flaggableWords";
import { HashMap } from "../../SongAnalysisGraph/types/graphTypes";
import { FlaggedFamiliesObject } from "../redux/flagManagementSlice";

export function updateFlaggedFamilies(
  stateFlaggedFamilies: FlaggedFamiliesObject,
  hashMap: HashMap,
) {
  return Object.keys(stateFlaggedFamilies).reduce(
    (acc, fam) => {
      // get all words in current family
      const allFamilyWords = Object.entries(FLAGGABLE_WORDS_MASTER).filter(
        ([_, wordData]) => wordData.family === fam,
      );

      // check hash map for each word
      const totalFamilyOccurrences = allFamilyWords.reduce((sum, [word, _]) => {
        return sum + (hashMap[word] || 0);
      }, 0);

      // Update flaggedFamilies
      acc.flaggedFamilies[fam] = {
        ...stateFlaggedFamilies[fam],
        occurances: totalFamilyOccurrences,
      };

      // Update total flagged words
      acc.totalFlaggedWords += totalFamilyOccurrences;

      return acc;
    },
    {
      flaggedFamilies: { ...stateFlaggedFamilies },
      totalFlaggedWords: 0,
    },
  );
}
