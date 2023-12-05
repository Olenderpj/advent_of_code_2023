import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeThree.txt";

// read the file input and parse to array of strings
const inputFile = fs.readFileSync(file, "utf8").split("\n");

function challengeOne(inputFile) {
  let sum = 0;
  let validPartNos = [];

  for (let i = 0; i < inputFile.length; i++) {
    let possiblePartNos = inputFile[i].match(/\d+/g) ?? []; // parse all number values from the string

    possiblePartNos.forEach((partNo) => {
      let prevLine = inputFile[i - 1] ?? "";
      let nextLine = inputFile[i + 1] ?? "";
      let partIdx = inputFile[i].indexOf(partNo);

      let startIdx = partIdx - 1;
      let endIdx = partIdx + partNo.length + 1;

      // split apart the previous, current, and next substrings
      let prevSubstring = prevLine.substring(startIdx, endIdx);
      let curSubString = inputFile[i].substring(startIdx, endIdx);
      let nextSubstring = nextLine.substring(startIdx, endIdx);

      //   console.log(prevSubstring)
      //   console.log(curSubString)
      //   console.log(nextSubstring)

      let isPartNoRegex = /[^\w.]+/g;

      // find any matching part no characters
      let result = []
        .concat(prevSubstring.match(isPartNoRegex) ?? [])
        .concat(curSubString.match(isPartNoRegex) ?? [])
        .concat(nextSubstring.match(isPartNoRegex) ?? []);

      // add the part n's value to the sum
      if (result.length > 0) {
        sum += Number(partNo);
        validPartNos.push(Number(partNo));
      }

      // replace part numbers that we have already visited with ignored characters ('.')
      inputFile[i] = inputFile[i].replace(partNo, ".".repeat(partNo.length));
    });
  }
  return { sum, validPartNos };
}

// function isValidPartNo(arr, nums) {
//   arr.forEach((line) => {
//     console.log(line);
//   });

//   nums.forEach((num) => {
//     arr.forEach((line) => {
//       let startIdx = line.indexOf(num) - 1;
//       let endIdx = line.indexOf(num) + num.length + 2;

//       let substr = line.substring(startIdx, endIdx);
//       console.log(num, substr, substr.includes("*"), startIdx, endIdx);
//     });
//   });
// }

function challengeTwo() {
  for (let i = 0; i < inputFile.length; i++) {
    let prevLine = inputFile[i - 1] ?? "";
    let curLine = inputFile[i];
    let nextLine = inputFile[i + 1] ?? "";

    console.log(curLine)
    

    // let possiblePartNos = [];
    // for (let n = 0; n < curLine.length; n++) {
    //   if (curLine[n] === "*") {
    //     let prevArea = prevLine.substring(n - 3, n + 4) ?? "";
    //     let curArea = curLine.substring(n - 3, n + 4) ?? "";
    //     let nextArea = nextLine.substring(n - 3, n + 4) ?? "";

    //     possiblePartNos = []
    //       .concat(prevArea.match(/\d+/g) ?? [])
    //       .concat(curArea.match(/\d+/g) ?? [])
    //       .concat(nextArea.match(/\d+/g) ?? []); 
    //   }
    // }
    
    // possiblePartNos.forEach(partNo => {
    //  console.log(partNo, curLine)

    // })
  }
}

let c1; //= challengeOne(inputFile);
let c2 = challengeTwo();

console.log("Day 3 - Challenge 1: ", c1?.sum, "Challenge 2: ", c2);
