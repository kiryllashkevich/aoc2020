const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt');
//const input = readFile(__dirname + '/example.txt');

const BITS = 36;

// PART 1 solution
const parseCommand = (str) => {
    const re = /^mem\[(\d+)\]\s+=\s+(\d+)/gm;
    const match = re.exec(str);

    return {
        address: match[1],
        valueBinary: toBinary(match[2])
    }
}

const applyMask = (value, mask) => {
    //Applying mask
    value = value.split('');

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] !== 'X') {
            value[i] = mask[i];
        }
    }

    //Joining back to string
    return value.join('');
}

const saveToOneAddress = (memory, address, value, mask) => {
    memory[address] = applyMask(value, mask);
}

const toBinary = (decimalValue, length = BITS) => {
    const valueBinary = (+decimalValue).toString(2);
    return ('0'.repeat(length - valueBinary.length) + valueBinary);
}

const toDecimal = (binaryStr) => {
    return parseInt(binaryStr, 2);
}

const process = (input, saveMethod) => {
    const memory = {};

    let mask;
    for (let command of input) {
        if (command.slice(0, 4) === 'mask') {
            mask = command.slice(7);
            continue;
        }

        let {address, valueBinary} = parseCommand(command);

        saveMethod(memory, address, valueBinary, mask);
    }

    // Returning decimal sum of all values in memory
    return Object.values(memory).reduce((acc, x) => acc += toDecimal(x), 0);
}

console.log(process(input, saveToOneAddress));  // 15018100062885

// PART 2 solution
const saveToMaskedAddresses = (memory, address, value, mask) => {
    const valueToSave = value;

    let maxBinary = '';

    let binaryAddress = toBinary(address).split('');
    // Applying mask to address
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '0') {
            continue;
        }

        binaryAddress[i] = mask[i];

        if (mask[i] === 'X') {
            maxBinary += '1';
        }
    }

    const maxDecimal = toDecimal(maxBinary);
    let currentBinary, currentAddress, xIndex;
    //Iterate in binary from 0 to maxDecimal
    for (let j = 0; j <= maxDecimal; j++) {
        // Will be used to put instead of X'es
        currentBinary = toBinary(j, maxBinary.length);

        currentAddress = '';
        xIndex = 0;

        // Prepare address for each X combination
        for (let k = 0; k < binaryAddress.length; k++) {
            if (binaryAddress[k] === 'X') {
                currentAddress += currentBinary[xIndex];
                xIndex ++;
            } else {
                currentAddress += binaryAddress[k];
            }
        }

        // Saving to the current floating memory address
        memory[toDecimal(currentAddress)] = valueToSave;
    }
}

console.log(process(input, saveToMaskedAddresses));  // 5724245857696