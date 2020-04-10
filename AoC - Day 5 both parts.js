"use strict"

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/input.txt", "utf8")

function removeCharDoubles(string) {
    for (let i = 0; i < string.length - 1;) {

        if (string[i] === string[i + 1]) {
            i++
            continue
        }

        if (string[i] === string[i + 1].toLowerCase() ||  
            string[i] === string[i + 1].toUpperCase()) {
        
            let startString = string.slice(0, i)
            let endString = string.slice(i + 2)
            string = startString + endString
            i--
        }
    i++   
    }
    return string
}
function createSmallAlphabetArray() {
    let array = []
    let firstChar = "a".charCodeAt(0)
    let lastChar = "z".charCodeAt(0)
    for (let i = firstChar; i <= lastChar; i++) {
        array.push(String.fromCharCode(i))
    }
    return array
}

// -------- Part one
let stringPartOne = input

for (let i = 0; i < 3000; i++) {
    stringPartOne = removeCharDoubles(stringPartOne)   
}
console.log(`First removal ${stringPartOne.length}`)



// ------ Part Two
let stringPartTwo = input
let smallAlphabet = createSmallAlphabetArray()
let shortestUnit = 20000
let removedChar = 0
let outputString = 0
for (let i = 0; i < smallAlphabet.length; i++) {

    let charToFilter = smallAlphabet[i]
    let filteredArray = [...stringPartTwo]

    let stringFiltered = filteredArray.filter(filteredArray => 
        filteredArray !== charToFilter)

    charToFilter = smallAlphabet[i].toUpperCase()
    stringFiltered = stringFiltered.filter(stringFiltered => stringFiltered !== charToFilter)
    stringFiltered = stringFiltered.join("")
    
    console.log(`Removal for ${charToFilter} and ${charToFilter.toLowerCase()}`)
    
    if (stringFiltered.includes(charToFilter) || 
        stringFiltered.includes(charToFilter.toLowerCase())) {
            console.log("Checking")
        }

    for (let j = 0; j < 5000; j++) {
        stringFiltered = removeCharDoubles(stringFiltered)   
               
        if (shortestUnit > stringFiltered.length) {
            shortestUnit = stringFiltered.length
            removedChar = charToFilter
            outputString = stringFiltered
        }
    }
}   

console.log(`Filtered for letter ${removedChar} -- string length ${outputString.length}`)