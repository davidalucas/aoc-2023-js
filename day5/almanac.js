import { MapCollection } from "./map";

/**
 * @class Almanac
 * @description This class represents an Almanac.
 * @property {number[]} seeds - Description of the seeds property.
 * @property {MapCollection | undefined} #head - Description of the head property.
 * @property {MapCollection | undefined} #tail - Description of the tail property.
 */
export class Almanac {
  /**@type {MapCollection} */
  #head;
  /**@type {MapCollection} */
  #tail;
  /**
   * The intial seeds provided by the AoC data.
   * @type {number[]}
   */
  seeds;
  /**@type {number} */
  length;

  /**
   * Constructs an Almanac from the provided raw AoC data
   * @param {string[]} data The raw string data provided in the problem
   */
  constructor(data) {
    this.#head = this.#tail = undefined;
    this.length = 0;
    this.seeds = data[0]
      .split(": ")[1]
      .split(" ")
      .map((s) => parseInt(s));

    let startCursor = 1;

    // walk the dataset, creating MapCollections as you go
    for (let i = 2; i < data.length; i++) {
      const line = data[i].trim();
      if (line === "") {
        this.append(new MapCollection(data.slice(startCursor + 1, i)));
        startCursor = i;
      } else if (i == data.length - 1) {
        this.append(new MapCollection(data.slice(startCursor + 1, i + 1)));
      }
    }
  }

  /**
   * Appends a new map to the almanac
   * @param {MapCollection} map The almanac map to append
   */
  append(map) {
    if (!this.#head) {
      this.#head = this.#tail = map;
      this.length++;
      return;
    }
    this.#tail.next = map;
    this.#tail = map;
    this.length++;
  }

  /**
   * Solves the Day 5 Part 1 problem
   * @returns {number} The minimum location for the seeds
   */
  getMinLocation() {
    let location = -1;

    for (let seed of this.seeds) {
      let currMapCol = this.#head;
      for (let i = 0; i < this.length; ++i) {
        for (const map of currMapCol.maps) {
          const diff = seed - map.source;
          if (diff >= 0 && diff <= map.range) {
            seed = map.dest + diff;
            break;
          }
        }
        currMapCol = currMapCol.next;
      }
      if (location == -1) {
        location = seed;
      } else if (seed < location) {
        location = seed;
      }
    }

    return location;
  }

  getMinLocEnhanced() {
    let location = -1;

    // pre-allocate some reusable variables
    /**@type {number} */
    let seed;
    /**@type {number} */
    let seedRange;
    /**@type {number} */
    let upperLim;
    /**@type {MapCollection} */
    let currMapCol = this.#head;
    /**@type {number} */
    let source;
    /**@type {number} */
    let diff;

    for (let j = 0; j < this.seeds.length; j += 2) {
      seed = this.seeds[j];
      seedRange = this.seeds[j + 1];
      upperLim = seed + seedRange;
      for (; seed < upperLim; ++seed) {
        source = seed;
        for (let i = 0; i < this.length; ++i) {
          for (const map of currMapCol.maps) {
            diff = source - map.source;
            if (diff >= 0 && diff <= map.range) {
              source = map.dest + diff;
              break;
            }
          }
          currMapCol = currMapCol.next;
        }
        if (location == -1) {
          location = source;
        } else if (source < location) {
          location = source;
        }
        currMapCol = this.#head; // reset to beginning of list
      }
    }
    return location;
  }
}
