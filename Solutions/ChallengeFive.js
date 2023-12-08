import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeFive.txt";

import { findMinValue } from '../Utilities/NumberUtil.js'

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");
const outputFile = '../Output/ChallengeFive.txt'

let seeds = inputFile[0].split(":")[1].split(" ").map(Number).slice(1);

let maps = {};

function buildMaps() {
  let currentMap = "";

  for (const line of inputFile.splice(1)) {
    let splitLine = line.split(" ");

    if (splitLine.length == 2) {
      currentMap = splitLine[0];
      maps[currentMap] = [];
    }
    if (splitLine.length == 3) {
      maps[currentMap].push(splitLine.map(Number));
    }
  }
}

buildMaps();

/** A seed can go through multiple maps  */
function walkSeedThroughMap(seedNo) {
  let lastUsedMap = "";

  Object.entries(maps).forEach(([name, almanacEntry]) => {
    almanacEntry.forEach((entry) => {
      

      let dst = entry[0];
      let src = entry[1];
      let len = entry[2];

      if (seedNo >= src && seedNo <= src + len - 1 && lastUsedMap != name) {
        let distance = seedNo - src;

        lastUsedMap = name;
        seedNo = dst + distance;
      }
    });
  });
  return seedNo;
}

function challengeOne() {
  let res = seeds.map(walkSeedThroughMap);
  return findMinValue(res);
}
function challengeTwo() {

  let minValue = undefined

 for (let i = 0; i < seeds.length; i += 2){
  for(let n = seeds[i]; n < seeds[i] + seeds[i + 1]; n++){
    let result = walkSeedThroughMap(n)

    if(!minValue){
      minValue = result
    }

    if (result < minValue){
      minValue = result
    }
  }
}
return minValue
}

let c1 = challengeOne(); // 346433842
const start = performance.now();
let c2 = challengeTwo(); // 60294664
const end = performance.now();
const duration = end - start;
console.log(duration / 1000, 'S')
console.log("Day 3 - Challenge 1: ", c1, "Challenge 2: ", c2);
