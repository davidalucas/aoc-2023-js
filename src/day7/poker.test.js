import { expect, test } from "vitest";
import { Hand, compareHands, compareHandsWithJokers } from "./hand";
import { calcWinnings, calcWinningsWithJokers, parseHands } from "./poker";

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

test("calcWinnings calculates correct sum for example data", async () => {
  const hands = await parseHands("./src/day7/example.txt");
  const actual = calcWinnings(hands);
  expect(actual).toEqual(6440);
});

test("calcWinnings calculates correct sum for real data", async () => {
  const hands = await parseHands("./src/day7/data.txt");
  const actual = calcWinnings(hands);
  expect(actual).toEqual(251216224);
});

test("calcWinningsWithJokers calculates correct sum for example data", async () => {
  const hands = await parseHands("./src/day7/example.txt");
  const actual = calcWinningsWithJokers(hands);
  expect(actual).toEqual(5905);
});

test("calcWinningsWithJokers calculates correct sum for real data", async () => {
  const hands = await parseHands("./src/day7/data.txt");
  const actual = calcWinningsWithJokers(hands);
  expect(actual).toEqual(250825971);
});
