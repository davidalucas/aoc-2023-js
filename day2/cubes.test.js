/**
 * @typedef {import('./cubes').CubeGame} CubeGame
 * @typedef {import('./cubes').Reveal} Reveal
 */

import { expect, test } from "vitest";
import {
  getMinPowerFactor,
  parseCubeGame,
  parseReveal,
  sumValidGames,
} from "./cubes";
import { createReadStream } from "fs";
import { createInterface } from "readline";

test("parseReveal parses data as expected", () => {
  expect(parseReveal("1 red, 2 green, 6 blue")).toEqual({
    reds: 1,
    greens: 2,
    blues: 6,
  });

  expect(parseReveal("3 blue, 4 red")).toEqual({
    reds: 4,
    greens: 0,
    blues: 3,
  });

  expect(parseReveal("2 green")).toEqual({
    reds: 0,
    greens: 2,
    blues: 0,
  });
});

test("parseCubeGame parses data as expected", () => {
  const inputData =
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red";

  /**@type {CubeGame} */
  const expected = {
    index: 3,
    reveals: [
      { reds: 20, greens: 8, blues: 6 },
      { reds: 4, greens: 13, blues: 5 },
      { reds: 1, greens: 5, blues: 0 },
    ],
  };
  expect(parseCubeGame(inputData)).toEqual(expected);
});

test("sumValidGames sums valid games in sample data", () => {
  let games = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ].map((val) => parseCubeGame(val));
  expect(sumValidGames(games, 12, 13, 14)).toBe(8);
});

test("sumValidGames sums valid games in real data", async () => {
  /**@type {CubeGame[]} */
  let games = [];

  // reading a file line by line is not really what you wanna do in Node...
  // it's better to stream the file and work out the numbers as you're streaming
  // through it; but for simplicity, I'm just going to build a string array here
  const readInterface = createInterface({
    input: createReadStream("./day2/day2.txt"),
    output: process.stdout,
    console: false,
  });

  await new Promise((resolve) => {
    readInterface
      .on("line", function (line) {
        games.push(parseCubeGame(line));
      })
      .on("close", resolve);
  });

  expect(sumValidGames(games, 12, 13, 14)).toBe(2727);
});

test("getMinPowerFactor gets correct result for example data", () => {
  let games = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ].map((val) => parseCubeGame(val));
  expect(getMinPowerFactor(games)).toBe(2286);
});

test("getMinPowerFactor gets correct result for real data", async () => {
  /**@type {CubeGame[]} */
  let games = [];

  // reading a file line by line is not really what you wanna do in Node...
  // it's better to stream the file and work out the numbers as you're streaming
  // through it; but for simplicity, I'm just going to build a string array here
  const readInterface = createInterface({
    input: createReadStream("./day2/day2.txt"),
    output: process.stdout,
    console: false,
  });

  await new Promise((resolve) => {
    readInterface
      .on("line", function (line) {
        games.push(parseCubeGame(line));
      })
      .on("close", resolve);
  });

  expect(getMinPowerFactor(games)).toBe(56580);
});
