import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import ProfileSwitcher from "../../FlagManagement/components/ProfileSwitcher";
import BottomBtnsWrapper from "../../ModalManagement/containers/BottomBtnsWrapper";

export default function Overlay(): React.JSX.Element {
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  return (
    <div className="pointer-events-none absolute top-0 z-[997] flex h-full w-full flex-col justify-end p-2">
      <div
        className={`flex w-full min-w-60 flex-col items-center gap-1 rounded-md bg-slate-400/10 p-2 backdrop-blur-sm`}
      >
        {/* Song and Artists */}
        <div className="flex h-full w-full flex-col items-center">
          <h2 className="mb-1 flex flex-grow items-center font-bold text-white">
            {!selectedSong ? "NO SONG SELECTED" : `"${selectedSong.title}"`}
          </h2>
          {selectedSong && (
            <h2 className="text-faded w-fit rounded-sm bg-slate-900/80 px-2 py-1 text-sm">
              {selectedSong?.artist_names}
            </h2>
          )}
        </div>
        {/* Divider */}
        <div className="divider m-0"></div>
        {/* Nav Btns */}
        <BottomBtnsWrapper />
        <ProfileSwitcher />
      </div>
    </div>
  );
}
