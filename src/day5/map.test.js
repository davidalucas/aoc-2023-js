import { expect, test } from "vitest";
import { Map } from "./map";

test("Map constructor sets properties correctly", () => {
  const map = new Map(1, 2, 3);
  expect(map.source).toBe(1);
  expect(map.dest).toBe(2);
  expect(map.range).toBe(3);
});

test("Map.fromData constructs correct map", () => {
  const actual = Map.fromData("50 98 2");
  const expected = new Map(98, 50, 2);
  expect(actual).toStrictEqual(expected);
});

test("calcDestination returns null when provided source is invalid", () => {
  const map = new Map(98, 50, 2);
  let result = map.calcDestination(100);
  expect(result).toBeNull();

  result = map.calcDestination(97);
  expect(result).toBeNull();

  result = map.calcDestination(-1);
  expect(result).toBeNull();
});

test("calcDestination returns expected number", () => {
  const map = new Map(98, 50, 2);
  let result = map.calcDestination(99);
  expect(result).toBe(51);
});

test("calcDestinationMap returns expected map", () => {
  let map = new Map(98, 50, 2);
  let src = 99;
  let range = 3;
  let expected = new Map(99, 51, 1);
  let actual = map.calcDestinationMap(src, range);
  expect(actual).toStrictEqual(expected);

  map = new Map(15, 0, 37);
  src = 27;
  range = 35;
  expected = new Map(27, 12, 25);
  actual = map.calcDestinationMap(src, range);
  expect(actual).toStrictEqual(expected);
});
