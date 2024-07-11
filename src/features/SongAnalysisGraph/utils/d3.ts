import * as d3 from "d3";

import { FlaggedWords } from "../../_NewArcitecture/redux/wordFamilyManagementSlice";
import { centerNode } from "../constants/graphConstants";
import { GraphNode } from "../data/mockGraphData";

export function formatNodes(
  flaggedWords: FlaggedWords,
  width: number,
  height: number,
  centerX: number,
  centerY: number,
) {
  return Object.entries(flaggedWords).map(([w, wData]) => {
    const {
      id,
      family,
      occurances,
      vulgarityLvl,
      category,
      isFlagged,
      isRootWord,
    } = flaggedWords[w];
    return {
      id,
      word: w,
      family,
      occurances,
      vulgarityLvl,
      category,
      isFlagged,
      isRootWord,
      x: centerX,
      y: wData.occurances > 0 && wData.isFlagged ? centerY : centerY * 2.3,
      radius: 20 + occurances * 1.2,
    };
  });
}

export type Link = {
  source: string;
  target: string;
};

export function generateLinks(nodes: GraphNode[]): Link[] {
  const links: Link[] = [];
  const rootNode = centerNode;
  if (!rootNode) return links;

  const connectedNodes = nodes.filter((node) => node.occurances > 0);
  const unconnectedNodes = nodes.filter((node) => node.occurances === 0);

  // Link connected nodes to the center
  for (const node of connectedNodes) {
    links.push({ source: rootNode.id, target: node.id });
  }

  // Link unconnected nodes to each other
  for (let i = 0; i < unconnectedNodes.length; i++) {
    for (let j = i + 1; j < unconnectedNodes.length; j++) {
      links.push({
        source: unconnectedNodes[i].id,
        target: unconnectedNodes[j].id,
      });
    }
  }

  // console.log(links);

  return links;
}

// NEW PLAN
// 1. Render a node for ALL words.
// 2. useSpring to handle the transition of ALL NODES
