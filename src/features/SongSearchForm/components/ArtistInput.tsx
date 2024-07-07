import { useEffect, useRef, useState } from "react";
import { MdOutlinePerson } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { ArtistFromApi, ArtistSimple } from "../../../types/apiObjects";
import {
  resetAnalysisResult,
  setLyricsHashMap,
} from "../../FlagManagement/redux/flagManagementSlice";
import {
  setArtistQuery,
  setLyrics,
  setSelectedArtist,
  setSelectedSong,
} from "../redux/songSearchFormSlice";

const publicUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL || "/proxy";

export default function ArtistInput(): React.JSX.Element {
  const controllerRef = useRef<AbortController>();
  // LOCAL STATE
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);
  // mTODO: Type artistsArray
  const [artists, setArtists] = useState([]);

  // REDUX STATE
  const dispatch = useAppDispatch();
  const artistQuery = useAppSelector(
    (state) => state.songSearchForm.artistQuery,
  );
  const selectedArtist = useAppSelector(
    (state: RootState) => state.songSearchForm.selectedArtist,
  );
  const songsLoading = useAppSelector(
    (state: RootState) => state.songSearchForm.songsLoading,
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
      q: query,
      per_page: "10", // Adjust as needed
      page: "1", // Adjust if you want to implement pagination
    });

    const artistQuery = `${publicUrl}/api/search/artist?${params}`;

    try {
      const res = await fetch(artistQuery, { signal });

      const data = await res.json();
      // console.log(data);

      const artistsArray = data.response.sections[0].hits.map(
        (item: ArtistFromApi) => {
          return {
            name: item.result.name,
            slug: item.result.slug,
            id: item.result.id,
          };
        },
      );

      setArtists(artistsArray);
    } catch (error) {
      if (error instanceof DOMException) {
        // console.log("Intentional DOMException Error");
        return;
      }
      console.log(error);
    }
  }

  function handleArtistSelect(artist: ArtistSimple) {
    // do nothing if user clicks on the artist that is already selected
    // REVIEW: Do you need to lowercase here vvv did you alredy do that?
    if (selectedArtist && artist.name === selectedArtist.name) return;

    // clear selected song since new artist = completely different songs
    dispatch(setSelectedSong(null));

    // clear songLyricHashMap since new song is being selected
    dispatch(setLyricsHashMap(null));

    // clear lyrics
    dispatch(setLyrics(null));

    // clear old analysis result
    dispatch(resetAnalysisResult());

    // setSelectedArtist to the new selection
    dispatch(setSelectedArtist(artist));

    // close dropdown and clear artist input
    setDropdownIsShown(false);
    dispatch(setArtistQuery(""));

    // clear the array used for filtering <li>s in dropdown
    setArtists([]);
  }

  // REMEMBER: Specify React.Something rather than just "Something"
  function handleEnterKeyPress(e: React.KeyboardEvent, artist: ArtistSimple) {
    if (e.key === "Enter") {
      handleArtistSelect(artist);
    }
  }

  // FILTER ARTISTS
  const artistsToShow = artists
    .filter((artist: ArtistSimple) =>
      artist.name.toLocaleLowerCase().includes(artistQuery.toLocaleLowerCase()),
    )
    .map((artist: ArtistSimple) => artist);

  // console.log(artistsToShow);

  return (
    <div ref={dropdownRef} className="relative w-full rounded-sm">
      {/* vv INPUT vv */}
      <label
        className={`group flex h-[58px] items-center gap-2 rounded-sm border-[1px] border-transparent bg-base-300 px-4 py-4 transition-colors duration-200 hover:border-primary hover:bg-primary/5 ${
          songsLoading
            ? "pointer-events-none opacity-30"
            : "pointer-events-auto opacity-100"
        }`}
      >
        <input
          disabled={songsLoading}
          type="text"
          className={`grow border-0 bg-transparent outline-0 focus:border-none focus:outline-none ${
            selectedArtist?.name
              ? "placeholder:font-bold placeholder:text-white"
              : "placeholder:text-neutral-content/50"
          }`}
          placeholder={selectedArtist?.name ? selectedArtist.name : "Artist"}
          maxLength={100}
          value={artistQuery}
          onChange={(e) => fetchArtists(e.target.value)}
          onClick={() => {
            // If user clicks outside while typing, this will reopen the filtered list when they click back in the input
            if (artistsToShow.length > 0) {
              setDropdownIsShown(true);
            }
          }}
        />
        <MdOutlinePerson
          size={18}
          className="text-neutral-content/50 transition-colors duration-200 group-hover:text-primary"
        />
      </label>
      {/* vv DROPDOWN vv */}
      <ul
        className={`dropdown-content absolute bottom-0 top-16 z-10 flex h-fit max-h-[300px] w-full flex-col overflow-scroll rounded-sm border-0 bg-dropdownBg text-neutral-content ${
          artistQuery.length < 1 ? "p-0" : "p-2"
        } ${
          dropdownIsShown
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } transition-opacity duration-200`}
      >
        {artistQuery.length > 0 &&
          artistsToShow.map((artist: ArtistSimple) => {
            return (
              <li
                tabIndex={0}
                onClick={() => handleArtistSelect(artist)}
                onKeyDown={(e) => handleEnterKeyPress(e, artist)}
                className="cursor-pointer rounded-md border-0 px-2 py-2 text-left outline-0 transition-colors duration-200 hover:bg-primary/20 hover:text-white focus:bg-primary active:bg-primary/80"
                key={artist.id}
              >
                {artist.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
