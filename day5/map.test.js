import { expect, test } from "vitest";
import { Map, MapCollection } from "./map";

test("Map constructor constructs correct map", () => {
  const actual = new Map("50 98 2");
  expect(actual.dest).toBe(50);
  expect(actual.source).toBe(98);
  expect(actual.range).toBe(2);
});

test("MapCollection constructor constructs correct MapCollection", () => {
  const rawData = ["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"];
  const actual = new MapCollection(rawData);

  expect(actual.next).toBeUndefined();
  expect(actual.maps[0]).toEqual(new Map(rawData[1]));
  expect(actual.maps[1]).toEqual(new Map(rawData[2]));
  expect(actual.maps[2]).toEqual(new Map(rawData[3]));
});
