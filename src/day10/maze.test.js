import { test, expect } from "vitest";
import {
  findStart,
  getFurthestDistFromStart,
  mazeGuide,
  moveFromStart,
  parseMazeData,
} from "./maze";

test("mazeGuide returns expected parameters", () => {
  expect(mazeGuide[0][1]["F"]).toStrictEqual({ row: 0, col: 1 });
  expect(mazeGuide[1][0]["-"]).toStrictEqual({ row: 0, col: -1 });
  expect(mazeGuide[1][2]["-"]).toStrictEqual({ row: 0, col: 1 });
});

test("parseMazeData constructs expected array", async () => {
  const expected = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];
  const actual = await parseMazeData("./src/day10/example2.txt");
  expect(actual).toStrictEqual(expected);
});

test("findStart finds correct starting position for example1 data", async () => {
  let expected = { row: 1, col: 1 };
  let maze = await parseMazeData("./src/day10/example1.txt");
  let actual = findStart(maze);
  expect(actual).toStrictEqual(expected);
});

test("findStart finds correct starting position for example2 data", async () => {
  let expected = { row: 2, col: 0 };
  let maze = await parseMazeData("./src/day10/example2.txt");
  let actual = findStart(maze);
  expect(actual).toStrictEqual(expected);
});

test("moveFromStart finds correct next position for example1 data", async () => {
  const expected = { row: 1, col: 2 };
  const maze = await parseMazeData("./src/day10/example1.txt");
  const start = findStart(maze);
  const actual = moveFromStart(maze, start);
  expect(actual).toStrictEqual(expected);
});

test("moveFromStart finds correct next position for example2 data", async () => {
  const expected = { row: 2, col: 1 };
  const maze = await parseMazeData("./src/day10/example2.txt");
  const start = findStart(maze);
  const actual = moveFromStart(maze, start);
  expect(actual).toStrictEqual(expected);
});

test("getFurthestDistFromStart returns correct result for example1 data", async () => {
  const maze = await parseMazeData("./src/day10/example1.txt");
  const expected = 4;
  const actual = getFurthestDistFromStart(maze);
  expect(actual).toStrictEqual(expected);
});

test("getFurthestDistFromStart returns correct result for example2 data", async () => {
  const maze = await parseMazeData("./src/day10/example2.txt");
  const expected = 8;
  const actual = getFurthestDistFromStart(maze);
  expect(actual).toStrictEqual(expected);
});

test("getFurthestDistFromStart returns correct result for real data", async () => {
  const maze = await parseMazeData("./src/day10/data.txt");
  const expected = 6875;
  const actual = getFurthestDistFromStart(maze);
  expect(actual).toStrictEqual(expected);
});
