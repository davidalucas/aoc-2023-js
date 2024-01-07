import { test, expect } from "vitest";
import {
  calculateChargingTimeMinMax,
  calculateWinningRangeProduct,
} from "./boatRace";

/** @type import("./boatRace").Race[] */
const exampleRaces = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 },
];

/** @type import("./boatRace").Race[] */
const realRaces = [
  { time: 46, distance: 358 },
  { time: 68, distance: 1054 },
  { time: 98, distance: 1807 },
  { time: 66, distance: 1080 },
];

test("calculateChargingTimeMinMax finds correct min/max", () => {
  const expected = [
    { min: 2, max: 5 },
    { min: 4, max: 11 },
    { min: 11, max: 19 },
  ];
  const actual = exampleRaces.map((r) => calculateChargingTimeMinMax(r));
  expect(actual).toEqual(expected);
});

test("calculateWinningRangeProduct finds correct product for example data", () => {
  const actual = calculateWinningRangeProduct(exampleRaces);
  expect(actual).toBe(288);
});

test("calculateWinningRangeProduct finds correct product for real data", () => {
  const actual = calculateWinningRangeProduct(realRaces);
  expect(actual).toBe(138915);
});

/**
 * The example provided for Part 2.
 * @type import("./boatRace").Race
 */
const exampleRace = { time: 71530, distance: 940200 };

/**
 * The actual data provided for Part 2.
 * @type import("./boatRace").Race
 */
const realRace = { time: 46689866, distance: 358105418071080 };

test("calculateChargingTimeMinMax finds correct min/max from example data", () => {
  const expected = { min: 14, max: 71516 };
  const actual = calculateChargingTimeMinMax(exampleRace);
  expect(actual).toEqual(expected);
  expect(actual.max - actual.min + 1).toBe(71503);
});

test("calculateChargingTimeMinMax finds correct min/max from real data", () => {
  const expected = { min: 9674510, max: 37015356 };
  const actual = calculateChargingTimeMinMax(realRace);
  expect(actual).toEqual(expected);
  expect(actual.max - actual.min + 1).toBe(27340847);
});
