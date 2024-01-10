import { expect, test } from "vitest";
import { calcDistance, calcTotalMinDistances, parseUniverse } from "./galaxies";

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

test("calcDistance gets expected distance from two galaxies", async () => {
  const universe = await parseUniverse("./src/day11/example.txt");
  const expected = 9;
  const actual = calcDistance(
    universe.galaxies[4],
    universe.galaxies[8],
    universe.filledRows,
    universe.filledCols,
    2,
  );
  expect(actual).toBe(expected);
});

const exampleDataset = [
  { filePath: "./src/day11/example.txt", expFactor: 2, expectedDist: 374 },
  { filePath: "./src/day11/example.txt", expFactor: 10, expectedDist: 1030 },
  { filePath: "./src/day11/example.txt", expFactor: 100, expectedDist: 8410 },
];

exampleDataset.forEach(({ filePath, expFactor, expectedDist }) => {
  test(`calcTotalMinDistances returns ${expectedDist} for expansion factor ${expFactor} from example data`, async () => {
    const universe = await parseUniverse(filePath);
    let actual = calcTotalMinDistances(universe, expFactor);
    expect(actual).toBe(expectedDist);
  });
});

test("calcTotalMinDistances gets expected total from example data", async () => {
  const universe = await parseUniverse("./src/day11/data.txt");
  const expected = 9681886;
  const actual = calcTotalMinDistances(universe, 2);
  expect(actual).toBe(expected);
});

const realDataset = [
  { filePath: "./src/day11/data.txt", expFactor: 2, expectedDist: 9681886 },
  {
    filePath: "./src/day11/data.txt",
    expFactor: 1_000_000,
    expectedDist: 791134099634,
  },
];

realDataset.forEach(({ filePath, expFactor, expectedDist }) => {
  test(`calcTotalMinDistances returns ${expectedDist} for expansion factor ${expFactor} from real data`, async () => {
    const universe = await parseUniverse(filePath);
    let actual = calcTotalMinDistances(universe, expFactor);
    expect(actual).toBe(expectedDist);
  });
});
