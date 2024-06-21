import { useCallback, useEffect } from "react";
import { MdTitle } from "react-icons/md";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { SongFromApi } from "../../types/api";

const bearer = "Bearer " + import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

export default function SongInput(): React.JSX.Element {
  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearch.selectedArtist,
  );

  // Function to fetch a single page of songs for an artist
  const fetchSongsPage = useCallback(async (artistId: number, page: number) => {
    const getAllSongsQuery = `/official-proxy/artists/${artistId}/songs?sort=popularity&per_page=50&page=${page}`;
    const res = await fetch(getAllSongsQuery, {
      headers: { Authorization: bearer },
    });
    return res.json();
  }, []);

  const fetchSongs = useCallback(
    async (artistId: number) => {
      let artistSongs: SongFromApi[] = [];
      const pagePromises = [];

      // Create promises for fetching up to 35 pages of songs
      /* NOTE: Avoiding the hardcoded upperbound for "page" would be ideal but  99.99% of artists have less than 35 pages */
      // SEE BOTTOM FOR REFERENCE
      for (let page = 1; page <= 35; page++) {
        pagePromises.push(fetchSongsPage(artistId, page));
      }

      // Wait for all page requests to complete
      const results = await Promise.all(pagePromises);

      // mTODO: Type response here
      for (const data of results) {
        // Check if we've reached the end of available songs
        if (data.meta.status === 200 && data.response.songs.length === 0) {
          break;
        }

        // Filter songs to only include those by the selected artist
        const filteredSongs = data.response.songs.filter((song: SongFromApi) =>
          selectedArtist
            ? song.artist_names
                .toLocaleLowerCase()
                .includes(selectedArtist?.name.toLocaleLowerCase())
            : false,
        );
        // Add filtered songs to the main array
        artistSongs = [...artistSongs, ...filteredSongs];
      }

      console.log(artistSongs);
      return artistSongs;
    },
    [selectedArtist, fetchSongsPage],
  );

  // Everytime artist selection changes, clear song list and fetch new songs
  useEffect(() => {
    if (selectedArtist) {
      fetchSongs(selectedArtist?.id);
    }
  }, [selectedArtist, fetchSongs]);

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

// REMEMBER: Your internet at home is terribly slow and 35 pages works okay
// REFERENCE ******************************************************************
// Michael Jackson = 34.52 pages            <---------  MOST
// Drake = 31.22 pages                  <---------  2nd MOST

// Taylor Swift = 28 pages
// Eminiem = 27.62
// Jay-Z = 27.2
// Beyonce = 24.22 pages
// Elvis Presley = 23.32 pages
// Justin Bieber = 21.58 pages
// The Beatles = 21.26 pages
// The Rolling Stones = 20 pages
// Ariana Grande = 16.88 pages
