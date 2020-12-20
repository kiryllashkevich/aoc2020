const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt');

const parseInstruction = (str) => {
    const parts = str.split(' ');

    return {
        action: parts[0],
        value: parseInt(parts[1])
    };
}

// PART 1 solution
const getAccumulator = (instructions) => {
    let acc = 0;
    let index = 0;
    let reachedEnd = false;

    let visited = {};

    while (!visited[index]) {
        let instruction = parseInstruction(instructions[index]);
        visited[index] = true;

        switch (instruction.action) {
            case 'nop':
                index ++;
                break;
            case 'acc':
                acc += instruction.value;
                index ++;
                break;
            case 'jmp':
                index += instruction.value;
                break;
        }

        // We got to the end
        if (index > instructions.length - 1) {
            reachedEnd = true;
            break;
        }
    }

    return { acc, reachedEnd }
}

console.log(getAccumulator(input));  // 1134

// PART 2 solution
const getFixedAccumulator = (instructions) => {
    // Exactly one instruction is corrupted (jmp -> nop OR nop -> jmp)
    // Lets go line by line and try executing until reachedEnd becomes true
    let oldValue;
    let result = 0;
    let instruction;

    for (let i = 0; i < instructions.length; i++) {
        instruction = parseInstruction(instructions[i]);

        if (instruction.action === 'acc') {
            continue;
        }

        oldValue = instructions[i];
        instructions[i] = instruction.action === 'jmp' ? 'nop ' + instruction.value  : 'jmp ' + instruction.value;
        console.log(`ROW ${i}: OLD ${oldValue}, NEW ${instructions[i]}`)

        result = getAccumulator(instructions);

        if (result.reachedEnd) {
            return result.acc;
        }

        // If the execution did not reach the end, rollback the recent nop <-> jmp switch
        instructions[i] = oldValue;
    }

    return result;
}

console.log(getFixedAccumulator(input));  // 1205