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
    family: string;
    isRootWord: boolean; // is the word the main word of the family
  };
}

// TODO: Start with the worst ones and work your way down
export const sensitiveWordsMap: SensitiveWordsMap = {
  // "nigger" & variations (Baseline 10) *****************************
  nigger: {
    id: "SW001",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "nigger",
    isRootWord: true,
  },
  niggers: {
    id: "SW002",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "nigger",
    isRootWord: false,
  },
  nigga: {
    id: "SW003",
    vulgarityLvl: 9,
    category: ["racial"],
    family: "nigger",
    isRootWord: false,
  },
  niggas: {
    id: "SW004",
    vulgarityLvl: 9,
    category: ["racial"],
    family: "nigger",
    isRootWord: false,
  },

  // "coon" & variations (Baseline 10) *****************************
  coon: {
    id: "SW005",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "coon",
    isRootWord: true,
  },
  coons: {
    id: "SW006",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "coon",
    isRootWord: false,
  },

  // "jigaboo" & variations (Baseline 10) *****************************
  jigaboo: {
    id: "SW007",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "jigaboo",
    isRootWord: true,
  },
  jiggaboo: {
    id: "SW008",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "jigaboo",
    isRootWord: false,
  },
  jiggerboo: {
    id: "SW009",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "jigaboo",
    isRootWord: false,
  },
  jigaboos: {
    id: "SW010",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "jigaboo",
    isRootWord: false,
  },
  jiggaboos: {
    id: "SW011",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "jigaboo",
    isRootWord: false,
  },
  jiggerboos: {
    id: "SW012",
    vulgarityLvl: 10,
    category: ["racial"],
    family: "jigaboo",
    isRootWord: false,
  },

  // "rape" & variations (Baseline 9) *****************************
  rape: {
    id: "SW013",
    vulgarityLvl: 9,
    category: ["sexual"],
    family: "rape",
    isRootWord: true,
  },
  raping: {
    id: "SW014",
    vulgarityLvl: 9,
    category: ["sexual"],
    family: "rape",
    isRootWord: false,
  },
  rapist: {
    id: "SW015",
    vulgarityLvl: 9,
    category: ["sexual"],
    family: "rape",
    isRootWord: false,
  },
  rapists: {
    id: "SW016",
    vulgarityLvl: 9,
    category: ["sexual"],
    family: "rape",
    isRootWord: false,
  },

  // "fuck" & variations (Baseline 8) ********************************
  fuck: {
    id: "SW017",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: true,
  },
  fuckin: {
    id: "SW018",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },
  fucking: {
    id: "SW019",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },
  fuckhole: {
    id: "SW020",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },

  // "shit" & variations (Baseline 8) ********************************
  shit: {
    id: "SW021",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: true,
  },
  shitin: {
    id: "SW022",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: false,
  },
  shiting: {
    id: "SW023",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: false,
  },
  shithole: {
    id: "SW024",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: false,
  },
  apeshit: {
    id: "SW025",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: false,
  },
  dogshit: {
    id: "SW026",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: false,
  },
  horseshit: {
    id: "SW027",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: false,
  },

  // "sex" & variations (Baseline 5) ********************************
  sex: {
    id: "SW028",
    vulgarityLvl: 5,
    category: ["sexual"],
    family: "sex",
    isRootWord: true,
  },
  sexy: {
    id: "SW029",
    vulgarityLvl: 2,
    category: ["sexual"],
    family: "sex",
    isRootWord: false,
  },
  sexual: {
    id: "SW030",
    vulgarityLvl: 3,
    category: ["sexual"],
    family: "sex",
    isRootWord: false,
  },
  sexually: {
    id: "SW031",
    vulgarityLvl: 4,
    category: ["sexual"],
    family: "sex",
    isRootWord: false,
  },
  sexuality: {
    id: "SW032",
    vulgarityLvl: 2,
    category: ["sexual"],
    family: "sex",
    isRootWord: false,
  },

  // "ass" & variations (Baseline 5) *********************************
  ass: {
    id: "SW033",
    vulgarityLvl: 4,
    category: ["general", "sexual"],
    family: "ass",
    isRootWord: true,
  },
  assmunch: {
    id: "SW034",
    vulgarityLvl: 4,
    category: ["general"],
    family: "ass",
    isRootWord: false,
  },
  arsehole: {
    id: "SW035",
    vulgarityLvl: 4,
    category: ["general"],
    family: "ass",
    isRootWord: false,
  },
  asshole: {
    id: "SW036",
    vulgarityLvl: 5,
    category: ["general"],
    family: "ass",
    isRootWord: false,
  },

  // "suck" & variations (Baseline 3) *********************************
  suck: {
    id: "SW037",
    vulgarityLvl: 3,
    category: ["sexual"],
    family: "suck",
    isRootWord: true,
  },
  sucker: {
    id: "SW038",
    vulgarityLvl: 2,
    category: ["general"],
    family: "suck",
    isRootWord: false,
  },
  sucks: {
    id: "SW039",
    vulgarityLvl: 2,
    category: ["general"],
    family: "suck",
    isRootWord: false,
  },
  sucking: {
    id: "SW040",
    vulgarityLvl: 3,
    category: ["sexual"],
    family: "suck",
    isRootWord: false,
  },
};

export const wordFamilies: { [key: string]: string[] } = {
  nigger: ["nigger", "niggers", "nigga", "niggas"],
  coon: ["coon", "coons"],
  jigaboo: [
    "jigaboo",
    "jiggaboo",
    "jiggerboo",
    "jigaboos",
    "jiggaboos",
    "jiggerboos",
  ],
  rape: ["rape", "raping", "rapist", "rapists"],
  fuck: ["fuck", "fuckin", "fucking", "fuckhole"],
  shit: ["shit", "shitin", "shiting", "shithole"],
  apeshit: ["apeshit"],
  dogshit: ["dogshit"],
  horseshit: ["horseshit"],
  sex: ["sex", "sexy", "sexual", "sexually", "sexuality"],
  ass: ["ass", "assmunch", "arsehole", "asshole"],
  suck: ["suck", "sucker", "sucking"],
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
