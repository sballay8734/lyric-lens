import { SimulationNodeDatum } from "d3";

import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../../data/sensitiveWordMap";

export type GraphNode = SimulationNodeDatum & {
  id: string;
  word: string;
  vulgarityLvl: VulgarityLevel;
  category: SensitiveWordCategory[];
  family: string;
  isRootWord: boolean;

  isFlagged: boolean;
  occurances: number; // if occurances === 0 don't connect to center
  radius: number;

  // x: number;
  // y: number;
};

export type RootNode = SimulationNodeDatum & {
  id: string;
  word: null;
  vulgarityLvl: null;
  category: null;
  family: null;
  isRootWord: null;

  isFlagged: null;
  occurances: null;
  radius: number;

  // you can use fx fixedX and fy fixedY from the Datum
};

export type GraphDataType = {
  nodes: GraphNode[];
  centerNode: RootNode;
};

// const width = window.innerWidth;
// const height = window.innerHeight;
// const centerX = width / 2;
// const centerY = height / 2;

// export const mockNodes: GraphNode[] = Object.keys(sensitiveWordsMap).map(
//   (flaggedWord) => {
//     const mockWordCount = Math.floor(Math.random() * 21);

//     return {
//       id: flaggedWord,
//       family: flaggedWord,
//       occurances: mockWordCount,
//       vulgarityLvl: sensitiveWordsMap[flaggedWord].vulgarityLvl,
//       category: sensitiveWordsMap[flaggedWord].category,
//       radius: mockWordCount / 1.4,
//     };
//   },
// );

// export const mockGraphData: { nodes: GraphNode[]; centerNode: RootNode } = {
//   nodes: mockNodes,
//   centerNode: {
//     id: "root",
//     family: null,
//     occurances: null, // might be able to make this equal to total curse words
//     vulgarityLvl: null,
//     category: null,
//     radius: 45, // should get bigger with more curse words

//     // vvv Or whereever the center is for fx and fy vvv
//     fx: centerX,
//     fy: centerY,
//   },
// };

// usersProfile OR default flagged words

// just use one object and set all word occurances to 0 when new lyrics
