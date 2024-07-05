/* eslint-disable react/prop-types */
import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { FlaggedFamiliesObject } from "../../FlagManagement/redux/flagManagementSlice";
import LyricsModal from "../../ModalManagement/components/modals/LyricsModal";
import { AnalysisResult } from "../../SongSearchForm/redux/songSearchFormSlice";
import { analyzeLyrics } from "../../SongSearchForm/utils/analyzeLyrics";
import { GraphNode, RootNode } from "../data/mockGraphData";

// Graph Wrapper
export default function Graph(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const lyrics = useAppSelector(
    (state: RootState) => state.songSearchForm.lyrics,
  );
  const flaggedFamilies = useAppSelector(
    (state: RootState) => state.flagManagement.flaggedFamilies,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  const analysisResult = useAppSelector(
    (state: RootState) => state.songSearchForm.analysisResult,
  );

  // run lyric analysis whenever user changes the song
  useEffect(() => {
    if (lyrics) {
      analyzeLyrics(lyrics, dispatch, flaggedFamilies);
    }
  }, [lyrics]);

  return (
    <div
      className={`MainGraph flex flex-col justify-center w-full h-full bg-[#0e1114] items-center group transition-colors duration-200 ${!selectedSong ? "" : analysisResult?.result === "pass" ? "animate-pulse-shadow-green" : "animate-pulse-shadow-red"}`}
    >
      {/* <span>
        {flaggedWords ? formatResponse() : "You need to choose a song"}
      </span> */}
      {flaggedFamilies ? (
        <ForceDirectedGraph
          lyrics={lyrics}
          flaggedFamilies={flaggedFamilies}
          analysisResult={analysisResult}
        />
      ) : (
        "You need to choose a song"
      )}
      <LyricsModal />
    </div>
  );
}

// Graph with d3
// REMEMBER: Most D3 modules (including d3-scale, d3-array, d3-interpolate, and d3-format) don’t interact with the DOM, so there is no difference when using them in React. You can use them in JSX for purely declarative visualization.

// REMEMBER: D3 modules that operate on selections (including d3-selection, d3-transition, and d3-axis) do manipulate the DOM, which competes with React’s virtual DOM. In those cases, you can attach a ref to an element and pass it to D3 in a useEffect hook.

// RESOURCE FOR ABOVE - https://d3js.org/getting-started#d3-in-react

const MAX_RADIUS = 50;

export const ForceDirectedGraph: React.FC<{
  lyrics: string | null;
  flaggedFamilies: FlaggedFamiliesObject;
  analysisResult: AnalysisResult;
}> = ({ lyrics, flaggedFamilies, analysisResult }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!flaggedFamilies || !svgRef.current) return () => {};

    // Set up dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // Format nodes from flaggedFamilies
    const formattedNodes: GraphNode[] = Object.keys(flaggedFamilies).map(
      (w) => {
        const { id, family, occurances, vulgarityLvl, category } =
          flaggedFamilies[w];
        return {
          id,
          family,
          occurances,
          vulgarityLvl,
          category,
          radius: 20 + occurances * 2,
        };
      },
    );

    // Create center node
    const centerNode: RootNode = {
      id: "root",
      family: null,
      occurances: null,
      vulgarityLvl: null,
      category: null,
      radius: 65, // TODO: should get bigger with more curse words
      fx: centerX,
      fy: centerY,
    };

    // Set up color scale
    const colors = {
      0: "#9dbcda",
      1: "#9dbcda",
      2: "#9dbcda",
      3: "#8c96c6",
      4: "#8c96c6",
      5: "#8c6bb1",
      6: "#8c6bb1",
      7: "#88419d",
      8: "#88419d",
      9: "#4d004b",
      10: "#4d004b",
    };

    // Combine nodes and create links
    const nodes = [centerNode, ...formattedNodes];
    const links = formattedNodes
      .filter((node) => node.occurances > 0)
      .map((node) => ({ source: centerNode, target: node }));

    // Create a set of connected node IDs
    const connectedNodeIds = new Set<string>();
    links.forEach((link) => {
      connectedNodeIds.add((link.source as GraphNode | RootNode).id);
      connectedNodeIds.add((link.target as GraphNode | RootNode).id);
    });

    // Set up force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => (d as GraphNode | RootNode).id),
      )
      .force("charge", d3.forceManyBody().strength(-700))
      .force("center", d3.forceCenter(centerX, centerY))
      .force(
        "collision",
        d3.forceCollide().radius((d) => (d as GraphNode | RootNode).radius),
      )
      .force(
        "x",
        d3
          .forceX(centerX)
          .strength((d) => ((d as GraphNode).occurances > 0 ? 0.1 : 0.01)),
      )
      .force(
        "y",
        d3
          .forceY(centerY)
          .strength((d) => ((d as GraphNode).occurances > 0 ? 0.1 : 0.01)),
      );

    // Set up SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content
    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

    // Create links
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 0.4);

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) =>
        Math.min(
          connectedNodeIds.has((d as GraphNode | RootNode).id)
            ? (d as GraphNode | RootNode).radius
            : (d as GraphNode | RootNode).radius * 0.7,
          MAX_RADIUS, // Replace with your desired maximum radius value
        ),
      )
      .attr("fill", (d) =>
        (d as GraphNode | RootNode).id === "root" // Root node color
          ? analysisResult && analysisResult.result === "pass"
            ? "#22c55e"
            : "#a82f27"
          : connectedNodeIds.has((d as GraphNode | RootNode).id)
            ? colors[(d as GraphNode).vulgarityLvl]
            : "#707070",
      )
      .attr("stroke", (d) =>
        (d as GraphNode | RootNode).id === "root"
          ? analysisResult && analysisResult.result === "pass"
            ? "#2bff79"
            : "#f73b2f" // Root node border
          : connectedNodeIds.has((d as GraphNode | RootNode).id)
            ? "#cd75e6"
            : "#333333",
      )
      .attr("stroke-width", (d) =>
        (d as GraphNode | RootNode).id === "root"
          ? analysisResult && analysisResult.result === "pass"
            ? 5
            : 5
          : connectedNodeIds.has((d as GraphNode | RootNode).id)
            ? 3
            : 1,
      )
      .attr("opacity", (d) =>
        connectedNodeIds.has((d as GraphNode | RootNode).id) ? 1 : 0.5,
      );

    // Create node groups for text
    const nodeGroup = svg.append("g").selectAll("g").data(nodes).join("g");

    // Add text to nodes
    nodeGroup
      .append("text")
      .text((d) =>
        (d as GraphNode).occurances === 0
          ? d.family
          : d.category === null // center node
            ? analysisResult === null
              ? "N/A"
              : analysisResult.totalFlaggedWords
            : `${d.family} (${d.occurances})` || "",
      )
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr(
        "font-size",
        (d) =>
          `${(d as GraphNode | RootNode).id === "root" ? "30" : d.radius > MAX_RADIUS ? MAX_RADIUS / 3 : d.radius / 3}px`,
      )
      .attr(
        "fill",
        (d) =>
          `${(d as GraphNode | RootNode).id === "root" ? (analysisResult?.result === "pass" ? "#003800" : "#3b0000") : "black"}`,
      );

    // Add titles to nodes
    node.append("title").text((d) => (d as GraphNode).family || "");

    // Update positions on each tick of the simulation
    simulation.on("tick", () => {
      // Update link positions
      link
        .attr("x1", (d) => (d.source as any).x)
        .attr("y1", (d) => (d.source as any).y)
        .attr("x2", (d) => (d.target as any).x)
        .attr("y2", (d) => (d.target as any).y);

      // Update node positions
      node
        .attr("cx", (d) => {
          const r = (d as GraphNode | RootNode).radius;
          const padding = 0; // Adjust the padding value as needed
          d.x = Math.max(r + padding, Math.min(width - r - padding, d.x!));
          return d.x!;
        })
        .attr("cy", (d) => {
          const r = (d as GraphNode | RootNode).radius;
          const padding = 0; // Adjust the padding value as needed
          d.y = Math.max(r + padding, Math.min(height - r - padding, d.y!));
          return d.y!;
        });

      // Update node group positions
      nodeGroup.attr(
        "transform",
        (d) => `translate(${(d as any).x},${(d as any).y})`,
      );
    });

    // Cleanup function
    return () => {
      simulation.stop();
      svg.selectAll("*").remove(); // Clean up on unmount
    };
  }, [flaggedFamilies, lyrics, analysisResult?.totalFlaggedWords]);

  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />;
};

// D3 Graphs to check out ****************************************************
// FAVORITE: Disjoint foce-directed graph
// why? Words that are not in the selected songs lyrics should not be attached to the center node which is achievable with this graph below:
// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

// Other possible options: ***************************************************
// Circle Packing - https://observablehq.com/@d3/bubble-chart/2?intent=fork
// Bubble Chart -

// !TODO: Some nodes drift under overlay if there are alot of curse words

// TODO: Nodes should be colored based on severity of word (9-10 are dark red)

// TODO: Actually use user flagged list and song lyrics to render nodes (you're just using mock data now)

// TODO: Add label to top of screen that shows current song and artist

// TODO: Find a good way to display clean/not-clean status (maybe blurred border around the entire page)

// TODO: Clicking root node (middle circle) should do SOMETHING

// TODO: flagged words that aren't in song should be pushed to edge of screen, faded out, links removed, and all made the same size

// TODO: Deal with the "any" types in the code above

//
