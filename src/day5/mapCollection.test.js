import { test, expect } from "vitest";
import { Map } from "./map";
import { MapCollection } from "./mapCollection";

test("MapCollection constructor constructs correct MapCollection", () => {
  const name = "my map";
  const maps = [new Map(1, 2, 3), new Map(4, 5, 6)];
  const mapColl = new MapCollection(name, maps);
  expect(mapColl.name).toBe(name);
  expect(mapColl.maps).toStrictEqual(maps); // could be improved to check sorting
});

test("MapCollection.fromData constructs correct MapCollection", () => {
  const rawData = ["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"];
  const expected = new MapCollection(rawData[0], [
    Map.fromData(rawData[1]),
    Map.fromData(rawData[2]),
    Map.fromData(rawData[3]),
  ]);
  const actual = MapCollection.fromData(rawData);

  expect(actual).toStrictEqual(expected);
});

test("getDestination gets destination for known source value", () => {
  const rawData = ["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"];
  const mapCollection = MapCollection.fromData(rawData);
  expect(mapCollection.getDestination(27)).toBe(12);
});

test("getDestination returns source for unknown source value", () => {
  const rawData = ["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"];
  const mapCollection = MapCollection.fromData(rawData);
  expect(mapCollection.getDestination(1000)).toBe(1000);
});

test("getDestinationMap returns correct map for known source value", () => {
  const rawData = ["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"];
  const mapCollection = MapCollection.fromData(rawData);
  const srcValue = 27;
  const rangeValue = 35;
  const expected = new Map(srcValue, 12, 25);

  expect(mapCollection.getDestinationMap(srcValue, rangeValue)).toEqual(
    expected,
  );
});

test("getDestinationMap returns correct map for unknown source value", () => {
  const rawData = ["soil-to-fertilizer map:", "0 15 27", "37 52 2", "39 0 15"];
  const mapCollection = MapCollection.fromData(rawData);
  const srcValue = 47;
  const rangeValue = 35;
  const expected = new Map(srcValue, srcValue, 5);

  expect(mapCollection.getDestinationMap(srcValue, rangeValue)).toEqual(
    expected,
  );
});
