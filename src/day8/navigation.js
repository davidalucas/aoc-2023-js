import { createReadStream } from "fs";
import { createInterface } from "readline";

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
