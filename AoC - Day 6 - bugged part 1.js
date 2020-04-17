//------------------------------------ AoC Day 6 - bugged part 1
"use strict"
const input = fs.readFileSync("./Textinput/input.txt", "utf8").split(/[\s,]+/)

function measuringDistance(xTwo, yTwo, xyArray) {
    
    let shortestDistance = Number.MAX_SAFE_INTEGER
    let claimedByInput = Number.MAX_SAFE_INTEGER

    for (let i = 0; i < xyArray.length; i += 2) {
         
        let distanceToField = Math.abs(xTwo - xyArray[i]) + Math.abs(yTwo - xyArray[i + 1])
        
            if (distanceToField === shortestDistance) {
                claimedByInput = null
                continue
            }
            if (distanceToField < shortestDistance) {
                shortestDistance = distanceToField
                claimedByInput = i 
                             
            }
    }
    return claimedByInput / 2
}
function createGrid (gridWidth, gridHeight) {
    let grid = []
    for (let i = 0; i < gridWidth; i++) {
        grid[i] =[]

        for (let j = 0; j < gridHeight; j++) {
            grid[i][j] = j
        }
    }
    return grid
}

const gridHeight = 1000
const gridWidth = 1000
let grid = createGrid(gridWidth,gridHeight)            

let xyArray = []            //saveInputs into Array - x = i ; y = i + 1 
for (let i = 0; i < input.length; i += 2) {
    xyArray[i] = input[i]
    xyArray[i + 1] = input[i + 1]
}

let inputID = new Array(xyArray.length / 2).fill(0) //counter für Inputlines
let infiniteField = []             //inputNr touches border into infinity

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
        let xTwo = grid[i][j]
        let yTwo = i

        let claimedByInput = measuringDistance(xTwo, yTwo, xyArray)

        if (claimedByInput === null) {
            continue
        }
        
        if (xTwo == 0 || yTwo == 0) {
            if (infiniteField.includes(claimedByInput) === false ) {

                infiniteField.push(claimedByInput)     //push infinite Input
                continue
            }              
        }
        inputID[claimedByInput] += 1
        
    }
}

infiniteField.sort(function(a, b){ return a - b})

for (let i = 0; i < infiniteField.length; i++) {
    inputID[infiniteField[i]] = 0
}
console.log(inputID)
console.log(Math.max(...inputID))