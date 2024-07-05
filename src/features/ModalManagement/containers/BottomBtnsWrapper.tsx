import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import ManageFlagsBtn from "../components/ManageFlagsBtn";
import SearchSongsBtn from "../components/SearchSongsBtn";

export default function BottomBtnsWrapper(): React.JSX.Element {
  const songSearchModalIsVis = useAppSelector(
    (state: RootState) => state.modalManagement.songSearchModalIsVis,
  );

  return (
    <div
      className={`flex items-center justify-between gap-4 absolute bottom-10 w-full z-[999] px-6 ${
        songSearchModalIsVis
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      } transition-opacity duration-200`}
    >
      <ManageFlagsBtn />
      <SearchSongsBtn />
    </div>
  );
}
