import { test, expect } from "vitest";
import {
  parseSensorData,
  predictNext,
  predictPrevious,
  sumAllNextPredictions,
  sumAllPrevPredictions,
} from "./oasis";

const sensorTestData = [
  {
    data: "0 3 6 9 12 15",
    expectedNumArray: [0, 3, 6, 9, 12, 15],
    expectedNextVal: 18,
    expectedPrevVal: -3,
  },
  {
    data: "1 3 6 10 15 21",
    expectedNumArray: [1, 3, 6, 10, 15, 21],
    expectedNextVal: 28,
    expectedPrevVal: 0,
  },
  {
    data: "10 13 16 21 30 45",
    expectedNumArray: [10, 13, 16, 21, 30, 45],
    expectedNextVal: 68,
    expectedPrevVal: 5,
  },
];
sensorTestData.forEach(({ data, expectedNumArray: expected }) => {
  test(`parseSensorData returns expected array for '${data}'`, () => {
    const actual = parseSensorData(data);
    expect(actual).toStrictEqual(expected);
  });
});

sensorTestData.forEach(
  ({ expectedNumArray: data, expectedNextVal: expected }) => {
    test(`predictNext returns ${expected} for sequence [${data}]`, () => {
      const actual = predictNext(data);
      expect(actual).toBe(expected);
    });
  },
);

sensorTestData.forEach(
  ({ expectedNumArray: data, expectedPrevVal: expected }) => {
    test(`predictPrevious returns ${expected} for sequence [${data}]`, () => {
      const actual = predictPrevious(data);
      expect(actual).toBe(expected);
    });
  },
);

test("sumAllNextPredictions returns expected result for example data", async () => {
  const expected = 114;
  const actual = await sumAllNextPredictions("./src/day9/example.txt");
  expect(actual).toBe(expected);
});

test("sumAllNextPredictions returns expected result for real data", async () => {
  const expected = 1772145754;
  const actual = await sumAllNextPredictions("./src/day9/data.txt");
  expect(actual).toBe(expected);
});

test("sumAllPrevPredictions returns expected result for example data", async () => {
  const expected = 2;
  const actual = await sumAllPrevPredictions("./src/day9/example.txt");
  expect(actual).toBe(expected);
});

test("sumAllPrevPredictions returns expected result for real data", async () => {
  const expected = 867;
  const actual = await sumAllPrevPredictions("./src/day9/data.txt");
  expect(actual).toBe(expected);
});
