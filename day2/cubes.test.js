/**
 * @typedef {import('./cubes').CubeGame} CubeGame
 * @typedef {import('./cubes').Reveal} Reveal
 */

import { expect, test } from "vitest";
import { parseCubeGame, parseReveal } from "./cubes";

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
