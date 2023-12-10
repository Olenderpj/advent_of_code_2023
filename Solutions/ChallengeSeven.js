import { Console } from "console";
import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeSeven.txt";

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

let cardMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

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

  // five of a kind
  if (result.length == 1) {
    return 6;
  }

  // four of a kind [['1', 4]]
  if (result.length >= 2 && result[0][1] == 4) {
    return 5;
  }

  // full house
  if (result.lenth >= 2 && result[0][1] == 3 && result[1][1] == 2) {
    return 4;
  }

  // three of a kind
  if (result.length >= 3 && result[0][1] == 3) {
    return 3;
  }

  //two pair
  if (result.length >= 2 && result[0][1] == 2 && result[1][1] == 2) {
    return 2;
  }

  // one pair
  if (result.length >= 2 && result[0][1] == 2) {
    return 1;
  }

  return 0;
}

function calculateStrength(hands) {
  let currentStrength = 0;

  let groupedHands = _.groupBy(hands, "type");

  Object.entries(groupedHands).forEach(([groupKey, value], idx) => {
    if (value.length == 1) {
      value[idx].rank = currentStrength;
      currentStrength++;
      return;
    }

    console.log(value)

    let highestCard = 0;
    let highestCardIdx = -1;

    // while (value.some((obj) => !obj.visited)) {

    for (let i = 0; i < 5; i++) {
      value.forEach((val, idx) => {
        let cardValue = cardMap[String(val.cards[i])]

        console.log(val.cards[i], cardValue)

        if (cardValue > highestCard){
          highestCard = cardValue
          highestCardIdx = idx
        }
      });

    }
    console.log(highestCard, highestCardIdx)
    highestCard = 0
    highestCardIdx = -1

    // }
  });

  //console.log(groupedHands)
}

function buildHands(inputFile) {
  let hands = inputFile.map((line) => {
    let lineVal = line.split(" ");
    let type = determineRank(lineVal[0]);

    return {
      cards: lineVal[0],//.split("").sort().join(""),
      bid: Number(lineVal[1]),
      type,
      rank: undefined,
      visited: false,
    };
  });

  return hands;
}

function challengeOne() {
  let hands = buildHands(inputFile);
  calculateStrength(hands);
}

function challengeTwo() {}

let c1 = challengeOne();
let c2 = challengeTwo();

console.log("Day 7 - Challenge 1: ", c1, "Challenge 2: ", c2);
