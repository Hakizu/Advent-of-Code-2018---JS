"use strict"
console.time("a")

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/input.txt", "utf8").split("\n")

function getIntegers (row) {
    const startX = row.indexOf("@") + 2
    const cleanedRow = row.slice(startX)
    const startY = cleanedRow.indexOf(`,`) + 1

    const startWidth = cleanedRow.indexOf(":") + 2
    const startLength = cleanedRow.indexOf("x") + 1

    const coordinatesX = cleanedRow.slice(0, startY - 1)
    const coordinatesY = cleanedRow.slice(startY, startWidth - 2)

    const widthX = cleanedRow.slice(startWidth, startLength - 1)
    const lenghtY = cleanedRow.slice(startLength)

    row = [coordinatesX, coordinatesY, widthX, lenghtY]
    return row
}
function createGrid(gridHeight,gridWidth) {
    let grid = []
    for (let i = 0; i < gridHeight; i++) {
        grid[i] = []

        for (let j = 0; j < gridWidth; j++) {
            grid[i][j] = []
            grid[i][j] = 0
        }
    }
    return grid
}
function registerClaimMatrix(x, y, cutSizeX, cutSizeY) {
    for (let i = 0; i < cutSizeY; i++) {
        
        for (let j = 0; j < cutSizeX; j++) {
            
            if (wholeMatrix[x + j][y + i] >= 0) {
                wholeMatrix[x + j][y + i]++
            }
        }
    }
} 
function countClaims(array) {
    let tracker = 0
    for (let i = 0; i < array.length; i++) {
        
        for (let j = 0; j < array.length; j++) {

            if (array[i][j] >= 2) {
                tracker++
            }
        }
    }
    return tracker
}

const gridWidth = 1000
const gridHeight = 1000
let wholeMatrix = createGrid(gridHeight,gridWidth)

for (let i = 0; i < input.length; i++) {
    const currentRow = input[i]
    const allCoordinates = getIntegers(currentRow)
    const x = parseInt(allCoordinates[0])
    const y = parseInt(allCoordinates[1])
    const cutSizeX = parseInt(allCoordinates[2])
    const cutSizeY = parseInt(allCoordinates[3])
    registerClaimMatrix(x, y, cutSizeX, cutSizeY)
}

console.log(countClaims(wholeMatrix))
