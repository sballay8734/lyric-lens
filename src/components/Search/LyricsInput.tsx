import { MdOutlineLyrics } from "react-icons/md";

export default function LyricsInput(): React.JSX.Element {
  return (
    <label className="flex items-start gap-2 bg-base-300 py-4 px-4 rounded-sm group border-[1px] border-transparent hover:border-primary hover:bg-primary/5 transition-colors duration-100">
      <textarea
        rows={8}
        maxLength={300}
        className="text-area grow bg-transparent outline-0 border-0 placeholder:text-neutral-content/50 resize-none"
        placeholder="Enter lyrics"
      />
      <MdOutlineLyrics className="mt-[5px] text-neutral-content/50 group-hover:text-primary transition-colors duration-200" />
    </label>
  );
}
