export class Map {
  /**@type {number} */
  source;
  /**@type {number} */
  dest;
  /**@type {number} */
  range;

  /**
   * Default constructor for the Map class
   * @param {number} source The source value
   * @param {number} dest The destination value
   * @param {number} range The range value
   */
  constructor(source, dest, range) {
    this.source = source;
    this.dest = dest;
    this.range = range;
  }

  /**
   * Constructs an individual Map from AoC data
   * @param {string} data A raw data string from the AoC data set
   */
  static fromData(data) {
    const splitData = data.trim().split(" ");
    const source = parseInt(splitData[1]);
    const dest = parseInt(splitData[0]);
    const range = parseInt(splitData[2]);
    return new Map(source, dest, range);
  }

  /**
   * Calculates the corresponding "destination" value for a provided "source" value
   * @param {number} src The source value to use
   * @returns {number | null} The resulting destination, or null if the provided source value was invalid
   */
  calcDestination(src) {
    if (src - this.source < 0) {
      return null;
    } else if (src - this.source > this.range - 1) {
      return null;
    }
    return this.dest + (src - this.source);
  }

  /**
   * Similar to the calcDestination function, except it returns a map representing
   * the full range of destinations that align with the provided source and range values
   * @param {number} src The source value to use
   * @param {number} range The range associated with the current src value
   * @returns {Map | null}
   */
  calcDestinationMap(src, range) {
    const newDest = this.calcDestination(src);
    if (!newDest) {
      return null;
    }
    const newRange = this.range - (newDest - this.dest);
    return new Map(src, newDest, range < newRange ? range : newRange);
  }
}
