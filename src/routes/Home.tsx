export default function Home(): React.JSX.Element {
  return (
    <>
      <div className="flex flex-col justify-between h-full my-4 gap-2 w-full">
        {/* GRAPH */}
        <div className="MainGraph flex flex-col justify-center w-full h-full rounded-md bg-base-100 items-center border-[1px] border-transparent group hover:bg-secondary/30 hover:border-secondary/80 transition-colors duration-200">
          <span>Main Graph</span>
        </div>
      </div>
    </>
  );
}

/*

        <div className="flex flex-col items-center w-full bg-base-100 p-2 rounded-md border-[1px] border-transparent group hover:bg-secondary/30 hover:border-secondary/80 transition-colors duration-200">
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

*/
