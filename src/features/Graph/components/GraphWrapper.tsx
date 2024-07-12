/* eslint-disable react/prop-types */

import Graph from "./Graph";
// import { useAppSelector } from "../../../hooks/hooks";
// import { RootState } from "../../../store/store";
import ResultOverlay from "./ResultOverlay";
import LyricsModal from "../../ModalManagement/components/modals/LyricsModal";

// Graph Wrapper
export default function GraphWrapper(): React.JSX.Element {
  return (
    <div
      className={`MainGraph group flex h-full w-full flex-col items-center justify-center bg-[#000000] transition-colors duration-200`}
    >
      <Graph />
      <ResultOverlay />
      <LyricsModal />
    </div>
  );
}

// Graph with d3
// REMEMBER: Most D3 modules (including d3-scale, d3-array, d3-interpolate, and d3-format) don’t interact with the DOM, so there is no difference when using them in React. You can use them in JSX for purely declarative visualization.

// REMEMBER: D3 modules that operate on selections (including d3-selection, d3-transition, and d3-axis) do manipulate the DOM, which competes with React’s virtual DOM. In those cases, you can attach a ref to an element and pass it to D3 in a useEffect hook.

// RESOURCE FOR ABOVE - https://d3js.org/getting-started#d3-in-react

// D3 Graphs to check out ****************************************************
// FAVORITE: Disjoint foce-directed graph
// why? Words that are not in the selected songs lyrics should not be attached to the center node which is achievable with this graph below:
// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

// Other possible options: ***************************************************
// Circle Packing - https://observablehq.com/@d3/bubble-chart/2?intent=fork
// Bubble Chart -

// TODO: Nodes should be colored based on severity of word (9-10 are dark red)

// TODO: Actually use user flagged list and song lyrics to render nodes (you're just using mock data now)

// TODO: Add label to top of screen that shows current song and artist

// TODO: Find a good way to display clean/not-clean status (maybe blurred border around the entire page)

// TODO: Clicking root node (middle circle) should do SOMETHING

// TODO: flagged words that aren't in song should be pushed to edge of screen, faded out, links removed, and all made the same size

// TODO: Deal with the "any" types in the code above
