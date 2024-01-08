import { test, expect } from "vitest";
import {
  countSteps,
  getStartingNodes,
  parseNavMap,
  parseNode,
} from "./navigation";

test("parseNode returns expected data", () => {
  /** @type {{id: string, node: import("./navigation").BinaryNode}} */
  let expected = { id: "AAA", node: { left: "BBB", right: "CCC" } };
  let actual = parseNode("AAA = (BBB, CCC)");
  expect(actual).toStrictEqual(expected);
});

test("parseNavMap constructs expected NavigationMap object", async () => {
  /** @type {import("./navigation").NavigationMap} */
  const expected = {
    directions: "LLR",
    path: {
      AAA: { left: "BBB", right: "BBB" },
      BBB: { left: "AAA", right: "ZZZ" },
      ZZZ: { left: "ZZZ", right: "ZZZ" },
    },
  };
  const actual = await parseNavMap("./src/day8/example2.txt");
  expect(actual).toStrictEqual(expected);
});

test("countSteps returns correct number of steps for first example data", async () => {
  const navMap = await parseNavMap("./src/day8/example1.txt");
  const expected = 2;
  const actual = countSteps(navMap);
  expect(actual).toBe(expected);
});

test("countSteps returns correct number of steps for second example data", async () => {
  const navMap = await parseNavMap("./src/day8/example2.txt");
  const expected = 6;
  const actual = countSteps(navMap);
  expect(actual).toBe(expected);
});

test("countSteps returns correct number of steps for real data", async () => {
  const navMap = await parseNavMap("./src/day8/data.txt");
  const expected = 20221;
  const actual = countSteps(navMap);
  expect(actual).toBe(expected);
});

test("getStartingNodes returns correct values", async () => {
  const navMap = await parseNavMap("./src/day8/example3.txt");
  const expected = ["11A", "22A"];
  const actual = getStartingNodes(navMap);
  expect(actual).toStrictEqual(expected);
});
