import { sensitiveWordsMap } from "../../data/sensitiveWordMap";
import WordToggleBtn from "./WordToggleBtn";

type Word = string;

type Preset = {
  id: string;
  presetName: string;
  flaggedWords: {
    [wordId: string]: Word;
  };
};

export interface User {
  id: string;
  presets: Preset[];
}

interface Props {
  user: User | null;
}

const testPresetId = "PRE001";

export default function FlagSelect({ user }: Props): React.JSX.Element {
  // render all words
  return (
    <div className="h-full pb-20">
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {Object.entries(sensitiveWordsMap).map(([word, data]) => {
          const activePreset = user?.presets.find(
            (preset) => preset.id === testPresetId,
          );
          return (
            <WordToggleBtn
              key={data.id}
              word={word}
              data={data}
              isActive={!!activePreset?.flaggedWords[data.id]}
            />
          );
        })}
      </div>
    </div>
  );
}

// mTODO: This can be optimized but for now this is fine
// 1. display all sensitive words
// 2. set words in users "flagged words" to active
