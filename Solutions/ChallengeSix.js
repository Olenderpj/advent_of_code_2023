import * as fs from "fs";
import * as _ from "lodash-es";
import number from "lodash-es/number.js";
const file = "../Input/ChallengeSix.txt";

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

let races = [];

let lineOneInput = inputFile[0]
  .split(":")[1]
  .split(" ")
  .map(Number)
  .filter((num) => num !== 0);
let lineTwoInput = inputFile[1]
  .split(":")[1]
  .split(" ")
  .map(Number)
  .filter((num) => num !== 0);

lineOneInput.forEach((time, idx) =>
  races.push({ id: idx + 1, time, distance: lineTwoInput[idx], })
);

function generatePossibleResults(races) {

let winningSum = 1

  races.forEach((value) => {

    let numberOfWins = 0

    // iterate over all the possible times
    for (let holdTime = 0; holdTime < value.time + 1; holdTime++) {
        
        // calculate the remaining time after holding the button
        let raceTime = value.time - holdTime 
        let distanceTraveled = holdTime * raceTime
        
        // calculate the distance travelled in the remaining time
        if (distanceTraveled > value.distance){
            numberOfWins += 1
        }
        
    }
    winningSum *= numberOfWins
    numberOfWins = 0
    
  });
  return winningSum
}



function challengeOne() {
    return generatePossibleResults(races);
}

function challengeTwo() {
    
    // create strings out of the first and second line
    let lineOne = inputFile[0].split(':')[1].split(' ').join('')
    let lineTwo = inputFile[1].split(':')[1].split(' ').join('')

    // build the race object
    let races = [{id: 0, time: lineOne, distance: lineTwo}]
    
    // geerate the possible results of the race
    return generatePossibleResults(races)

}

let c1 = challengeOne();
let c2 = challengeTwo();

console.log("Day 3 - Challenge 1: ", c1, "Challenge 2: ", c2);
