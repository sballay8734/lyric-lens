import { useEffect, useRef } from "react";

import Nodes from "./Nodes";
import RootNode from "./RootNode";
import { useWindowSize } from "../hooks/graphHooks";

export default function Graph(): React.JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const windowSize = useWindowSize();

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
      {/* Root node ******************************************************* */}
      <RootNode />
      {/* Nodes */}
      <Nodes />
      {/* Links */}
    </svg>
  );
}
