import { createReadStream } from "fs";
import { createInterface } from "readline";

/** @typedef {{x: number, y: number}} Coordinate */

/** @type {Record<string, Coordinate>[][]} */
export const mazeGuide = [
  [
    {}, // 0, 0
    {
      "|": { x: -1, y: 0 },
      7: { x: 0, y: -1 },
      F: { x: 0, y: 1 },
    },
    {}, // 0, 2
  ],
  [
    {
      "-": { x: 0, y: -1 },
      L: { x: -1, y: 0 },
      F: { x: 1, y: 0 },
    },
    {}, // 1, 1
    {
      "-": { x: 0, y: 1 },
      J: { x: -1, y: 0 },
      7: { x: 1, y: 0 },
    },
  ],
  [
    {}, // 2, 0
    {
      "|": { x: 1, y: 0 },
      L: { x: 0, y: 1 },
      J: { x: 0, y: -1 },
    },
    {}, // 2, 2
  ],
];

/**
 * Parses the maze data from the file at the specified file path
 * @param {string} path The path to the file to read
 * @returns {Promise<string[]>}
 */
export async function parseMazeData(path) {
  /** @type {string[]} */
  let maze = [];

  const readInterface = createInterface({
    input: createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  await new Promise((resolve, reject) => {
    readInterface
      .on("line", (line) => {
        maze.push(line);
      })
      .on("close", resolve);
  });

  return maze;
}
