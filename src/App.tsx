import { useState } from "react";
import "./App.css";
import ArtistFilter from "./components/ArtistFilter";

// const BASE_URL = "https://api.genius.com/songs/378195";
const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

function App() {
  const [lyricQuery, setLyricQuery] = useState<string>("");

  async function fetchApi() {
    if (lyricQuery.length < 1) return;

    const res = await fetch(
      "https://api.genius.com/search?access_token=" +
        accessToken +
        "&q=" +
        encodeURIComponent(lyricQuery),
    );

    console.log(res.json());
  }

  return (
    <main className="-full w-full h-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col h-full gap-2">
          <ArtistFilter />
          <label className="input bg-neutral outline-0 flex items-center gap-2">
            <span className="text-base-content/30">Lyric:</span>
            <input
              onChange={(e) => setLyricQuery(e.target.value)}
              onClick={() => console.log("Close dropdown")}
              type="text"
              className="text-base-content outline-0 placeholder:text-base-content/30"
              placeholder={""}
              // value=
            />
          </label>
        </div>
        <button className="btn btn-primary" onClick={fetchApi}>
          Search
        </button>
      </div>
    </main>
  );
}

export default App;

// !TODO: Should be able to search by Artist & Lyric at the same time
// TODO: Dropdown should update as user types into the input

// mTODO: Should you add song title field too?

// mTODO: Add user feedback if lyric field is empty

// NOTE: Search should NOT be case sensitive
// NOTE:
