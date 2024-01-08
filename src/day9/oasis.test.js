import { test, expect } from "vitest";
import { parseSensorData } from "./oasis";

const parseSensorDataInputs = [
  {
    data: "0 3 6 9 12 15",
    expected: [0, 3, 6, 9, 12, 15],
  },
  {
    data: "1 3 6 10 15 21",
    expected: [1, 3, 6, 10, 15, 21],
  },
  {
    data: "10 13 16 21 30 45",
    expected: [10, 13, 16, 21, 30, 45],
  },
];
parseSensorDataInputs.forEach(({ data, expected }) => {
  test(`parseSensorData returns expected array for '${data}'`, () => {
    const actual = parseSensorData(data);
    expect(actual).toStrictEqual(expected);
  });
});
