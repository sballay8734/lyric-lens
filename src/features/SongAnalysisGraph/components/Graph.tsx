import { useEffect, useRef } from "react";

import Nodes from "./Nodes";
import RootNode from "./RootNode";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { useWindowSize } from "../hooks/graphHooks";

export default function Graph(): React.JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const windowSize = useWindowSize();

  const analysisResult = useAppSelector(
    (state: RootState) => state.flagManagement.analysisResult,
  );

  console.log("RENDERING GRAPH");

  // TODO: This should UPDATE the node positions and NOT generate new nodes
  useEffect(() => {
    if (!svgRef.current) return;
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
      width="100%"
      height="100%"
    >
      <defs>
        <radialGradient id={`gradient-root`}>
          <stop
            offset="0%"
            stopColor={
              analysisResult?.result === "pass" ? "#82cb81" : "#ff8585"
            }
          />
          <stop
            offset="100%"
            stopColor={
              analysisResult?.result === "pass" ? "#34773f" : "#8f0000"
            }
          />
        </radialGradient>
      </defs>
      {/* Links */}
      {/* {nodes.map((node: GraphNode) => {
        const nodeRadius =
          node.occurances > 0 && node.isFlagged
            ? Math.max(Math.log(node.occurances + 2) * 12, MIN_NODE_RADIUS)
            : 3;

        // Ensure centerNode.fx and centerNode.fy are numbers
        const centerX = Number(centerNode.fx) || 0;
        const centerY = Number(centerNode.fy) || 0;

        // Calculate the angle between the center node and the current node
        const dx = (node.x || 0) - centerX;
        const dy = (node.y || 0) - centerY;

        // Calculate the distance between the centers
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Avoid division by zero
        if (distance === 0) return null;

        // Calculate the point on the edge of the current node's circle
        const edgeX = (node.x || 0) - (nodeRadius * dx) / distance;
        const edgeY = (node.y || 0) - (nodeRadius * dy) / distance;

        if (node.occurances > 0 && node.isFlagged) {
          return (
            <NodeLink
              key={`link-${node.id}`}
              node={node}
              x1={centerNode.fx?.toString()!}
              y1={centerNode.fy?.toString()!}
              x2={edgeX.toString()!}
              y2={edgeY.toString()!}
            />
          );
        } else return null;
      })} */}
      {/* Root node ******************************************************* */}
      <RootNode />

      {/* Nodes */}
      <Nodes />
    </svg>
  );
}

// !TODO: **********************************************************************
// HERES WHAT THE STATE FLOW SHOULD LOOK LIKE
// 1. default profile is set for flaggedFamilies if no User preset
// 2. On song select, analyze lyrics with current preset
// 3. On preset change, RE-analyze lyrics with the new preset and UPDATE family occurances do NOT set the entire object.
// 4.
