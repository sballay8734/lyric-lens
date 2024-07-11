import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";

import {
  MIN_NODE_RADIUS,
  vulgarityToColorMap,
} from "../constants/graphConstants";
import { GraphNode } from "../data/mockGraphData";

interface NodeProps {
  node: GraphNode;
}

const WordNode = ({ node }: NodeProps) => {
  const wasConnected = useRef(false);

  const circleStyle = useSpring({
    r:
      node.occurances > 0 && node.isFlagged
        ? Math.max(Math.log(node.occurances + 2) * 6, MIN_NODE_RADIUS)
        : 3,
    opacity: node.occurances > 0 ? 1 : 0,
    config: { duration: 500 },
  });

  const textStyle = useSpring({
    opacity: node.occurances > 0 && node.isFlagged ? 1 : 0,
    fontSize: node.occurances > 0 ? Math.min(node.radius / 3, 10) : 0,
    config: { duration: 500 },
  });

  useEffect(() => {
    wasConnected.current = node.occurances > 0;
  }, []);

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <defs>
        <radialGradient id={`gradient-${node.id}`}>
          <stop
            offset="0%"
            stopColor={
              (node.vulgarityLvl &&
                vulgarityToColorMap[node.vulgarityLvl].startColor) ||
              "#9e0142"
            }
          />
          <stop
            offset="100%"
            stopColor={
              (node.vulgarityLvl &&
                vulgarityToColorMap[node.vulgarityLvl].endColor) ||
              "#3c0019"
            }
          />
        </radialGradient>
      </defs>
      <animated.circle
        {...circleStyle}
        // !TODO: I THINK THIS IS WHERE YOU PASS THE FLUID VALUE!!!
        cx={0}
        cy={0}
        fill={
          node.occurances > 0 && node.isFlagged
            ? `url(#gradient-${node.id})`
            : "tomato"
        }
        opacity={node.occurances > 0 ? 1 : 0.7}
      />
      <animated.text
        {...textStyle}
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="central"
        fill="lightgray"
      >
        {node.word} ({node.occurances})
      </animated.text>
    </g>
  );
};

export default WordNode;
