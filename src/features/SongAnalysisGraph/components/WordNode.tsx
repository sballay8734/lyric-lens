import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";

import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import {
  centerX,
  centerY,
  MIN_NODE_RADIUS,
  vulgarityToColorMap,
} from "../constants/graphConstants";
import { GraphNode } from "../data/mockGraphData";
import React from "react";

interface NodeProps {
  node: GraphNode;
  index: number;
  totalNodes: number;
}

const WordNode = ({ node, index, totalNodes }: NodeProps) => {
  const wordIsFlagged = useAppSelector((state: RootState) => {
    return (
      state.wordFamilyManagement.flaggedWords &&
      state.wordFamilyManagement.flaggedWords[node.word].isFlagged
    );
  });
  const wordOccurs = useAppSelector((state: RootState) => {
    return (
      state.wordFamilyManagement.flaggedWords &&
      state.wordFamilyManagement.flaggedWords[node.word].occurances > 0
    );
  });

  // console.log(node.word, wordIsFlagged, wordOccurs);

  const circleStyle = useSpring({
    r: wordOccurs && wordIsFlagged ? Math.max(1 * 6, MIN_NODE_RADIUS) : 3,
    opacity: wordOccurs ? 1 : 0.5,
    config: { duration: 500 },
  });

  const textStyle = useSpring({
    opacity: wordOccurs && wordIsFlagged ? 1 : 0,
    fontSize: wordOccurs ? Math.min(node.radius / 3, 10) : 0,
    config: { duration: 500 },
  });

  const circleRadius = 75;
  const angle = (index / totalNodes) * 2 * Math.PI;
  const xValue = Math.cos(angle) * circleRadius + centerX;
  const yValue = getYValue();

  function getYValue() {
    // if node is flagged AND in song
    if (wordIsFlagged && wordOccurs) {
      return Math.sin(angle) * circleRadius + centerY;
    }
    // if node is flagged AND NOT in song
    if (wordIsFlagged && !wordOccurs) {
      return Math.sin(angle) * circleRadius + 2.3 * centerY;
    }

    // if node is NOT flagged but IS in song
    if (!wordIsFlagged && wordOccurs) {
      return Math.sin(angle) * circleRadius + 2.3 * centerY;
    }

    // if node is NOT flagged and NOT in song
    if (!wordIsFlagged && !wordOccurs) {
      return Math.sin(angle) * circleRadius + 2.3 * centerY;
    }
  }

  const position = useSpring({
    y: yValue,
    config: { tension: 170, friction: 26 },
  });

  if (node.id === "root") return;

  return (
    <animated.g transform={position.y!.to((y) => `translate(${xValue}, ${y})`)}>
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
          wordOccurs && wordIsFlagged ? `url(#gradient-${node.id})` : "tomato"
        }
        opacity={wordOccurs ? 1 : 0.7}
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
    </animated.g>
  );
};

export default React.memo(WordNode);
