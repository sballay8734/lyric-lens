import { useState } from "react";
import {
  SensitiveWordCategory,
  VulgarityLevel,
} from "../../data/sensitiveWordMap";

export interface Props {
  word: string;
  data: {
    id: string;
    vulgarityLvl: VulgarityLevel;
    category: SensitiveWordCategory[];
  };
  isActive: boolean;
}

export default function WordBtn({
  word,
  data,
  isActive,
}: Props): React.JSX.Element {
  const [active, setActive] = useState<boolean>(isActive);

  // console.log(data);

  return (
    <button
      className={`btn ${active ? "bg-primary text-primary-content" : ""}`}
      onClick={() => setActive(!active)}
    >
      {word}
    </button>
  );
}

// TODO: Users should be able to edit related words as well (They may want to allow the word "sucks" for example since it's not always used sexually)

// TODO: Flag state needs to be moved to redux to it can persist if the user changes the route

// TODO: Many words should be active by default since this will mostly be used by parents for their kids (we can assume they won't want words above level 6 or so)

// TODO: There shouldn't be so many buttons. Some btns should auto disable others. "Nigger" should also include "niggers". "jigaboo" should also include "jiggaboo", "jiggerboo", "jigaboos", "jiggaboos", and "jiggerboos" for example

// !TODO: Eventually the default state should be loaded from the users data (we're just setting them all to false by default right now)
