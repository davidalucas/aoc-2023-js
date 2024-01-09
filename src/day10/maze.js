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

/**
 * Finds the start position "S" in the maze
 * @param {string[]} maze The maze we're working with
 * @returns {Coordinate} The starting coordinates
 * @throws If no starting position is found
 */
export function findStart(maze) {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] == "S") {
        return { x: x, y: y };
      }
    }
  }
  throw new Error("Unable to find starting position");
}

/**
 * Figures out where to move first from the starting position
 * @param {string[]} maze The maze we're assessing
 * @param {Coordinate} start The start position
 * @returns {Coordinate}
 */
export function moveFromStart(maze, start) {
  // check top, right, bottom, left
  const surrKeyData = [
    { x: 0, y: -1, expected: ["|", "F", "7"] },
    { x: 1, y: 0, expected: ["-", "J", "7"] },
    { x: 0, y: 1, expected: ["|", "J", "L"] },
    { x: -1, y: 0, expected: ["-", "F", "L"] },
  ];
  for (const surrKey of surrKeyData) {
    /** @type {Coordinate} */
    const coord = {
      x: start.x + surrKey.x,
      y: start.y + surrKey.y,
    };
    const element = maze[coord.y][coord.x];
    if (surrKey.expected.some((s) => s === element)) {
      return coord;
    }
  }
  throw new Error(`Unable to move from the start position ${start}`);
}
