import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { SongFromApi } from "../../types/api";

import { FaCaretDown } from "react-icons/fa";

const bearer = "Bearer " + import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

export default function SongInput(): React.JSX.Element {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [songDropdownShown, setSongDropdownShown] = useState<boolean>(false);

  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearch.selectedArtist,
  );

  // !TODO: MOVE BELOW STATE TO REDUX
  const [songList, setSongList] = useState<SongFromApi[]>([]);
  // const [selectedSong, setSelectedSong] = useState<SongFromApi | null>(null);
  // const [selectedLyrics, setSelectedLyrics] = useState<string | null>(null);

  // Function to fetch a single page of songs for an artist
  const fetchSongsPage = useCallback(async (artistId: number, page: number) => {
    const getAllSongsQuery = `/official-proxy/artists/${artistId}/songs?sort=popularity&per_page=50&page=${page}`;
    const res = await fetch(getAllSongsQuery, {
      headers: { Authorization: bearer },
    });
    return res.json();
  }, []);

  // Function that batches all requests and sends them at the same time
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

        // Sort songs for dropdown (most current at top)
        filteredSongs.sort((a: SongFromApi, b: SongFromApi) => {
          // Function to safely create a Date object
          const safeDate = (song: SongFromApi) => {
            if (
              song.release_date_components &&
              song.release_date_components.year &&
              song.release_date_components.month &&
              song.release_date_components.day
            ) {
              return new Date(
                song.release_date_components.year,
                song.release_date_components.month - 1,
                song.release_date_components.day,
              );
            }
            // Fallback to a very old date if release date is not available
            return new Date(0);
          };

          const dateA = safeDate(a);
          const dateB = safeDate(b);

          // If both dates are valid, sort by date
          if (dateA.getTime() !== 0 && dateB.getTime() !== 0) {
            return dateB.getTime() - dateA.getTime(); // For descending order
          }

          // If only one date is valid, prioritize the song with a valid date
          if (dateA.getTime() !== 0) return -1;
          if (dateB.getTime() !== 0) return 1;

          // If neither has a valid date, sort alphabetically by title as a fallback
          return a.title.localeCompare(b.title);
        });

        // Add filtered songs to the main array
        artistSongs = [...artistSongs, ...filteredSongs];
      }

      setSongList(artistSongs);
    },
    [selectedArtist, fetchSongsPage],
  );

  async function handleSongSelect(song: SongFromApi) {
    // 1. set song in redux
    // 2. fetch lyrics from lyricsPath
    // 3. start analyzing BEFORE user clicks "analyze"

    const lyricsPath = song.url.replace("https://genius.com", "");
    const getLyricsQuery = `/proxy${lyricsPath}`;
    const res = await fetch(getLyricsQuery);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const lyricsElement =
      doc.querySelector(".lyrics") ||
      doc.querySelector("div[data-lyrics-container]");
    if (lyricsElement) {
      const lyricsHtml = lyricsElement.innerHTML;
      const formattedLyrics = lyricsHtml
        .replace(/<br\s*\/?>/gi, "\n") // Replace <br> tags with newlines
        .replace(/<(?:.|\n)*?>/gm, ""); // Remove remaining HTML tags

      console.log(formattedLyrics.trim());
    } else {
      console.log("Lyrics not found");
    }
  }

  function handleEnterKeyPress(e: React.KeyboardEvent, song: SongFromApi) {
    if (e.key === "Enter") {
      handleSongSelect(song);
    }
  }

  // Everytime artist selection changes, clear song list and fetch new songs
  useEffect(() => {
    if (selectedArtist) {
      fetchSongs(selectedArtist?.id);
    }
  }, [selectedArtist, fetchSongs]);

  console.log(songList);

  return (
    <div ref={dropdownRef} className="w-full relative rounded-sm">
      {/* vv INPUT vv */}
      <label
        className={`flex items-center gap-2 bg-base-300 px-4 py-3 rounded-sm group border-[1px] border-transparent hover:border-primary hover:bg-primary/5 transition-colors duration-200 group h-[58px] ${
          selectedArtist === null
            ? "pointer-events-none opacity-30"
            : "pointer-events-auto opacity-100"
        }`}
      >
        <input
          disabled={selectedArtist === null}
          type="text"
          className="grow bg-transparent outline-0 border-0 placeholder:text-neutral-content/50 disabled:group:pointer-events-none"
          placeholder="Song Title"
          maxLength={100}
        />
        <button
          className="pl-3 py-1 rounded-r-sm border-l-2 border-primary/50 text-primary/50 group hover:text-primary hover:border-primary transition-colors duration-200"
          onClick={() => setSongDropdownShown(!songDropdownShown)}
        >
          <FaCaretDown
            size={22}
            className={`transition-colors duration-200 cursor-pointer text-inherit ${
              songDropdownShown ? "rotate-180" : "rotate-0"
            } transition-transform duration-300`}
          />
        </button>
      </label>
      {/* vv DROPDOWN vv */}
      <ul
        className={`dropdown-content bg-dropdownBg text-neutral-content z-10 absolute w-full h-fit max-h-[300px] bottom-0 rounded-sm top-16 overflow-scroll flex flex-col border-0 ${
          songList.length < 1 ? "p-0" : "p-2"
        } ${
          songDropdownShown
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-200`}
      >
        {songList.length > 0 &&
          songList.map((song: SongFromApi) => {
            // TODO: Move month conversion to helper function
            // FORMAT MONTH HERE
            const releaseMonth =
              (song.release_date_for_display &&
                song.release_date_for_display.split(" ")[0]) ||
              "";

            return (
              <li
                tabIndex={0}
                onClick={() => handleSongSelect(song)}
                onKeyDown={(e) => handleEnterKeyPress(e, song)}
                className="text-left cursor-pointer py-2 px-2 border-0 hover:bg-primary/20 hover:text-white active:bg-primary/80 transition-colors duration-200 rounded-md focus:bg-primary outline-0 flex justify-between"
                key={song.id}
              >
                <span>{song.title_with_featured}</span>
                <span className="ml-auto">
                  {song.release_date_components &&
                  song.release_date_components.year &&
                  song.release_date_for_display
                    ? `${releaseMonth}, ${song.release_date_components.year}`
                    : "-"}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

// ************************** TODO FOR SATURDAY ***************************
// !TODO: NOT ALL THE LYRICS ARE LOGGING (only like half or 2/3 of them)
// !TODO: Lyrics are not properly sorted by date
// TODO: Get redux setup to handle song lyrics
// TODO: Close song title dropdown on song select
// TODO: Close btmSheet when analyze is complete
// TODO: Add year to right side of song title dropdown
// TODO: Add year dividers in dropdown
// TODO: Dropdown should ALSO be a search bar
// TODO: Fix weird padding thing when artist dropdown is loading
// TODO: Add loading states for LOTS of stuff

// ^^^^^^^^^^^^^^^^^^^^^ SATURDAY ^^^^^^^^^^^^^^^^^^^^^^^^

// TODO: maybe provide 50 or so songs quickly so the dropdown can be used or show Loading songs... on song title input or something (idk)

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
