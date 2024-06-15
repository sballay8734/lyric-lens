import { useEffect, useRef, useState } from "react";
import { artists } from "../data/mockArtistData";

type Artist = string;

export default function ArtistFilter(): React.JSX.Element {
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);
  const [artistQuery, setArtistQuery] = useState<Artist>("");
  const [selectedArtist, setSelectedArtist] = useState<Artist>("");

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

  // FILTER ARTISTS
  const artistsToShow = artists.filter((a) =>
    a.toLocaleLowerCase().includes(artistQuery.toLocaleLowerCase()),
  );

  return (
    <div ref={dropdownRef} className="relative">
      <label className="input bg-neutral outline-0 flex items-center gap-2">
        <span className="text-base-content/30">Artist:</span>
        <input
          onChange={(e) => setArtistQuery(e.target.value)}
          onClick={() => {
            // If user clicks outside while typing, this will reopen the filtered list when they click back in the input
            if (artistsToShow.length > 0) {
              setDropdownIsShown(true);
            }
          }}
          type="text"
          className="text-base-content outline-0 placeholder:text-base-content/30"
          placeholder={selectedArtist}
          value={artistQuery}
        />
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
                onClick={() => handleArtistSelect(artist)}
                className="text-left cursor-pointer py-1 px-2 hover:bg-primary/50 active:bg-primary/80 transition-colors duration-100 rounded-sm"
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

// !TODO: Clicking inside inputs causes some weird movement

// TODO: Change placeholder style so it's more clear you selected an artist already
// TODO: Removing the last letter in the input should not flash
// TODO: Make input case insensitive
// TODO: Make input ignore certain charcters if it makes sense like "." (MAYBE)
