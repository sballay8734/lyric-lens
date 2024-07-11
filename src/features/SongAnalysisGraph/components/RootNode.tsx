import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { centerNode } from "../constants/graphConstants";

export default function RootNode(): React.JSX.Element {
  const analysisResult = useAppSelector(
    (state: RootState) => state.flagManagement.analysisResult,
  );

  return (
    <g>
      <circle
        cx={centerNode.fx!}
        cy={centerNode.fy!}
        r={centerNode.radius}
        fill={`url(#gradient-root)` || "red"}
        stroke={analysisResult?.result === "pass" ? "#167e31" : "#7e1616"}
        strokeWidth={4}
      />
      <text
        x={centerNode.fx!}
        y={centerNode.fy!}
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
