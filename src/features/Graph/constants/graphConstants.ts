import { RootNode } from "../data/mockGraphData";

export const vulgarityToColorMap: {
  [key: number]: { startColor: string; endColor: string };
} = {
  0: { startColor: "#00b6aa", endColor: "#005953" },
  1: { startColor: "#00b6aa", endColor: "#005953" },
  2: { startColor: "#00b6aa", endColor: "#005953" },
  3: { startColor: "#00b6aa", endColor: "#005953" },
  4: { startColor: "#00b6aa", endColor: "#005953" },
  5: { startColor: "#00b6aa", endColor: "#005953" },
  6: { startColor: "#00b6aa", endColor: "#005953" },
  7: { startColor: "#1c019e", endColor: "#0e0053" },
  8: { startColor: "#61019e", endColor: "#2d004a" },
  9: { startColor: "#9e0189", endColor: "#5e0052" },
  10: { startColor: "#77344e", endColor: "#cb81a0" },
};

export const defaultGradient = { startColor: "#9e0142", endColor: "#3c0019" };

export const MAX_NODE_RADIUS = 50;
export const MIN_NODE_RADIUS = 25;

// Center node obj
export const centerNode: RootNode = {
  id: "root",
  word: null,
  vulgarityLvl: null,
  category: null,
  family: null,
  isRootWord: null,

  isFlagged: null,
  occurances: null,
  radius: 60, // TODO: should get bigger with more curse words
};
