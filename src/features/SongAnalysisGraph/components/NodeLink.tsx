import { animated, useSpring } from "@react-spring/web";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { GraphNode } from "../data/mockGraphData";

interface LinkProps {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  node: GraphNode;
}

const NodeLink = ({ x1, y1, x2, y2, node }: LinkProps) => {
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

  const style = useSpring({
    from: { opacity: 0, strokeWidth: 0 },
    to: {
      opacity: isConnected && isFlagged ? 1 : 0,
      strokeWidth: isConnected && isFlagged ? 1 : 0,
    },
    config: { duration: 1000 },
  });

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
