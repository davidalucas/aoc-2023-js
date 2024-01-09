import { test, expect } from "vitest";
import { mazeGuide } from "./maze";

test("mazeGuide returns expected parameters", () => {
  expect(mazeGuide[0][1]["F"]).toStrictEqual({ x: 0, y: 1 });
});
