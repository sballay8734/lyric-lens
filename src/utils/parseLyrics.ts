import { Dispatch } from "@reduxjs/toolkit";

import {
  setLyrics,
  setLyricsLoading,
} from "../store/features/songSearch/songSearchSlice";

export async function fetchAndParseLyrics(url: string, dispatch: Dispatch) {
  const res = await fetch(url);
  const html = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // get all elements containing lyrics
  const lyricsElements = doc.querySelectorAll("div[data-lyrics-container]");

  // remove tags from markup
  if (lyricsElements.length > 0) {
    let fullLyrics = "";
    lyricsElements.forEach((element) => {
      const lyricsHtml = element.innerHTML;
      // console.log(lyricsHtml);
      const formattedLyrics = lyricsHtml
        .replace(/<br\s*\/?>/gi, "\n") // Replace <br> tags with newlines
        .replace(/<\/a[^>]*>/gi, "") // Replace closing </a> tags
        .replace(/<\/b[^>]*>/gi, " ") // Replace closing </b> tags
        .replace(/<a[^>]*>/gi, "") // Replace opening <a> tags
        .replace(/<\/?[^>]+(>|$)/g, ""); // Replace all remaining tags

      fullLyrics += formattedLyrics + "\n\n"; // Add 2 lines between sections
    });

    console.log(fullLyrics);

    // update lyrics in Redux Store
    dispatch(setLyrics(fullLyrics));
    dispatch(setLyricsLoading(false));
  } else {
    // mTODO: Handle errors here (when RTK Query is added)
    dispatch(setLyricsLoading(false));
    console.error("Lyrics not found");
  }
}
