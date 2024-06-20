import ArtistFilter from "./ArtistFilter";
import SongFilter from "./SongFilter";

interface Props {
  show: boolean;
}

export default function ByArtistAndTitle({ show }: Props): React.JSX.Element {
  return (
    <div
      className={`absolute top-0 left-0 flex flex-col gap-2 w-full ${
        show
          ? "translate-x-[100px] opacity-0 pointer-events-none"
          : "translate-x-0 opacity-100 pointer-events-auto"
      } transition-all duration-200`}
    >
      <ArtistFilter />
      <SongFilter />
    </div>
  );
}
