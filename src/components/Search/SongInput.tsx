import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { SongFromApi } from "../../types/api";

import { FaCaretDown } from "react-icons/fa";

const bearer = "Bearer " + import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

export default function SongInput(): React.JSX.Element {
  const dropdownRef = useRef<HTMLDivElement>(null);
  // !TODO: Change this back to false for the default value vvvvvvvvvvvvvv
  const [songDropdownShown, setSongDropdownShown] = useState<boolean>(true);
  const [songTitle, setSongTitle] = useState<string>("");

  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearch.selectedArtist,
  );

  // !TODO: MOVE BELOW STATE TO REDUX
  const [songList, setSongList] = useState<SongFromApi[]>([]);
  // const [selectedSong, setSelectedSong] = useState<SongFromApi | null>(null);
  // const [selectedLyrics, setSelectedLyrics] = useState<string | null>(null);

  // Fetch a single page of songs for an artist
  const fetchSongsPage = useCallback(async (artistId: number, page: number) => {
    const getAllSongsQuery = `/official-proxy/artists/${artistId}/songs?sort=popularity&per_page=50&page=${page}`;
    const res = await fetch(getAllSongsQuery, {
      headers: { Authorization: bearer },
    });
    return res.json();
  }, []);

  // Batch all requests and sends them at the same time
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
        // We also check pageviews as a method to handle garbage songs
        const filteredSongs = data.response.songs.filter((song: SongFromApi) =>
          selectedArtist && song.stats.pageviews && song.stats.pageviews >= 1000
            ? song.artist_names
                .toLocaleLowerCase()
                .includes(selectedArtist?.name.toLocaleLowerCase())
            : false,
        );

        // Add filtered songs to the main array
        artistSongs = [...artistSongs, ...filteredSongs];
      }

      // Sort songs for dropdown (most current at top)
      artistSongs.sort((a: SongFromApi, b: SongFromApi) => {
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

      console.log(artistSongs);
      setSongList(artistSongs);
    },
    [selectedArtist, fetchSongsPage],
  );

  // Fetch and parses the lyrics
  async function handleSongSelect(song: SongFromApi) {
    // 1. close dropdown
    // 1. set song and update placeholder
    // 2. fetch lyrics from lyricsPath
    // 3. start analyzing BEFORE user clicks "analyze"
    // console.log(song);

    const lyricsPath = song.url.replace("https://genius.com", "");
    const getLyricsQuery = `/proxy${lyricsPath}`;

    const res = await fetch(getLyricsQuery);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const lyricsElements = doc.querySelectorAll("div[data-lyrics-container]");
    if (lyricsElements.length > 0) {
      let fullLyrics = "";
      lyricsElements.forEach((element) => {
        const lyricsHtml = element.innerHTML;
        const formattedLyrics = lyricsHtml
          .replace(/<br\s*\/?>/gi, "\n") // Replace <br> tags with newlines
          .replace(/<(?:.|\n)*?>/gm, ""); // Remove remaining HTML tags
        fullLyrics += formattedLyrics.trim() + "\n\n"; // Add two newlines between sections
      });

      console.log(fullLyrics.trim());
      // You can now use fullLyrics as needed (e.g., set it to state, display it, etc.)
    } else {
      console.log("Lyrics not found");
    }
  }

  // Accessiblity (select song by pressing the enter key)
  function handleEnterKeyPress(e: React.KeyboardEvent, song: SongFromApi) {
    if (e.key === "Enter") {
      handleSongSelect(song);
    }
  }

  // Handle filtering of song title input/dropdown
  useEffect(() => {
    // Prevent filter from running and close dropdown if input is cleared
    if (songTitle === "") {
      setSongDropdownShown(false);
      return;
    }

    setSongDropdownShown(true);
  }, [songTitle]);

  // Handle dropdown state change
  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof HTMLElement &&
        !dropdownRef.current.contains(event.target)
      ) {
        setSongDropdownShown(false);
      }
    };

    // Attach the event listener when the dropdown is shown
    if (songDropdownShown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Clean up the event listener when the component unmounts or the dropdown is hidden
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [songDropdownShown]);

  // Clear song list and fetch new songs when user changes the artist
  useEffect(() => {
    if (selectedArtist) {
      fetchSongs(selectedArtist?.id);
    }
  }, [selectedArtist, fetchSongs]);

  // Filter dropdown items based on input
  const songsToShow = songList.filter((song: SongFromApi) =>
    song.title.toLocaleLowerCase().includes(songTitle.toLocaleLowerCase()),
  );

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
          onChange={(e) => setSongTitle(e.target.value)}
          onClick={() => {
            // If user clicks outside while typing, this will reopen the filtered list when they click back in the input
            if (songsToShow.length > 0) {
              setSongDropdownShown(true);
            }
          }}
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
        className={`dropdown-content bg-dropdownBg text-neutral-content z-10 absolute w-full h-fit max-h-[300px] bottom-0 rounded-sm top-16 overflow-y-scroll flex flex-col border-0 ${
          songsToShow.length < 1 ? "p-0" : "pb-2 pt-0"
        } ${
          songDropdownShown
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-200`}
      >
        {songsToShow.length > 0 &&
          songsToShow.reduce<React.JSX.Element[]>((acc, song, index) => {
            const currentYear =
              song.release_date_components?.year || "Unreleased";
            const prevYear =
              index > 0
                ? songsToShow[index - 1].release_date_components?.year ||
                  "Unreleased"
                : null;

            if (currentYear !== prevYear) {
              acc.push(
                <li
                  key={`${song.full_title}`}
                  className="text-lg font-bold py-2 sticky top-0 bg-dropdownBgDarker z-10"
                >
                  {currentYear}
                </li>,
              );
            }

            const releaseMonth =
              (song.release_date_for_display &&
                song.release_date_for_display.split(" ")[0]) ||
              "";

            acc.push(
              <li
                tabIndex={0}
                onClick={() => handleSongSelect(song)}
                onKeyDown={(e) => handleEnterKeyPress(e, song)}
                className="text-left cursor-pointer py-2 pr-2 pl-4 border-0 hover:bg-primary/20 hover:text-white active:bg-primary/80 transition-colors duration-200 focus:bg-primary outline-0 flex justify-between items-center"
                key={song.id}
              >
                <div className="flex gap-1 items-center overflow-hidden flex-grow mr-2">
                  <span className="shrink-0">{song.title}</span>
                  <span className="italic text-neutral-content/50 shrink-0">
                    -
                  </span>
                  <span className="italic text-neutral-content/50 text-xs align-baseline mt-[1px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {song.artist_names}
                  </span>
                </div>
                <span className="ml-auto text-xs text-right text-orange-500/50 shrink-0">
                  {song.release_date_components &&
                  song.release_date_components.year &&
                  song.release_date_for_display
                    ? `${releaseMonth}, ${song.release_date_components.year}`
                    : "UNRELEASED"}
                </span>
              </li>,
            );

            return acc;
          }, [])}
      </ul>
    </div>
  );
}

// ************************** TODO FOR SATURDAY ***************************
// !TODO: NOT ALL THE LYRICS ARE LOGGING (only like half or 2/3 of them)

// TODO: Fix weird padding thing when artist dropdown is loading
// TODO: Close song title dropdown on song select (and start analysis)
// TODO: Close btmSheet when analyze is complete
// TODO: Make sure inputs clearing properly and/or poulating from state on load
// TODO: Add selected artist somewhere so user knows one is still selected

// TODO: Clear old artist and old songs immediately when new artist is selected
// TODO: Get redux setup to handle song lyrics
// TODO: Add loading states for LOTS of stuff

// !TODO: OPTIMIZATIONS FOR API REQUESTS

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
