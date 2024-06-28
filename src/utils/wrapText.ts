export const wrapText = (text: string, width: number) => {
  const words = text.split(/\s+/).reverse();
  const lines: string[] = [];
  let line: string[] = [];
  let lineLength = 0;
  const spaceWidth = 3.5; // Approximate width of a space character

  while (words.length > 0) {
    const word = words.pop()!;
    const wordLength = word.length * 6; // Approximate width of the word

    if (lineLength + wordLength + spaceWidth > width) {
      if (line.length > 0) {
        lines.push(line.join(" "));
        line = [];
        lineLength = 0;
      }
    }

    line.push(word);
    lineLength += wordLength + spaceWidth;
  }

  if (line.length > 0) {
    lines.push(line.join(" "));
  }

  return lines;
};
