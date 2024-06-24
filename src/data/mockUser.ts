import { User } from "../components/FlagSelect/FlagSelect";

export const mockUser: User = {
  id: "U00001",
  presets: [
    {
      id: "PRE001",
      presetName: "Teenager Filter",
      flaggedWords: {
        SW001: "nigger",
        SW003: "nigga",
        SW005: "coon",
        SW013: "rape",
        SW017: "fuck",
        SW021: "shit",
        SW036: "asshole",
      },
    },
    {
      id: "PRE002",
      presetName: "5-Year-Old Filter",
      flaggedWords: {
        SW001: "nigger",
        SW003: "nigga",
        SW005: "coon",
        SW013: "rape",
        SW017: "fuck",
        SW018: "fuckin",
        SW019: "fucking",
        SW021: "shit",
        SW028: "sex",
        SW033: "ass",
        SW036: "asshole",
        SW037: "suck",
      },
    },
  ],
};
