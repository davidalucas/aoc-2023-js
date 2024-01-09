import { test, expect } from "vitest";
import { findStart, mazeGuide, moveFromStart, parseMazeData } from "./maze";

test("mazeGuide returns expected parameters", () => {
  expect(mazeGuide[0][1]["F"]).toStrictEqual({ x: 0, y: 1 });
});

test("parseMazeData constructs expected array", async () => {
  const expected = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];
  const actual = await parseMazeData("./src/day10/example2.txt");
  expect(actual).toStrictEqual(expected);
});

test("findStart finds correct starting position for example1 data", async () => {
  let expected = { x: 1, y: 1 };
  let maze = await parseMazeData("./src/day10/example1.txt");
  let actual = findStart(maze);
  expect(actual).toStrictEqual(expected);
});

test("findStart finds correct starting position for example2 data", async () => {
  let expected = { x: 0, y: 2 };
  let maze = await parseMazeData("./src/day10/example2.txt");
  let actual = findStart(maze);
  expect(actual).toStrictEqual(expected);
});

test("moveFromStart finds correct next position for example1 data", async () => {
  const expected = { x: 2, y: 1 };
  const maze = await parseMazeData("./src/day10/example1.txt");
  const start = findStart(maze);
  const actual = moveFromStart(maze, start);
  expect(actual).toStrictEqual(expected);
});

test("moveFromStart finds correct next position for example2 data", async () => {
  const expected = { x: 1, y: 2 };
  const maze = await parseMazeData("./src/day10/example2.txt");
  const start = findStart(maze);
  const actual = moveFromStart(maze, start);
  expect(actual).toStrictEqual(expected);
});
