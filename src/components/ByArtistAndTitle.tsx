import { useState } from "react";
import { Song } from "../data/mockSongdata";
import ArtistFilter from "./ArtistFilter";
import SongFilter from "./SongFilter";

interface Props {
  show: boolean;
}

export default function ByArtistAndTitle({ show }: Props): React.JSX.Element {
  const [artistQuery, setArtistQuery] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  const [songTitleQuery, setSongTitleQuery] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<Song>();

  return (
    <div
      className={`relative flex flex-col gap-2 ${
        show ? "translate-x-[100px] opacity-0" : "translate-x-0 opacity-100"
      } transition-all duration-200`}
    >
      <ArtistFilter
        artistQuery={artistQuery}
        setArtistQuery={setArtistQuery}
        selectedArtist={selectedArtist}
        setSelecteArtist={setSelectedArtist}
      />
      <SongFilter
        songTitleQuery={songTitleQuery}
        setSongTitleQuery={setSongTitleQuery}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
      />
    </div>
  );
}
