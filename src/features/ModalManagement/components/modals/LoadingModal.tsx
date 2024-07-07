import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useAppSelector } from "../../../../hooks/hooks";
import { RootState } from "../../../../store/store";

export default function LoadingModal(): React.JSX.Element {
  const [progress, _] = useState<number>(0);

  const lyricsLoading = useAppSelector(
    (state: RootState) => state.songSearchForm.lyricsLoading,
  );

  return (
    <dialog open={lyricsLoading} id="LoadingModal" className={`modal`}>
      <div className="modal-box flex w-[80%] flex-col items-center justify-center gap-6 rounded-sm bg-neutral">
        <div className="flex items-center justify-center gap-2">
          <h3>Fetching lyrics...</h3>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
        {/* Progress bar */}
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-red-500">
          <div
            className="absolute left-0 top-0 h-full bg-black transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${progress - 100}%)` }}
          ></div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-black/50"></form>
    </dialog>
  );
}
