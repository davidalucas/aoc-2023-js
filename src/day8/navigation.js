/** @typedef {{left: string, right: string}} BinaryNode */
/** @typedef {{directions: string, path: Record<string, BinaryNode>}} NavigationMap */

/**
 * This function parses the provided string data, returning the node along with its id.
 * @param {string} data The line to parse (i.e. "AAA = (BBB, CCC)")
 * @returns {{id: string, node: BinaryNode}}
 * @example
 * const data = "AAA = (BBB, CCC)";
 * const result = parseNode(data);
 * console.log(result);
 * // Output: { id: 'AAA', node: { left: 'BBB', right: 'CCC' } }
 */
export function parseNode(data) {
  const splitData = data.split(" = ");

  const lrSplitData = splitData[1]
    .substring(1, splitData[1].length - 1)
    .split(", ");

  return {
    id: splitData[0],
    node: { left: lrSplitData[0], right: lrSplitData[1] },
  };
}
