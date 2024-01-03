export class Map {
  /**@type {number} */
  source;
  /**@type {number} */
  dest;
  /**@type {number} */
  range;

  /**
   * Constructs an individual Map from AoC data
   * @param {string} data A raw data string from the AoC data set
   */
  constructor(data) {
    const splitData = data.trim().split(" ");
    this.dest = parseInt(splitData[0]);
    this.source = parseInt(splitData[1]);
    this.range = parseInt(splitData[2]);
  }
}

export class MapCollection {
  /**@type {MapCollection | undefined} */
  next;
  /**@type {Map[]} */
  maps;

  /**
   * Takes a subsection of the complete AoC data and constructs a MapCollection from it
   * @param {string[]} data A small piece of the string data representing the map collection
   */
  constructor(data) {
    this.maps = new Array(data.length - 1);
    for (let i = 1; i < data.length; i++) {
      this.maps[i - 1] = new Map(data[i]);
    }
  }
}
