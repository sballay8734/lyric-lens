import { FlaggedFamiliesObject } from "../../FlagManagement/redux/flagManagementSlice";
import { GraphNode } from "../data/mockGraphData";
import * as d3 from "d3";

export function formatNodes(flaggedFamilies: FlaggedFamiliesObject) {
  return Object.keys(flaggedFamilies).map((w) => {
    const { id, family, occurances, vulgarityLvl, category } =
      flaggedFamilies[w];
    return {
      id,
      family,
      occurances,
      vulgarityLvl,
      category,
      radius: 20 + occurances * 1.2,
    };
  });
}

export function boundaryForce(x1: number, y1: number, x2: number, y2: number) {
  let nodes: GraphNode[];

  function force() {
    for (const node of nodes) {
      node.x = Math.max(x1 + node.radius, Math.min(x2 - node.radius, node.x!));
      node.y = Math.max(y1 + node.radius, Math.min(y2 - node.radius, node.y!));
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
) {
  return d3
    .forceSimulation<GraphNode>(nodes)
    .force("center", d3.forceCenter(centerX, centerY))
    .force("charge", d3.forceManyBody().strength(-100))
    .force(
      "collide",
      d3.forceCollide().radius((d) => (d as GraphNode).radius),
    )
    .force(
      "x",
      d3
        .forceX(centerX)
        .strength((d) => ((d as GraphNode).occurances > 0 ? 0.2 : 0.001)),
    ) // Add force to keep nodes within the viewport
    .force(
      "y",
      d3
        .forceY(centerY)
        .strength((d) => ((d as GraphNode).occurances > 0 ? 0.2 : 0.001)),
    ) // Add force to keep nodes within the viewport
    .force("link", d3.forceLink().links(links).distance(100).strength(0.1))
    .force("boundary", boundaryForce(0, 0, width, height));
}
