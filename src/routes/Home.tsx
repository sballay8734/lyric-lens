import { useEffect } from "react";
import Graph from "../components/Graph";
import { addFlaggedWord } from "../store/features/flagManager/flagManagerSlice";
import { sensitiveWordsMap } from "../data/sensitiveWordMap";
import { useDispatch } from "react-redux";
import SongArtistOverlay from "../components/Graph/SongArtistOverlay";

interface FlaggedWords {
  [id: string]: string;
}

const testUser = false;
const defaultFlags = {
  id: "PRE001",
  presetName: "Teenager Filter",
  flaggedWords: {
    SW001: "nigger",
    SW003: "nigga",
    SW005: "coon",
    SW013: "rape",
    SW017: "fuck",
    SW021: "shit",
    SW036: "asshole",
    SW041: "bitch",
    SW046: "dick",
    SW048: "pussy",
    SW049: "slut",
  },
};

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

  console.log("FLAGGED:", flaggedWords);
  console.log("OKAY:", unFlaggedWords);
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
        dispatch(addFlaggedWord({ [word]: wordToAdd }));
      });
    } else {
      // set words to users preference
    }
  });
  return (
    <>
      <div className="flex flex-col justify-between h-full gap-2 w-full relative">
        {/* GRAPH */}
        <Graph />
        <SongArtistOverlay />
      </div>
    </>
  );
}

// TODO FOR FRIDAY

// 2. style center nodes
// 3. use markers instead of (10) for word counts (Maybe dots on the edge of the circle)
// 4. Add "Preview Lyrics" btn to songs dropdown
// 5. Add loading feedback when song is changed and lyrics are loading
// 6. Words above around lvl 8 probably don't even need to be shown on graph
