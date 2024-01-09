import { createReadStream } from "fs";
import { createInterface } from "readline";

/** @typedef {{row: number, col: number}} Coordinate */

/** @type {Record<string, Coordinate>[][]} */
export const mazeGuide = [
  [
    {}, // 0, 0
    {
      "|": { row: -1, col: 0 },
      7: { row: 0, col: -1 },
      F: { row: 0, col: 1 },
    },
    {}, // 0, 2
  ],
  [
    {
      "-": { row: 0, col: -1 },
      L: { row: -1, col: 0 },
      F: { row: 1, col: 0 },
    },
    {}, // 1, 1
    {
      "-": { row: 0, col: 1 },
      J: { row: -1, col: 0 },
      7: { row: 1, col: 0 },
    },
  ],
  [
    {}, // 2, 0
    {
      "|": { row: 1, col: 0 },
      L: { row: 0, col: 1 },
      J: { row: 0, col: -1 },
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
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] == "S") {
        return { row: row, col: col };
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
    { rowDiff: -1, colDiff: 0, expected: ["|", "F", "7"] },
    { rowDiff: 0, colDiff: 1, expected: ["-", "J", "7"] },
    { rowDiff: 1, colDiff: 0, expected: ["|", "J", "L"] },
    { rowDiff: 0, colDiff: -1, expected: ["-", "F", "L"] },
  ];
  for (const surrKey of surrKeyData) {
    /** @type {Coordinate} */
    const coord = {
      row: start.row + surrKey.rowDiff,
      col: start.col + surrKey.colDiff,
    };
    const element = maze[coord.row][coord.col];
    if (surrKey.expected.some((s) => s === element)) {
      return coord;
    }
  }
  throw new Error(`Unable to move from the start position ${start}`);
}

/**
 *
 * @param {Coordinate} previous The previous position
 * @param {Coordinate} current The current position
 * @param {Coordinate} finish The finish line's position
 * @param {string[]} maze The maze
 * @returns {number} The number of moves it takes to get to the finish line
 */
export function goToFinish(previous, current, finish, maze) {
  if (current.row == finish.row && current.col == finish.col) {
    return 0;
  }
  const rowDiff = current.row - previous.row;
  const colDiff = current.col - previous.col;
  const currSymbol = maze[current.row][current.col];
  const nextDiffRecord = mazeGuide[rowDiff + 1][colDiff + 1];
  const nextDiff = nextDiffRecord[currSymbol];
  /** @type {Coordinate} */
  const next = {
    row: current.row + nextDiff.row,
    col: current.col + nextDiff.col,
  };

  const steps = goToFinish(current, next, finish, maze);

  return 1 + steps;
}

/**
 *
 * @param {string[]} maze
 * @returns {number}
 */
export function getFurthestDistFromStart(maze) {
  const finish = findStart(maze); // we're setting the maze's 'start' as our finish line
  const start = moveFromStart(maze, finish);
  const totalMoves = goToFinish(finish, start, finish, maze);
  return (1 + totalMoves) / 2;
}
