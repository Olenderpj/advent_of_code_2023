import * as fs from "fs";
import * as _ from "lodash-es";
const file = "../Input/ChallengeNine.txt";

// read the file input and parse to array of strings
const input = fs.readFileSync(file, "utf8").split("\n");

function findDifferenceSeq(sequence) {
  let newSeq = [];

  for (let i = 0; i < sequence.length - 1; i++) {
    newSeq.push(sequence[i + 1] - sequence[i]);
  }

  return newSeq;
}

function extrapolateForward() {
  let lineMap = [];

  let lines = input.map((line) => line.split(" ").map(Number));

  lines.forEach((line) => {
    let mapEntry = { parent: line, child: [line] };

    lineMap.push(mapEntry);

    while (mapEntry.child.at(-1).some((val) => val != 0)) {
      let childEntry = mapEntry.child.at(-1);
      mapEntry.child.push(findDifferenceSeq(childEntry));
    }
  });

  let result = 0;

  lineMap.forEach((line) => {
    let children = line.child.reverse();

    children.forEach((child, idx) => {
      if (child.every((val) => val == 0)) {
        child.push(0);
      } else {
        let cur = child.at(-1);
        let prev = children[idx - 1].at(-1);
        //console.log(idx, cur, prev)
        child.push(cur + prev);
      }
    });
    result += children.at(-1).at(-1);
  });
  return result;
}

function extrapolatebackward() {
  let lineMap = [];

  let lines = input.map((line) => line.split(" ").map(Number));

  lines.forEach((line) => {
    let mapEntry = { parent: line, child: [line] };

    lineMap.push(mapEntry);

    while (mapEntry.child.at(-1).some((val) => val != 0)) {
      let childEntry = mapEntry.child.at(-1);
      mapEntry.child.push(findDifferenceSeq(childEntry));
    }
  });

  let result = 0;

  lineMap.forEach((line) => {
    let children = line.child.reverse();

    children.forEach((child, idx) => {
      let cur = child[0];
      let prev = children[idx - 1] ? children[idx - 1][0] : 0;

      let newRes = cur - prev;

      if (newRes > 0) {
        newRes = Math.abs(newRes);
      }

      children[idx] = [newRes].concat(child);

    });
  });

  lineMap.forEach(line => result += line.child.reverse().at(0).at(0))

  return result
}

console.log(extrapolateForward());

console.log(extrapolatebackward());
