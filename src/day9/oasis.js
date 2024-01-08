/**
 * Parses the a single string of raw sensor data, returning a number array
 * @param {string} line A line of raw data from the dataset
 * @returns {number[]}
 */
export function parseSensorData(line) {
  return line.split(" ").map((s) => parseInt(s));
}
