import { Dispatch } from "@reduxjs/toolkit";

import { analyzeLyrics } from "./analyzeLyrics";
import { FlaggedFamiliesObject } from "../../FlagManagement/redux/flagManagementSlice";
import { setLyrics, setLyricsLoading } from "../redux/songSearchFormSlice";

export async function fetchAndParseLyrics(
  url: string,
  dispatch: Dispatch,
  flaggedFamilies: FlaggedFamiliesObject,
) {
  const res = await fetch(url);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // get all elements containing lyrics
  const lyricElements = doc.querySelectorAll("div[data-lyrics-container]");

  // remove tags from markup
  if (lyricElements.length > 0) {
    let fullLyrics = "";

    lyricElements.forEach((element) => {
      let lyricElementHtml = element.innerHTML;

      // remove div that causes formatting issue
      lyricElementHtml = lyricElementHtml.replace(
        /<div[^>]*data-exclude-from-selection="true"[^>]*>.*?<\/div>/gs,
        "\n",
      );

      // format lyrics
      const formattedLyrics = lyricElementHtml
        .replace(/<br\s*\/?>/gi, "\n") // Replace <br> tags with newlines
        .replace(/<\/a[^>]*>/gi, "") // Replace closing </a> tags
        .replace(/<\/b[^>]*>/gi, "") // Replace closing </b> tags
        .replace(/<a[^>]*>/gi, "") // Replace opening <a> tags
        .replace(/<\/?[^>]+(>|$)/g, "") // Replace all remaining tags
        .replace(/(amp;)/g, "") // Replace "amp;"
        .replace(/^(\[.*):.*$/gm, "$1]"); // format [Chorus], [Bridge], etc..

      fullLyrics += formattedLyrics + "\n\n"; // Add 2 lines between sections
    });

    // final cleanup
    fullLyrics = fullLyrics
      .replace(/\n{3,}/g, "\n\n") // replace 3 consecutive lines with 2
      .trim();

    // console.log(fullLyrics);

    // update lyrics in Redux Store
    dispatch(setLyrics(fullLyrics));
    dispatch(setLyricsLoading(false));

    analyzeLyrics(fullLyrics, dispatch, flaggedFamilies);
  } else {
    // mTODO: Handle errors here (when RTK Query is added)
    dispatch(setLyricsLoading(false));
    console.error("Lyrics not found");
  }
}

// const testMarkup = (
//   <div>
//     [Verse 1: Taylor Swift]<br></br>
//     <a>
//       <span>
//         I was supposed to be sent away<br></br>But they forgot to come and get
//         me
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>
//         I was a functioning alcoholic<br></br>'Til nobody noticed my new
//         aesthetic
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>
//         All of this to say I hope you're okay<br></br>But you're the reason
//         <br></br>And no one here's to blame<br></br>But what about your quiet
//         treason?
//       </span>
//     </a>
//     {/* REVIEW: NEW SECTION (2 new lines) */}
//     <br></br>
//     <br></br>[Chorus: Taylor Swift]<br></br>
//     <a>
//       <span>And for a fortnight there, we were forever</span>
//     </a>
//     <br></br>
//     <a>
//       <span>
//         Run into you sometimes, ask about the weather<br></br>Now you're in my
//         backyard, turned into good neighbors
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>Your wife waters flowers, I wanna kill her</span>
//     </a>
//     {/* REVIEW: NEW SECTION (WHY ONLY 1 NEW LINE?) */}
//     <br></br>
//     <div data-exclude-from-selection="true">
//       <div></div>
//     </div>
//     [Verse 2: Taylor Swift, <i>Taylor Swift &amp; Post Malone</i>,{" "}
//     <b>Post Malone</b>]<br></br>
//     <a>
//       <span>
//         All my mornings are Mondays stuck in an <i>endless February</i>
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>
//         I took the miracle move-on drug, the <i>effects were temporary</i>
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>
//         And I love you, it's ruining my life<br></br>
//         <b>I love you, it's ruining my life</b>
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>I touched you for only a fortnight</span>
//     </a>
//     <br></br>
//     <b>I touched you</b>, but I touched you<br></br>
//     <br></br>[Chorus: Taylor Swift, <i>Taylor Swift &amp; Post Malone</i>]
//     <br></br>
//     <a>
//       <span>
//         And for a fortnight there, <i>we were forever</i>
//       </span>
//     </a>
//     <br></br>Run into you sometimes, ask <i>about the weather</i>
//     <br></br>Now you're in my backyard, turned <i>into good neighbors</i>
//     <br></br>
//     <a>
//       <span>Your wife waters flowers, I wanna kill her</span>
//     </a>
//     <br></br>
//     <a>
//       <span>
//         And for a fortnight there, <i>we were together</i>
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>Run into you sometimes, comment on my sweater</span>
//     </a>
//     <br></br>Now you're at the mailbox, turned into good neighbors<br></br>
//     <a>
//       <span>My husband is cheating, I wanna kill him</span>
//     </a>
//     <br></br>
//     <br></br>[Bridge: Taylor Swift, <i>Post Malone</i>,{" "}
//     <b>Taylor Swift &amp; Post Malone</b>]<br></br>
//     <a>
//       <span>
//         I love you, it's ruining my life<br></br>
//         <i>I love you, it's ruining my life</i>
//       </span>
//     </a>
//     <br></br>I touched you for only a fortnight<br></br>
//     <b>I touched you, I touched you</b>
//     <br></br>
//     <a>
//       <span>
//         I love you, it's ruining my life<br></br>
//         <b>I love you, it's ruining my life</b>
//       </span>
//     </a>
//     <br></br>I touched you for only a fortnight<br></br>
//     <b>I touched you, I touched you</b>
//     <br></br>
//     {/* REVIEW: OUTRO (Last line is not formatted correctly) */}
//     [Outro: Post Malone, <i>Post Malone &amp; Taylor Swift</i>,{" "}
//     <b>Taylor Swift</b>]<br></br>
//     <a>
//       <span>
//         Thought of callin' ya, but you won't pick up<br></br>'Nother fortnight
//         lost in America
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>Move to Florida,</span>
//     </a>{" "}
//     <a>
//       <span>
//         <i>buy the car you want</i>
//       </span>
//     </a>
//     <br></br>
//     <a>
//       <span>
//         But it won't start up 'til you <i>touch, touch, touch me</i>
//       </span>
//     </a>
//     <br></br>
//     <b>
//       Thought of calling ya, but you won't pick up<br></br>'Nother fortnight
//       lost in America<br></br>
//       <a>
//         <span>Move to Florida,</span>
//       </a>{" "}
//       <a>
//         <span>buy the car you want</span>
//       </a>
//       {/* REVIEW: WHY IS THERE NO NEW LINE HERE? */}
//       But it won't start up 'til I touch, touch, touch you
//     </b>
//   </div>
// );
