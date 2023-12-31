import { expect, test } from "vitest";
import { Hand, compareHands } from "./hand";

test("Hand constructor constructs correct object", () => {
  const hand = new Hand("32T3K", 765);
  expect(hand.cards).toBe("32T3K");
  expect(hand.bid).toBe(765);
  expect(hand.score).toBe(7);
});

const handStringData = [
  {
    data: "32T3K 765",
    expectedCards: "32T3K",
    expectedBid: 765,
    expectedScore: 7,
    expectedJokerScore: 7,
  },
  {
    data: "T55J5 684",
    expectedCards: "T55J5",
    expectedBid: 684,
    expectedScore: 11,
    expectedJokerScore: 17,
  },
  {
    data: "KK677 28",
    expectedCards: "KK677",
    expectedBid: 28,
    expectedScore: 9,
    expectedJokerScore: 9,
  },
  {
    data: "KTJJT 220",
    expectedCards: "KTJJT",
    expectedBid: 220,
    expectedScore: 9,
    expectedJokerScore: 17,
  },
  {
    data: "QQQJA 483",
    expectedCards: "QQQJA",
    expectedBid: 483,
    expectedScore: 11,
    expectedJokerScore: 17,
  },
];

handStringData.forEach(
  ({ data, expectedCards, expectedBid, expectedScore, expectedJokerScore }) => {
    test(`fromString constructs expected Hand object from '${data}'`, () => {
      const actual = Hand.fromString(data);
      expect(actual.cards).toBe(expectedCards);
      expect(actual.bid).toBe(expectedBid);
      expect(actual.score).toBe(expectedScore);
      expect(actual.jokerScore).toBe(expectedJokerScore);
    });
  },
);

test("compareHands returns negative when expected", () => {
  const first = Hand.fromString("32T3K 765");
  const second = Hand.fromString("QQQJA 483");
  expect(compareHands(first, second)).toBeLessThan(0);
});

test("compareHands returns positive when expected", () => {
  const first = Hand.fromString("QQQJA 483");
  const second = Hand.fromString("32T3K 765");
  expect(compareHands(first, second)).toBeGreaterThan(0);
});

test("compareHands returns zero when expected", () => {
  const first = Hand.fromString("QQQJA 483");
  const second = Hand.fromString("QQQJA 483");
  expect(compareHands(first, second)).toBe(0);
});
