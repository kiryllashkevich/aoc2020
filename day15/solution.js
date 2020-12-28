const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt', ',').map(x => parseInt(x));
//const input = readFile(__dirname + '/example.txt', ',').map(x => parseInt(x));

// PART 1 solution
const store = (memory, value, index) => {
    const prevIndex = memory[value] ? memory[value].index : undefined;
    memory[value] = {
        index,
        prevIndex
    };

    return value;
}

const playMemoryGame = (input, turns) => {
    // Will store number and its last occurency indices
    let memory = {};
    let lastValue;

    for (let i = 0; i < turns; i++) {
        if (i < input.length) {
            // Store input values
            lastValue = store(memory, input[i], i);
        } else {
            if (memory[lastValue].prevIndex === undefined) {
                // Store zero if the last value was stored only once
                lastValue = store(memory, 0, i);
            } else {

                // Store difference between two latest occurences
                lastValue = store(memory, memory[lastValue].index - memory[lastValue].prevIndex, i);
            }
        }
    }

    return lastValue;
}

console.log(playMemoryGame(input, 2020));  // 536

// PART 2 solution
console.log(playMemoryGame(input, 30000000));  // 24065124, works several munutes, should consider refactoring