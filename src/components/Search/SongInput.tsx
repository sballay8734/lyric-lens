import { useEffect, useState } from "react";
import { MdTitle } from "react-icons/md";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";

export default function SongInput(): React.JSX.Element {
  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearch.selectedArtist,
  );
  // mTODO: Need to add type for array here vvv
  const [artistSongs, setArtistSongs] = useState([]);

  // Everytime artist selection changes, clear song list and fetch new songs
  useEffect(() => {
    if (selectedArtist) {
      fetchSongs(selectedArtist?.artistId);
    }
  }, [selectedArtist]);

  console.log(selectedArtist);

  // fetchSongs by selectedArtist
  async function fetchSongs(artistId: number) {
    const getAllSongsQuery = `/proxy/api/artists/${artistId.toString()}/songs`;

    try {
      const res = await fetch(getAllSongsQuery);

      const data = await res.json();
      console.log(data);
      return;

      const songsArray = data.response.sections[0].hits.map((item: Hit) => {
        return {
          artistName: item.result.name,
          artistSlug: item.result.slug,
          artistId: item.result.id,
        };
      });

      setArtists(artistsArray);
    } catch (error) {
      if (error instanceof DOMException) {
        // console.log("Intentional DOMException Error");
        return;
      }
      console.log(error);
    }
  }

  return (
    <label className="flex items-center gap-2 bg-base-300 py-4 px-4 rounded-sm group border-[1px] border-transparent hover:border-primary hover:bg-primary/5 transition-colors duration-200">
      <input
        type="text"
        className="grow bg-transparent outline-0 border-0 placeholder:text-neutral-content/50"
        placeholder="Song Title"
        maxLength={100}
      />
      <MdTitle
        size={18}
        className="text-neutral-content/50 group-hover:text-primary transition-colors duration-200"
      />
    </label>
  );
}

// !TODO: This will be interesting because Song Title input needs to be a dropdown AND a search bar
