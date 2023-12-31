/**
 * Performs the part number summation algorithm from the Day 3 Part 1 problem.
 * @param {string[]} lines The lines to search through
 * @returns {number} The summation of all found part numbers
 */
export function addPartNumbers(lines) {
  let sum = 0;
  let intRegex = /^[0-9]$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let start = 0;
    let end = 0;

    // walk the string
    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      if (!intRegex.test(char)) continue;

      // found a number, set the pointers
      start = end = j;
      while (intRegex.test(char)) {
        end++;
        char = line[end];
      }

      // now, determine if the number you've found is valid
      if (!isValidPartNumber(lines, i, start, end)) {
        continue;
      }

      sum += parseInt(line.substring(start, end + 1));

      // SUPER-IMPORTANT! Don't forget to move j
      j = end;
    }
  }

  return sum;
}

/**
 * Checks whether the number is a valid part number. This is a simple algorithm that could be improved with memoization.
 * @param {string[]} lines The full array of all of the part data.
 * @param {number} lineIdx The index for the line on which the part number under investigation resides
 * @param {number} start The starting position for the part number on the line
 * @param {number} end The ending position for the part number on the line
 * @returns true if the part number is valid
 */
export function isValidPartNumber(lines, lineIdx, start, end) {
  let symbolRegex = /^[^a-zA-Z0-9\.]$/;

  // loop over each number
  for (let i = start; i < end; i++) {
    // check upper 3
    if (lines[lineIdx - 1]) {
      if (
        symbolRegex.test(lines[lineIdx - 1][i - 1]) ||
        symbolRegex.test(lines[lineIdx - 1][i]) ||
        symbolRegex.test(lines[lineIdx - 1][i + 1])
      ) {
        return true;
      }
    }
    // check current L and R
    if (
      symbolRegex.test(lines[lineIdx][i - 1]) ||
      symbolRegex.test(lines[lineIdx][i + 1])
    ) {
      return true;
    }
    // check lower 3
    if (lines[lineIdx + 1]) {
      if (
        symbolRegex.test(lines[lineIdx + 1][i - 1]) ||
        symbolRegex.test(lines[lineIdx + 1][i]) ||
        symbolRegex.test(lines[lineIdx + 1][i + 1])
      ) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @typedef PartNumber
 * @property {number} start The position where the PartNumber begins on the line
 * @property {number} end The position where the PartNumber ends on the line
 * @property {number} value The value of the PartNumber
 */

/**
 * Finds all of the PartNumbers (both valid and invalid) in the provided data
 * @param {string[]} lines The data to look through
 * @returns {PartNumber[][]} An array of all of the PartNumbers found in the provided data
 */
export function findPartNumbers(lines) {
  /**@type {PartNumber[][]} */
  let partNumbers = Array.from({ length: lines.length }, () => []);
  const intRegex = /^[0-9]$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let start = 0;

    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      if (!intRegex.test(char)) continue;

      start = j;
      while (intRegex.test(char)) {
        j++;
        char = line[j];
      }

      partNumbers[i].push({
        value: parseInt(line.substring(start, j + 1)),
        start: start,
        end: j - 1,
      });
    }
  }

  return partNumbers;
}

/**
 * Performs the gear summation algorithm for Day 3 Part 2
 * @param {string[]} lines The data to search through
 * @returns {number} The summation for all of the gear parameters
 */
export function sumAllGears(lines) {
  let sum = 0;
  const partNumbers = findPartNumbers(lines);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      if (line[j] !== "*") continue;

      /**@type {PartNumber[][]} */
      const foundPtNums = Array.from({ length: 3 }, () => []);

      // look for PartNumbers above
      for (const pn of partNumbers[i - 1]) {
        if (pn.start <= j - 1 && j - 1 <= pn.end) {
          foundPtNums[0].push(pn);
        } else if (pn.start <= j && j <= pn.end) {
          foundPtNums[0].push(pn);
        } else if (pn.start <= j + 1 && j + 1 <= pn.end) {
          foundPtNums[0].push(pn);
        }
      }
      // look for PartNumbers to the left and right
      for (const pn of partNumbers[i]) {
        if (pn.end === j - 1 || pn.start === j + 1) {
          foundPtNums[1].push(pn);
        }
      }
      // look for PartNumbers below
      for (const pn of partNumbers[i + 1]) {
        if (pn.start <= j - 1 && j - 1 <= pn.end) {
          foundPtNums[2].push(pn);
        } else if (pn.start <= j && j <= pn.end) {
          foundPtNums[2].push(pn);
        } else if (pn.start <= j + 1 && j + 1 <= pn.end) {
          foundPtNums[2].push(pn);
        }
      }

      //remove duplicates
      for (let k = 0; k < 3; k++) {
        foundPtNums[k] = foundPtNums[k].filter(
          (v, i, a) =>
            a.findIndex((pn) => pn.start === v.start && pn.end === v.end) === i,
        );
      }

      const uniquePartNumbers = foundPtNums.reduce((a, b) => a.concat(b));

      // if is Gear, add to the sum

      if (uniquePartNumbers.length === 2) {
        sum += uniquePartNumbers[0].value * uniquePartNumbers[1].value;
      }
    }
  }

  return sum;
}
