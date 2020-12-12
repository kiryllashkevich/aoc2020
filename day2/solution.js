const { readFile } = require('../utils/readFile');

const input = readFile(__dirname + '/input.txt');

const countValid = (input, isValidChecker) => {
    let result = 0;

    for (let password of input) {
        if (isValidChecker(password)) {
            result ++;
        }
    }

    return result;
}

// PART 1 solution
const isValid = (template) => {
    const re = /(\d+)-(\d+)\s*(\w+):\s*(\w*)/gm;

    let match = re.exec(template);

    if (match.length === 5) {
        let min = match[1];
        let max = match[2];
        let c = match[3];
        let str = match[4];

        let letterCount = 0;

        for (let char of str) {
            if (char === c) {
                letterCount ++;
            }
        }

        return letterCount >= min && letterCount <= max;
    }

    return false;
}

console.log(countValid(input, isValid));  // 519

// PART 2 solution
const isValid2 = (template) => {
    const re = /(\d+)-(\d+)\s*(\w+):\s*(\w*)/gm;

    let match = re.exec(template);

    if (match.length === 5) {
        let c = match[3];
        let str = match[4];

        let first = str[match[1] - 1] || "";
        let last = str[match[2] - 1] || "";

        if (first === last) {
            return false;
        }

        return first === c || last === c;
    }

    return false;
}

console.log(countValid(input, isValid2));  // 708