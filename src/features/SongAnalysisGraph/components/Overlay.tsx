import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import BottomBtnsWrapper from "../../ModalManagement/containers/BottomBtnsWrapper";
import ProfileSwitcher from "../../WordManagement/components/ProfileSwitcher";

export default function Overlay(): React.JSX.Element {
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );

  return (
    <div className="pointer-events-none absolute top-0 z-[997] flex h-full w-full flex-col justify-end p-2">
      <div
        className={`pointer-events-auto flex min-h-60 w-full min-w-60 flex-col items-center gap-2 rounded-md bg-slate-400/10 p-2 backdrop-blur-sm`}
      >
        {/* Song and Artists */}
        <div className="flex h-full w-full flex-col items-center">
          <h2 className="flex flex-grow items-center text-xl font-bold text-gray-300">
            {!selectedSong ? "NO SONG SELECTED" : `"${selectedSong.title}"`}
          </h2>
          {selectedSong && (
            <h2 className="w-fit rounded-sm bg-slate-900/80 px-3 py-2 text-gray-500">
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
