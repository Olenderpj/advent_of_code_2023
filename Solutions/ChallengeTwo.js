import * as fs from 'fs';
import * as _ from 'lodash-es'
import {findMaxValue} from '../Utilities/NumberUtil.js'

const file = "../Input/ChallengeTwo.txt";

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

let challengeOneRequirements = {
  red: 12,
  green: 13,
  blue: 14,
};

function buildGameMap(gameInput) {
  let gameRegex = new RegExp(
    /Game\s(?<gameId>[0-9]*):(?<gameDraws>[\s0-9a-z,;]*)*/
  );
  let colorRegex = new RegExp(/\s?(?<count>[0-9]*)\s?(?<color>[a-z]*)/);
  let pickMap = { red: [], green: [], blue: [] };

  const { gameId, gameDraws } = gameInput.match(gameRegex).groups;
  pickMap.id = Number(gameId);

  // split the games draws up by color and push result color and count for each pick to the pickMap
  gameDraws.split(";").map((str) =>
    str.split(",").forEach((pick) => {
      let item = pick.match(colorRegex).groups;
      pickMap[item.color].push(Number(item.count));
    })
  );

  return pickMap;
}

function challengeOne() {
  let sum = 0;

  inputFile.forEach((input) => {
    let map = buildGameMap(input);

    let valid = [];

    Object.entries(map).forEach(([key, value]) => {
      // ignore the id key
      if (key == "id") {
        return;
      }

      valid.push(value.every((val) => val <= challengeOneRequirements[key]));
    });

    // check if all array values are valid
    if (valid.every((val) => val)) {
      sum += map.id;
    }
  });

  return sum;
}

function challengeTwo() {
    
    let sum = 0
    
    inputFile.forEach((input) => {
    let map = buildGameMap(input);
    let power = 1
    
    map = Object.entries(map).map(([key, value]) => {
        // ignore the id key
      if (key == "id") {
        return;
      }
      
      // multiply all of the largest values together (aka the min value that the game would be possible with)
      power *= findMaxValue(value)

    })
    // add the power to the sum
    sum += power

  });

  return sum
}

let c1 = challengeOne(); // 2278
let c2 = challengeTwo(); //67953

console.log("Day 2 - Challenge 1: ", c1, 'Challenge 2: ', c2)