/**
 * Calculates the total sum of all winnings from the scratch cards
 * @param {string[]} data The raw data provided in the problem
 * @returns {int} The actual winnings
 */
export function calculateWinnings(data) {
  return data
    .map((line) => {
      let matches = 0;

      const lineSplit = line.split("|");
      const winningNumbers = lineSplit[0]
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((s) => s !== " ")
        .map((s) => parseInt(s));

      const foundNumbers = lineSplit[1]
        .trim()
        .split(" ")
        .filter((s) => s !== " ")
        .map((s) => parseInt(s));

      for (const num of foundNumbers) {
        if (winningNumbers.find((n) => n === num)) {
          matches++;
        }
      }

      return 2 ^ matches;
    })
    .reduce((a, b) => a + b);
}
