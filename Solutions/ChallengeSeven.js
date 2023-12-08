import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeSeven.txt";

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

function determineRank(cards) {
  let cardMap = new Map();

  cardMap.set("A", 0);
  cardMap.set("K", 0);
  cardMap.set("Q", 0);
  cardMap.set("J", 0);
  cardMap.set("T", 0);
  cardMap.set("9", 0);
  cardMap.set("8", 0);
  cardMap.set("7", 0);
  cardMap.set("6", 0);
  cardMap.set("5", 0);
  cardMap.set("4", 0);
  cardMap.set("3", 0);
  cardMap.set("2", 0);

  cards.split("").forEach((card) => {
    cardMap.set(card, cardMap.get(card) + 1);
  });

  // create sorted map
  let result = [...cardMap]
    .filter(([key, value]) => value > 0)
    .sort(function (a, b) {
      return b[1] - a[1];
    });

  console.log("res", result);
}

function buildHands(inputFile) {
  let hands = inputFile.map(
    (line) => {
      let lineVal = line.split(" ");
      let rank = determineRank(lineVal[0]);
      return { cards: lineVal[0], bid: Number(lineVal[1]) };
    } //todo: figure out ranking system
  );
}

buildHands(inputFile);

function challengeOne() {}

function challengeTwo() {}

let c1 = challengeOne();
let c2 = challengeTwo();

console.log("Day 7 - Challenge 1: ", c1, "Challenge 2: ", c2);
