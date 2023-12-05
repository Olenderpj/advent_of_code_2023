import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeFour.txt";

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

let cards = []

function challengeOne() {
  let sum = 0;
  let inputRegex = /Card[\s0-9]*:(?<winningNums>[\s0-9\s|]*)/;

  inputFile.forEach((line, idx) => {
    let input = line.match(inputRegex);
    let res = input.groups.winningNums.split("|");
    let winningNums = res[0].split(" ");
    let testNums = res[1].split(" ");

    let winningNumCount = _.intersection(winningNums, testNums).filter((item) =>
      Number(item)
    ).length;

    //console.log(winningNumCount, math.pow )

    let curSum = 0;

    if (winningNumCount == 1) {
      curSum += 1;
    }

    if (winningNumCount >= 2) {
      curSum = Math.pow(2, winningNumCount - 1);
    }

    cards.push({name: idx, matches:winningNumCount, processed: false})

    sum += curSum;
  });
  return sum;
}

/**
 * get the total number of cards
 * @returns Integer
 */
function challengeTwo() {
    let idx = 0
    while (idx < cards.length){
        let cardName = cards[idx].name;
        for(let i = 0; i < cards[idx].matches; i++){
            let cardIdx = cards[cardName + i + 1]
            cards.push({name: cardIdx.name, matches: cardIdx.matches, processed: false})
        }
        cards[idx].processed = true;
        idx++;
    }
    return cards.length
}

let c1 = challengeOne();
let c2 = challengeTwo();

console.log("Day 4 - Challenge 1: ", c1, "Challenge 2: ", c2);
