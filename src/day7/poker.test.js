import { expect, test } from "vitest";
import { Hand } from "./hand";
import { parseHands } from "./poker";

test("parseHands creates the correct array from example data", async () => {
  const expected = [
    new Hand("32T3K", 765),
    new Hand("T55J5", 684),
    new Hand("KK677", 28),
    new Hand("KTJJT", 220),
    new Hand("QQQJA", 483),
  ];
  const actual = await parseHands("./src/day7/example.txt");
  expect(actual).toEqual(expected);
});
