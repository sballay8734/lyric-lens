import { useCallback, useEffect, useRef, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { SongFromApi } from "../../../types/apiObjects";
import {
  setLyricsLoading,
  setSelectedSong,
  setSongsLoading,
} from "../redux/songSearchFormSlice";
import { fetchAndParseLyrics } from "../utils/parseLyrics";

const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;
const privateUrl =
  import.meta.env.VITE_PRIVATE_API_BASE_URL || "/official-proxy";
const publicUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL || "/proxy";

export default function SongInput(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [songDropdownShown, setSongDropdownShown] = useState<boolean>(false);
  const [songTitle, setSongTitle] = useState<string>("");

  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedArtist,
  );
  const selectedSong = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedSong,
  );
  const songsLoading = useAppSelector(
    (state: RootState) => state.songSearchForm.songsLoading,
  );
  const wordFamilies = useAppSelector(
    (state: RootState) => state.wordManagement.wordFamilies,
  );

  // !TODO: MOVE BELOW STATE TO REDUX
  const [songList, setSongList] = useState<SongFromApi[]>([]);
  // const [selectedSong, setSelectedSong] = useState<SongFromApi | null>(null);

  // Fetch a single page of songs for an artist
  const fetchSongsPage = useCallback(async (artistId: number, page: number) => {
    const getAllSongsQuery = `${privateUrl}/artists/${artistId}/songs?sort=popularity&per_page=50&page=${page}&access_token=${accessToken}`;

    const res = await fetch(getAllSongsQuery);
    return res.json();
  }, []);

  // Batch all requests and sends them at the same time
  const fetchSongs = useCallback(
    async (artistId: number) => {
      dispatch(setSongsLoading(true));

      let artistSongs: SongFromApi[] = [];
      const pagePromises = [];

      // Create promises for fetching up to 35 pages of songs
      for (let page = 1; page <= 10; page++) {
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

      // vv need until load states are added (tells you when requests get back)
      // console.log(artistSongs);

      setSongList(artistSongs);
      dispatch(setSongsLoading(false));
    },
    [selectedArtist, fetchSongsPage, dispatch],
  );

  // mTODO: Move parsing logic to separate function
  // Fetch and parses the lyrics
  async function handleSongSelect(song: SongFromApi) {
    // start lyric fetch and parse so set loading to true
    dispatch(setLyricsLoading(true));

    // clear the songTitle input
    setSongTitle("");

    // update selectedSong in Redux Store
    dispatch(setSelectedSong(song));

    // close the dropdown
    setSongDropdownShown(false);

    const lyricsPath = song.url.replace("https://genius.com", "");
    const getLyricsQuery = `${publicUrl}${lyricsPath}`;

    // fetch, parse, and dispatch lyrics to redux
    if (wordFamilies) {
      fetchAndParseLyrics(getLyricsQuery, dispatch, wordFamilies);
    } else {
      console.error("There are no flagged families!");
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
    <div ref={dropdownRef} className="relative w-full rounded-sm">
      {/* vv INPUT vv */}
      <label
        className={`group flex h-[58px] items-center gap-2 rounded-sm border-[1px] border-transparent bg-base-300 px-4 py-3 transition-colors duration-200 hover:border-primary hover:bg-primary/5 ${
          selectedArtist === null || songsLoading
            ? "pointer-events-none opacity-30"
            : "pointer-events-auto opacity-100"
        }`}
      >
        <input
          disabled={selectedArtist === null || songsLoading}
          type="text"
          className={`disabled:group:pointer-events-none grow border-0 bg-transparent outline-0 placeholder:text-neutral-content/50 focus:border-none focus:outline-none ${
            selectedSong?.title
              ? "placeholder:font-bold placeholder:text-white"
              : "placeholder:text-neutral-content/50"
          }`}
          placeholder={
            selectedSong?.title ? `"${selectedSong.title}"` : "Song Title"
          }
          maxLength={100}
          onChange={(e) => setSongTitle(e.target.value)}
          onClick={() => {
            // If user clicks outside while typing, this will reopen the filtered list when they click back in the input
            if (songsToShow.length > 0) {
              setSongDropdownShown(true);
            }
          }}
          value={songTitle}
        />
        <button
          className="group rounded-r-sm border-l-2 border-primary/50 py-1 pl-3 text-primary/50 transition-colors duration-200 hover:border-primary hover:text-primary"
          onClick={() => setSongDropdownShown(!songDropdownShown)}
        >
          {" "}
          {songsLoading ? (
            <CgSpinnerAlt size={22} className="animate-spin" />
          ) : (
            <FaCaretDown
              size={22}
              className={`cursor-pointer text-inherit transition-colors duration-200 ${
                songDropdownShown ? "rotate-180" : "rotate-0"
              } transition-transform duration-300`}
            />
          )}
        </button>
      </label>
      {/* vv DROPDOWN vv */}
      <ul
        className={`dropdown-content absolute bottom-0 top-16 z-10 flex h-fit max-h-[300px] w-full flex-col overflow-y-scroll rounded-sm border-0 bg-dropdownBg text-neutral-content ${
          songsToShow.length < 1 ? "p-0" : "pb-2 pt-0"
        } ${
          songDropdownShown
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
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
                  className="sticky top-0 z-10 bg-dropdownBgDarker py-2 text-lg font-bold"
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
                className="flex cursor-pointer items-center justify-between border-0 py-2 pl-4 pr-2 text-left outline-0 transition-colors duration-200 hover:bg-primary/20 hover:text-white focus:bg-primary active:bg-primary/80"
                key={song.id}
              >
                <div className="mr-2 flex flex-grow items-center gap-1 overflow-hidden">
                  <span className="shrink-0">{song.title}</span>
                  <span className="shrink-0 italic text-neutral-content/50">
                    -
                  </span>
                  <span className="mt-[1px] overflow-hidden text-ellipsis whitespace-nowrap align-baseline text-xs italic text-neutral-content/50">
                    {song.artist_names}
                  </span>
                </div>
                <span className="ml-auto shrink-0 text-right text-xs text-orange-500/50">
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

// SONG PAGES REFERENCE ******************************************************
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
