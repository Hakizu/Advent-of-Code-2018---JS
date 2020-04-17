"use strict"

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/change.txt", "utf8").split("\n")

let inputSorted = input.sort()
let stepArray = []

for (let i = 0; i < input.length; i++){
    
    let currentString = inputSorted[i]
    let stepCharIndex = currentString.indexOf("p") + 2
    let stepChar = currentString[stepCharIndex]
    stepArray.push(stepChar)

    let goalCharIndex = currentString.indexOf("can") - 2
    let goalChar = currentString[goalCharIndex]
    stepArray.push(goalChar)
}

let allowedSteps = []
let forbiddenSteps = []
for (let i = 1; i <= stepArray.length - 1; i += 2){
    forbiddenSteps.push(stepArray[i])
}
for (let i = 0; i < stepArray.length; i++) {
    if (forbiddenSteps.includes(stepArray[i]) === false &&
        allowedSteps.includes(stepArray[i]) === false) {

        allowedSteps.push(stepArray[i])
        allowedSteps = allowedSteps.sort()
    }
}

console.log(`allowed: ${stepArray}`)

function getIndexChar (stepArray, allowedSteps) {
    let indices = []
    let index = stepArray.indexOf(allowedSteps)

    while (index != -1) {
        indices.push(index)
        index = stepArray.indexOf(allowedSteps, index + 1)         
    }
    return indices
}

function filterForStep(currentArray, allowedSteps) {
    console.log(currentArray)
    for (let j = 0; j < allowedSteps.length; j++) {

        if  (currentArray.indexOf(allowedSteps[j]) >= 0 &&
            (currentArray.indexOf(allowedSteps[j]) % 2) === 0 ) {       
            
            let passingStep = allowedSteps[j]
            return passingStep
        }
    }
    return "no match"
}

let stepOrder = []
let remaining = true
let reset = 0

while (remaining) {
    
    for (let i = 0; i < stepArray.length; i += 2) {
        
        let currentArray = [stepArray[i], stepArray[i + 1]]
        console.log(`current I - ${i}`)
        
        let passingStep = filterForStep(currentArray,allowedSteps)
        console.log(`passing step after function ${passingStep}`)

        if (passingStep.includes("no match")) {continue} 

        console.log(`allowed ${allowedSteps}`)
        console.log(`passed ${currentArray}`)
        
        if  (stepOrder.includes(passingStep) === false) {
            stepOrder.push(passingStep)
            console.log(`Steporder ${stepOrder}`)
        }
        
        currentArray = currentArray.slice(1)
        currentArray = currentArray.toString()
        
        let index = getIndexChar(stepArray, currentArray) 
        
        let startArray = stepArray.slice(0, i)
        let endArray = stepArray.slice(i + 2)
        stepArray = startArray.concat(endArray)
        i -= 2

        if (reset >= 1){
            i = -2
            reset = 0
        } 
        
        let partialUnlock = -1
        for (let k = 0; k < index.length; k++) {
            
            if  (index[k] % 2 !== 0 && 
                allowedSteps.includes(currentArray) === false) {
                    partialUnlock++
                    continue
            }
        }
        if  (partialUnlock === 0) {
                allowedSteps.push(currentArray)
                allowedSteps = allowedSteps.sort()    
                console.log(` allowed ${allowedSteps}`)
        }
        if (stepArray.length === 0) {
                stepOrder.push(currentArray)
                remaining = false
        }
            
        if  (stepArray.indexOf(passingStep) >= 0 &&
                (stepArray.indexOf(passingStep) % 2) === 0) {
                
            let arrayCheck = getIndexChar(stepArray,passingStep)
                console.log(`index for ${passingStep} - ${arrayCheck}`)
                
            if (arrayCheck.length > 0) {
                for (let k = 0; k < arrayCheck.length; k++) { 
                    if  (arrayCheck[k] % 2 === 0) {

                        i = parseInt(arrayCheck) - 2
                        reset++
                        console.log("yooo")
                        break      
                    }
                }
            }                        
        }                        
    }            
}
   
let output = stepOrder.join("")
console.log(`${output}`)
console.log(output.includes("LAPFCRGHVZOTKWENBXIMSUDJQY"))




