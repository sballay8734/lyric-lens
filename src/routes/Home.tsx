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
      <div className="flex flex-col items-center w-full bg-base-100 p-2 rounded-md my-4">
        <div className="relative h-[250px] flex flex-col gap-2 justify-between w-full">
          <ByArtistAndTitle show={byLyric} />
          <LyricFilter show={byLyric} />
          <div className="flex items-center gap-2 p-2 self-center">
            <p className="text-neutral-content/40">
              {byLyric
                ? "Know the artist and/or song title?"
                : "Only know some of the lyrics?"}
            </p>
            <button
              className="text-accent hover:text-accent/50 transition-colors duration-200"
              onClick={() => setByLyric(!byLyric)}
            >
              Click here
            </button>
          </div>
        </div>
      </div>
      {/* TODO: Move graph above search input */}
      <div className="MainGraph flex flex-col gap-2 justify-center w-full h-full rounded-md bg-base-100 items-center">
        <span>Main Graph</span>
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
