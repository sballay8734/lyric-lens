import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DEFAULT_FLAG_PROFILE_PRESETS } from "../constants/defaultProfiles";
import {
  setCurrentPreset,
  setFlaggedFamilies,
} from "../features/FlagManagement/redux/flagManagementSlice";
import findFlaggedFamilies from "../features/FlagManagement/utils/getFlaggedFamilies";
import getFlaggedFamilies from "../features/FlagManagement/utils/getFlaggedFamilies";
import GraphWrapper from "../features/SongAnalysisGraph/components/GraphWrapper";
import Overlay from "../features/SongAnalysisGraph/components/Overlay";
import { FLAGGABLE_WORDS_MASTER } from "../constants/flaggableWords";

const FALLBACK_PRESET = DEFAULT_FLAG_PROFILE_PRESETS[0];

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch();

  // !TODO: Need to eventually update this to use the users preferred preset before using the fallback
  useEffect(() => {
    const wordFamilies = getFlaggedFamilies(FLAGGABLE_WORDS_MASTER);
    console.log(wordFamilies);
    // OLD LOGIC
    dispatch(setCurrentPreset(FALLBACK_PRESET));

    const flaggedFamilies = getFlaggedFamilies(FALLBACK_PRESET.flaggedWords);
    dispatch(setFlaggedFamilies(flaggedFamilies));
  }, []);

  return (
    <>
      <div className="relative flex h-full w-full flex-col justify-between gap-2">
        {/* GRAPH */}
        <GraphWrapper />
        <Overlay />
      </div>
    </>
  );
}
