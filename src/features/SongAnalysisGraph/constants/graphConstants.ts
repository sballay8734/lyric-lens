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

// window dimensions
export const width = window.innerWidth;
export const height = window.innerHeight;
export const centerX = width / 2;
export const centerY = height / 4.5;

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
  fx: centerX,
  fy: centerY,
};

const rectWidth = 300;
const rectHeight = 200;

export const rectGroup = {
  id: "rect",
  x: centerX - rectWidth / 2,
  y: (height * 2) / 4.5,
  width: 300,
  height: 200,
  rx: 5,
  fill: "#141414",
  stroke: "#212121",
  strokeWidth: 2,
};
