import { createReadStream } from "fs";
import { createInterface } from "readline";
import { MapCollection } from "./mapCollection";

/**
 * @class Almanac
 * @description This class represents an Almanac.
 * @property {number[]} seeds - Description of the seeds property.
 * @property {MapCollection | undefined} #head - Description of the head property.
 * @property {MapCollection | undefined} #tail - Description of the tail property.
 */
export class Almanac {
  /**
   * The default constructor for an Almanac object
   * @param {number[]} seeds The valid seeds for the Almanac
   * @param {MapCollection[]} maps The map collections for the Almanac
   */
  constructor(seeds, maps) {
    /**
     * The intial seeds provided by the AoC data.
     * @type {number[]}
     */
    this.seeds = seeds;
    /**
     * The map collections associated with the Almanac
     * @type {MapCollection[]}
     */
    this.mapCollections = maps;
  }

  /**
   * Constructs an Almanac from the provided raw AoC data
   * @param {string[][]} data The raw string data provided in the problem, structured in a 2D array
   */
  static fromData(data) {
    const seeds = data[0][0]
      .split(": ")[1]
      .split(" ")
      .map((s) => parseInt(s));

    let mapCollections = [];

    for (let i = 1; i < data.length; i++) {
      mapCollections.push(MapCollection.fromData(data[i]));
    }

    return new Almanac(seeds, mapCollections);
  }

  /**
   * Constructs an Almanac object using the data from a text file located
   * at the provided path location.
   * @param {string} path The path to the data file
   * @returns The resulting Almanac object
   */
  static async fromFile(path) {
    /** @type {string[][]} */
    let data = [];

    const readInterface = createInterface({
      input: createReadStream(path),
      output: process.stdout,
      terminal: false,
    });

    await new Promise((resolve) => {
      /** @type {string[]} */
      let collector = [];
      readInterface
        .on("line", (line) => {
          if (line === "") {
            data.push(collector);
            collector = [];
          } else {
            collector.push(line);
          }
        })
        .on("close", () => {
          data.push(collector);
          resolve(true);
        });
    });
    return Almanac.fromData(data);
  }

  /**
   * Solves the Day 5 Part 1 problem
   * @returns {number} The minimum location for the seeds
   */
  getMinLocation() {
    let location = -1;

    for (let seed of this.seeds) {
      let source = seed;
      for (const mapCollection of this.mapCollections) {
        source = mapCollection.getDestination(source);
      }

      if (location == -1) {
        location = source;
      } else if (source < location) {
        location = source;
      }
    }

    return location;
  }

  getMinLocEnhanced() {
    let location = -1;
    for (let i = 0; i < this.seeds.length; i += 2) {
      let srcSeed = this.seeds[i];
      let seedRange = this.seeds[i + 1];
      for (let j = srcSeed; j < srcSeed + seedRange; ++j) {
        let source = j;
        let range = seedRange - (j - srcSeed);
        for (const mapCol of this.mapCollections) {
          const nextMap = mapCol.getDestinationMap(source, range);
          source = nextMap.dest;
          range = range < nextMap.range ? range : nextMap.range;
        }
        if (location == -1) {
          console.log(`Found location ${source} for seed ${srcSeed}`);
          location = source;
        } else if (source < location) {
          location = source;
        }
        j += range - 1;
      }
    }
    return location;
  }

  // getMinLocEnhanced() {
  //   let location = -1;

  //   // pre-allocate some reusable variables
  //   /**@type {number} */
  //   let seed;
  //   /**@type {number} */
  //   let seedRange;
  //   /**@type {number} */
  //   let upperLim;
  //   /**@type {MapCollection} */
  //   let currMapCol = this.#head;
  //   /**@type {number} */
  //   let source;
  //   /**@type {number} */
  //   let diff;

  //   for (let j = 0; j < this.seeds.length; j += 2) {
  //     seed = this.seeds[j];
  //     seedRange = this.seeds[j + 1];
  //     upperLim = seed + seedRange;
  //     for (; seed < upperLim; ++seed) {
  //       source = seed;
  //       for (let i = 0; i < this.length; ++i) {
  //         for (const map of currMapCol.maps) {
  //           diff = source - map.source;
  //           if (diff >= 0 && diff <= map.range) {
  //             source = map.dest + diff;
  //             break;
  //           }
  //         }
  //         currMapCol = currMapCol.#next;
  //       }
  //       if (location == -1) {
  //         location = source;
  //       } else if (source < location) {
  //         location = source;
  //       }
  //       currMapCol = this.#head; // reset to beginning of list
  //     }
  //   }
  //   return location;
  // }
}
