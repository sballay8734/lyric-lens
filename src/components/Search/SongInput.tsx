import { useEffect, useState } from "react";
import { MdTitle } from "react-icons/md";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { SongFromApi } from "../../types/api";

const bearer = "Bearer " + import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

export default function SongInput(): React.JSX.Element {
  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearch.selectedArtist,
  );
  // mTODO: Need to add type for array here vvv
  const [artistSongs, setArtistSongs] = useState([]);

  // Everytime artist selection changes, clear song list and fetch new songs
  useEffect(() => {
    if (selectedArtist) {
      fetchSongs(selectedArtist?.id);
    }
  }, [selectedArtist]);

  // fetchSongs by selectedArtist (Taylor Swift goes up to 32 sheeeeesh)
  async function fetchSongs(artistId: number) {
    // !TODO: You need to also track errors that happen during each request
    let artistSongs: SongFromApi[] = [];
    let currentPage = 1;

    // keep grabbing songs until an empty array is returned BEFORE filtering
    while (currentPage < 100) {
      const getAllSongsQuery = `/official-proxy/artists/${artistId}/songs?sort=popularity&per_page=50&page=${currentPage}`;

      // get 50 songs
      try {
        const res = await fetch(getAllSongsQuery, {
          headers: {
            Authorization: bearer,
          },
        });

        // mTODO: Type response here
        const data = await res.json();

        // REMEMBER: This must happen BEFORE you filter the songs
        // If ...songs.length === 0 then you've reached lastPage + 1
        if (data.meta.status === 200 && data.response.songs.length === 0) {
          break;
        }

        const filteredSongs = data.response.songs.filter((song: SongFromApi) =>
          selectedArtist
            ? song.artist_names
                .toLocaleLowerCase()
                .includes(selectedArtist?.name.toLocaleLowerCase())
            : false,
        );

        artistSongs = [...artistSongs, ...filteredSongs];
      } catch (error) {
        console.log(error);
      }

      currentPage += 1;
    }

    console.log(artistSongs);
    return artistSongs;
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
