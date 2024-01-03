import { expect, test } from "vitest";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import { Almanac } from "./almanac";

test("Almanac class works for sample data", () => {
  const data = [
    "seeds: 79 14 55 13",
    "",
    "seed-to-soil map:",
    "50 98 2",
    "52 50 48",
    "",
    "soil-to-fertilizer map:",
    "0 15 37",
    "37 52 2",
    "39 0 15",
    "",
    "fertilizer-to-water map:",
    "49 53 8",
    "0 11 42",
    "42 0 7",
    "57 7 4",
    "",
    "water-to-light map:",
    "88 18 7",
    "18 25 70",
    "",
    "light-to-temperature map:",
    "45 77 23",
    "81 45 19",
    "68 64 13",
    "",
    "temperature-to-humidity map:",
    "0 69 1",
    "1 0 69",
    "",
    "humidity-to-location map:",
    "60 56 37",
    "56 93 4",
  ];
  const almanac = new Almanac(data);

  expect(almanac.seeds).toEqual([79, 14, 55, 13]);
  expect(almanac.getMinLocation()).toBe(35);
});

test("Almanac class works for real data", async () => {
  let data = [];

  const readInterface = createInterface({
    input: createReadStream("./day5/data.txt"),
    output: process.stdout,
    console: false,
  });

  await new Promise((resolve) => {
    readInterface
      .on("line", function (line) {
        data.push(line);
      })
      .on("close", resolve);
  });

  const almanac = new Almanac(data);
  expect(almanac.getMinLocation()).toBe(227653707);
});

test("getMinLocEnhanced works for sample data", () => {
  const data = [
    "seeds: 79 14 55 13",
    "",
    "seed-to-soil map:",
    "50 98 2",
    "52 50 48",
    "",
    "soil-to-fertilizer map:",
    "0 15 37",
    "37 52 2",
    "39 0 15",
    "",
    "fertilizer-to-water map:",
    "49 53 8",
    "0 11 42",
    "42 0 7",
    "57 7 4",
    "",
    "water-to-light map:",
    "88 18 7",
    "18 25 70",
    "",
    "light-to-temperature map:",
    "45 77 23",
    "81 45 19",
    "68 64 13",
    "",
    "temperature-to-humidity map:",
    "0 69 1",
    "1 0 69",
    "",
    "humidity-to-location map:",
    "60 56 37",
    "56 93 4",
  ];
  const almanac = new Almanac(data);

  expect(almanac.seeds).toEqual([79, 14, 55, 13]);
  expect(almanac.getMinLocEnhanced()).toBe(46);
});

// test("getMinLocEnhanced works for real data", async () => {
//   let data = [];

//   const readInterface = createInterface({
//     input: createReadStream("./day5/data.txt"),
//     output: process.stdout,
//     console: false,
//   });

//   await new Promise((resolve) => {
//     readInterface
//       .on("line", function (line) {
//         data.push(line);
//       })
//       .on("close", resolve);
//   });

//   const almanac = new Almanac(data);
//   expect(almanac.getMinLocEnhanced()).toBe(78775051);
// });
