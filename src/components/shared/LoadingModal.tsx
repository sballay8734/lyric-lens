import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";

export default function LoadingModal(): React.JSX.Element {
  const [progress, _] = useState<number>(0);

  const lyricsLoading = useAppSelector(
    (state: RootState) => state.songSearch.lyricsLoading,
  );

  return (
    <dialog open={lyricsLoading} id="loadingModal" className={`modal`}>
      {/* NOTE: negative margin is to offset global padding */}
      <div className="modal-box flex items-center justify-center w-[80%] gap-6 bg-neutral flex-col rounded-sm mb-[72px]">
        <div className="flex items-center justify-center gap-2">
          <h3>Fetching lyrics...</h3>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
        {/* Progress bar */}
        <div className="h-[2px] w-full bg-red-500 rounded-full relative overflow-hidden">
          <div
            className="bg-black h-full absolute left-0 top-0 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${progress - 100}%)` }}
          ></div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-black/50"></form>
    </dialog>
  );
}
