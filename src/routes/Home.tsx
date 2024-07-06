import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DEFAULT_FLAG_PROFILE_PRESETS } from "../constants/defaultProfiles";
import { FLAGGABLE_WORDS_MASTER } from "../constants/flaggableWords";
import {
  setCurrentPreset,
  setDefaultPresets,
  setFlaggedFamilies,
} from "../features/FlagManagement/redux/flagManagementSlice";
import Graph from "../features/SongAnalysisGraph/components/Graph";
import Overlay from "../features/SongAnalysisGraph/components/Overlay";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";

const FALLBACK_PRESET = DEFAULT_FLAG_PROFILE_PRESETS[0];

// REMOVE:
const testUser = false;

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

  useEffect(() => {
    if (!testUser) {
      // set words to default object if there is no user
      if (defaultPresets === null) {
        dispatch(setDefaultPresets(DEFAULT_FLAG_PROFILE_PRESETS));
      }

      const curPreset = currentPreset || FALLBACK_PRESET;

      const allFlaggedWords = Object.entries(curPreset.flaggedWords).reduce(
        (acc, [word, wordData]) => {
          // if the family already exists, just return the prev val
          if (acc[wordData.family]) return acc;

          acc[word] = {
            id: FLAGGABLE_WORDS_MASTER[word].id,
            word: word,
            occurances: 0,
            vulgarityLvl: FLAGGABLE_WORDS_MASTER[word].vulgarityLvl,
            category: FLAGGABLE_WORDS_MASTER[word].category,
            family: FLAGGABLE_WORDS_MASTER[word].family,
            isRootWord: FLAGGABLE_WORDS_MASTER[word].isRootWord,
          };
          return acc;
        },
        {} as Record<
          string,
          (typeof FLAGGABLE_WORDS_MASTER)[string] & {
            word: string;
            occurances: number;
          }
        >,
      );
      console.log("RUNNING");
      dispatch(setFlaggedFamilies(allFlaggedWords));
      dispatch(setCurrentPreset(curPreset));
    } else {
      // set words to users preference
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
