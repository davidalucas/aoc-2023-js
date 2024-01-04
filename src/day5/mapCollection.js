import { Map } from "./map";

/**
 * Represents a single node in the Almanac linked list
 */
export class MapCollection {
  /**
   * Constructs a MapCollection, sorting the provided maps by their destination values
   * in ascending order.
   * @param {string} name - The name for the map collection
   * @param {Map[]} maps - The maps in this collection
   */
  constructor(name, maps) {
    /**
     * The name for the MapCollection
     * @type {string}
     */
    this.name = name;
    /**
     * The maps associated with this map collection
     * @type {Map[]}
     */
    this.maps = maps.sort((a, b) => a.source - b.source);
  }

  /**
   * Takes a subsection of the complete AoC data and constructs a MapCollection from it
   * @param {string[]} data - A small piece of the string data representing the map collection
   * @returns {MapCollection} The resulting MapCollection
   */
  static fromData(data) {
    /** @type {Map[]} */
    const maps = new Array(data.length - 1);
    for (let i = 1; i < data.length; i++) {
      maps[i - 1] = Map.fromData(data[i]);
    }
    return new MapCollection(data[0], maps);
  }

  /**
   * Gets the destination value for this map using the provided source value
   * @param {number} src - The source value to use
   * @returns {number} The destination value
   */
  getDestination(src) {
    for (const map of this.maps) {
      const dest = map.calcDestination(src);
      if (dest) {
        return dest;
      }
    }
    return src;
  }

  /**
   * Gets the destination map using the provided source and range parameters
   * @param {number} src - The source value to use
   * @param {number} range - The range value to use
   * @returns {Map} - The resulting map
   */
  getDestinationMap(src, range) {
    for (const map of this.maps) {
      const destMap = map.calcDestinationMap(src, range);
      if (destMap) {
        return destMap;
      }
    }
    // remember the maps are sorted by their source values
    const nextMap = this.maps.find((m) => m.source > src);
    if (!nextMap) {
      return new Map(src, src, range);
    }
    const newRange = nextMap.source - src;
    return new Map(src, src, range < newRange ? range : newRange);
  }
}
