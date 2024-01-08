import { createReadStream } from "fs";
import { createInterface } from "readline";
import { start } from "repl";

/** @typedef {{left: string, right: string}} BinaryNode */
/** @typedef {{directions: string, path: Record<string, BinaryNode>}} NavigationMap */

/**
 * This function parses the provided string data, returning the node along with its id.
 * @param {string} data The line to parse (i.e. "AAA = (BBB, CCC)")
 * @returns {{id: string, node: BinaryNode}}
 * @example
 * const data = "AAA = (BBB, CCC)";
 * const result = parseNode(data);
 * console.log(result);
 * // Output: { id: 'AAA', node: { left: 'BBB', right: 'CCC' } }
 */
export function parseNode(data) {
  const splitData = data.split(" = ");

  const lrSplitData = splitData[1]
    .substring(1, splitData[1].length - 1)
    .split(", ");

  return {
    id: splitData[0],
    node: { left: lrSplitData[0], right: lrSplitData[1] },
  };
}

/**
 * Parses a file at a given path, constructing a new NavigationMap object from the
 * data within.
 * @param {string} path The path to the file to parse
 * @returns {Promise<NavigationMap>}
 */
export async function parseNavMap(path) {
  /** @type {NavigationMap} */
  const navMap = { directions: "", path: {} };
  const readInterface = createInterface({
    input: createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  await new Promise((resolve, reject) => {
    readInterface
      .on("line", (line) => {
        if (line == "") {
          return;
        } else if (navMap.directions == "") {
          navMap.directions = line;
          return;
        }
        const nodeData = parseNode(line);
        if (navMap.path[nodeData.id]) {
          reject(
            `Tried to overwrite value of path ${nodeData.id} with new data`,
          );
        }
        navMap.path[nodeData.id] = nodeData.node;
      })
      .on("close", resolve);
  });
  return navMap;
}

/**
 * Walks a NavigationMap, counting the number of steps it takes to travel from
 * AAA to ZZZ.
 * @param {NavigationMap} navMap The NavigationMap to traverse
 */
export function countSteps(navMap) {
  let steps = 0;
  let currentLocation = "AAA";

  do {
    for (let i = 0; i < navMap.directions.length; i++) {
      const turn = navMap.directions[i];
      currentLocation =
        navMap.directions[i] == "L"
          ? navMap.path[currentLocation].left
          : navMap.path[currentLocation].right;
      steps++;
      if (currentLocation == "ZZZ") {
        return steps;
      }
    }
  } while (currentLocation != "AAA");

  throw new Error(
    "Infinite loop detected. The directions are never converging to location ZZZ.",
  );
}

/**
 * Gets all of the nodes which end with an "A" character
 * @param {NavigationMap} navMap The NavigationMap to assess
 * @returns {string[]}
 */
export function getStartingNodes(navMap) {
  return Object.keys(navMap.path).filter((n) => n.endsWith("A"));
}

/**
 * Calculates the step count described in the Part 2 problem
 * @param {NavigationMap} navMap The NavigationMap to assess
 * @returns {number}
 */
export function countGhostSteps(navMap) {
  const startingNodes = getStartingNodes(navMap);
  let periods = new Array(startingNodes.length).fill(0);

  for (let i = 0; i < startingNodes.length; i++) {
    const startLoc = startingNodes[i];
    let currLoc = startLoc;
    while (!currLoc.endsWith("Z")) {
      currLoc = traverseMap(currLoc, navMap);
      periods[i]++;
    }
  }
  const lcm = calcLCM(periods);
  return lcm * navMap.directions.length;
}

/**
 * Performs a full traversal from the starting location to the end location,
 * using the directions in the provided NavigationMap
 * @param {string} startLocation Current location
 * @param {NavigationMap} navMap The NavigationMap to use
 * @returns {string} New location
 */
export function traverseMap(startLocation, navMap) {
  let currLocation = startLocation;
  for (const turn of navMap.directions) {
    currLocation =
      turn == "L"
        ? navMap.path[currLocation].left
        : navMap.path[currLocation].right;
  }
  return currLocation;
}

/**
 * Returns the least common multiple of the provided set of values
 * @param {number[]} numbers The numbers to evaluate
 * @returns {number}
 */
export function calcLCM(numbers) {
  /** @type {Record<number, number>} */
  let highestPrimeFactors = {};

  for (let num of numbers) {
    /** @type {Record<number, number>} */
    let primeFactors = {};
    let divisor = 2;
    while (num > 2) {
      if (num % divisor === 0) {
        if (!primeFactors[divisor]) {
          primeFactors[divisor] = 1;
        } else {
          primeFactors[divisor]++;
        }
        num = num / divisor;
      } else {
        divisor++;
      }
    }
    if (num == 2) {
      primeFactors[2] = primeFactors[2] ? primeFactors[2] + 1 : 1;
    }
    for (const key in primeFactors) {
      if (Object.hasOwnProperty.call(primeFactors, key)) {
        const element = primeFactors[key];
        if (!highestPrimeFactors[key]) {
          highestPrimeFactors[key] = primeFactors[key];
        } else if (highestPrimeFactors[key] < primeFactors[key]) {
          highestPrimeFactors[key] = primeFactors[key];
        }
      }
    }
  }
  const lcm = Object.keys(highestPrimeFactors)
    .map((f) => {
      const factor = parseInt(f);
      return factor ** highestPrimeFactors[factor];
    })
    .reduce((a, b) => a * b);
  return lcm;
}
