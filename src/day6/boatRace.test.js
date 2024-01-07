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
