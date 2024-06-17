import ArtistFilter from "./ArtistFilter";
import SongFilter from "./SongFilter";

interface Props {
  show: boolean;
}

export default function ByArtistAndTitle({ show }: Props): React.JSX.Element {
  return (
    <div
      className={`relative flex flex-col gap-2 ${
        show ? "translate-x-[100px] opacity-0" : "translate-x-0 opacity-100"
      } transition-all duration-200`}
    >
      <ArtistFilter />
      <SongFilter />
    </div>
  );
}
