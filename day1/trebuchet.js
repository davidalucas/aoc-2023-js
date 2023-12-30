/**
 * Performs the calibration procedure for the first part of the AoC Day 1 problem.
 * This implementation has runtime complexity of O(n*c), where n is the number of
 * lines in the file, and c is the number of characters on each line.
 * @param {string[]} lines The lines in the calibration document
 * @returns {number} The calibration result
 */
export function calibrate(lines) {
  /**@type {number[]} */
  const calValues = new Array(lines.length).fill(0);

  let firstNum = 0;
  let secondNum = 0;
  for (let i = 0; i < lines.length; ++i) {
    // loop forward
    for (let j = 0; j < lines[i].length; ++j) {
      if (!isNaN(lines[i][j])) {
        firstNum = Number(lines[i][j]);
        break;
      }
    }
    // loop backward
    for (let j = lines[i].length - 1; j >= 0; --j) {
      if (!isNaN(lines[i][j])) {
        secondNum = Number(lines[i][j]);
        break;
      }
    }
    // add to array
    calValues[i] = firstNum * 10 + secondNum;
    // reset variables
    firstNum = secondNum = 0;
  }

  return calValues.reduce((a, b) => a + b);
}
