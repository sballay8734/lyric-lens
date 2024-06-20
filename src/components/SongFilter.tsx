import { useEffect, useRef, useState } from "react";
import { Song, mockSongs } from "../data/mockSongdata";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  setSelectedSong,
  setSongQuery,
} from "../store/features/songSearch/songSearchSlice";

export default function SongFilter(): React.JSX.Element {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownIsShown, setDropdownIsShown] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const songQuery = useAppSelector((state) => state.songSearch.songQuery);
  const selectedSong = useAppSelector((state) => state.songSearch.selectedSong);

  // Handle queryString state change
  useEffect(() => {
    // Prevent filter from running and close dropdown if input is cleared
    if (songQuery === "") {
      setDropdownIsShown(false);
      return;
    }

    setDropdownIsShown(true);
  }, [songQuery]);

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

  function handleSongSelect(song: Song) {
    const formattedLabel = `${song.artistName}: ${song.songTitle}`;

    dispatch(setSelectedSong(formattedLabel));
    setDropdownIsShown(false);
    dispatch(setSongQuery(""));
  }

  function handleSongRemove() {
    // mTODO: This needs to eventually be changed to a find() method when state is changed to an Array

    dispatch(setSelectedSong(""));
  }

  // REMOVE: vvvvvvv Testing vvvvvvv
  const testArtist = "ABBA";

  const filteredSongs = mockSongs.filter((song) => {
    return song.artistName === testArtist;
  });

  return (
    <div ref={dropdownRef} className="relative">
      <label className="input bg-neutral outline-0 flex items-center gap-2 w-full rounded-sm">
        <span className="text-base-content/30">Song Title:</span>
        <input
          onChange={(e) => dispatch(setSongQuery(e.target.value))}
          onClick={() => {
            // If user clicks outside while typing, this will reopen the filtered list when they click back in the input
            if (filteredSongs.length > 0) {
              setDropdownIsShown(true);
            }
          }}
          type="text"
          className={`text-base-content outline-0 placeholder:text-base-content/30 placeholder:self-end`}
          // placeholder={selectedArtist}
          value={songQuery}
        />
        {selectedSong !== "" && (
          <span className="ml-auto bg-secondary text-xs px-2 py-1 rounded-sm text-secondary-content flex gap-1 items-center">
            {selectedSong}
            <span
              className="p-1 px-2 bg-error cursor-pointer flex items-center justify-center hover:bg-red-500 transition-colors duration-200 rounded-full"
              onClick={handleSongRemove}
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
        {songQuery.length > 0 &&
          filteredSongs.map((song) => {
            return (
              <li
                onClick={() => handleSongSelect(song)}
                className="text-left cursor-pointer py-1 px-2 hover:bg-primary/50 active:bg-primary/80 transition-colors duration-100 rounded-sm"
                key={song.songTitle + song.artistName}
              >
                {song.songTitle}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
