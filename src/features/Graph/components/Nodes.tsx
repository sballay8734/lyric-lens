import { useEffect, useMemo, useState } from "react";
import React from "react";

import WordNode from "./WordNode";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { GraphNode } from "../data/mockGraphData";
import { useWindowSize } from "../hooks/graphHooks";
import { formatNodes } from "../utils/d3";

export default function Nodes(): React.ReactElement[] {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const windowSize = useWindowSize();

  const flaggedWords = useAppSelector(
    (state: RootState) => state.wordManagement.flaggedWords,
  );

  useEffect(() => {
    // Format nodes from flaggedFamilies
    if (!flaggedWords) return;

    const formattedNodes: GraphNode[] = formatNodes(
      flaggedWords,
      windowSize.width,
      windowSize.height,
      windowSize.windowCenterX,
      windowSize.windowCenterY,
    );

    setNodes(formattedNodes);
  }, [flaggedWords]);

  const totalNodes = useMemo(() => nodes.length, [nodes]);

  return nodes.map((node, index) => (
    <WordNode key={node.id} node={node} index={index} totalNodes={totalNodes} />
  ));
}
