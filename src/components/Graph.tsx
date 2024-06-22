import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";

const testFlaggedWordsList = [
  "GOd",
  "sex",
  "fuCk",
  "kiLl",
  "nigga",
  "niggas",
  "bitch",
  "bitches",
  "ass",
  "motherfuck",
  "motherfucker",
  "pussy",
  "shit",
  "shitll",
  "jesus",
  "christ",
  "hell",
];

interface HashMap {
  [key: string]: number;
}

interface FlaggedWords extends HashMap {
  [key: string]: number;
}

// Graph Wrapper
export default function Graph(): React.JSX.Element {
  const [flaggedWords, setFlaggedWords] = useState<FlaggedWords | null>(null);

  const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);
  // TODO: This is also where you'll bring in the users list of flagged words

  function analyzeLyrics() {
    if (!lyrics) return null;

    const formattedLyrics = lyrics
      .replace(/\[.*?\]/g, "") // removes [Verse 2: ... ] [Chorus: ... ]
      .replace(/\n/g, " ") // replace newlines
      .replace(/[?!.,'"]/g, "") // replace punctuation (? ! . , ')
      .replace(/ {2,}/g, " ") // replace 2 or more consecutive spaces
      .trim();

    console.log("FINAL:", formattedLyrics);

    // split lyrics into array
    const wordArray: string[] = formattedLyrics.split(" ");

    // initialize hash map
    const hashMap: HashMap = {};

    // loop through lyrics
    wordArray.forEach((word) => {
      const formattedWord = word.toLocaleLowerCase();
      // increment count if word exists
      if (hashMap[formattedWord]) {
        hashMap[formattedWord] += 1;
        // add word to hashMap if it isn't in there already
      } else {
        hashMap[formattedWord] = 1;
      }
    });

    // initialize flaggedWordsObject
    const flaggedWords: FlaggedWords = {};

    // check hashMap for flagged words
    // mTODO: vvvvv use words provided by the user here vvvvv
    testFlaggedWordsList.forEach((word) => {
      const formattedWord = word.toLocaleLowerCase();

      if (hashMap[formattedWord]) {
        flaggedWords[formattedWord] = hashMap[formattedWord];
      }
    });

    return flaggedWords;
  }

  // REMOVE: Just for testing while you work on graph
  function formatResponse() {
    if (!flaggedWords || Object.keys(flaggedWords).length === 0) {
      return <div>No flagged words found! Song is clean!</div>;
    }

    return (
      flaggedWords &&
      Object.keys(flaggedWords).map((word) => {
        const desc = flaggedWords[word] === 1 ? "time" : "times";
        return (
          <div key={word}>
            {word} appeared {flaggedWords[word]} {desc}
          </div>
        );
      })
    );
  }

  // run lyric analysis whenever user changes the song
  useEffect(() => {
    const analysisObject = analyzeLyrics();
    if (analysisObject) {
      setFlaggedWords(analysisObject);
    } else {
      setFlaggedWords(null);
    }
  }, [lyrics]);

  return (
    <div className="MainGraph flex flex-col justify-center w-full h-full rounded-md bg-base-100 items-center border-[1px] border-transparent group hover:bg-secondary/30 hover:border-secondary/80 transition-colors duration-200">
      <span>
        {flaggedWords ? formatResponse() : "You need to choose a song"}
      </span>
    </div>
  );
}

// Graph with d3
// REMEMBER: Most D3 modules (including d3-scale, d3-array, d3-interpolate, and d3-format) don’t interact with the DOM, so there is no difference when using them in React. You can use them in JSX for purely declarative visualization.

// REMEMBER: D3 modules that operate on selections (including d3-selection, d3-transition, and d3-axis) do manipulate the DOM, which competes with React’s virtual DOM. In those cases, you can attach a ref to an element and pass it to D3 in a useEffect hook.

// RESOURCE FOR ABOVE - https://d3js.org/getting-started#d3-in-react
export function NewGraph(): React.JSX.Element {
  return <div></div>;
}

// D3 Graphs to check out ****************************************************
// FAVORITE: Disjoint foce-directed graph
// why? Words that are not in the selected songs lyrics should not be attached to the center node which is achievable with this graph below:
// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

// Other possible options: ***************************************************
// Circle Packing - https://observablehq.com/@d3/bubble-chart/2?intent=fork
// Bubble Chart -

