import { useState } from "react";

type Lyric = string;

interface Props {
  show: boolean;
}

export default function LyricFilter({ show }: Props): React.JSX.Element {
  const [lyricQuery, setLyricQuery] = useState<Lyric>("");

  return (
    <div
      className={`relative ${
        show ? "translate-x-0 opacity-100" : "translate-x-[1000px] opacity-0"
      } transition-all duration-200`}
    >
      <label className="input bg-neutral outline-0 flex items-center gap-2 rounded-sm">
        <span className="text-base-content/30">Lyric:</span>
        <input
          onChange={(e) => setLyricQuery(e.target.value)}
          type="text"
          className="text-base-content outline-0 placeholder:text-base-content/30"
          value={lyricQuery}
        />
      </label>
    </div>
  );
}
