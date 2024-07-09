import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import {
  MIN_NODE_RADIUS,
  vulgarityToColorMap,
} from "../constants/graphConstants";
import { GraphNode } from "../data/mockGraphData";

interface NodeProps {
  node: GraphNode;
}

const WordNode = ({ node }: NodeProps) => {
  const [circleRadius, setCircleRadius] = useState(MIN_NODE_RADIUS);
  const wasConnected = useRef(false);

  const wordOccurances = useAppSelector((state: RootState) => {
    const flaggedWords = state.wordFamilyManagement.flaggedWords;
    if (flaggedWords && flaggedWords[node.word]) {
      return flaggedWords[node.word].occurances;
    }
  });

  const wordIsFlagged = useAppSelector((state: RootState) => {
    const flaggedWords = state.wordFamilyManagement.flaggedWords;
    if (flaggedWords && flaggedWords[node.word]) {
      return flaggedWords[node.word].isFlagged;
    }
  });

  const isConnected = wordOccurances && wordOccurances > 0 ? true : false;
  const isFlagged = wordIsFlagged;

  const circleStyle = useSpring({
    r:
      isConnected && isFlagged
        ? Math.max(Math.log(node.occurances + 2) * 12, MIN_NODE_RADIUS)
        : 3,
    opacity: isConnected && isFlagged ? 1 : 0.5,
    config: { duration: 500 },
    onChange: ({ value }) => {
      setCircleRadius(value.r); // Update the state with the new radius value
    },
  });

  const textStyle = useSpring({
    opacity: isConnected && isFlagged ? 1 : 0,
    fontSize: Math.min(Math.min(circleRadius / 3.5, 12)),
    config: { duration: 500 },
  });

  useEffect(() => {
    wasConnected.current = isConnected;
    setCircleRadius(circleStyle.r.get());
  }, []);

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <defs>
        <radialGradient id={`gradient-${node.id}`}>
          <stop
            offset="0%"
            stopColor={
              vulgarityToColorMap[node.vulgarityLvl].startColor || "#9e0142"
            }
          />
          <stop
            offset="100%"
            stopColor={
              vulgarityToColorMap[node.vulgarityLvl].endColor || "#3c0019"
            }
          />
        </radialGradient>
      </defs>
      <animated.circle
        {...circleStyle}
        cx={0}
        cy={0}
        fill={isConnected && isFlagged ? `url(#gradient-${node.id})` : "tomato"}
        opacity={0.8}
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
