import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeEight.txt";

// read the file input and parse to array of strings
const lines = fs.readFileSync(file, "utf8").split("\n");

let lineMap = new Map();

function buildMap() {
  for (let i = 2; i < lines.length; i++) {
    let line = lines[i]
      .replace("(", "")
      .replace(")", "")
      .replace(",", "")
      .replace("=", "")
      .split(" ")
      .filter((val) => val != "");

    lineMap.set(line[0], {'L': line[1], 'R': line[2]})
  }
}

buildMap();

function walkMap() {
  let instrPtr = 0;
  let stepCt = 0;
  let startKey = lineMap.entries().next().value[0]; // first key in the sequence
  let currentKey = startKey;
  let instructions = lines[0].split("");

  console.log(startKey)

  while(currentKey != 'ZZZ'){
    let instruction = instructions[instrPtr]
    

    let newKey = lineMap.get(currentKey)[instruction]
    
    console.log(currentKey, instruction, newKey)
    currentKey = newKey


    instrPtr++
    stepCt++

    // reset the instruction pointer
    if (instrPtr == instructions.length){
      instrPtr = 0
    }

  }

  return stepCt

}

function challengeOne() {
  return walkMap();
}

function challengeTwo() {}

let c1 = challengeOne();
let c2 = challengeTwo();

console.log("Day 8 - Challenge 1: ", c1, "Challenge 2: ", c2);
