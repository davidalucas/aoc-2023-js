/**
 * A game from the elf's cube game.
 * @typedef {Object} CubeGame
 * @property {number} index
 * @property {Reveal[]} reveals
 */

/**
 * A "reveal" for when the elf shows you a palm full of cubes.
 * @typedef {Object} Reveal
 * @property {number} reds
 * @property {number} greens
 * @property {number} blues
 */

/**
 * Parses a line of the data format, returning a CubeGame object
 * @param {string} line A line from our data file.
 * @returns {CubeGame} The resulting CubeGame object
 */
export function parseCubeGame(line) {
  const splitLine = line.split(": "); // game signature | reveals

  return {
    index: parseInt(splitLine[0].split(" ")[1]),
    reveals: splitLine[1].split("; ").map((val) => {
      return parseReveal(val);
    }),
  };
}

/**
 *
 * @param {string} srcString The string representing the reveal
 * @returns The reveal object
 */
export function parseReveal(srcString) {
  const values = srcString.split(", ");
  /**@type {Reveal} */
  const reveal = {
    reds: 0,
    greens: 0,
    blues: 0,
  };
  for (const element of values) {
    const theFinalSplit = element.split(" ");
    switch (theFinalSplit[1]) {
      case "red":
        reveal.reds = parseInt(theFinalSplit[0]);
        break;
      case "green":
        reveal.greens = parseInt(theFinalSplit[0]);
        break;
      case "blue":
        reveal.blues = parseInt(theFinalSplit[0]);
        break;
      default:
        break;
    }
  }
  return reveal;
}

/**
 * Calculates the sum of valid games.
 *
 * @param {CubeGame[]} games - The array of games.
 * @returns {number} The sum of valid games.
 */
export function sumValidGames(games) {}
