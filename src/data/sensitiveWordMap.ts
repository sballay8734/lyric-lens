import { racialWords } from "./SensitiveWordFiles/racialWords";

// !TODO: LEFT OFF @ "Lust" - https://medium.com/musixmatch-blog/profanity-in-lyrics-most-used-swear-words-and-their-usage-by-popular-genres-d8a12c776713

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

export interface WordMap {
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
  ...racialWords,

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
  fucks: {
    id: "SW017a",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },
  fucked: {
    id: "SW017aa",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
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
  motherfucker: {
    id: "SW020a",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },
  motherfuckers: {
    id: "SW020aa",
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
  shits: {
    id: "SW021a",
    vulgarityLvl: 7,
    category: ["general"],
    family: "shit",
    isRootWord: false,
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
  shitting: {
    id: "SW023a",
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
  asses: {
    id: "SW033a",
    vulgarityLvl: 4,
    category: ["general", "sexual"],
    family: "ass",
    isRootWord: false,
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

  // "bitch" & variations (Baseline 6) *********************************
  bitch: {
    id: "SW041",
    vulgarityLvl: 7,
    category: ["general", "sexual"],
    family: "bitch",
    isRootWord: true,
  },
  bitches: {
    id: "SW042",
    vulgarityLvl: 7,
    category: ["general", "sexual"],
    family: "bitch",
    isRootWord: false,
  },
  bitchin: {
    id: "SW043",
    vulgarityLvl: 6,
    category: ["general"],
    family: "bitch",
    isRootWord: false,
  },
  bitching: {
    id: "SW043a",
    vulgarityLvl: 6,
    category: ["general"],
    family: "bitch",
    isRootWord: false,
  },

  // "whore" & variations (Baseline 8) *********************************
  whore: {
    id: "SW044",
    vulgarityLvl: 8,
    category: ["sexual"],
    family: "whore",
    isRootWord: true,
  },
  whores: {
    id: "SW045",
    vulgarityLvl: 8,
    category: ["sexual"],
    family: "whore",
    isRootWord: false,
  },

  // "dick" & variations (Baseline 6) *********************************
  dick: {
    id: "SW046",
    vulgarityLvl: 6,
    category: ["sexual"],
    family: "dick",
    isRootWord: true,
  },
  dicks: {
    id: "SW047",
    vulgarityLvl: 6,
    category: ["sexual"],
    family: "dick",
    isRootWord: false,
  },
  dickhead: {
    id: "SW047a",
    vulgarityLvl: 6,
    category: ["sexual"],
    family: "dick",
    isRootWord: false,
  },
  dickless: {
    id: "SW047aa",
    vulgarityLvl: 6,
    category: ["sexual"],
    family: "dick",
    isRootWord: false,
  },
  dickhole: {
    id: "SW047aaa",
    vulgarityLvl: 6,
    category: ["sexual"],
    family: "dick",
    isRootWord: false,
  },

  // "pussy" & variations (Baseline 7) *********************************
  pussy: {
    id: "SW048",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "pussy",
    isRootWord: true,
  },
  pussys: {
    id: "SW048a",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "pussy",
    isRootWord: false,
  },
  puss: {
    id: "SW048aa",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "pussy",
    isRootWord: false,
  },
  pussies: {
    id: "SW049",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "pussy",
    isRootWord: false,
  },

  // "damn" & variations (Baseline 3) *********************************
  damn: {
    id: "SW050",
    vulgarityLvl: 3,
    category: ["general"],
    family: "damn",
    isRootWord: true,
  },
  damned: {
    id: "SW051",
    vulgarityLvl: 3,
    category: ["general"],
    family: "damn",
    isRootWord: false,
  },

  // "hell" & variations (Baseline 2) *********************************
  hell: {
    id: "SW052",
    vulgarityLvl: 2,
    category: ["general"],
    family: "hell",
    isRootWord: true,
  },
  hellish: {
    id: "SW053",
    vulgarityLvl: 2,
    category: ["general"],
    family: "hell",
    isRootWord: false,
  },

  // "bastard" & variations (Baseline 5) *********************************
  bastard: {
    id: "SW054",
    vulgarityLvl: 5,
    category: ["general"],
    family: "bastard",
    isRootWord: true,
  },
  bastards: {
    id: "SW055",
    vulgarityLvl: 5,
    category: ["general"],
    family: "bastard",
    isRootWord: false,
  },

  // "crap" & variations (Baseline 1) *********************************
  crap: {
    id: "SW056",
    vulgarityLvl: 1,
    category: ["general"],
    family: "crap",
    isRootWord: true,
  },
  crappy: {
    id: "SW057",
    vulgarityLvl: 1,
    category: ["general"],
    family: "crap",
    isRootWord: false,
  },

  // "slut" & variations (Baseline 8) *********************************
  slut: {
    id: "SW058",
    vulgarityLvl: 8,
    category: ["sexual"],
    family: "slut",
    isRootWord: true,
  },
  sluts: {
    id: "SW059",
    vulgarityLvl: 8,
    category: ["sexual"],
    family: "slut",
    isRootWord: false,
  },

  // "piss" & variations (Baseline 3) *********************************
  piss: {
    id: "SW060",
    vulgarityLvl: 3,
    category: ["general"],
    family: "piss",
    isRootWord: true,
  },
  pissed: {
    id: "SW061",
    vulgarityLvl: 3,
    category: ["general"],
    family: "piss",
    isRootWord: false,
  },
  pissing: {
    id: "SW062",
    vulgarityLvl: 3,
    category: ["general"],
    family: "piss",
    isRootWord: false,
  },
  pisses: {
    id: "SW063",
    vulgarityLvl: 3,
    category: ["general"],
    family: "piss",
    isRootWord: false,
  },

  // "anal" & variations (Baseline 8) *********************************
  anal: {
    id: "SW064",
    vulgarityLvl: 8,
    category: ["sexual"],
    family: "anal",
    isRootWord: true,
  },
  anus: {
    id: "SW064",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "anal",
    isRootWord: false,
  },

  // "naked" & variations (Baseline 4) *********************************
  naked: {
    id: "SW065",
    vulgarityLvl: 4,
    category: ["sexual"],
    family: "naked",
    isRootWord: true,
  },

  // "beaner" & variations (Baseline 9) *********************************
  beaner: {
    id: "SW066",
    vulgarityLvl: 9,
    category: ["racial"],
    family: "beaner",
    isRootWord: true,
  },
  beaners: {
    id: "SW067",
    vulgarityLvl: 9,
    category: ["racial"],
    family: "beaner",
    isRootWord: false,
  },
};

// !TODO: You haven't added new words to the families
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
  bitch: ["bitch", "bitches", "bitchin"],
  whore: ["whore", "whores"],
  dick: ["dick", "dicks"],
  pussy: ["pussy", "pussies"],
  damn: ["damn", "damned"],
  hell: ["hell", "hellish"],
  bastard: ["bastard", "bastards"],
  crap: ["crap", "crappy"],
  slut: ["slut", "sluts"],
  piss: ["piss", "pissed"],
};
