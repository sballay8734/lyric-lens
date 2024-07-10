import { animated, useSpring } from "@react-spring/web";

import { GraphNode } from "../data/mockGraphData";

interface LinkProps {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  node: GraphNode;
}

const NodeLink = ({ x1, y1, x2, y2, node }: LinkProps) => {
  const style = useSpring({
    from: { opacity: 0, strokeWidth: 0 },
    to: {
      opacity: 1,
      strokeWidth: 1,
    },
    config: { duration: 500 },
  });

  // if (node.occurances === 0) return null;

  return (
    <animated.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#2e2e2e"
      {...style}
    />
  );
};

export default NodeLink;
