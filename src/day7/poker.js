/** @typedef {{cards: string, bid: number}} Hand */

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
 * @returns {Hand[]}
 */
export function parseHands(path) {}
