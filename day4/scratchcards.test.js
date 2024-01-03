import { expect, test } from "vitest";
import { createReadStream } from "fs";
import { createInterface } from "readline";
import { calculateTotalCards, calculateWinnings } from "./scratchcards";

test("calculateWinnings calculates correct sum for sample data", () => {
  const data = [
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
  ];
  const expected = 13;
  expect(calculateWinnings(data)).toBe(expected);
});

test("calculateWinnings calculates correct sum for real data", async () => {
  let data = [];

  const readInterface = createInterface({
    input: createReadStream("./day4/data.txt"),
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
  const expected = 23235;
  expect(calculateWinnings(data)).toBe(expected);
});

test("calculateTotalCards calculates correct sum for sample data", () => {
  const data = [
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
  ];
  const expected = 30;
  expect(calculateTotalCards(data)).toBe(expected);
});

test("calculateTotalCards calculates correct sum for real data", async () => {
  let data = [];

  const readInterface = createInterface({
    input: createReadStream("./day4/data.txt"),
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
  const expected = 5920640;
  expect(calculateTotalCards(data)).toBe(expected);
});
