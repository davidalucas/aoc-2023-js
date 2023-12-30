import { test, expect } from "vitest";
import { calibrate, enhancedCal } from "./trebuchet";
import { createReadStream } from "fs";
import { createInterface } from "readline";

test("Calibrate works for sample input", () => {
  const sampleInput = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
  expect(calibrate(sampleInput)).toBe(142);
});

test("Calibrate works for sample text file", async () => {
  let lines = [];

  // reading a file line by line is not really what you wanna do in Node...
  // it's better to stream the file and work out the numbers as you're streaming
  // through it; but for simplicity, I'm just going to build a string array here
  const readInterface = createInterface({
    input: createReadStream("./day1/day1.txt"),
    output: process.stdout,
    console: false,
  });

  await new Promise((resolve) => {
    readInterface
      .on("line", function (line) {
        lines.push(line);
      })
      .on("close", resolve);
  });

  expect(calibrate(lines)).toBe(55477);
});

test("EnhancedCalibrate works for sample input", () => {
  const sampleInput = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
  ];
  expect(enhancedCal(sampleInput)).toBe(281);
});

test("EnhancedCalibrate works for sample text file", async () => {
  let lines = [];

  const readInterface = createInterface({
    input: createReadStream("./day1/day1.txt"),
    output: process.stdout,
    console: false,
  });

  await new Promise((resolve) => {
    readInterface
      .on("line", function (line) {
        lines.push(line);
      })
      .on("close", resolve);
  });

  expect(enhancedCal(lines)).toBe(54431);
});
