"use strict"
console.time("a")

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/input.txt", "utf8")
const rows = input.split("\n")

//   Day 2 ---- part 1

function cyclingCurrentSplittedRow(inputRow){
    let observedLetters = {}
    let j = 0;
    
    while (j < inputRow.length) {

        if ([inputRow[j]]in observedLetters) {
        observedLetters[inputRow[j]] = observedLetters[inputRow[j]]+1

        } else {
            observedLetters[inputRow[j]] = 1
        } 
        j++
    }
    return observedLetters
}

let characterTwice = 0;
let characterThrice = 0;

for (let i = 0; i < rows.length; i++) {

    let currentRow = rows[i]
    let splittedCurrentRow = currentRow.split("")

    let countedCharacters = cyclingCurrentSplittedRow(splittedCurrentRow)
    
    if (Object.values(countedCharacters).indexOf(2) > -1) {
        characterTwice++
    }

    if (Object.values(countedCharacters).indexOf(3) > -1) {
        characterThrice++
    }
}   
let output = characterTwice * characterThrice
console.log(`Result: ${output}`)
console.timeEnd("a")

//  Day 2 -----part 2

let result = 0;

function comparingCurrentSplittedArrays(firstArray, secondArray) {
    let j = 0

    while (firstArray[j] == secondArray[j]) {
        j++
    }
    
    if (firstArray[j + 1] == secondArray[j + 1]) {

        firstArray.splice(j, 1)
        secondArray.splice (j, 1)
    }

    while (firstArray[j] == secondArray[j]) {
        j++

        if (j == firstArray.length) {
          
            console.log(secondArray)
            console.log(JSON.stringify(secondArray))
            result = secondArray
            return result;
        } 
    }
}

for (let i = 0; i < rows.length; i++) {

    for (let e = i + 1; e % rows.length != i; e++) {

        let currentRowOne = rows[i]
        let currentRowTwo = rows[e % rows.length]
        let splittedCurrentRowOne = currentRowOne.split("")
        let splittedCurrentRowTwo = currentRowTwo.split("")

        comparingCurrentSplittedArrays(splittedCurrentRowOne, splittedCurrentRowTwo)
    }
}