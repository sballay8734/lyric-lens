import { useEffect, useRef, useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setArtistQuery,
  setSelectedArtist,
} from "../../store/features/songSearch/songSearchSlice";
import { ArtistHit } from "../../types/api";
import { ArtistSimple } from "../../types/api";

export default function ArtistInput(): React.JSX.Element {
  const controllerRef = useRef<AbortController>();
  // LOCAL STATE
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);
  // mTODO: Type artistsArray
  const [artists, setArtists] = useState([]);

  // REDUX STATE
  const dispatch = useAppDispatch();
  const artistQuery = useAppSelector((state) => state.songSearch.artistQuery);

  // const selectedArtist = useAppSelector(
  //   (state) => state.songSearch.selectedArtist,
  // );

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
      per_page: "10", // Adjust as needed
      page: "1", // Adjust if you want to implement pagination
    });

    const artistQuery = `/proxy/api/search/artist?${params}`;

    try {
      const res = await fetch(artistQuery, { signal });

      const data = await res.json();
      console.log(data);

      const artistsArray = data.response.sections[0].hits.map(
        (item: ArtistHit) => {
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
    // dispatch(setArtistQuery(artistName));
    dispatch(setSelectedArtist(artist));
    setDropdownIsShown(false);
    dispatch(setArtistQuery(""));
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

  console.log(artistsToShow);

  return (
    <div ref={dropdownRef} className="w-full relative rounded-sm">
      {/* vv INPUT vv */}
      <label className="flex items-center gap-2 bg-base-300 py-4 px-4 rounded-sm group border-[1px] border-transparent hover:border-primary hover:bg-primary/5 transition-colors duration-200 h-[58px]">
        <input
          type="text"
          className="grow bg-transparent outline-0 border-0 placeholder:text-neutral-content/50"
          placeholder="Artist"
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
          className="text-neutral-content/50 group-hover:text-primary transition-colors duration-200"
        />
      </label>
      {/* vv DROPDOWN vv */}
      <ul
        className={`dropdown-content bg-dropdownBg text-neutral-content z-10 absolute w-full h-fit max-h-[300px] bottom-0 rounded-sm top-16 overflow-scroll flex flex-col border-0 ${
          artistQuery.length < 1 ? "p-0" : "p-2"
        } ${
          dropdownIsShown
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-200`}
      >
        {artistQuery.length > 0 &&
          artistsToShow.map((artist: ArtistSimple) => {
            return (
              <li
                tabIndex={0}
                onClick={() => handleArtistSelect(artist)}
                onKeyDown={(e) => handleEnterKeyPress(e, artist)}
                className="text-left cursor-pointer py-2 px-2 border-0 hover:bg-primary/20 hover:text-white active:bg-primary/80 transition-colors duration-200 rounded-md focus:bg-primary outline-0"
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

// !TODO: Add loading spinner to show when query request is loading which will also fix slight visual bug where padding is added to ul while the first fetch request is happening