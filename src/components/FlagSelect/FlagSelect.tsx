import { SensitiveWordsMap } from "../../data/sensitiveWordMap";

type Word = string;

type Preset = {
  presetId: string;
  presetName: string;
  flaggedWords: {
    [wordId: string]: Word;
  };
};

export interface User {
  id: string;
  presets: Preset[];
}

export default function FlagSelect(user: User): React.JSX.Element {
  return <div></div>;
}

// mTODO: This can be optimized but for now this is fine
// 1. display all sensitive words
// 2. set words in users "flagged words" to active