/*
let sortedArray = []
for (let i = 0; i < input.length; i++) {
    sortedArray[i] = []
    for (let j = i; j < input.length; i++) {
    sortedArray[i][0] = stepArray[j] 
    sortedArray[i][1] = stepArray[j + 1]
    break
    }    
} */


/*//------------------------------------ AoC Day 6 - bugged part 1


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

*/




/*
 //------------------------------------ AoC Day 5 - both parts
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



/* ------------------------------------ AoC Day 4 - both parts
const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/input.txt", "utf8").split("\n")


function getAllGuardIDs(sortedArray) {    
    let wholeArray = []
    for (let i = 0; i < sortedArray.length; i++) { 
        const currentString = sortedArray[i]

        if (currentString.includes("#")) {
            const guardID = getGuardID(currentString, i)
            wholeArray = wholeArray.concat(guardID)
        }
    }
    return wholeArray
}
function getGuardID(string, i) {
    const firstNrID = (string.indexOf("#")) + 1
    const lastNrID = (string.indexOf("b")) - 2
    const fullID = [i, parseInt(string.slice(firstNrID, lastNrID + 1))]
    return fullID
}
function cleanList(array) {
    let cleanIDList = []
    for (let i = 1; i < array.length; i += 2) {
        const currentID = array[i]
        if (cleanIDList.includes(currentID) === false) {
            cleanIDList.push(currentID)
        } 
    }
    return cleanIDList
}
function createMinuteList(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = []
        for (let j = 0; j < 70; j++) {
            array[i][j] = 0
        }
    }
    return array
}
function minuteCounter(array, previousSavedTime, sleptMinutes) {
    let startMinute = parseInt(previousSavedTime.slice(3))

    for (let i = 0; i < sleptMinutes; i++) {
        array[(startMinute + i) % 60] = array[(startMinute + i) % 60]  + 1
    }   
} 
function getHighestCounter(array) {
    let highestCounter = Math.max.apply(Math, array)
    let highestCounterIndex = array.indexOf(highestCounter)
    return [highestCounter, highestCounterIndex]
}

//search GuardID + Minute I go
const chronologicalInput = input.sort()
let allGuardsIDs = getAllGuardIDs(chronologicalInput)   //erfassen Shift beginnings 
const idList = cleanList(allGuardsIDs)                  //Doppelungen rausgenommen - reine ID List
let sleepTrackerbyID = cleanList(allGuardsIDs)          // reine ID list für Funktion danach                
createMinuteList(sleepTrackerbyID)                      // Doppel array [IDIndex][Minutes]

let previousSavedTime = 0
let currentGuard = 0
for (let i = 0; i < chronologicalInput.length; i++) {   

    const currentString = chronologicalInput[i]
    const timeArrayIndex = currentString.indexOf(":") + 1
    const currentTime = currentString.slice(timeArrayIndex - 3, timeArrayIndex + 2)

    let sleptMinutes = 0
    let tilMidnight = 0

    if (currentString.indexOf("begins shift") >= 0) {
        const firstNrID = (currentString.indexOf("#")) + 1
        const lastNrID = (currentString.indexOf("b")) - 2
        currentGuard = parseInt(currentString.slice(firstNrID, lastNrID + 1))
    }
    if (currentString.indexOf("falls asleep") >= 0) {
        previousSavedTime = currentTime

    }
    if (currentString.indexOf("wakes up") >= 0) {
        tilMidnight = previousSavedTime.slice(3)
        if (previousSavedTime.indexOf("23:") >= 0) {
            tilMidnight = previousSavedTime.slice(3) - 60        
        }

        sleptMinutes = Math.abs(currentTime.slice(3) - tilMidnight)  
        const guardIndex = idList.indexOf(currentGuard)
        minuteCounter(sleepTrackerbyID[guardIndex], previousSavedTime, sleptMinutes)
    }
}

let timesMinute = 0
let totalSleptMinutes = 1
for (let i = 0; i < idList.length; i++) {
    let guardSleptMinutes = 0
    let currentArray = sleepTrackerbyID[i]
    let highestCounter = getHighestCounter(currentArray)

    for (let j = 0; j < 70; j++) {
        guardSleptMinutes += sleepTrackerbyID[i][j]

        if (guardSleptMinutes > totalSleptMinutes) {
            totalSleptMinutes = guardSleptMinutes
            //console.log(`GuardIndex ${idList[i]}, -Index ${i} - Total Snooze ${guardSleptMinutes}`) 

            if (timesMinute < highestCounter[0]) {
                timesMinute = highestCounter[0]
                //console.log(`Highest slept & highest Total GuardIndex ${idList[i]}, [Times, Minute] ${highestCounter}`)
            } 
        }

        if (timesMinute < highestCounter[0]) {
            timesMinute = highestCounter[0]
            console.log(`Highest slept on the same minute - GuardIndex ${idList[i]}, [Times, Minute] ${highestCounter}`)
        }
    }
}  */ // ---------------------------------------------------------






 /* 
function marry(man, woman) {   //Die argumente (man,woman) referenzieren die objects, die name : enthalten
    woman.husband = man;  //woman referenziert object - neues key:value paar wird dort geschaffen
    man.wife = woman;    //same for man - neues key:value pair
                        //woman.husband enthält nun die referernz auf das object name : "John"
                        //und umgekehrt 
    return {
      father: man,      // properties werden zurückgegeben - also key:value pairs
      mother: woman     //diese key-value pairs enthalten, die objects von p1 & p2
    }
}
 
let family = marry({ 
    name: "John"     //object - parameter 1 referenziert hierauf
}, {
    name: "Ann"     //object - parameter 2 referenziert hierauf - beide objects sind in keiner variable gespeichert
});


family besteht jetzt als object mit folgenden properties

let family = {
    father : {
        name : "John",
        wife : woman {
            name : "Ann"
            husband : man {
                name : "John",
                wife : woman {
                    endlos schleife
                }          
            }            
        }
    }
    mother : {
        name : "Ann"
        husband : man {               
        }
    }
}
*/



