// !TODO: USE A HASH MAP FOR THIS

//  path =  Taylor-swift-all-too-well-10-minute-version-taylors-version-from-the-vault-lyrics"

const testLyrics =
  "Nice to meet you, where you been? I could show you incredible things Magic, madness, heaven, sin Saw you there and I thought Oh, my God, look at that face You look like my next mistake Love's a game, wanna play? Ay";

const testFlaggedWordsList = ["god", "sex", "fuck", "I"];

const regex = /[?!.,']/g;

export function analyzeSong(lyrics: string, wordList: string[]) {
  // 1. Remove punctuation (hold off on this for now)
  // 2. Split lyrics at " " (spaces)
  // 3. Loop through lyrics using a hash map to store words an # of occurences
  // 4. Loop through flaggedWords and check for existance in hash map

  console.log(lyrics, wordList);
}

// NOTE: You're going to have to sanitize things like quotes within quotes and apostrophes

const string = "Look at the moon!";
const newString = string.replace(/o,a/g, "");

console.log(newString);
