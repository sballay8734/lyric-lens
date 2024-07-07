/* eslint-disable react/prop-types */
import { animated, useSpring } from "@react-spring/web";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import LyricsModal from "../../ModalManagement/components/modals/LyricsModal";
import { analyzeLyrics } from "../../SongSearchForm/utils/analyzeLyrics";
import { GraphNode, RootNode } from "../data/mockGraphData";
import { useWindowSize } from "../hooks/graphHooks";
import { formatNodes, initializeSimulation } from "../utils/d3";

// Graph Wrapper
export default function Graph(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const lyrics = useAppSelector(
    (state: RootState) => state.songSearchForm.lyrics,
  );
  const currentPreset = useAppSelector(
    (state: RootState) => state.flagManagement.currentPreset,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );
  const analysisResult = useAppSelector(
    (state: RootState) => state.songSearchForm.analysisResult,
  );

  // run lyric analysis whenever user changes the song or flag preset
  useEffect(() => {
    if (lyrics) {
      analyzeLyrics(lyrics, dispatch, currentPreset);
    }
  }, [lyrics, currentPreset?.presetId]);

  return (
    <div
      className={`MainGraph group flex h-full w-full flex-col items-center justify-center bg-[#000000] transition-colors duration-200 ${!selectedSong ? "" : analysisResult?.result === "pass" ? "animate-pulse-shadow-green" : "animate-pulse-shadow-red"}`}
    >
      <ForceDirectedGraph
        presetId={currentPreset && currentPreset?.presetId}
        lyrics={lyrics}
      />
      <LyricsModal />
    </div>
  );
}

// Graph with d3
// REMEMBER: Most D3 modules (including d3-scale, d3-array, d3-interpolate, and d3-format) don’t interact with the DOM, so there is no difference when using them in React. You can use them in JSX for purely declarative visualization.

// REMEMBER: D3 modules that operate on selections (including d3-selection, d3-transition, and d3-axis) do manipulate the DOM, which competes with React’s virtual DOM. In those cases, you can attach a ref to an element and pass it to D3 in a useEffect hook.

// RESOURCE FOR ABOVE - https://d3js.org/getting-started#d3-in-react
interface GraphProps {
  presetId: string | null;
  lyrics: string | null;
}

export function ForceDirectedGraph({
  presetId,
  lyrics,
}: GraphProps): React.JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const windowSize = useWindowSize();
  const flaggedFamilies = useAppSelector(
    (state: RootState) => state.flagManagement.flaggedFamilies,
  );
  const analysisResult = useAppSelector(
    (state: RootState) => state.songSearchForm.analysisResult,
  );

  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const simulationRef = useRef<d3.Simulation<GraphNode, undefined> | null>(
    null,
  );

  // Set up dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;
  const centerX = width / 2;
  const centerY = height / 2;

  // Create center node
  const centerNode: RootNode = {
    id: "root",
    family: null,
    occurances: null,
    vulgarityLvl: null,
    category: null,
    radius: 50, // TODO: should get bigger with more curse words
    fx: centerX,
    fy: centerY,
  };

  // TODO: This should UPDATE the node positions and NOT generate new nodes
  useEffect(() => {
    if (!flaggedFamilies || !svgRef.current) return () => {};

    // Format nodes from flaggedFamilies
    const formattedNodes: GraphNode[] = formatNodes(flaggedFamilies);

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
    ).on("tick", () => {
      setNodes([...nodesWithPositions]);
    });

    simulationRef.current = simulation;

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [presetId, lyrics, analysisResult?.result]);

  // TODO: Add separate useEffect for when lyrics/song changes

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
      width="100%"
      height="100%"
    >
      {/* Links */}
      {nodes.map((node: GraphNode) => (
        <AnimatedLink
          key={`link-${node.id}`}
          x1={centerNode.fx?.toString()!}
          y1={centerNode.fy?.toString()!}
          x2={node.x?.toString()!}
          y2={node.y?.toString()!}
          isConnected={node.occurances > 0}
          lyrics={lyrics}
        />
      ))}

      {/* Root node */}
      <circle
        cx={centerNode.fx!}
        cy={centerNode.fy!}
        r={centerNode.radius}
        fill="red"
      />

      {/* Nodes */}
      {nodes.map((node) => (
        <AnimatedNode
          key={node.id}
          node={node}
          isConnected={node.occurances > 0}
          lyrics={lyrics}
        />
      ))}
    </svg>
  );
}

// LINKS **********************************************************************
interface LinkProps {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  isConnected: boolean;
  lyrics: string | null;
}

const AnimatedLink = ({ x1, y1, x2, y2, isConnected, lyrics }: LinkProps) => {
  const style = useSpring({
    from: { opacity: 0, strokeWidth: 0 },
    to: {
      opacity: isConnected ? 1 : 0,
      strokeWidth: isConnected ? 1 : 0,
    },
    config: { duration: 1000 },
  });

  return (
    <animated.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" {...style} />
  );
};

// NODES **********************************************************************
interface NodeProps {
  node: GraphNode;
  isConnected: boolean;
  lyrics: string | null;
}

// const MAX_RADIUS = 50;
const MIN_RADIUS = 15;

const AnimatedNode = ({ node, isConnected, lyrics }: NodeProps) => {
  const [circleRadius, setCircleRadius] = useState(MIN_RADIUS);
  const wasConnected = useRef(false);

  const circleStyle = useSpring({
    r: isConnected ? Math.max(Math.sqrt(node.occurances) * 4, MIN_RADIUS) : 3,
    opacity: isConnected ? 1 : 0.5,
    config: { duration: 500 },
    onChange: ({ value }) => {
      setCircleRadius(value.r); // Update the state with the new radius value
    },
  });

  const textStyle = useSpring({
    opacity: isConnected ? 1 : 0,
    fontSize: Math.min(Math.min(circleRadius / 3.5, 12)),
    config: { duration: 500 },
  });

  useEffect(() => {
    wasConnected.current = isConnected;
    setCircleRadius(circleStyle.r.get());
  }, [isConnected, lyrics]);

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <animated.circle
        {...circleStyle}
        cx={0}
        cy={0}
        fill={!isConnected ? "tomato" : "lightgray"}
      />
      <animated.text
        {...textStyle}
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="central"
        fill="black"
      >
        {node.family} ({node.occurances})
      </animated.text>
    </g>
  );
};

// D3 Graphs to check out ****************************************************
// FAVORITE: Disjoint foce-directed graph
// why? Words that are not in the selected songs lyrics should not be attached to the center node which is achievable with this graph below:
// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

// Other possible options: ***************************************************
// Circle Packing - https://observablehq.com/@d3/bubble-chart/2?intent=fork
// Bubble Chart -

// !TODO: MAJOR OPTIMIZATIONS NEEDED HERE

// !TODO: Some nodes drift under overlay if there are alot of curse words

// TODO: Nodes should be colored based on severity of word (9-10 are dark red)

// TODO: Actually use user flagged list and song lyrics to render nodes (you're just using mock data now)

// TODO: Add label to top of screen that shows current song and artist

// TODO: Find a good way to display clean/not-clean status (maybe blurred border around the entire page)

// TODO: Clicking root node (middle circle) should do SOMETHING

// TODO: flagged words that aren't in song should be pushed to edge of screen, faded out, links removed, and all made the same size

// TODO: Deal with the "any" types in the code above

//