// const testHtml = () => {
//   return (
//     <>
//       {/* VERSE 1 ********************************************************** */}
//       [Verse 1: Taylor Swift]<br></br>
//       <a>
//         <span>
//           I was supposed to be sent away<br></br>But they forgot to come and get
//           me
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>
//           I was a functioning alcoholic<br></br>'Til nobody noticed my new
//           aesthetic
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>
//           All of this to say I hope you're okay<br></br>But you're the reason
//           <br></br>And no one here's to blame<br></br>But what about your quiet
//           treason?
//         </span>
//       </a>
//       <br></br>
//       {/* CHORUS 1 ********************************************************* */}
//       <br></br>[Chorus: Taylor Swift]<br></br>
//       <a>
//         <span>And for a fortnight there, we were forever</span>
//       </a>
//       <br></br>
//       <a>
//         <span>
//           Run into you sometimes, ask about the weather<br></br>Now you're in my
//           backyard, turned into good neighbors
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>Your wife waters flowers, I wanna kill her</span>
//       </a>
//       <br></br>
//       <div data-exclude-from-selection="true">
//         <div></div>
//       </div>
//       {/* VERSE 2 ********************************************************** */}
//       [Verse 2: Taylor Swift, <i>Taylor Swift &amp; Post Malone</i>,{" "}
//       <b>Post Malone</b>]<br></br>
//       <a>
//         <span>
//           All my mornings are Mondays stuck in an <i>endless February</i>
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>
//           I took the miracle move-on drug, the <i>effects were temporary</i>
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>
//           And I love you, it's ruining my life<br></br>
//           <b>I love you, it's ruining my life</b>
//         </span>
//       </a>
//       <br></br>I touched you for only a fortnight<br></br>
//       <b>I touched you</b>, but I touched you<br></br>
//       {/* CHORUS 2 ********************************************************* */}
//       <br></br>[Chorus: Taylor Swift, <i>Taylor Swift &amp; Post Malone</i>]
//       <br></br>
//       <a>
//         <span>
//           And for a fortnight there, <i>we were forever</i>
//         </span>
//       </a>
//       <br></br>Run into you sometimes, ask <i>about the weather</i>
//       <br></br>Now you're in my backyard, turned <i>into good neighbors</i>
//       <br></br>
//       <a>
//         <span>Your wife waters flowers, I wanna kill her</span>
//       </a>
//       <br></br>
//       <a>
//         <span>
//           And for a fortnight there, <i>we were together</i>
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>Run into you sometimes, comment on my sweater</span>
//       </a>
//       <br></br>Now you're at the mailbox, turned into good neighbors<br></br>
//       <a>
//         <span>My husband is cheating, I wanna kill him</span>
//       </a>
//       <br></br>
//       {/* BRIDGE ********************************************************** */}
//       <br></br>[Bridge: Taylor Swift, <i>Post Malone</i>,{" "}
//       <b>Taylor Swift &amp; Post Malone</b>]<br></br>
//       <a>
//         <span>
//           I love you, it's ruining my life<br></br>
//           <i>I love you, it's ruining my life</i>
//         </span>
//       </a>
//       <br></br>I touched you for only a fortnight<br></br>
//       <b>I touched you, I touched you</b>
//       <br></br>
//       <a>
//         <span>
//           I love you, it's ruining my life<br></br>
//           <b>I love you, it's ruining my life</b>
//         </span>
//       </a>
//       <br></br>I touched you for only a fortnight<br></br>
//       <b>I touched you, I touched you</b>
//       <br></br>
//       {/* OUTRO ********************************************************** */}
//       [Outro: Post Malone, <i>Post Malone &amp; Taylor Swift</i>,{" "}
//       <b>Taylor Swift</b>]<br></br>
//       <a>
//         <span>
//           Thought of callin' ya, but you won't pick up<br></br>'Nother fortnight
//           lost in America
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>Move to Florida,</span>
//       </a>{" "}
//       <a>
//         <span>
//           <i>buy the car you want</i>
//         </span>
//       </a>
//       <br></br>
//       <a>
//         <span>
//           But it won't start up 'til you <i>touch, touch, touch me</i>
//         </span>
//       </a>
//       <br></br>
//       <b>
//         Thought of calling ya, but you won't pick up<br></br>'Nother fortnight
//         lost in America<br></br>
//         <a>
//           <span>Move to Florida,</span>
//         </a>{" "}
//         <a>
//           <span>buy the car you want</span>
//         </a>
//       </b>
//       <b>But it won't start up 'til I touch, touch, touch you</b>
//     </>
//   );
// };

// TODO: ALL of the user's flagged words should be visible but only the ones in the song should be connected to the graph (the others should be small, faded, and around the edges of the screen)

// TODO: Put overlay at top of screen that shows the current artist and song displayed on the graph

// !TODO: Add a "View full lyrics" option that shows the song formatted by section (verse, chorus, etc...) and highlights the words that were flagged

// !TODO: You have to handle words like "shitll" (from "shit'll" but you remove punctuation) unfortunately. This might end up not being that bad. Keeping in the opostrophes or spliting words differently might not be too hard

// !TODO: Add a button to clear all inputs quickly
