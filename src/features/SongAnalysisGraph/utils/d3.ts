import * as d3 from "d3";

import { FlaggedWords } from "../../_NewArcitecture/redux/wordFamilyManagementSlice";
import { GraphNode } from "../data/mockGraphData";

export function formatNodes(flaggedWords: FlaggedWords) {
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
      radius: 20 + occurances * 1.2,
    };
  });
}

export function boundaryForce(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  centerX: number,
  centerY: number,
  centerNodeRadius: number,
) {
  let nodes: GraphNode[];

  function force() {
    for (const node of nodes) {
      // First, apply the boundary constraints
      let newX = Math.max(
        x1 + node.radius,
        Math.min(x2 - node.radius, node.x!),
      );
      let newY = Math.max(
        y1 + node.radius,
        Math.min(y2 - node.radius, node.y!),
      );

      // Then, check for overlap with the root node
      const dx = newX - centerX;
      const dy = newY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = centerNodeRadius + node.radius;

      if (distance < minDistance) {
        // If overlapping, move the node away from the root
        const angle = Math.atan2(dy, dx);
        newX = centerX + Math.cos(angle) * minDistance;
        newY = centerY + Math.sin(angle) * minDistance;
      }

      // Update the node's position
      node.x = newX;
      node.y = newY;
    }
  }

  force.initialize = (_nodes: GraphNode[]) => {
    nodes = _nodes;
  };

  return force;
}

export function initializeSimulation(
  nodes: GraphNode[],
  centerX: number,
  centerY: number,
  links: any,
  width: number,
  height: number,
  centerNodeRadius: number,
) {
  return (
    d3
      .forceSimulation<GraphNode>(nodes)
      // .force("center", d3.forceCenter(centerX, centerY))
      .force("charge", d3.forceManyBody().strength(10))
      .force("collide", d3.forceCollide().radius(5))
      .force(
        "x",
        d3
          .forceX(centerX)
          .strength((d) => ((d as GraphNode).occurances > 0 ? 0.2 : 0.05)),
      ) // Add force to keep nodes within the viewport
      .force(
        "y",
        d3
          .forceY((d) =>
            (d as GraphNode).occurances > 0 ? centerY : centerY + 300,
          )
          .strength((d) => ((d as GraphNode).occurances > 0 ? 0.2 : 0.05)),
      ) // Add force to keep nodes within the viewport
      .force("link", d3.forceLink().links(links).distance(100).strength(0.1))
      .force(
        "boundary",
        boundaryForce(0, 0, width, height, centerX, centerY, centerNodeRadius),
      )
  );
}
