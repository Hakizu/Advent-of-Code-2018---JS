"use strict"

const fs = require(`fs`)
const input = fs.readFileSync("./Textinput/change.txt", "utf8").split("\n")

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
    for (let j = 0; j < allowedSteps.length; j++) {

        if  (currentArray.indexOf(allowedSteps[j]) % 2 === 0 ) {       
            let passingStep = allowedSteps[j]
            return passingStep
        }
    }
    return "no match"
}

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

function createAlphabet() {
    let array = []
    let firstChar = "A".charCodeAt(0)
    let lastChar = "Z".charCodeAt(0)
    for(let i = firstChar; i <= lastChar; i++){
        array.push(String.fromCharCode(i))
    }
    return array
}

let alphabetArray = createAlphabet()

let stepOrder = []
let remaining = true
let reset = 0
let seconds = -1

let workers = new Array(5).fill(0)
let workersOrder = new Array(5).fill(null)
let passedStep = new Array(5).fill(null)
let currentWorker = null
let passedStepIter = new Array(5).fill(null)
let doneSteps = []
let fullCapacity = 5
let executedSteps = []
let doubles = 0

function workersAvailable(workers, seconds){
    let occupiedWorker = 0
    for(let i = 0; i < workers.length; i++) {
        if (workers[i] > seconds) {
            occupiedWorker++
        }
    }
    return workers.length - occupiedWorker
}

while (remaining) {
  
  seconds++
  if  (Math.min(...workers) > seconds) {continue}
  for (let i = 0; i < stepArray.length; i += 2) {
    
    let currentArray = [stepArray[i], stepArray[i + 1]]
    
    let passingStep = filterForStep(currentArray,allowedSteps)
    if (passingStep.includes("no match")) {continue}
    
    if  (stepOrder.includes(passingStep) === false) {
      if (fullCapacity === 0) {continue}
      stepOrder.push(passingStep)
      let workerID = null
      console.log(currentArray)
      for(let j = 0; j < workers.length; j++) {
        if (workers[j] <= seconds) {
          workerID = j
          break
        }
      }        
      workers[workerID] = 60 + alphabetArray.indexOf(passingStep) +1           
      workers[workerID] += seconds
      workersOrder[workerID] = currentArray
      passedStep[workerID] = passingStep
      passedStepIter[workerID] = i
      fullCapacity = workersAvailable(workers, seconds)
      console.log(`current worker time ${workers} - working on ${workersOrder}
      -- seconds ${seconds}  --- full ${fullCapacity}`)
      continue
    }
    
    if (seconds === 0){continue}
    let counter = getIndexChar(workers, seconds)
    
    if  (counter.length === 0) {continue}
    if  (doubles > counter.length -1) {doubles = 0}
    
    if  (reset === 0) {
      currentWorker = counter[doubles] //1
      currentArray = workersOrder[currentWorker]
      passingStep = passedStep[currentWorker]
      i = passedStepIter[currentWorker]
    }
    
    if  (counter.length >= 2) {doubles++}
    
    console.log(`current ${currentArray} -- seconds: ${seconds}`)
    
    if  (executedSteps.includes(currentArray.join(""))) {break}
    
    executedSteps.push(currentArray.join(""))
    //console.log(`executed ${executedSteps}  -- god damn seconds ${seconds}`)
    
    let calculateI = getIndexChar(stepArray, currentArray[0])
    
    for(let j = 0; j < calculateI.length; j++) {
      
      if  (stepArray[calculateI[j]] === (currentArray[0]) &&
      stepArray[calculateI[j]+ 1] === currentArray[1]) {
        i = calculateI[j]
      }
    }
    currentArray = currentArray.slice(1)
    currentArray = currentArray.toString()
    
    
    let index = getIndexChar(stepArray, currentArray) 
    let startArray = stepArray.slice(0, i)
    let endArray = stepArray.slice(i + 2)
    stepArray = startArray.concat(endArray)
    i -= 2
    //console.log(`step array${stepArray} -- rest${reset}`)
    
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
        //console.log(`Allowed Steps:  ${allowedSteps}`)       
      }
      if (stepArray.length === 0) {
        stepOrder.push(currentArray)
        remaining = false
      }
      
      if  (stepArray.indexOf(passingStep) % 2 === 0) {                
        let arrayCheck = getIndexChar(stepArray,passingStep)
        
        if (arrayCheck.length > 0) {
          for (let k = 0; k < arrayCheck.length; k++) { 
            if  (arrayCheck[k] % 2 === 0) {
              
              i = parseInt(arrayCheck) - 2
              reset++
              break      
            }
          }
        }                        
      }
      if  (reset == 0) { 
        let g = allowedSteps.indexOf(passingStep)
        console.log(`slicing ${allowedSteps[g]}`)
        //console.log(`slicing allowed ${allowedSteps}`)
        doneSteps.push(allowedSteps[g])
        let allowedStart = allowedSteps.slice(0, g)
        let allowedEnd = allowedSteps.slice(g + 1)
        allowedSteps = allowedStart.concat(allowedEnd)
        fullCapacity--
        //console.log(`After slicing allowed ${allowedSteps}`)
        //console.log(`allowed Steps ${allowedSteps}`)
        console.log(` ----steeep array after slicing ${stepArray} - rest ${reset} --${seconds}`)
        
        if (stepArray.length === 0){
          doneSteps.push(currentArray)
          let workerID = null
          console.log(currentWorker)
          seconds = workers[currentWorker]
          console.log(seconds)
          for(let j = 0; j < workers.length; j++) {
            if (workers[j] <= seconds) {
              workerID = j
              break
            }
          }
          workers[workerID] = 60 + alphabetArray.indexOf(currentArray) + 2
          console.log(workers[workerID])
          workers[workerID] += seconds
          console.log(workers[workerID])
          console.log(Math.max(...workers))
          remaining = false
        }
      }
    }            
  }
   
let done = doneSteps.join("")
//let output = stepOrder.join("")
//console.log(`${output}`)
console.log(done)
let solution = 936

 //console.log(output.includes("LAPFCRGHVZOTKWENBXIMSUDJQY"))
    