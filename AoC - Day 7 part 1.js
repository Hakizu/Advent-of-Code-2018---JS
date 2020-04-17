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

let stepOrder = []
let remaining = true
let reset = 0
while (remaining) {
  for (let i = 0; i < stepArray.length; i += 2) {
      
      let currentArray = [stepArray[i], stepArray[i + 1]]
      let passingStep = filterForStep(currentArray,allowedSteps)

      if (passingStep.includes("no match")) {continue} 
      
      if  (stepOrder.includes(passingStep) === false) {
          stepOrder.push(passingStep)
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
  }            
}
   
let output = stepOrder.join("")
console.log(`${output}`)
