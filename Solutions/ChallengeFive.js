import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeFive.txt";

import { findMinValue } from '../Utilities/NumberUtil.js'

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

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
      maps[currentMap].push(line);
    }
  }
}

buildMaps();

/** A seed can go through multiple maps  */
function walkSeedThroughMap(seedNo) {
  let lastUsedMap = "";

  Object.entries(maps).forEach(([name, almanacEntry]) => {
    almanacEntry.forEach((entry) => {
      entry = entry.split(" ");

      let dst = Number(entry[0]);
      let src = Number(entry[1]);
      let len = Number(entry[2]);

      if (seedNo >= src && seedNo <= src + len - 1 && lastUsedMap != name) {
        let distance = seedNo - src;

        lastUsedMap = name;
        seedNo = dst + distance;
      }
    });
  });
  console.log(seedNo)
  return seedNo;
}

function challengeOne() {
  let res = seeds.map(walkSeedThroughMap);
  return findMinValue(res);
}
function challengeTwo() {

  let allSeedAreas = []


  for(let i = 0; i < seeds.length; i+= 2){
    let value = seeds[i]
    let range = seeds[i + 1]

    for(let n = value; n < value + range; n++){

      allSeedAreas.push(walkSeedThroughMap(n))
    }
    
  }

  return _.min(allSeedAreas);
}

let c1 //= challengeOne();
let c2 = challengeTwo();

console.log("Day 3 - Challenge 1: ", c1, "Challenge 2: ", c2);
