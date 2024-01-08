/**
 * Calculates the total sum of all winnings from the scratch cards
 * @param {string[]} data The raw data provided in the problem
 * @returns {number} The actual winnings
 */
export function calculateWinnings(data) {
  return data
    .map((line) => {
      let matches = -1;

      const lineSplit = line.split("|");
      const winningNumbers = lineSplit[0]
        .split(":")[1]
        .trim()
        .split(" ")
        .map((s) => parseInt(s))
        .filter((n) => !isNaN(n));

      const foundNumbers = lineSplit[1]
        .trim()
        .split(" ")
        .map((s) => parseInt(s))
        .filter((n) => !isNaN(n));

      for (const num of foundNumbers) {
        if (winningNumbers.find((n) => n === num)) {
          matches++;
        }
      }

      return matches === -1 ? 0 : 2 ** matches;
    })
    .reduce((a, b) => a + b);
}

/**
 * Analyzes the entire dataset and returns an array representing the number of
 * matches found for each scratch card
 * @param {string[]} data The raw string data array provided to us
 * @returns {number[]} An array containing the number of matches found on each card
 */
export function findMatches(data) {
  return data.map((line) => {
    let matches = 0;

    const lineSplit = line.split("|");
    const winningNumbers = lineSplit[0]
      .split(":")[1]
      .trim()
      .split(" ")
      .map((s) => parseInt(s))
      .filter((n) => !isNaN(n));

    const foundNumbers = lineSplit[1]
      .trim()
      .split(" ")
      .map((s) => parseInt(s))
      .filter((n) => !isNaN(n));

    for (const num of foundNumbers) {
      if (winningNumbers.find((n) => n === num)) {
        matches++;
      }
    }

    return matches;
  });
}

/**
 * Performs the recursion needed for the Day 4 Part 2 algorithm.
 * @param {string[]} dataArr The raw data array.
 * @param {number[]} matchArr The array containing the number of matches found for each card.
 * @param {number[]} totalArr The array keeping the tally of all of the cards.
 * @param {number} idx The index we're currently on.
 * @returns Nothing; returns when no more matches are found.
 */
function recurCalcTotal(dataArr, matchArr, totalArr, idx) {
  // termination condition
  if (matchArr[idx] === 0) {
    return;
  }

  for (let i = 1; i <= matchArr[idx]; i++) {
    //pre-recursion
    totalArr[idx + 1]++;
    //recurse
    recurCalcTotal(dataArr, matchArr, totalArr, idx + i);
  }
}

/**
 * Performs the algorithm for the Day 4 Part 2 challenge
 * @param {string[]} data The raw data needing to be parsed
 * @returns The total number of scratch cards
 */
export function calculateTotalCards(data) {
  let totals = new Array(data.length).fill(1);
  let matches = findMatches(data);

  for (let i = 0; i < data.length - 1; i++) {
    recurCalcTotal(data, matches, totals, i);
  }

  return totals.reduce((a, b) => a + b);
}
