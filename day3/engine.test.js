import { expect, test } from "vitest";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import {
  addPartNumbers,
  findPartNumbers,
  isValidPartNumber,
  sumAllGears,
} from "./engine";

test("isPartNumberValid finds valid part number", () => {
  const data = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];
  expect(isValidPartNumber(data, 2, 2, 3)).toBe(true);
});

test("addPartNumbers adds part numbers in example data", () => {
  const data = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];
  expect(addPartNumbers(data)).toBe(4361);
});

test("addPartNumbers adds part numbers in real data", async () => {
  let data = [];

  const readInterface = createInterface({
    input: createReadStream("./day3/day3.txt"),
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
  expect(addPartNumbers(data)).toBe(544664);
});

test("findPartNumbers finds part numbers in test data", () => {
  const data = ["467..114..", "...*......", "617*......"];
  /**@type {import("./engine").PartNumber[][]} */
  const expected = [
    [
      { value: 467, start: 0, end: 2 },
      { value: 114, start: 5, end: 7 },
    ],
    [],
    [{ value: 617, start: 0, end: 2 }],
  ];

  expect(findPartNumbers(data)).toEqual(expected);
});

test("sumAllGears performs summation for example data", () => {
  const data = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];
  expect(sumAllGears(data)).toBe(467835);
});

test("sumAllGears performs summation for real data", async () => {
  let data = [];

  const readInterface = createInterface({
    input: createReadStream("./day3/day3.txt"),
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
  expect(sumAllGears(data)).toBe(84495585);
});
