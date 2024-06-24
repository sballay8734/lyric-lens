export type SensitiveWordCategory =
  | "racial"
  | "sexual"
  | "religious"
  | "general";
export type VulgarityLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface SensitiveWordsMap {
  [word: string]: {
    id: string;
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
  };
}

// TODO: Start with the worst ones and work your way down
export const sensitiveWordsMap: SensitiveWordsMap = {
  // "nigger" & variations (Baseline 10) *****************************
  nigger: { id: "SW001", vulgarityLvl: 10, category: ["racial"] },
  niggers: { id: "SW002", vulgarityLvl: 10, category: ["racial"] },
  nigga: { id: "SW003", vulgarityLvl: 9, category: ["racial"] },
  niggas: { id: "SW004", vulgarityLvl: 9, category: ["racial"] },

  // "coon" & variations (Baseline 10) *****************************
  coon: { id: "SW005", vulgarityLvl: 10, category: ["racial"] },
  coons: { id: "SW006", vulgarityLvl: 10, category: ["racial"] },

  // "jigaboo" & variations (Baseline 10) *****************************
  jigaboo: { id: "SW007", vulgarityLvl: 10, category: ["racial"] },
  jiggaboo: { id: "SW008", vulgarityLvl: 10, category: ["racial"] },
  jiggerboo: { id: "SW009", vulgarityLvl: 10, category: ["racial"] },
  jigaboos: { id: "SW010", vulgarityLvl: 10, category: ["racial"] },
  jiggaboos: { id: "SW011", vulgarityLvl: 10, category: ["racial"] },
  jiggerboos: { id: "SW012", vulgarityLvl: 10, category: ["racial"] },

  // "rape" & variations (Baseline 9) *****************************
  rape: { id: "SW013", vulgarityLvl: 9, category: ["sexual"] },
  raping: { id: "SW014", vulgarityLvl: 9, category: ["sexual"] },
  rapist: { id: "SW015", vulgarityLvl: 9, category: ["sexual"] },
  rapists: { id: "SW016", vulgarityLvl: 9, category: ["sexual"] },

  // "fuck" & variations (Baseline 8) ********************************
  fuck: { id: "SW017", vulgarityLvl: 8, category: ["sexual", "general"] },
  fuckin: { id: "SW018", vulgarityLvl: 8, category: ["sexual", "general"] },
  fucking: { id: "SW019", vulgarityLvl: 8, category: ["sexual", "general"] },
  fuckhole: { id: "SW020", vulgarityLvl: 8, category: ["sexual", "general"] },

  // "shit" & variations (Baseline 8) ********************************
  shit: { id: "SW021", vulgarityLvl: 7, category: ["general"] },
  shitin: { id: "SW022", vulgarityLvl: 7, category: ["general"] },
  shiting: { id: "SW023", vulgarityLvl: 7, category: ["general"] },
  shithole: { id: "SW024", vulgarityLvl: 7, category: ["general"] },
  apeshit: { id: "SW025", vulgarityLvl: 7, category: ["general"] },
  dogshit: { id: "SW026", vulgarityLvl: 7, category: ["general"] },
  horseshit: { id: "SW027", vulgarityLvl: 7, category: ["general"] },

  // "sex" & variations (Baseline 5) ********************************
  sex: { id: "SW028", vulgarityLvl: 5, category: ["sexual"] },
  sexy: { id: "SW029", vulgarityLvl: 2, category: ["sexual"] },
  sexual: { id: "SW030", vulgarityLvl: 3, category: ["sexual"] },
  sexually: { id: "SW031", vulgarityLvl: 4, category: ["sexual"] },
  sexuality: { id: "SW032", vulgarityLvl: 2, category: ["sexual"] },

  // "ass" & variations (Baseline 5) *********************************
  ass: { id: "SW033", vulgarityLvl: 4, category: ["general", "sexual"] },
  assmunch: { id: "SW034", vulgarityLvl: 4, category: ["general"] },
  arsehole: { id: "SW035", vulgarityLvl: 4, category: ["general"] },
  asshole: { id: "SW036", vulgarityLvl: 5, category: ["general"] },

  // "suck" & variations (Baseline 3) *********************************
  suck: { id: "SW037", vulgarityLvl: 3, category: ["sexual"] },
  sucker: { id: "SW038", vulgarityLvl: 2, category: ["general"] },
  sucking: { id: "SW039", vulgarityLvl: 3, category: ["sexual"] },
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
