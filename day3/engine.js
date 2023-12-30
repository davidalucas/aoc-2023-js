/**
 * Performs the part number summation algorithm from the Day 3 Part 1 problem.
 * @param {string[]} lines The lines to search through
 * @returns {number} The summation of all found part numbers
 */
export function addPartNumbers(lines) {
  let sum = 0;
  let regex = /^[a-zA-Z0-9\.]$/;

  for (let i = 0; i < lines.length; i++) {
    // step 1: find a number
    // step 2: record the number and it's index within the line
    // step 3: see if there are more numbers to the right and repeat step 2
    // step 4:
  }

  return sum;
}
