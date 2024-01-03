/**
 * Calculates the total sum of all winnings from the scratch cards
 * @param {string[]} data The raw data provided in the problem
 * @returns {int} The actual winnings
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
 * Checks the current scratch card and provides the total number of matches
 * @param {string[]} dataArr The raw string data array provided to us
 * @param {int} idx The current index being analyzed
 * @returns {int} The total number of matches found on the current line
 */
function sumMatches(dataArr, idx) {
  let matches = 0;

  const lineSplit = dataArr[idx].split("|");
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
}

/**
 * Performs the recursion needed for the Day 4 Part 2 algorithm.
 * @param {string[]} dataArr The raw data array.
 * @param {int[]} totalArr The array keeping the tally of all of the cards.
 * @param {int} idx The index we're currently on.
 * @returns Nothing; returns when no more matches are found.
 */
function recurCalcTotal(dataArr, totalArr, idx) {
  // termination condition
  const matches = sumMatches(dataArr, idx);
  if (matches === 0) {
    return;
  }

  for (let i = 1; i <= matches; i++) {
    //pre-recursion
    totalArr[idx + 1]++;
    //recurse
    recurCalcTotal(dataArr, totalArr, idx + i);
  }
}

/**
 * Performs the algorithm for the Day 4 Part 2 challenge
 * @param {string[]} data The raw data needing to be parsed
 * @returns The total number of scratch cards
 */
export function calculateTotalCards(data) {
  let totals = new Array(data.length).fill(1);

  for (let i = 0; i < data.length - 1; i++) {
    recurCalcTotal(data, totals, i);
  }

  return totals.reduce((a, b) => a + b);
}
