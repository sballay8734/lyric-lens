import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DEFAULT_FLAG_PROFILE_PRESETS } from "../constants/defaultProfiles";
import {
  setCurrentPreset,
  setDefaultPresets,
  setFlaggedFamilies,
} from "../features/FlagManagement/redux/flagManagementSlice";
import findFlaggedFamilies from "../features/FlagManagement/utils/findFlaggedFamilies";
import Graph from "../features/SongAnalysisGraph/components/Graph";
import Overlay from "../features/SongAnalysisGraph/components/Overlay";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";

const FALLBACK_PRESET = DEFAULT_FLAG_PROFILE_PRESETS[0];

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch();
  const currentPreset = useAppSelector(
    (state: RootState) => state.flagManagement.currentPreset,
  );
  const currentPresetId = useAppSelector(
    (state: RootState) => state.flagManagement.currentPreset?.presetId,
  );
  const defaultPresets = useAppSelector(
    (state: RootState) => state.flagManagement.defaultPresets,
  );
  const flaggedFamilies = useAppSelector(
    (state: RootState) => state.flagManagement.flaggedFamilies,
  );

  useEffect(() => {
    const curPreset = currentPreset || FALLBACK_PRESET;

    dispatch(setCurrentPreset(curPreset));
    // set words to default object if there is no user
    if (defaultPresets === null) {
      dispatch(setDefaultPresets(DEFAULT_FLAG_PROFILE_PRESETS));
    }

    if (flaggedFamilies === null) {
      const initialFlaggedFamilies = findFlaggedFamilies(curPreset);
      dispatch(setFlaggedFamilies(initialFlaggedFamilies));
    }
  }, [currentPresetId]);

  return (
    <>
      <div className="relative flex h-full w-full flex-col justify-between gap-2">
        {/* GRAPH */}
        <Graph />
        <Overlay />
      </div>
    </>
  );
}
