import { createReadStream } from "fs";
import { createInterface } from "readline";
import { Hand } from "./hand";

export const cardValues = {
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
};

/**
 * Parses out the list of hands for the Day 6 problem
 * @param {string} path The path to the file containing the data
 * @returns {Promise<Hand[]>}
 */
export async function parseHands(path) {
  /** @type {Hand[]} */
  let hands = [];

  const readInterface = createInterface({
    input: createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  await new Promise((resolve) => {
    readInterface
      .on("line", (line) => {
        hands.push(Hand.fromString(line));
      })
      .on("close", resolve);
  });
  return hands;
}
