/** @typedef {{time: number, distance: number }} Race */
/** @typedef {{min: number, max: number }} ChargingTime */

/**
 *
 * @param {Race} raceData
 * @returns {ChargingTime}
 */
export function calculateChargingTimeMinMax(raceData) {
  const a =
    (raceData.time + Math.sqrt(raceData.time ** 2 - 4 * raceData.distance)) / 2;
  const b =
    (raceData.time - Math.sqrt(raceData.time ** 2 - 4 * raceData.distance)) / 2;
  return { min: Math.floor(b) + 1, max: Math.ceil(a) - 1 };
}

/**
 * Solves the Day 6 Part 1 problem
 * @param {Race[]} races
 * @returns {number}
 */
export function calculateWinningRangeProduct(races) {
  return races
    .map((r) => calculateChargingTimeMinMax(r))
    .map((ct) => ct.max - ct.min + 1)
    .reduce((a, b) => a * b);
}
