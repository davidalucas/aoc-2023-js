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
}
