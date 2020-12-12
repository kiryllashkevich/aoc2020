const { readFile } = require('../utils/readFile');

const input = readFile(__dirname + '/input.txt').map(el => parseInt(el));

const YEAR = 2020;

// PART 1 solution
const sumTwo = (arr) => {
    let i = 0;
    let j = arr.length - 1;
    let sum = 0;

    arr = arr.sort();

    while(i < j) {
        sum = arr[i] + arr[j];
        if (sum > YEAR) {
            j--;
        } else if (sum < YEAR) {
            i++;
        } else {
            return arr[i] * arr[j];
        }
    }

    return 0;
}

console.log(sumTwo(input));  //1018944

// PART 2 solution
const sumThree = (arr) => {
    let unique = {};

    for (let n of arr) {
        unique[n] = (unique[n] || 0) + 1;
    }

    // Logic is build on the fact that all values are unique
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] + arr[j] < 2020) {
                let diff = 2020 - arr[i] - arr[j];
                if (unique[diff] && diff !== arr[i] && diff !== arr[j]) {
                    console.log(`FOUND: ${arr[i]} ${arr[j]} ${diff}`);
                    return arr[i] * arr[j] * diff;
                }
            }
        }
    }

    return 0;
}

console.log(sumThree(input)); // 8446464