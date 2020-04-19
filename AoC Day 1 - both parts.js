"use strict"

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/groß.txt", "utf8").split("\n")

let wantedSum = 0

for(let i = 0; i < input.length;i++) {
    wantedSum += parseInt(input[i])
}
console.log(wantedSum)

// ---Part 2    
wantedSum = 0
let occuredNumber = {0 : true}
let loop = true

while (loop) {
    for(let i = 0; i< input.length; i++) {
        wantedSum += parseInt(input[i])

        if  ([wantedSum] in occuredNumber) {
            console.log (wantedSum)
            loop = false
            break
        }
        occuredNumber[wantedSum] = true
    }
}