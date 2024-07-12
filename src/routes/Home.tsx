import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DEFAULT_FLAG_PROFILE_PRESETS } from "../constants/defaultProfiles";
import { FLAGGABLE_WORDS_MASTER } from "../constants/flaggableWords";
import { getFlaggedWords } from "../features/WordManagement/utils/getFlaggedWords";
import GraphWrapper from "../features/Graph/components/GraphWrapper";
import Overlay from "../features/Graph/components/Overlay";
import {
  setFlaggedWords,
  setPreset,
} from "../features/WordManagement/redux/wordManagementSlice";

const FALLBACK_PRESET = DEFAULT_FLAG_PROFILE_PRESETS[0];

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const flaggedWords = getFlaggedWords(FLAGGABLE_WORDS_MASTER);
    dispatch(setFlaggedWords(flaggedWords));

    // this also updates state.flaggedWords
    dispatch(setPreset(FALLBACK_PRESET));
  }, [dispatch]);

  console.log("Running HOME");

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
