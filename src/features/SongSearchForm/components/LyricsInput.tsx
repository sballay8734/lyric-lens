import { MdOutlineLyrics } from "react-icons/md";

import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";

export default function LyricsInput(): React.JSX.Element {
  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedArtist,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  const disabled = selectedArtist && selectedSong ? true : false;

  return (
    // mTODO: Add this and remove the current when feature is added
    // <label
    //   className={`flex items-start gap-2 bg-base-300 py-4 px-4 rounded-sm group border-[1px] border-transparent hover:border-primary hover:bg-primary/5 transition-colors duration-100 ${
    //     disabled
    //       ? "pointer-events-none opacity-30"
    //       : "pointer-events-auto opacity-100"
    //   }`}
    // >
    //   <textarea
    //     rows={8}
    //     disabled={disabled}
    //     maxLength={300}
    //     className="text-area grow bg-transparent outline-0 border-0 placeholder:text-neutral-content/50 resize-none"
    //     placeholder="Coming soon..."
    //   />
    //   <MdOutlineLyrics className="mt-[5px] text-neutral-content/50 group-hover:text-primary transition-colors duration-200" />
    // </label>
    <label
      className={`flex items-start gap-2 bg-base-300 py-4 px-4 rounded-sm group border-[1px] border-transparent pointer-events-none opacity-30`}
    >
      <textarea
        rows={6}
        // mTODO: change true back to "disabled" when functionality is added
        disabled={disabled}
        maxLength={300}
        className="text-area grow bg-transparent outline-0 border-0 placeholder:text-neutral-content/50 resize-none focus:outline-none focus:border-none"
        placeholder="Coming soon..."
      />
      <MdOutlineLyrics className="mt-[5px] text-neutral-content/50 group-hover:text-primary transition-colors duration-200" />
    </label>
  );
}
