import { useState } from "react";
import "./App.css";
import LyricFilter from "./components/LyricFilter";
import ByArtistAndTitle from "./components/ByArtistAndTitle";

const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;
const testLyric = "You can kiss 100 boys at bars";

function App() {
  const [byLyric, setByLyric] = useState<boolean>(false);
  async function fetchApi() {
    // if (lyricQuery.length < 1) return;
    console.log("HIT");
    return; // !TODO: REMOVE THIS (JUST FOR TESTING)

    const res = await fetch(
      "https://api.genius.com/search?access_token=" +
        accessToken +
        "&q=" +
        encodeURIComponent(testLyric),
    );

    console.log(res.json());
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col h-full gap-2">
        <ByArtistAndTitle show={byLyric} />
        <LyricFilter show={byLyric} />
        <button className="btn btn-accent" onClick={() => setByLyric(!byLyric)}>
          {byLyric
            ? "I know the artist and song title"
            : "I only know some of the lyrics"}
        </button>
      </div>
      <button
        // disabled={!byLyric}
        className={`btn btn-primary ${
          byLyric
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={fetchApi}
      >
        Search
      </button>
    </div>
  );
}

export default App;

// !TODO: Artist and Song Title state needs to be moved to context so you can access it globally

// !TODO: Lyric input should not have dropdown

// TODO: Song input should also exist that will be updated with only the selected artists songs

// TODO: Dropdown should update as user types into the input

// mTODO: Should you add song title field too?

// mTODO: Add user feedback if lyric field is empty

// NOTE: Search should NOT be case sensitive
// NOTE:
