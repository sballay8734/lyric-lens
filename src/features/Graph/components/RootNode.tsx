import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { centerNode } from "../constants/graphConstants";
import { useWindowSize } from "../hooks/graphHooks";

export default function RootNode(): React.JSX.Element {
  const windowSize = useWindowSize();

  const analysisResult = useAppSelector(
    (state: RootState) => state.wordManagement.analysisResult,
  );

  console.log(windowSize);

  return (
    <g>
      <defs>
        <radialGradient id={`gradient-root`}>
          <stop
            offset="0%"
            stopColor={
              analysisResult?.result === "pass" ? "#82cb81" : "#ff8585"
            }
          />
          <stop
            offset="100%"
            stopColor={
              analysisResult?.result === "pass" ? "#34773f" : "#8f0000"
            }
          />
        </radialGradient>
      </defs>
      <circle
        cx={windowSize.windowCenterX}
        cy={windowSize.rootNodeCenterY}
        r={centerNode.radius}
        fill={`url(#gradient-root)`}
        stroke={analysisResult?.result === "pass" ? "#167e31" : "#7e1616"}
        strokeWidth={4}
      />
      <text
        x={windowSize.windowCenterX}
        y={windowSize.rootNodeCenterY}
        textAnchor="middle"
        dominantBaseline="central"
        fill={analysisResult?.result === "pass" ? "#16591a" : "#852020"}
        fontSize={28}
      >
        {analysisResult?.result === "pass"
          ? "CLEAN"
          : analysisResult?.totalFlaggedWords}
      </text>
    </g>
  );
}
