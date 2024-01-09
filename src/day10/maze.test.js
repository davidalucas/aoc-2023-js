import { test, expect } from "vitest";
import { mazeGuide, parseMazeData } from "./maze";

test("mazeGuide returns expected parameters", () => {
  expect(mazeGuide[0][1]["F"]).toStrictEqual({ x: 0, y: 1 });
});

test("parseMazeData constructs expected array", async () => {
  const expected = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];
  const actual = await parseMazeData("./src/day10/example2.txt");
  expect(actual).toStrictEqual(expected);
});