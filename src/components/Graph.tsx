import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import * as d3 from "d3";

import { HashMap } from "../types/graph";
import {
  GraphDataType,
  GraphNode,
  RootNode,
  mockGraphData,
} from "../data/mockGraphData";

import { mockUser } from "../data/mockUser";
import {
  incrementOccurances,
  setOccurances,
} from "../store/features/flagManager/flagManagerSlice";

const mockUsersProf = mockUser;
const profileId = "39282";

// Graph Wrapper
export default function Graph(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);
  const flaggedWords = useAppSelector(
    (state: RootState) => state.flagManager.flaggedWords,
  );

  const [nodes, setNodes] = useState<GraphNode[]>();

  function analyzeLyrics() {
    if (!lyrics) return null;

    const formattedLyrics = lyrics
      .replace(/\[.*?\]/g, "") // removes [Verse 2: ... ] [Chorus: ... ]
      .replace(/\n/g, " ") // replace newlines
      .replace(/[?!.,'")()]/g, "") // replace punctuation (? ! . , ')
      .replace(/ {2,}/g, " ") // replace 2 or more consecutive spaces
      .trim();

    console.log("FINAL:", formattedLyrics);

    // split lyrics into array
    const wordArray: string[] = formattedLyrics.split(" ");

    // initialize hash map
    const hashMap: HashMap = {};

    // loop through lyrics
    wordArray.forEach((word) => {
      const formattedWord = word.toLocaleLowerCase();
      // increment count if word exists
      if (hashMap[formattedWord]) {
        hashMap[formattedWord] += 1;
        // add word to hashMap if it isn't in there already
      } else {
        hashMap[formattedWord] = 1;
      }
    });
    console.log(hashMap);

    // check users flagged words against lyrics hashMap
    Object.keys(flaggedWords).forEach((word) => {
      // if word is NOT in song just skip
      if (!hashMap[word]) return null;

      dispatch(setOccurances({ word: word, occurances: hashMap[word] }));
    });
  }

  // run lyric analysis whenever user changes the song
  useEffect(() => {
    analyzeLyrics();
  }, [lyrics, analyzeLyrics]);

  return (
    <div className="MainGraph flex flex-col justify-center w-full h-full bg-[#0e1114] items-center group transition-colors duration-200">
      {/* <span>
        {flaggedWords ? formatResponse() : "You need to choose a song"}
      </span> */}
      {flaggedWords ? (
        <ForceDirectedGraph data={mockGraphData} />
      ) : (
        "You need to choose a song"
      )}
    </div>
  );
}

// Graph with d3
// REMEMBER: Most D3 modules (including d3-scale, d3-array, d3-interpolate, and d3-format) don’t interact with the DOM, so there is no difference when using them in React. You can use them in JSX for purely declarative visualization.

// REMEMBER: D3 modules that operate on selections (including d3-selection, d3-transition, and d3-axis) do manipulate the DOM, which competes with React’s virtual DOM. In those cases, you can attach a ref to an element and pass it to D3 in a useEffect hook.

// RESOURCE FOR ABOVE - https://d3js.org/getting-started#d3-in-react

export const ForceDirectedGraph: React.FC<{ data: GraphDataType }> = ({
  data,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);

  useEffect(() => {
    if (!data || !svgRef.current) return () => {};

    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const nodes = [data.centerNode, ...data.nodes];
    const links = data.nodes
      .filter((node) => node.wordCount > 0)
      .map((node) => ({ source: data.centerNode, target: node }));

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
          .strength((d) => ((d as GraphNode).wordCount > 0 ? 0.1 : 0.01)),
      )
      .force(
        "y",
        d3
          .forceY(centerY)
          .strength((d) => ((d as GraphNode).wordCount > 0 ? 0.1 : 0.01)),
      );

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content
    svg.attr("viewBox", [0, 0, width, height]);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 0.4);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => (d as GraphNode | RootNode).radius)
      .attr("fill", (d) =>
        (d as GraphNode | RootNode).id === "center"
          ? "#ccc"
          : color((d as GraphNode).category?.[0] || ""),
      )
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);

    const nodeGroup = svg.append("g").selectAll("g").data(nodes).join("g");

    nodeGroup
      .append("text")
      .text((d) => (d as GraphNode).word || "")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", (d) => `${(d as GraphNode | RootNode).radius / 3}px`)
      .attr("fill", "black");

    node.append("title").text((d) => (d as GraphNode).word || "");

    // REVIEW: Used "!" here vv I don't see how x or y would ever be undefined
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as any).x)
        .attr("y1", (d) => (d.source as any).y)
        .attr("x2", (d) => (d.target as any).x)
        .attr("y2", (d) => (d.target as any).y);

      node.attr("cx", (d) => (d as any).x).attr("cy", (d) => (d as any).y);
      nodeGroup.attr(
        "transform",
        (d) => `translate(${(d as any).x},${(d as any).y})`,
      );
    });

    return () => {
      simulation.stop();
      svg.selectAll("*").remove(); // Clean up on unmount
    };
  }, [data, lyrics]);

  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />;
};

// D3 Graphs to check out ****************************************************
// FAVORITE: Disjoint foce-directed graph
// why? Words that are not in the selected songs lyrics should not be attached to the center node which is achievable with this graph below:
// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

// Other possible options: ***************************************************
// Circle Packing - https://observablehq.com/@d3/bubble-chart/2?intent=fork
// Bubble Chart -

// *************************** FOR MONDAY **********************************
// TODO: Actually use user flagged list and song lyrics to render nodes (you're just using mock data now)

// TODO: Add label to top of screen that shows current song and artist

// TODO: Find a good way to display clean/not-clean status (maybe blurred border around the entire page)

// TODO: Clicking root node (middle circle) should do SOMETHING

// TODO: flagged words that aren't in song should be pushed to edge of screen, faded out, links removed, and all made the same size

// TODO: Deal with the "any" types in the code above
