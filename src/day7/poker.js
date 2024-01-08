import { createReadStream } from "fs";
import { createInterface } from "readline";
import { Hand, compareHands, compareHandsWithJokers } from "./hand";

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

/**
 * Calculates the total winnings, as described in the Day 7 Part 1 problem.
 * @param {Hand[]} hands The hands to use
 * @returns {number} The total winnings
 */
export function calcWinnings(hands) {
  return hands
    .sort(compareHands)
    .map((h) => h.bid)
    .reduce((a, b, i) => a + b * (i + 1));
}

/**
 * Calculates the total winnings, taking Jokers into account,
 * as described in the Day 7 Part 2 problem.
 * @param {Hand[]} hands The hands to use
 * @returns {number} The total winnings
 */
export function calcWinningsWithJokers(hands) {
  return hands
    .sort(compareHandsWithJokers)
    .map((h) => h.bid)
    .reduce((a, b, i) => a + b * (i + 1));
}
