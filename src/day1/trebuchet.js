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
      if (!isNaN(parseInt(lines[i][j]))) {
        firstNum = Number(lines[i][j]);
        break;
      }
    }
    // loop backward
    for (let j = lines[i].length - 1; j >= 0; --j) {
      if (!isNaN(parseInt(lines[i][j]))) {
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

/**
 * Performs the enhanced calibration procedure for the second part of the AoC Day 1 problem.
 * This implementation has runtime complexity of O(n*c), where n is the number of
 * lines in the file, and c is the number of characters on each line.
 * @param {string[]} lines The lines in the calibration document
 * @returns {number} The calibration result
 */
export function enhancedCal(lines) {
  /**@type {number[]} */
  const calValues = new Array(lines.length).fill(0);

  /**
   * Object that maps number strings to their corresponding numeric values.
   * @type {Object.<string, number>}
   */
  const numStrings = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  let firstNum = 0;
  let secondNum = 0;
  for (let i = 0; i < lines.length; ++i) {
    // loop forward
    for (let j = 0; j < lines[i].length; ++j) {
      let numFound = false;
      if (!isNaN(parseInt(lines[i][j]))) {
        firstNum = Number(lines[i][j]);
        break;
      }
      // this loop is actually O(1)
      for (const key in numStrings) {
        if (!Object.hasOwnProperty.call(numStrings, key)) {
          continue;
        }
        const strSlice = lines[i].slice(j, j + key.length);
        if (strSlice === key) {
          firstNum = numStrings[key];
          numFound = true;
        }
      }
      if (numFound) {
        break;
      }
    }

    // loop backward
    for (let j = lines[i].length - 1; j >= 0; --j) {
      let numFound = false;
      if (!isNaN(parseInt(lines[i][j]))) {
        secondNum = Number(lines[i][j]);
        break;
      }
      for (const key in numStrings) {
        if (!Object.hasOwnProperty.call(numStrings, key)) {
          continue;
        }
        const strSlice =
          j === lines[i].length - 1
            ? lines[i].slice(j + 1 - key.length)
            : lines[i].slice(j + 1 - key.length, j + 1);
        if (strSlice === key) {
          secondNum = numStrings[key];
          numFound = true;
        }
      }
      if (numFound) {
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
