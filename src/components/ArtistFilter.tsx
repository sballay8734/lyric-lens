import { useEffect, useRef, useState } from "react";
import { artists } from "../data/mockArtistData";

type Artist = string;

interface Props {
  artistQuery: string;
  setArtistQuery: (artist: string) => void;
  selectedArtist: string;
  setSelectedArtist: (artist: string) => void;
}

export default function ArtistFilter({
  artistQuery,
  setArtistQuery,
  selectedArtist,
  setSelectedArtist,
}: Props): React.JSX.Element {
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  function handleArtistSelect(artistName: Artist) {
    setSelectedArtist(artistName);
    setDropdownIsShown(false);
    setArtistQuery("");
  }

  function handleArtistRemove() {
    // mTODO: This needs to eventually be changed to a find() method when state is changed to an Array

    setSelectedArtist("");
  }

  // REMEMBER: Specify React.Something rather than just "Something"
  function handleEnterKeyPress(e: React.KeyboardEvent, artistName: string) {
    if (e.key === "Enter") {
      handleArtistSelect(artistName);
    }
  }

  // mTODO: Should they also be sorted alphabetically
  // FILTER ARTISTS
  const artistsToShow = artists.filter((a) =>
    a.toLocaleLowerCase().includes(artistQuery.toLocaleLowerCase()),
  );

  // SORT ARTISTS
  const sortedArtists = artistsToShow.sort();

  return (
    <div ref={dropdownRef} className="relative">
      <label className="input bg-neutral outline-0 flex items-center gap-2 w-full rounded-sm">
        <span className="text-base-content/30">Artist:</span>
        <input
          onChange={(e) => setArtistQuery(e.target.value)}
          onClick={() => {
            // If user clicks outside while typing, this will reopen the filtered list when they click back in the input
            if (sortedArtists.length > 0) {
              setDropdownIsShown(true);
            }
          }}
          type="text"
          className={`text-base-content outline-0 placeholder:text-base-content/30 placeholder:self-end`}
          // placeholder={selectedArtist}
          value={artistQuery}
        />
        {selectedArtist !== "" && (
          <span className="ml-auto bg-secondary text-xs px-2 py-1 rounded-sm text-secondary-content flex gap-1 items-center">
            {selectedArtist}
            <span
              className="p-1 px-2 bg-error cursor-pointer flex items-center justify-center hover:bg-red-500 transition-colors duration-200 rounded-full"
              onClick={handleArtistRemove}
            >
              x
            </span>
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
          sortedArtists.map((artist) => {
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

// TODO: Change placeholder style so it's more clear you selected an artist already
// TODO: Removing the last letter in the input should not flash
// TODO: Make input case insensitive
// TODO: Make input ignore certain charcters if it makes sense like "." (MAYBE)
// TODO: Should you be able to select multiple Artists at the same time?
// mTODO: use null instead of empty strings for state maybe?
// !TODO: Items off screen should be ignored in tab index (tabing continuously eventually brings you to the lyric search inputs which are hidden)
