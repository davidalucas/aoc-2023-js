import { expect, test } from "vitest";
import { parseUniverse } from "./galaxies";

test("parseUniverse constructs expected object from example data", async () => {
  /** @type {import("./galaxies").Coordinate[]} */
  const expectedGalaxies = [
    { row: 0, col: 3 },
    { row: 1, col: 7 },
    { row: 2, col: 0 },
    { row: 4, col: 6 },
    { row: 5, col: 1 },
    { row: 6, col: 9 },
    { row: 8, col: 7 },
    { row: 9, col: 0 },
    { row: 9, col: 4 },
  ];
  const expectedFilledRows = new Set([0, 1, 2, 4, 5, 6, 8, 9]);
  const expectedFilledCols = new Set([0, 1, 3, 4, 6, 7, 9]);
  const actual = await parseUniverse("./src/day11/example.txt");

  expect(actual.galaxies).toStrictEqual(expectedGalaxies);
  expect(actual.filledRows).toStrictEqual(expectedFilledRows);
  expect(actual.filledCols).toStrictEqual(expectedFilledCols);
});
