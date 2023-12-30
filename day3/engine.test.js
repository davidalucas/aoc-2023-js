import { expect, test } from "vitest";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import { addPartNumbers, isValidPartNumber } from "./engine";

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
