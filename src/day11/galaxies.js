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
