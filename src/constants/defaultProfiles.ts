import { FLAGGABLE_WORDS_MASTER, FlaggableWordsObject } from "./flaggableWords";

// PRESET TYPES ***************************************************************
export interface DefaultFlagPreset {
  presetId: string;
  presetName: string;
  presetDescription: string;
  flaggedWords: FlaggableWordsObject;
}

export interface UserFlagPreset extends DefaultFlagPreset {
  userId: string;
}

// DEFAULT PRESETS ************************************************************
export const DEFAULT_FLAG_PROFILE_PRESETS: DefaultFlagPreset[] = [
  {
    presetId: "DEFAULT_001",
    presetName: "Zero Tolerance (Maximum Strictness)",
    presetDescription:
      "Words like 'God', 'crap', 'stupid', and 'dumb', are flagged in this list.",
    // flag ALL words
    flaggedWords: FLAGGABLE_WORDS_MASTER,
  },
  {
    presetId: "DEFAULT_002",
    presetName: "Elementary School Classroom (5-10)",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      // flag the word if vulgarity lvl is higher than 1
      if (vulgarityLvl > 1) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },
  {
    presetId: "DEFAULT_003",
    presetName: "Middle School Classroom (11-13)",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      // flag the word if vulgarity lvl is higher than 2
      if (vulgarityLvl > 2) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },
  {
    presetId: "DEFAULT_004",
    presetName: "High School Classroom (14-18)",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      // flag the word if vulgarity lvl is higher than 3
      if (vulgarityLvl > 3) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },

  // REMOVE: THE BELOW PROFILES ARE JUST FOR TESTING
  {
    presetId: "TEST_001",
    presetName: "Flag Words Only If Vulgarity Level > 5",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      if (vulgarityLvl > 5) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },
  {
    presetId: "TEST_002",
    presetName: "Flag Words Only If Vulgarity Level > 7",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      if (vulgarityLvl > 7) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },
  {
    presetId: "TEST_003",
    presetName: "Flag Words Only If Vulgarity Level > 8",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      if (vulgarityLvl >= 8) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },
  {
    presetId: "TEST_004",
    presetName: "Flag Words Only If Vulgarity Level > 9",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      if (vulgarityLvl >= 9) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },
  {
    presetId: "TEST_005",
    presetName: "Flag Words Only If Vulgarity Level = 10",
    presetDescription: "Words like ...",
    flaggedWords: Object.keys(FLAGGABLE_WORDS_MASTER).reduce((acc, word) => {
      const { vulgarityLvl } = FLAGGABLE_WORDS_MASTER[word];

      if (vulgarityLvl === 10) {
        return { ...acc, [word]: { ...FLAGGABLE_WORDS_MASTER[word] } };
      }
      return acc;
    }, {}),
  },
  {
    presetId: "TEST_006",
    presetName: "No Flags",
    presetDescription: "Words like ...",
    flaggedWords: {},
  },
];
