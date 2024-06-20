import { useState } from "react";
import ByArtistAndTitle from "../components/ByArtistAndTitle";
import LyricFilter from "../components/LyricFilter";

const accessToken = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;
const testLyric = "You can kiss 100 boys at bars";

export default function Home(): React.JSX.Element {
  const [byLyric, setByLyric] = useState<boolean>(false);
  async function fetchApi() {
    // if (lyricQuery.length < 1) return;
    console.log("HIT");
    return; // REMOVE: REMOVE THIS (JUST FOR TESTING)

    const res = await fetch(
      "https://api.genius.com/search?access_token=" +
        accessToken +
        "&q=" +
        encodeURIComponent(testLyric),
    );

    console.log(res.json());
  }
  return (
    <>
      <div className="flex flex-col gap-2 justify-center w-full bg-base-100 p-2 rounded-md">
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
    </>
  );
}
