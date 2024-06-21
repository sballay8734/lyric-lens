import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  setArtistQuery,
  setSelectedArtist,
} from "../store/features/songSearch/songSearchSlice";
import { Hit } from "../types/api";
// import { IoIosCloseCircle } from "react-icons/io";

type Artist = string;

interface ArtistFromAPI {
  artistName: string;
  artistSlug: string;
  artistId: number;
}

export default function ArtistFilter(): React.JSX.Element {
  const controllerRef = useRef<AbortController>();
  // LOCAL STATE
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);
  // mTODO: Type artistsArray
  const [artists, setArtists] = useState([]);

  // REDUX STATE
  const dispatch = useAppDispatch();
  const artistQuery = useAppSelector((state) => state.songSearch.artistQuery);
  const selectedArtist = useAppSelector(
    (state) => state.songSearch.selectedArtist,
  );

  // Handle queryString state change
  useEffect(() => {
    // Prevent filter from running and close dropdown if input is cleared
    if (artistQuery === "") {
      setDropdownIsShown(false);
      return;
    }

    setDropdownIsShown(true);
  }, [artistQuery]);

  // Handle dropdown state change
  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof HTMLElement &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownIsShown(false);
      }
    };

    // Attach the event listener when the dropdown is shown
    if (dropdownIsShown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Clean up the event listener when the component unmounts or the dropdown is hidden
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownIsShown]);

  // fetchArtists by user Query
  async function fetchArtists(query: string) {
    dispatch(setArtistQuery(query));
    if (query.length < 2) return; // Don't search for very short queries

    // abort request if one exists
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // start a new request by first setting ref for new AbortController
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    const params = new URLSearchParams({
      // access_token: import.meta.env.VITE_GENIUS_ACCESS_TOKEN,
      q: query,
      per_page: "20", // Adjust as needed
      page: "1", // Adjust if you want to implement pagination
    });

    const artistQuery = `/proxy/api/search/artist?${params}`;

    try {
      const res = await fetch(artistQuery, { signal });

      const data = await res.json();
      console.log(data);

      const artistsArray = data.response.sections[0].hits.map((item: Hit) => {
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

  // fetchArtistSongs
  // async function fetchArtistSongs(artistName: string) {
  //   console.log("Fetching");
  // }

  function handleArtistSelect(artistName: Artist) {
    // dispatch(setArtistQuery(artistName));
    dispatch(setSelectedArtist(artistName));
    setDropdownIsShown(false);
    dispatch(setArtistQuery(""));
  }

  // function handleArtistRemove() {
  //   setSelectedArtist("");
  // }

  // REMEMBER: Specify React.Something rather than just "Something"
  function handleEnterKeyPress(e: React.KeyboardEvent, artistName: string) {
    if (e.key === "Enter") {
      handleArtistSelect(artistName);
    }
  }

  // !TODO: still shows all 20 instead of just the names that match
  // FILTER ARTISTS
  const artistsToShow = artists.map((a: ArtistFromAPI) => a.artistName);

  return (
    <div ref={dropdownRef} className="relative">
      <label className="relative input bg-neutral outline-0 flex items-center gap-2 w-full rounded-sm">
        <span className="text-base-content/30">Artist:</span>
        <input
          onChange={(e) => fetchArtists(e.target.value)}
          onClick={() => {
            // If user clicks outside while typing, this will reopen the filtered list when they click back in the input
            if (artistsToShow.length > 0) {
              setDropdownIsShown(true);
            }
          }}
          type="text"
          className={`text-base-content outline-0 placeholder:text-base-content/30 placeholder:self-end`}
          // placeholder={selectedArtist}
          value={artistQuery}
        />
        {selectedArtist !== "" && (
          <span className="absolute h-5 right-2 bg-secondary text-[8px] px-2 rounded-sm text-secondary-content flex gap-1 items-center justify-center">
            {selectedArtist}
            {/* <IoIosCloseCircle className="cursor-pointer text-error bg-black rounded-full" /> */}
          </span>
        )}
      </label>
      <ul
        className={`dropdown-content bg-base-300 z-[1] absolute w-full h-fit max-h-[300px] bottom-0 rounded-md top-14 overflow-scroll flex flex-col ${
          dropdownIsShown
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-200`}
      >
        {artistQuery.length > 0 &&
          artistsToShow.map((artist) => {
            return (
              <li
                tabIndex={0}
                onClick={() => handleArtistSelect(artist)}
                onKeyDown={(e) => handleEnterKeyPress(e, artist)}
                className="text-left cursor-pointer py-1 px-2 border-0 hover:bg-primary/50 active:bg-primary/80 transition-colors duration-200 rounded-sm focus:bg-primary outline-0"
                key={artist}
              >
                {artist}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
// !TODO: Items off screen should be ignored in tab index (tabing continuously eventually brings you to the lyric search inputs which are hidden)
// !TODO: Artist tags are too small to click (think of another way to remove them)

// TODO: Change placeholder style so it's more clear you selected an artist already
// TODO: Removing the last letter in the input should not flash
// TODO: Make input case insensitive
// TODO: Make input ignore certain charcters if it makes sense like "." (MAYBE)
// TODO: Should you be able to select multiple Artists at the same time?
// mTODO: use null instead of empty strings for state maybe?
