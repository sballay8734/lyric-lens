import { useEffect } from "react";
import Graph from "../components/Graph";
import { addFlaggedWord } from "../store/features/flagManager/flagManagerSlice";
import { sensitiveWordsMap } from "../data/sensitiveWordMap";
import { useDispatch } from "react-redux";

const testUser = false;
const testData = {
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
  },
};

export default function Home(): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!testUser) {
      // set words to default object
      Object.values(testData.flaggedWords).forEach((word) => {
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
      <div className="flex flex-col justify-between h-full gap-2 w-full">
        {/* GRAPH */}
        <Graph />
      </div>
    </>
  );
}
