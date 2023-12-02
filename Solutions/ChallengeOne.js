

const fs = require('fs')
const _ = require('lodash')
let file = '../Input/ChallengeOne.txt'

// read the file input and parse to array of strings
const lines = fs.readFileSync(file, 'utf8').split('\n')

const ENUM_NUMBER = {
    'one': 1, 
    'two':2, 
    'three': 3, 
    'four': 4, 
    'five': 5, 
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9

}

function partOne() {
    let sum = 0

    lines.forEach(line => {
        let stripLine = line.replace(/[a-zA-Z]/g, "")
        
        // first character + last character in the sequence
        let value = `${stripLine[0]}${stripLine[stripLine.length - 1]}`
        sum += Number(value)
    })

    return sum
}

//not my solution
function possibleSolution(line){
    let expandedText = line
    expandedText = expandedText.replaceAll('one', 'o1ne')
    expandedText = expandedText.replaceAll('two', 't2wo')
    expandedText = expandedText.replaceAll('three', 't3hree')
    expandedText = expandedText.replaceAll('four', 'f4our')
    expandedText = expandedText.replaceAll('five', 'f5ive')
    expandedText = expandedText.replaceAll('six', 's6ix')
    expandedText = expandedText.replaceAll('seven', 's7even')
    expandedText = expandedText.replaceAll('eight', 'e8ight')
    expandedText = expandedText.replaceAll('nine', 'n9ine')
}

function replaceFirstHighestOccurance(line){    
    _.keys(ENUM_NUMBER).forEach(numKey => {
        if (line.includes(numKey)){
            console.log(numKey)
            // replace any found text number with it's numerical equiv
            line = line.replaceAll(numKey, `${numKey[0]}${ENUM_NUMBER[numKey]}${numKey[numKey.length - 1]}`)
        }
    })
    console.log("MOD", line)
    return line
}


function partTwo(){

    let sum = 0 

    lines.forEach(line => {
        let initialLine = line
        line = replaceFirstHighestOccurance(line) // replace the first highest number
    
        let stripLine = line.replace(/[a-zA-Z]/g, "")
        

        // // first character + last character in the sequence
        let value = `${stripLine[0]}${stripLine[stripLine.length - 1]}`
        console.log( value, initialLine)
        sum += Number(value)

    })

    return sum

}

let c1 = partOne() // 54953
let c2 = partTwo() // 53868

console.log("Totals: ", c1, c2)