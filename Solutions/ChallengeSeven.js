import * as fs from "fs";
import * as _ from "lodash-es";
import number from "lodash-es/number.js";
const file = "../Input/ChallengeSeven.txt";

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

function challengeOne() {}

function challengeTwo() {}

let c1 = challengeOne();
let c2 = challengeTwo();

console.log("Day 7 - Challenge 1: ", c1, "Challenge 2: ", c2);
