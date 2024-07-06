import { mockUser } from "../data/mockUser";
import { sensitiveWordsMap } from "../data/sensitiveWordMap";
import WordBtn from "../features/FlagManagement/components/WordToggleBtn";

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

// const vulgarityLvls = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

// interface Props {
//   user: User | null;
// }

const testPresetId = "PRE001";

export default function ManageFlags(): React.JSX.Element {
  const testUser: User = mockUser;

  return (
    <div className="h-full w-full p-4 flex flex-col">
      <div className="header flex flex-col gap-2 h-full">
        <h1 className="text-xl font-bold">Flag Manager</h1>
        <p className="text-neutral-content/50">
          Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dignissimos nostrum, molestias id cupiditate corrupti voluptatibus
          animi nulla quod quae numquam enim, eligendi facere sunt, at quidem!
        </p>
        <div className="divider"></div>
        {/* THIS DIV BELOW */}
        <div className="h-full overflow-auto">
          <div className="h-full pb-20">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {Object.entries(sensitiveWordsMap).map(([word, data]) => {
                const activePreset = testUser?.presets.find(
                  (preset) => preset.id === testPresetId,
                );

                // only render main word, not all variations
                if (!data.isRootWord) return;

                return (
                  <WordBtn
                    key={data.id}
                    word={word}
                    isActive={
                      !!activePreset?.flaggedWords[data.id] ||
                      data.vulgarityLvl >= 6
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Sort words by vulgarity level inside their own li with 10 at top

// !TODO I think the btmSheet is blocking gestures
