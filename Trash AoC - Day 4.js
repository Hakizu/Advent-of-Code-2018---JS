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
function minuteCounter(array, currentTime, sleptMinutes) {
    let startMinute = parseInt(currentTime.slice(3))
    console.log(`Start Minute ${startMinute} slept Minutes ${sleptMinutes} `)
    for (let i = 0; i < sleptMinutes; i++) {
        
        if (startMinute + i >= 60) {
            let position = (startMinute + i) % 60
            array[position] = array[position] + 1
            continue
        }
        array[startMinute + i] = array[startMinute + i]  + 1
    }   
} 

//search GuardID + Minute I go
const chronologicalInput = input.sort()
let allGuardsIDs = getAllGuardIDs(chronologicalInput) //erfassen Shift beginnings 
const idList = cleanList(allGuardsIDs)  //Doppelungen rausgenommen - reine ID List
let sleepTrackerbyID = cleanList(allGuardsIDs) // reine ID list für Funktion danach                
createMinuteList(sleepTrackerbyID)             // Doppel array [IDIndex][Minutes]
console.log(sleepTrackerbyID[2].length)


let timeShiftStart = 0 //used at line 77
let curren
for (let i = 0; i < (chronologicalInput.length / 2); i += 2) {
    const beginningShift = (allGuardsIDs[i])
    const endingShift = (allGuardsIDs[i + 2]) - 1
    const shiftDuration = (endingShift - beginningShift)
//    console.log(shiftDuration)
    
    for (let j = 0; j < shiftDuration - 1; j++) {
//        console.log(chronologicalInput[0])
//        console.log(chronologicalInput[1])
        const currentString = chronologicalInput[i]
        const dateIndex = currentString.indexOf(":") - 3
        const timeStamp = currentString.indexOf(":") + 1
        const dateStamp = currentString.slice(1, dateIndex + 3)
        const currentTime = currentString.slice(timeStamp - 3, timeStamp + 2)
        
        if (currentString.indexOf("begins shift")) {
            timeShiftStart = currentTime
            //console.log(`Shift start ${timeShiftStart}`)
            if (i < chronologicalInput && currentString[i + 1].indexOf("begings shift")) continue
            if (i < chronologicalInput && chronologicalInput[i + 1].indexOf("begins shift") && 
            chronologicalInput[i + 1].indexOf(dateStamp)) {
                const shiftBeginning = currentString[i + 1].slice(timeStamp - 3, timeStamp + 2)
                const sleptMinutes = Math.abs(currentTime.slice(3) - shiftBeginning.slice(3))
                //console.log(`Time slep: ${sleptMinutes}`)
                const currentGuard = allGuardsIDs[i + 1]
                //console.log(`GuardID ${currentGuard}`)
                const guardIndex = idList.indexOf(currentGuard)
                //console.log(guardIndex) 
                minuteCounter(sleepTrackerbyID[guardIndex], currentTime, sleptMinutes)
            }
            if (i < chronologicalInput && chronologicalInput[i + 1].indexOf("begins shift") && 
            (chronologicalInput[i + 1].indexOf(dateStamp) == false)) {
                let sleptMinutes = 59 - currentTime.slice(3)
                const currentGuard = allGuardsIDs[i + 1]
                //console.log(`GuardID ${currentGuard}`)
                const guardIndex = idList.indexOf(currentGuard)
                minuteCounter(sleepTrackerbyID[guardIndex], currentTime, sleptMinutes)
            }    
        }
        if (currentString.indexOf("wakes up")) continue
        if (currentString.indexOf("falls asleep")) {

            //console.log(`Falling asleep at ${currentTime}`)

            if (chronologicalInput[i + 1].indexOf("wakes up") && 
                chronologicalInput[i + 1].indexOf(dateStamp - 3)) {
                
                const wakeUpTime = chronologicalInput[i + 1].slice(timeStamp - 3, timeStamp + 2)
                //console.log(`Waking up at ${wakeUpTime}`)

                if (currentTime.includes("23:")) {
                    let sleptMinutes = 60 - currentTime.slice(3)
                    sleptMinutes += parseInt(wakeUpTime.slice(3))
                    // console.log(sleptMinutes)
                    const currentGuard = allGuardsIDs[i + 1]
                    const guardIndex = idList.indexOf(currentGuard)
                    minuteCounter(sleepTrackerbyID[guardIndex], currentTime, sleptMinutes)
                    continue
                }

                const sleptMinutes = Math.abs(currentTime.slice(3) - wakeUpTime.slice(3))
                //console.log(`Time slep: ${sleptMinutes}`)
                const currentGuard = allGuardsIDs[i + 1]
                //console.log(`GuardID ${currentGuard}`)
                const guardIndex = idList.indexOf(currentGuard)
                //console.log(guardIndex) 
                minuteCounter(sleepTrackerbyID[guardIndex], currentTime, sleptMinutes)
                continue
                }
        }
    }
}

let timesMinute = 0
let totalSleptMinutes = 0
for (let i = 0; i < idList.length; i++) {
    let guardSleptMinutes = 0

    for (let j = 0; j < 70; j++) {

        guardSleptMinutes += sleepTrackerbyID[i][j]

        if (guardSleptMinutes >= totalSleptMinutes) {

            totalSleptMinutes = guardSleptMinutes
            console.log(`GuardIndex ${idList[i]} - Total Snooze ${totalSleptMinutes}`)

        }
        if (guardSleptMinutes >= totalSleptMinutes &&
            sleepTrackerbyID[i][j] > timesMinute) {
            timesMinute = sleepTrackerbyID[i][j]
            console.log(`GuardIndex ${idList[i]}, Minute ${j}`)
        }
    }

}
// 47k too high - 13k too low 
console.log(`Slept ${timesMinute} times at x minute`)
//console.log(sleepTrackerbyID[2][59]) //fallen asleep 18 times at 00:59
