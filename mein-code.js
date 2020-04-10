// FILE FOR PERSONAL USE ONLY - KEEPING A COPY OF TESTING CODE


"use strict"

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/input.txt", "utf8").split("\n")

/*
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
            grid[i][j] = 0
        }
    }
    return grid
}
function registerClaimMatrix(x, y, cutSizeX, cutSizeY,) {
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

function countUnclaimed(x, y, cutSizeX, cutSizeY,currentClaim) {
    loneClaim = currentClaim
    let wantedFields = cutSizeY * cutSizeX
    for (let i = 0; i < cutSizeY; i++) {
        
        for (let j = 0; j < cutSizeX; j++) {
            
            if (wholeMatrix[x + j][y + i] == 1) {
                wantedFields--
            }
        }
    }
    if (wantedFields == 0) {
        console.log(`Lone Claim: ${loneClaim + 1}`)
        console.log(wantedFields)
    }
}

const gridWidth = 1000
const gridHeight = 1000
let wholeMatrix = createGrid(gridHeight,gridWidth)
let loneClaim = 0

for (let i = 0; i < input.length; i++) {
    const currentRow = input[i]
    const allCoordinates = getIntegers(currentRow)
    const x = parseInt(allCoordinates[0])
    const y = parseInt(allCoordinates[1])
    const cutSizeX = parseInt(allCoordinates[2])
    const cutSizeY = parseInt(allCoordinates[3])
    registerClaimMatrix(x, y, cutSizeX, cutSizeY,)
}

console.log(countClaims(wholeMatrix))

for (let i = 0; i < input.length; i++) {
    const currentRow = input[i]
    const allCoordinates = getIntegers(currentRow)
    const x = parseInt(allCoordinates[0])
    const y = parseInt(allCoordinates[1])
    const cutSizeX = parseInt(allCoordinates[2])
    const cutSizeY = parseInt(allCoordinates[3])
    const currentClaim = i
    countUnclaimed(x, y, cutSizeX, cutSizeY, currentClaim)
}
*/

/*
for (let i = 0; i < input.length; i++) {

    const currentRow = input[i]
    const cutClaim = getIntegers(currentRow)
    console.log(`Loopcount ${i}`)
    console.log(`Loopcount ${cutClaim}`)


   // const arrayCut[i] = calculateCoord(cutClaim)
   // console.log(`Array: ${arrayCut}`)
}
*/

/*
function getGridIntegers (row) {
    const startX = row.indexOf("@") + 2
    const cleanedRow = row.slice(startX)
    const startY = cleanedRow.indexOf(`,`) + 1

    const startWidth = cleanedRow.indexOf(":") + 2
    const startLength = cleanedRow.indexOf("x") + 1

    const coordinatesX = cleanedRow.slice(0, startY - 1)
    const coordinatesY = cleanedRow.slice(startY, startWidth - 2)

    const widthX = cleanedRow.slice(startWidth, startLength - 1)
    const lenghtY = cleanedRow.slice(startLength)

    let gridProperties = [coordinatesX, coordinatesY, widthX, lenghtY]
    return gridProperties
}

function calculateClaimsX(start, fields) {
    const firstField = parseInt(start)
    const claimedFields = parseInt(fields)


for (let i = 0; i < (claimedFields - firstField); i++) {
    countWidthClaims[firstField + (i + 1)] = (countWidthClaims[firstField + (i + 1)] || 0) + 1
}}

function calculateClaimsY(start, fields) {
    const firstField = parseInt(start)
    const claimedFields = parseInt(fields)


for (let i = 0; i < (claimedFields - firstField); i++) {
    countLegnthClaims[firstField + (i + 1)] = (countLegnthClaims[firstField + (i + 1)] || 0) + 1
}}

function addition(array) {
    let total = 0;

    for (let i = 0; i < array.length; i++) {
        total += array[i]
    }
    return total
}
/* function subtractOne(num) {
    return num -= 1
} */

/*

let countWidthClaims = {}
let countLegnthClaims = {}

for (let i = 0; i < input.length; i++) {

    const currentRow = input[i]
    const gridProperties = getGridIntegers(currentRow)
    console.log(`Loopcount ${i}`)
    calculateClaimsX(gridProperties[0], gridProperties[2])
    calculateClaimsY(gridProperties[1], gridProperties[3])
}
console.dir(countWidthClaims)


let overlapCountX = Object.keys(countWidthClaims).map(function(key) {
    return countWidthClaims[key];
});

let overlapCountY = Object.keys(countLegnthClaims).map(function(key) {
    return countLegnthClaims[key];
});

// overlapCountX = overlapCountX.map(subtractOne)
// overlapCountY = overlapCountY.map(subtractOne)

let counterY = addition(overlapCountY)
let counterX = addition(overlapCountX)

let totalOverlapp = counterX + counterY
console.log(`Total overlapping fields: ${totalOverlapp}`)
------------------------------------------------------------------------------------------------------------------
*/



// console.log(overlapCountX)
// console.log(overlapCountY)
// let totalOverlapp = overlapCountX + overlapCountY
// console.log(totalOverlapp)

// countWidthClaims[gridProperties[i]] = (countWidthClaims[gridProperties] || 0) + 1

// countLegnthClaims[gridProperties[i + 1]] = (countLegnthClaims[gridProperties] || 0) + 1



/*
function countXyClaims(Integer){
    Integer
}



/*
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
*/


/*
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
let result = characterTwice * characterThrice
console.log(`Result: ${result}`)
console.timeEnd("a")
*/


/*
console.time("a")
let savedIterationResults = {0 : true}
let result = 0 
let i = 0

while (true) {

    let parsedNumber = parseInt(rows[i])
    result = result + parsedNumber

    if ([result] in savedIterationResults) {
        console.log(`Result is : ${result}`)
        break;
    }     

    savedIterationResults[result] = true;   
    i = (i + 1) % rows.length
}
console.timeEnd("a")
*/



/*
let previousResults = [];
let result = 0;
let i = 0;


while (!(previousResults.includes(result))) { 

    previousResults.push(result);

    let parsedNumber = parseInt(rows[i])
    result = result + parsedNumber
    i++
    
    if (i == rows.length) {
        i = 0;
    }
    
}
console.log(result)
console.timeEnd("a")
*/


/*
outer: for (let i = 0; i < arrayOfSomeFile.length; i++) {

    arrayOfWantedOutputs.push(wanted);

    let parsedNumber = parseInt(arrayOfSomeFile[i])
    wanted = wanted + parsedNumber

    if (arrayOfWantedOutputs.includes(wanted)) {
        
        console.log(wanted)
        break outer;
    }    

}
console.log(wanted)

console.log(arrayOfWantedOutputs.length)
*/




/*
// before the call
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};
  
multiplyNumeric(menu);
  
function multiplyNumeric(menu) {
    for (let key in menu) {
        if (typeof menu[key] == "number") {
            menu[key] *= 2;
        }
    }   
}

alert(menu.width);
alert(menu.height);
*/

/*
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

let sum = 0;
for (let key in salaries) {
    sum += salaries[key];
}

alert(sum);
*/


/*
function isEmpty(object) {
    for (let key in schedule){
        return false;
    }
    return true;
}

let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false

*/



/*
let user = {
    name: "John",
    age: 30,
    "likes birds" : true,
}
let key = "likes birds";

for (let prop in user){
    alert(prop);
    alert(user[key]);
}
*/

/*
let name = "John";
let admin = 5;

alert("Apple" < "Azzle");

const EARTH="Earth";
let currentVisitor = "Alex";
*/
