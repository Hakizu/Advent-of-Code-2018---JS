"use strict"

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/input.txt", "utf8").split("\n")

let twice = 0
let thrice = 0
let i = 0

while (i < input.length) {
let currentString = input[i]
let counter = {}
    for(let j = 0; j < currentString.length; j++) {
        counter[currentString[j]] = (counter[currentString[j]] +1) || 1
    }
    if(Object.values(counter).includes(2)) {
        twice++
    }
    if(Object.values(counter).includes(3)) {
        thrice++
    }
    i++
} 
console.log(twice * thrice)

// Part 2
i = 0
let wantedString = null

while (i < input.length) {
    let matchingStrings= {}
    
    for(let j = 0; j < input.length; j++) {
        let currentString = input[j]
        let startString = currentString.slice(0, i)
        let endString = currentString.slice(i + 1)
        let slicedString = startString.concat(endString)

        matchingStrings[slicedString] = (matchingStrings[slicedString] + 1) || 1

        if (matchingStrings[slicedString] === 2) {
            console.log("ever")
            wantedString = slicedString
            i = input.length
        }
    }
    i++
}
console.log(wantedString)
