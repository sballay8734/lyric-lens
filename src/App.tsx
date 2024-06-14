import { useState } from "react";
import "./App.css";

// const BASE_URL = "https://api.genius.com/songs/378195";
const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

function App() {
  const [lyric, setLyric] = useState<string>("");

  async function fetchApi() {
    if (lyric.length < 1) return;

    const res = await fetch(
      "https://api.genius.com/search?access_token=" +
        accessToken +
        "&q=" +
        encodeURIComponent(lyric),
    );

    console.log(res.json());
  }

  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <label className="input border-transparent flex items-center gap-2">
          Lyric:
          <input
            onChange={(e) => setLyric(e.target.value)}
            type="text"
            className="grow"
          />
        </label>
        <button className="btn" onClick={fetchApi}>
          Search
        </button>
      </div>
    </main>
  );
}

export default App;

// !TODO: Should be able to search by Artist & Lyric at the same time
// TODO: Dropdown should update as user types into the input

// mTODO: Add user feedback if lyric field is empty
