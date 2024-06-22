import { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";

const testFlaggedWordsList = [
  "GOd",
  "sex",
  "fuCk",
  "kiLl",
  "nigga",
  "bitch",
  "bitches",
  "ass",
];
// REMEMBER: If none of your flagged words have punctuation, this is fine
const regex = /[?!.,']/g;

interface HashMap {
  [key: string]: number;
}

interface FlaggedWords extends HashMap {
  [key: string]: number;
}

export default function Graph(): React.JSX.Element {
  const lyrics = useAppSelector((state: RootState) => state.songSearch.lyrics);
  // TODO: This is also where you'll bring in the users list of flagged words

  function analyzeLyrics() {
    const formattedLyrics = lyrics
      .replace(/\[.*?\]/g, "") // removes [Verse 2: ... ] [Chorus: ... ]
      .replace(/\n/g, " ") // replace newlines
      .replace(regex, "") // replace punctuation (? ! . , ')
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

    // console.log(hashMap);

    const flaggedWords: FlaggedWords = {};

    // check hashMap for flagged words
    testFlaggedWordsList.forEach((word) => {
      const formattedWord = word.toLocaleLowerCase();

      if (hashMap[formattedWord]) {
        flaggedWords[formattedWord] = hashMap[formattedWord];
      }
    });

    console.log(flaggedWords);
  }

  // run lyric analysis whenever user changes the song
  useEffect(() => {
    analyzeLyrics();
  }, [lyrics]);

  return (
    <div className="MainGraph flex flex-col justify-center w-full h-full rounded-md bg-base-100 items-center border-[1px] border-transparent group hover:bg-secondary/30 hover:border-secondary/80 transition-colors duration-200">
      <span>Main Graph</span>
    </div>
  );
}

// D3 Graphs to check out
// Zoomable sunburst (main word as primary, variants outside)
// Circle Packing
// Bubble Chart
// Force Graph

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
