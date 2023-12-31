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
