import { createReadStream } from "fs";
import { createInterface } from "readline";

/** @typedef {{row: number, col: number}} Coordinate */
/** @typedef {{galaxies: Coordinate[], filledRows: Set<number>, filledCols: Set<number>}} Universe */

/**
 * Parses a provided file and constructs a universe object from the data
 * @param {string} path The path to the file
 * @returns {Promise<Universe>}
 */
export async function parseUniverse(path) {
  /** @type {Coordinate[]} */
  let galaxies = [];
  /** @type {Set<number>} */
  let filledRows = new Set();
  /** @type {Set<number>} */
  let filledCols = new Set();

  const readInterface = createInterface({
    input: createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  await new Promise((resolve, reject) => {
    let readerIdx = 0;
    readInterface
      .on("line", (line) => {
        for (let i = 0; i < line.length; i++) {
          if (line[i] === "#") {
            galaxies.push({ row: readerIdx, col: i });
            filledCols.add(i);
            filledRows.add(readerIdx);
          }
        }
        readerIdx++;
      })
      .on("close", resolve);
  });
  return { galaxies, filledRows, filledCols };
}

/**
 * Calculates distance by walking across row first, then across the col direction
 * @param {Coordinate} a The coordinates of the first point
 * @param {Coordinate} b The coordinates of the second point
 * @param {Set<number>} filledRows The rows which contain galaxies
 * @param {Set<number>} filledCols The columns which contain galaxies
 * @returns {number}
 */
export function calcDistance(a, b, filledRows, filledCols) {
  let rowDist = 0;
  let colDist = 0;
  if (a.row - b.row < 0) {
    for (let i = a.row; i < b.row; i++) {
      if (!filledRows.has(i)) {
        rowDist += 2;
      } else {
        rowDist++;
      }
    }
  } else if (a.row - b.row > 0) {
    for (let i = a.row; i > b.row; i--) {
      if (!filledRows.has(i)) {
        rowDist += 2;
      } else {
        rowDist++;
      }
    }
  }

  if (a.col - b.col < 0) {
    for (let i = a.col; i < b.col; i++) {
      if (!filledCols.has(i)) {
        colDist += 2;
      } else {
        colDist++;
      }
    }
  } else if (a.col - b.col > 0) {
    for (let i = a.col; i > b.col; i--) {
      if (!filledCols.has(i)) {
        colDist += 2;
      } else {
        colDist++;
      }
    }
  }
  return rowDist + colDist;
}

/**
 * Performs the calculation described in Day 11 Part 1
 * @param {Universe} universe The universe to analyze
 * @returns {number} The sum of the minimum distances between all pairs of galaxies
 */
export function calcTotalMinDistances(universe) {
  let totalDistance = 0;
  for (let i = 0; i < universe.galaxies.length; i++) {
    for (let j = i + 1; j < universe.galaxies.length; j++) {
      totalDistance += calcDistance(
        universe.galaxies[i],
        universe.galaxies[j],
        universe.filledRows,
        universe.filledCols,
      );
    }
  }
  return totalDistance;
}
