import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DEFAULT_FLAG_PROFILE_PRESETS } from "../constants/defaultProfiles";
import { FLAGGABLE_WORDS_MASTER } from "../constants/flaggableWords";
import {
  setFlaggedWords,
  setPreset,
} from "../features/_NewArcitecture/redux/wordFamilyManagementSlice";
import { getFlaggedWords } from "../features/FlagManagement/utils/getFlaggedFamilies";
import GraphWrapper from "../features/SongAnalysisGraph/components/GraphWrapper";
import Overlay from "../features/SongAnalysisGraph/components/Overlay";

const FALLBACK_PRESET = DEFAULT_FLAG_PROFILE_PRESETS[0];

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const flaggedWords = getFlaggedWords(FLAGGABLE_WORDS_MASTER);
    dispatch(setFlaggedWords(flaggedWords));

    // this also updates state.flaggedWords
    dispatch(setPreset(FALLBACK_PRESET));
  }, [dispatch]);

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
