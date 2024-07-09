import { useEffect, useRef, useState } from "react";

import NodeLink from "./NodeLink";
import WordNode from "./WordNode";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import {
  centerNode,
  centerX,
  centerY,
  height,
  MIN_NODE_RADIUS,
  rectGroup,
  width,
} from "../constants/graphConstants";
import { GraphNode } from "../data/mockGraphData";
import { useWindowSize } from "../hooks/graphHooks";
import { formatNodes, initializeSimulation } from "../utils/d3";

export default function Graph(): React.JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const windowSize = useWindowSize();
  const flaggedWords = useAppSelector(
    (state: RootState) => state.wordFamilyManagement.flaggedWords,
  );

  const analysisResult = useAppSelector(
    (state: RootState) => state.flagManagement.analysisResult,
  );

  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, _] = useState<any[]>([]);
  const simulationRef = useRef<d3.Simulation<GraphNode, undefined> | null>(
    null,
  );

  // TODO: This should UPDATE the node positions and NOT generate new nodes
  useEffect(() => {
    if (!flaggedWords || !svgRef.current) return () => {};

    // Format nodes from flaggedFamilies
    const formattedNodes: GraphNode[] = formatNodes(flaggedWords);

    // Add x and y coordinates to each node and include center node
    const nodesWithPositions = formattedNodes.map((node) => ({
      ...node,
      x:
        node.occurances > 0
          ? centerX + (Math.random() * 100 - 50)
          : Math.random() * windowSize.width,
      y:
        node.occurances > 0
          ? centerY + (Math.random() * 100 - 50)
          : Math.random() * windowSize.height,
    }));

    setNodes(nodesWithPositions);

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const simulation = initializeSimulation(
      nodesWithPositions,
      centerX,
      centerY,
      links,
      width,
      height,
      centerNode.radius,
    ).on("tick", () => {
      setNodes([...nodesWithPositions]);
    });

    simulationRef.current = simulation;

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [flaggedWords]);

  // console.log(nodes);

  // TODO: Add separate useEffect for when lyrics/song changes

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
      {nodes.map((node: GraphNode) => {
        const nodeRadius =
          node.occurances > 0
            ? Math.max(Math.log(node.occurances + 2) * 12, MIN_NODE_RADIUS)
            : 3;

        // Calculate the angle between the center node and the current node
        const dx = node.x! - centerNode.fx!;
        const dy = node.y! - centerNode.fy!;

        // Calculate the distance between the centers
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the point on the edge of the current node's circle
        const edgeX = node.x! - (nodeRadius * dx) / distance;
        const edgeY = node.y! - (nodeRadius * dy) / distance;

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
      })}
      {/* Root node ******************************************************* */}
      <g>
        <circle
          cx={centerNode.fx!}
          cy={centerNode.fy!}
          r={centerNode.radius}
          fill={`url(#gradient-root)` || "red"}
          stroke={analysisResult?.result === "pass" ? "#167e31" : "#7e1616"}
          strokeWidth={4}
        />
        <text
          x={centerNode.fx!}
          y={centerNode.fy!}
          textAnchor="middle"
          dominantBaseline="central"
          fill={analysisResult?.result === "pass" ? "#16591a" : "#852020"}
          fontSize={28}
        >
          {analysisResult?.result === "pass"
            ? "CLEAN"
            : analysisResult?.totalFlaggedWords}
        </text>
      </g>
      {/* Rect for words not in song *************************************** */}
      <rect
        x={rectGroup.x}
        y={rectGroup.y}
        width={rectGroup.width}
        height={rectGroup.height}
        rx={rectGroup.rx}
        fill={rectGroup.fill}
        stroke={rectGroup.stroke}
        strokeWidth={rectGroup.strokeWidth}
      />

      {/* Nodes */}
      {nodes.map((node) => (
        <WordNode key={node.id} node={node} />
      ))}
    </svg>
  );
}

// !TODO: **********************************************************************
// HERES WHAT THE STATE FLOW SHOULD LOOK LIKE
// 1. default profile is set for flaggedFamilies if no User preset
// 2. On song select, analyze lyrics with current preset
// 3. On preset change, RE-analyze lyrics with the new preset and UPDATE family occurances do NOT set the entire object.
// 4.
