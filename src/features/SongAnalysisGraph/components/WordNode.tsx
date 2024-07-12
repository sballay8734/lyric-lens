import { animated, useSpring } from "@react-spring/web";
import React from "react";

import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import {
  centerX,
  centerY,
  vulgarityToColorMap,
} from "../constants/graphConstants";
import { GraphNode } from "../data/mockGraphData";

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
  const analysisResult = useAppSelector(
    (state: RootState) => state.wordFamilyManagement.analysisResult,
  );

  const circleStyle = useSpring({
    r: wordOccurs && wordIsFlagged ? 15 : 3,
    opacity: wordOccurs ? 1 : 0.3,
    config: { duration: 500 },
  });

  const textStyle = useSpring({
    opacity: wordOccurs && wordIsFlagged ? 1 : 0,
    fontSize: wordOccurs ? Math.min(node.radius / 3, 10) : 0,
    config: { duration: 300 },
  });

  const angle = (index / totalNodes) * 2 * Math.PI;
  const circleRadius = 75;

  // word circle below
  // function getYValue() {
  //   if (wordIsFlagged && wordOccurs) {
  //     return Math.sin(angle) * (circleRadius * 1.5) + centerY;
  //   }
  //   return Math.sin(angle) * circleRadius + 2.3 * centerY;
  // }

  // function getXValue() {
  //   if (wordIsFlagged && wordOccurs) {
  //     return Math.cos(angle) * (circleRadius * 1.5) + centerX;
  //   }
  //   return Math.cos(angle) * circleRadius + centerX;
  // }

  // word circle around root node
  function getYValue() {
    if (wordIsFlagged && wordOccurs) {
      return Math.sin(angle) * (circleRadius * 1.5) + centerY;
    }
    return Math.sin(angle) * circleRadius + centerY;
  }

  function getXValue() {
    if (wordIsFlagged && wordOccurs) {
      return Math.cos(angle) * (circleRadius * 1.5) + centerX;
    }
    return Math.cos(angle) * circleRadius + centerX;
  }

  const position = useSpring({
    x: getXValue(),
    y: getYValue(),
    config: { tension: 170, friction: 26 },
  });

  if (node.id === "root") return null;

  return (
    <animated.g style={position}>
      <defs>
        <radialGradient id={`gradient-${node.id}`}>
          <stop
            offset="0%"
            stopColor={
              node.vulgarityLvl
                ? vulgarityToColorMap[node.vulgarityLvl].startColor
                : "#9e0142"
            }
          />
          <stop
            offset="100%"
            stopColor={
              node.vulgarityLvl
                ? vulgarityToColorMap[node.vulgarityLvl].endColor
                : "#3c0019"
            }
          />
        </radialGradient>
      </defs>
      <animated.circle
        style={circleStyle}
        cx={0}
        cy={0}
        fill={
          wordOccurs && wordIsFlagged && analysisResult.result === "fail"
            ? `url(#gradient-${node.id})`
            : analysisResult.result === "pass"
              ? "#32a852"
              : "tomato"
        }
      />
      <animated.text
        style={textStyle}
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

// TODO: Transition fill

// !TODO: WORDS NO LONGER HIGHLIGHT IN LYRICS SHEET
