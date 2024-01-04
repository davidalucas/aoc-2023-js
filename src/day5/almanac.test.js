import { expect, test } from "vitest";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import { Almanac } from "./almanac";
import { MapCollection } from "./mapCollection";

test("Almanac.fromData constructs the correct Almanac object", () => {
  const data = [
    ["seeds: 79 14 55 13"],
    ["seed-to-soil map:", "50 98 2", "52 50 48"],
    ["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"],
    ["fertilizer-to-water map:", "49 53 8", "0 11 42", "42 0 7", "57 7 4"],
    ["water-to-light map:", "88 18 7", "18 25 70"],
    ["light-to-temperature map:", "45 77 23", "81 45 19", "68 64 13"],
    ["temperature-to-humidity map:", "0 69 1", "1 0 69"],
    ["humidity-to-location map:", "60 56 37", "56 93 4"],
  ];
  const expected = new Almanac(
    [79, 14, 55, 13],
    [
      MapCollection.fromData(data[1]),
      MapCollection.fromData(data[2]),
      MapCollection.fromData(data[3]),
      MapCollection.fromData(data[4]),
      MapCollection.fromData(data[5]),
      MapCollection.fromData(data[6]),
      MapCollection.fromData(data[7]),
    ],
  );
  const actual = Almanac.fromData(data);
  expect(actual).toStrictEqual(expected);
});

test("Almanac.fromFile constructs correct Almanac from example data", async () => {
  const data = [
    ["seeds: 79 14 55 13"],
    ["seed-to-soil map:", "50 98 2", "52 50 48"],
    ["soil-to-fertilizer map:", "0 15 37", "37 52 2", "39 0 15"],
    ["fertilizer-to-water map:", "49 53 8", "0 11 42", "42 0 7", "57 7 4"],
    ["water-to-light map:", "88 18 7", "18 25 70"],
    ["light-to-temperature map:", "45 77 23", "81 45 19", "68 64 13"],
    ["temperature-to-humidity map:", "0 69 1", "1 0 69"],
    ["humidity-to-location map:", "60 56 37", "56 93 4"],
  ];
  const expected = new Almanac(
    [79, 14, 55, 13],
    [
      MapCollection.fromData(data[1]),
      MapCollection.fromData(data[2]),
      MapCollection.fromData(data[3]),
      MapCollection.fromData(data[4]),
      MapCollection.fromData(data[5]),
      MapCollection.fromData(data[6]),
      MapCollection.fromData(data[7]),
    ],
  );
  const actual = await Almanac.fromFile("./src/day5/example.txt");
  expect(actual).toStrictEqual(expected);
});

test("getMinLocation works for example data", async () => {
  const almanac = await Almanac.fromFile("./src/day5/example.txt");
  const expected = 35;
  const actual = almanac.getMinLocation();
  expect(actual).toBe(expected);
});

test("getMinLocation works for real data", async () => {
  const almanac = await Almanac.fromFile("./src/day5/data.txt");
  const expected = 227653707;
  const actual = almanac.getMinLocation();
  expect(actual).toBe(expected);
});

test("getMinLocEnhanced works for sample data", async () => {
  const almanac = await Almanac.fromFile("./src/day5/example.txt");
  const expected = 46;
  const actual = almanac.getMinLocEnhanced();
  expect(actual).toBe(expected);
});

test("getMinLocEnhanced works for real data", async () => {
  const almanac = await Almanac.fromFile("./src/day5/data.txt");
  const expected = 78775051;
  const actual = almanac.getMinLocEnhanced();
  expect(actual).toBe(expected);
});
