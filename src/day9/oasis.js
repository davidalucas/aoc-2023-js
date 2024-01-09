import { createReadStream } from "fs";
import { createInterface } from "readline";

/**
 * Parses the a single string of raw sensor data, returning a number array
 * @param {string} line A line of raw data from the dataset
 * @returns {number[]}
 */
export function parseSensorData(line) {
  return line.split(" ").map((s) => parseInt(s));
}

/**
 * Recursively analyzes sensor data and returns the predicted next value
 * @param {number[]} sensorReadings The sensor readings to use for the prediction
 * @returns {number}
 */
export function predictNext(sensorReadings) {
  // termination condition
  if (sensorReadings.every((r) => r == 0)) {
    return 0;
  }
  // pre-recursion
  const reducedReadings = new Array(sensorReadings.length - 1);
  for (let i = 0; i < reducedReadings.length; i++) {
    reducedReadings[i] = sensorReadings[i + 1] - sensorReadings[i];
  }
  // recursion
  const nextVal = predictNext(reducedReadings);
  // post-recursion
  return sensorReadings[sensorReadings.length - 1] + nextVal;
}

/**
 * Recursively analyzes sensor data and returns the predicted previous value
 * @param {number[]} sensorReadings The sensor readings to use for the prediction
 * @returns {number}
 */
export function predictPrevious(sensorReadings) {
  // termination condition
  if (sensorReadings.every((r) => r == 0)) {
    return 0;
  }
  // pre-recursion
  const reducedReadings = new Array(sensorReadings.length - 1);
  for (let i = 0; i < reducedReadings.length; i++) {
    reducedReadings[i] = sensorReadings[i + 1] - sensorReadings[i];
  }
  // recursion
  const prevVal = predictPrevious(reducedReadings);
  // post-recursion
  return sensorReadings[0] - prevVal;
}

/**
 * Performs the summation described in the Day 9 Part 1 problem using data
 * found in the file at the specified path location
 * @param {string} path The path to the raw data file
 * @returns {Promise<number>}
 */
export async function sumAllNextPredictions(path) {
  let sum = 0;
  const readInterface = createInterface({
    input: createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  await new Promise((resolve, reject) => {
    readInterface
      .on("line", (line) => {
        sum += predictNext(parseSensorData(line));
      })
      .on("close", resolve);
  });
  return sum;
}

/**
 * Performs the summation described in the Day 9 Part 2 problem using data
 * found in the file at the specified path location
 * @param {string} path The path to the raw data file
 * @returns {Promise<number>}
 */
export async function sumAllPrevPredictions(path) {
  let sum = 0;
  const readInterface = createInterface({
    input: createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  await new Promise((resolve, reject) => {
    readInterface
      .on("line", (line) => {
        sum += predictPrevious(parseSensorData(line));
      })
      .on("close", resolve);
  });
  return sum;
}
