import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DEFAULT_FLAG_PROFILE_PRESETS } from "../constants/defaultProfiles";
import { FLAGGABLE_WORDS_MASTER } from "../constants/flaggableWords";
import GraphWrapper from "../features/Graph/components/GraphWrapper";
import Overlay from "../features/Graph/components/Overlay";
import {
  setFlaggedWords,
  setPreset,
  setWordFamilies,
} from "../features/WordManagement/redux/wordManagementSlice";
import getFlaggedFamilies, {
  getFlaggedWords,
} from "../features/WordManagement/utils/getFlaggedWords";

const FALLBACK_PRESET = DEFAULT_FLAG_PROFILE_PRESETS[0];

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const flaggedWords = getFlaggedWords(FLAGGABLE_WORDS_MASTER);
    dispatch(setFlaggedWords(flaggedWords));

    const wordFamilies = getFlaggedFamilies(FLAGGABLE_WORDS_MASTER);
    dispatch(setWordFamilies(wordFamilies));

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
