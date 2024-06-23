export type SensitiveWordCategory =
  | "racial"
  | "sexual"
  | "religious"
  | "general";
export type VulgarityLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface SensitiveWordsMap {
  [word: string]: {
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
  };
}

// TODO: Start with the worst ones and work your way down
export const sensitiveWordsMap: SensitiveWordsMap = {
  // "nigger" & variations (Baseline 10) *****************************
  nigger: { vulgarityLvl: 10, category: ["racial"] },
  niggers: { vulgarityLvl: 10, category: ["racial"] },
  nigga: { vulgarityLvl: 9, category: ["racial"] },
  niggas: { vulgarityLvl: 9, category: ["racial"] },

  // "coon" & variations (Baseline 10) *****************************
  coon: { vulgarityLvl: 10, category: ["racial"] },
  coons: { vulgarityLvl: 10, category: ["racial"] },

  // "jigaboo" & variations (Baseline 10) *****************************
  jigaboo: { vulgarityLvl: 10, category: ["racial"] },
  jiggaboo: { vulgarityLvl: 10, category: ["racial"] },
  jiggerboo: { vulgarityLvl: 10, category: ["racial"] },
  jigaboos: { vulgarityLvl: 10, category: ["racial"] },
  jiggaboos: { vulgarityLvl: 10, category: ["racial"] },
  jiggerboos: { vulgarityLvl: 10, category: ["racial"] },

  // "rape" & variations (Baseline 9) *****************************
  rape: { vulgarityLvl: 9, category: ["sexual"] },
  raping: { vulgarityLvl: 9, category: ["sexual"] },
  rapist: { vulgarityLvl: 9, category: ["sexual"] },
  rapists: { vulgarityLvl: 9, category: ["sexual"] },

  // "fuck" & variations (Baseline 8) ********************************
  fuck: { vulgarityLvl: 8, category: ["sexual", "general"] },
  fuckin: { vulgarityLvl: 8, category: ["sexual", "general"] },
  fucking: { vulgarityLvl: 8, category: ["sexual", "general"] },
  fuckhole: { vulgarityLvl: 8, category: ["sexual", "general"] },

  // "shit" & variations (Baseline 8) ********************************
  shit: { vulgarityLvl: 7, category: ["general"] },
  shitin: { vulgarityLvl: 7, category: ["general"] },
  shiting: { vulgarityLvl: 7, category: ["general"] },
  shithole: { vulgarityLvl: 7, category: ["general"] },
  apeshit: { vulgarityLvl: 7, category: ["general"] },
  dogshit: { vulgarityLvl: 7, category: ["general"] },
  horseshit: { vulgarityLvl: 7, category: ["general"] },

  // "sex" & variations (Baseline 5) ********************************
  sex: { vulgarityLvl: 5, category: ["sexual"] },
  sexy: { vulgarityLvl: 2, category: ["sexual"] },
  sexual: { vulgarityLvl: 3, category: ["sexual"] },
  sexually: { vulgarityLvl: 4, category: ["sexual"] },
  sexuality: { vulgarityLvl: 2, category: ["sexual"] },

  // "ass" & variations (Baseline 5) *********************************
  ass: { vulgarityLvl: 4, category: ["general", "sexual"] },
  assmunch: { vulgarityLvl: 4, category: ["general"] },
  arsehole: { vulgarityLvl: 4, category: ["general"] },
  asshole: { vulgarityLvl: 5, category: ["general"] },

  // "suck" & variations (Baseline 3) *********************************
  suck: { vulgarityLvl: 3, category: ["sexual"] },
  sucker: { vulgarityLvl: 2, category: ["general"] },
  sucking: { vulgarityLvl: 3, category: ["sexual"] },
};

export const testFlaggedWordsList = [
  "GOd",
  "sex",
  "fuCk",
  "kiLl",
  "nigga",
  "niggas",
  "bitch",
  "bitches",
  "ass",
  "motherfuck",
  "motherfucker",
  "pussy",
  "shit",
  "shitll",
  "jesus",
  "christ",
  "hell",
];
