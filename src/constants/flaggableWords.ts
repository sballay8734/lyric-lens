import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../data/sensitiveWordMap";

export interface FlaggableWordsObject {
  [word: string]: {
    id: string;
    vulgarityLvl: VulgarityLevel; // 0-10
    category: SensitiveWordCategory[]; // "racial", "sexual", "religious", "general";
    family: string;
    isRootWord: boolean;
  };
}

export const FLAGGABLE_WORDS_MASTER: FlaggableWordsObject = {
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
  niggaz: {
    id: "SW004a",
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
  motherfucking: {
    id: "SW020ab",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },
  motherfuckin: {
    id: "SW020ac",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },
  motherfucka: {
    id: "SW020ad",
    vulgarityLvl: 8,
    category: ["sexual", "general"],
    family: "fuck",
    isRootWord: false,
  },
  motherfuckas: {
    id: "SW020ae",
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
    vulgarityLvl: 4,
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
    vulgarityLvl: 4,
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
  goddamn: {
    id: "SW051a",
    vulgarityLvl: 4,
    category: ["general"],
    family: "damn",
    isRootWord: false,
  },
  goddamned: {
    id: "SW051b",
    vulgarityLvl: 4,
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
    vulgarityLvl: 4,
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
    vulgarityLvl: 4,
    category: ["general"],
    family: "piss",
    isRootWord: false,
  },
  pisses: {
    id: "SW063",
    vulgarityLvl: 4,
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
    id: "SW064a",
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

  // "lust" & variations (Baseline 1) *********************************
  lust: {
    id: "SW068",
    vulgarityLvl: 1,
    category: ["sexual"],
    family: "lust",
    isRootWord: true,
  },
  lusting: {
    id: "SW068a",
    vulgarityLvl: 1,
    category: ["sexual"],
    family: "lust",
    isRootWord: false,
  },
  lusted: {
    id: "SW068b",
    vulgarityLvl: 1,
    category: ["sexual"],
    family: "lust",
    isRootWord: false,
  },

  // "bum" & variations (Baseline 2) *********************************
  bum: {
    id: "SW069",
    vulgarityLvl: 2,
    category: ["general"],
    family: "bum",
    isRootWord: true,
  },
  bums: {
    id: "SW069a",
    vulgarityLvl: 2,
    category: ["general"],
    family: "bum",
    isRootWord: false,
  },

  // "cock" & variations (Baseline 7) *********************************
  cock: {
    id: "SW080",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cock",
    isRootWord: true,
  },
  cocks: {
    id: "SW080a",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cock",
    isRootWord: false,
  },

  // "shite" & variations (Baseline 5) *********************************
  shite: {
    id: "SW070",
    vulgarityLvl: 5,
    category: ["general"],
    family: "shite",
    isRootWord: true,
  },

  // "butt" & variations (Baseline 2) *********************************
  butt: {
    id: "SW071",
    vulgarityLvl: 2,
    category: ["sexual"],
    family: "butt",
    isRootWord: true,
  },
  butts: {
    id: "SW071a",
    vulgarityLvl: 2,
    category: ["sexual"],
    family: "butt",
    isRootWord: false,
  },
  butthead: {
    id: "SW071b",
    vulgarityLvl: 2,
    category: ["sexual"],
    family: "butt",
    isRootWord: false,
  },

  // "booty" & variations (Baseline 3) *********************************
  booty: {
    id: "SW072",
    vulgarityLvl: 4,
    category: ["sexual"],
    family: "booty",
    isRootWord: true,
  },
  booties: {
    id: "SW072a",
    vulgarityLvl: 4,
    category: ["sexual"],
    family: "booty",
    isRootWord: false,
  },

  // "cum" & variations (Baseline 7) *********************************
  cum: {
    id: "SW073",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cum",
    isRootWord: true,
  },
  cums: {
    id: "SW073a",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cum",
    isRootWord: false,
  },
  cumming: {
    id: "SW073b",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cum",
    isRootWord: false,
  },
  cumshot: {
    id: "SW073c",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cum",
    isRootWord: false,
  },
  cumshots: {
    id: "SW073d",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cum",
    isRootWord: false,
  },

  // "skeet" & variations (Baseline 7) *********************************
  skeet: {
    id: "SW075",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "skeet",
    isRootWord: true,
  },
  "skeet-skeet": {
    id: "SW075a",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "skeet",
    isRootWord: false,
  },
  skeeting: {
    id: "SW075b",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "skeet",
    isRootWord: false,
  },

  // "cunt" & variations (Baseline 7) *********************************
  cunt: {
    id: "SW074",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cunt",
    isRootWord: true,
  },
  cunts: {
    id: "SW074a",
    vulgarityLvl: 7,
    category: ["sexual"],
    family: "cunt",
    isRootWord: false,
  },

  // "god" & variations (Baseline 1) *********************************
  god: {
    id: "SW081",
    vulgarityLvl: 1,
    category: ["general"],
    family: "god",
    isRootWord: true,
  },
  jesus: {
    id: "SW076",
    vulgarityLvl: 1,
    category: ["general"],
    family: "god",
    isRootWord: false,
  },
  christ: {
    id: "SW077",
    vulgarityLvl: 1,
    category: ["general"],
    family: "god",
    isRootWord: false,
  },
};
