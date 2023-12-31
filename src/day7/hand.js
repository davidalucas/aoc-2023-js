export class Hand {
  /**
   *
   * @param {string} cards
   * @param {number} bid
   */
  constructor(cards, bid) {
    /** @type {string} */
    this.cards = cards;
    /** @type {number} */
    this.bid = bid;
    const score = this.#getHandScore();
    /** @type {number} */
    this.score = score;
    const jokerScore = this.#getJokerHandScore();
    /** @type {number} */
    this.jokerScore = jokerScore;
  }

  /**
   * Constructs a Hand from the provided string data
   * @param {string} data The data for the hand ("32T3K 765" for example)
   * @returns {Hand}
   */
  static fromString(data) {
    const splitData = data.split(" ");
    const cards = splitData[0];
    const bid = parseInt(splitData[1], 10);
    return new Hand(cards, bid);
  }

  /**
   * Calculates a score for a set of cards by summing the squares of the matches.
   * So, 5 of a kind is 25, and high card is 5. In the end, it doesn't matter what the
   * score is, so long as the scores result in hands being ranked appropriately.
   * @returns {number}
   */
  #getHandScore() {
    /** @type {Record<string, number>} */
    let matches = {};
    for (const card of this.cards) {
      if (!matches[card]) {
        matches[card] = 0;
      }
      matches[card] += 1;
    }
    let sum = 0;
    for (const key in matches) {
      if (Object.hasOwnProperty.call(matches, key)) {
        sum += matches[key] ** 2;
      }
    }
    return sum;
  }

  /**
   * Does the same as above, except takes into account Joker cards as described
   * in the Part 2 problem.
   * @returns {number}
   */
  #getJokerHandScore() {
    /** @type {Record<string, number>} */
    let matches = {};
    for (const card of this.cards) {
      if (!matches[card]) {
        matches[card] = 0;
      }
      matches[card] += 1;
    }

    if (matches["J"]) {
      const bonus = matches.J;
      matches.J = 0;
      const maxCard = Object.keys(matches).reduce((a, b) =>
        matches[a] > matches[b] ? a : b,
      );
      matches[maxCard] += bonus;
    }

    let sum = 0;
    for (const key in matches) {
      if (Object.hasOwnProperty.call(matches, key)) {
        sum += matches[key] ** 2;
      }
    }
    return sum;
  }
}

/** @type {Record<string, number>} */
const cardValues = {
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
 * Performs a comparison between the first and second Hand objects
 * @param {Hand} first The first Hand
 * @param {Hand} second The second Hand
 * @returns {number} Returns a negative value if first should come before second, positive if they should switch, and 0 if they are equal
 */
export function compareHands(first, second) {
  if (first.score != second.score) {
    return first.score - second.score;
  }
  for (let i = 0; i < first.cards.length; i++) {
    const valDiff = cardValues[first.cards[i]] - cardValues[second.cards[i]];
    if (valDiff == 0) {
      continue;
    }
    return valDiff;
  }
  return 0;
}

/** @type {Record<string, number>} */
const jokerValues = {
  J: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  Q: 10,
  K: 11,
  A: 12,
};

/**
 * Performs a comparison between the first and second Hand objects, taking Jokers
 * into account
 * @param {Hand} first The first Hand
 * @param {Hand} second The second Hand
 * @returns {number} Returns a negative value if first should come before second, positive if they should switch, and 0 if they are equal
 */
export function compareHandsWithJokers(first, second) {
  if (first.jokerScore != second.jokerScore) {
    return first.jokerScore - second.jokerScore;
  }
  for (let i = 0; i < first.cards.length; i++) {
    const valDiff = jokerValues[first.cards[i]] - jokerValues[second.cards[i]];
    if (valDiff == 0) {
      continue;
    }
    return valDiff;
  }
  return 0;
}
