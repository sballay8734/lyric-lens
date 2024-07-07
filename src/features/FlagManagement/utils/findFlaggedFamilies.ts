import {
  DefaultFlagPreset,
  UserFlagPreset,
} from "../../../constants/defaultProfiles";
import { FLAGGABLE_WORDS_MASTER } from "../../../constants/flaggableWords";

type Preset = UserFlagPreset | DefaultFlagPreset;

export default function findFlaggedFamilies(preset: Preset) {
  return Object.entries(preset.flaggedWords).reduce(
    (acc, [word, wordData]) => {
      // if the family already exists, just return the prev val
      if (acc[wordData.family]) return acc;

      acc[word] = {
        id: FLAGGABLE_WORDS_MASTER[word].id,
        word: word,
        occurances: 0,
        vulgarityLvl: FLAGGABLE_WORDS_MASTER[word].vulgarityLvl,
        category: FLAGGABLE_WORDS_MASTER[word].category,
        family: FLAGGABLE_WORDS_MASTER[word].family,
        isRootWord: FLAGGABLE_WORDS_MASTER[word].isRootWord,
      };
      return acc;
    },
    {} as Record<
      string,
      (typeof FLAGGABLE_WORDS_MASTER)[string] & {
        word: string;
        occurances: number;
      }
    >,
  );
}
