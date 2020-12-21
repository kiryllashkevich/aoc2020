const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt').map(el => parseInt(el));
//const exampleInput = readFile(__dirname + '/example.txt').map(el => parseInt(el));

// PART 1 solution
const isValid = (val, preambleDict) => {
    let diff;

    for (let num in preambleDict) {
        diff = val - num;
        if (diff !== num && preambleDict[diff]) {
            return true;
        }
    }

    return false;
}

const findFirstIncorrect = (preabmle, input) => {
    // 1. Fill in preamble dictionary
    let preambleDict = {};

    for (let i = 0; i < preabmle; i++) {
        preambleDict[input[i]] = true;
    }

    // 2. Iterate over all other elements, chack if each element is the sum of two from preamble
    for (let i = preabmle; i < input.length; i++) {
        // Return first invalid value
        if (!isValid(input[i], preambleDict)) {
            return input[i];
        }

        // 3. Refresh preamble
        delete preambleDict[input[i - preabmle]];
        preambleDict[input[i]] = true;
    }

    return undefined;
}

const oddElement = findFirstIncorrect(25, input);  // 756008079
console.log(oddElement);

// PART 2 solution
const findContiguousSum = (val, input) => {
    let sum;
    let sumElements = [];

    for (let i = input.length - 1; i >= 0; i--) {
        // Find the smaller value first
        if (input[i] < val) {
            sum = input[i];
            sumElements = [input[i]];
            // Checking further till it sums up to val
            for (let j = i - 1; j >= 0; j--) {
                sum += input[j];
                sumElements.push(input[j]);

                if (sum === val) {
                    console.log(`Elements which sum up: ${sumElements}`)
                    return sumElements;
                } else if (sum > val) {
                    break;
                }
            }
        }
    }

    return [];
}

const solution2 = (arr) => {
    arr = arr.sort();

    return arr[0] + arr[arr.length - 1];
}

console.log(solution2(findContiguousSum(oddElement, input)));  // 93727241


