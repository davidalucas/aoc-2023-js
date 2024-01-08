import { test, expect } from "vitest";
import { parseNode } from "./navigation";

test("parseNode returns expected data", () => {
  /** @type {{id: string, node: import("./navigation").BinaryNode}} */
  let expected = { id: "AAA", node: { left: "BBB", right: "CCC" } };
  let actual = parseNode("AAA = (BBB, CCC)");
  expect(actual).toStrictEqual(expected);
});
