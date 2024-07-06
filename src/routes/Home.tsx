import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { sensitiveWordsMap } from "../data/sensitiveWordMap";
import { addFlaggedFamily } from "../features/FlagManagement/redux/flagManagementSlice";
import Graph from "../features/SongAnalysisGraph/components/Graph";
import Overlay from "../features/SongAnalysisGraph/components/Overlay";

interface FlaggedWords {
  [id: string]: string;
}

// REMOVE:
const testUser = false;

const defaultProfile = {
  id: "DEFAULT",
  presetName: "Default",
  flaggedWords: generateDefaultFlaggedWordsObject(),
};

function generateDefaultFlaggedWordsObject() {
  const flaggedWords: FlaggedWords = {};
  const unFlaggedWords: FlaggedWords = {};

  Object.keys(sensitiveWordsMap).forEach((word, index) => {
    const { vulgarityLvl, isRootWord } = sensitiveWordsMap[word];

    if (isRootWord && vulgarityLvl > 2) {
      flaggedWords[`SW${index}`] = word;
    } else if (isRootWord && vulgarityLvl <= 2) {
      unFlaggedWords[`SW${index}`] = word;
    }
  });

  // console.log("FLAGGED:", flaggedWords);
  // console.log("NOT FLAGGED:", unFlaggedWords);
  return flaggedWords;
}

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!testUser) {
      // set words to default object if there is no user
      // TODO: Replace with default words
      Object.values(defaultProfile.flaggedWords).forEach((word) => {
        const wordToAdd = {
          id: sensitiveWordsMap[word].id,
          word: word,
          occurances: 0,
          vulgarityLvl: sensitiveWordsMap[word].vulgarityLvl,
          category: sensitiveWordsMap[word].category,
          family: sensitiveWordsMap[word].family,
          isRootWord: sensitiveWordsMap[word].isRootWord,
        };
        dispatch(addFlaggedFamily({ [word]: wordToAdd }));
      });
    } else {
      // set words to users preference
    }
  }, []);

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