/*
let baseValue = +prompt("Exponentiation?");
let exponentValue = +prompt("Exponent?");

function exponentialValue (a,b) {
    return a ** b;
}

alert(`${exponentialValue(baseValue,exponentValue)}`);
*/

/*
let age = prompt("Age?", 18);

let result = (age > 18) ? true : confirm("Did parents allow you?");

alert(`${result}`);
alert(age > 18 || confirm("Did parents allow you?"));
*/


/*
let a =+prompt("a?","");

switch(a){
    case 0:
        alert (0);
        break;
    case 1:
        alert (1);
        break;
    case 2:
    case 3:
        alert ("2,3");
        break;
}
*/

/*
let browser = prompt("Which browser are you using?", "Chrome");

if (browser == "Edge") {
    alert("You've got the Edge");
} else if (browser =="Chrome" 
    || browser =="Firefox" 
    || browser =="Safari" 
    || browser =="Opera") {
    alert("Okay we support these browsers too");
} else {
    alert("We hope that this page looks ok!");
}
*/



/*
let a = "1";

alert(`${a}`);
alert(typeof(a));

a =+a;  //unary operand - converting string into number
alert(`${a}`);
alert(typeof(a));
*/


/*
let currentUser = prompt("Who's there?", "User");

let password = "TheMaster";

if (currentUser == "Admin") {
    
    let pwInput = prompt("Password?", "...type");

        if (password == pwInput) {
            alert("Welcome!")
            
        } else if (pwInput = "" || pwInput == null)  {
            alert("Canceled");

        } else {
            alert("Wrong password");
        }

} else if (currentUser == null || currentUser == "") {
    alert("Canceled");

} else {
    alert("I don't know you");
}
*/



/*
let login = prompt(`State your login`, 'Employee');

let message = (login == 'Employee') ? "Hello" :
    (login == 'Director') ? "Greetings":
    (login == '') ? "No login":
    "";
alert(message);
*/


// let a = 2;
// let b = 1;
// let result = (a + b < 4) ? `Below` : `Over`;
// alert(result);

/*
let value = prompt(`Give me an integer!`, 5);

if (value < 0) {
  alert(-1);
} else if (value > 0) {
  alert(1);
} else if (value == 0) {
  alert(0);
}
*/


// let year = 2014;
// let condition = (year==2015);
//  alert(condition);

/*
let result = prompt("Name", ["Dofus"]);
alert(`Hey ${result}!`); */
