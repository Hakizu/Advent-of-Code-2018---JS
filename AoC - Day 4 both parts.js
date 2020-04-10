"use strict"

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
}