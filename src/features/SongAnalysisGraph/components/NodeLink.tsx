import { animated, useSpring } from "@react-spring/web";

interface LinkProps {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  isConnected: boolean;
  lyrics: string | null;
}

const NodeLink = ({ x1, y1, x2, y2, isConnected }: LinkProps) => {
  const style = useSpring({
    from: { opacity: 0, strokeWidth: 0 },
    to: {
      opacity: isConnected ? 1 : 0,
      strokeWidth: isConnected ? 1 : 0,
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
