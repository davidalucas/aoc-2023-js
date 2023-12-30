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
 * @param {number} maxRed - The maximum number of allowed red cubes
 * @param {number} maxGreen - The maximum number of allowed green cubes
 * @param {number} maxBlue - The maximum number of allowed blue cubes
 * @returns {number} The sum of valid games.
 */
export function sumValidGames(games, maxRed, maxGreen, maxBlue) {
  let sum = 0;
  for (const game of games) {
    let validGame = true;
    for (const reveal of game.reveals) {
      if (
        reveal.reds > maxRed ||
        reveal.greens > maxGreen ||
        reveal.blues > maxBlue
      ) {
        validGame = false;
        break;
      }
    }
    if (validGame) {
      sum += game.index;
    }
  }
  return sum;
}

/**
 * Calculates the minimum power factor for the provided games (as
 * described in the AoC Day 2 Part 2 problem).
 * @param {CubeGame[]} games The games to go through.
 * @returns {number} The power factor
 */
export function getMinPowerFactor(games) {
  let sum = 0;
  for (const game of games) {
    let redFactor = 0;
    let greenFactor = 0;
    let blueFactor = 0;

    for (const reveal of game.reveals) {
      if (reveal.reds > redFactor) {
        redFactor = reveal.reds;
      }
      if (reveal.greens > greenFactor) {
        greenFactor = reveal.greens;
      }
      if (reveal.blues > blueFactor) {
        blueFactor = reveal.blues;
      }
    }

    sum += redFactor * greenFactor * blueFactor;
  }
  return sum;
}
