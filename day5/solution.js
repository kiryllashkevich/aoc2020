const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt').map(el => el.replace(/\n/g, " "));

// PART 1 solution
const getSeatId = (pass) => {
    // ROWS
    let first = 0;
    let last = 127;

    // COLUMNS
    let left = 0;
    let right = 7;

    let row, col;
    let lastRowDir, lastColDir;

    for (let direction of pass) {
        row = (first + last) / 2;
        col = (left + right) / 2;

        switch (direction) {
            case 'F':
                last =  Math.floor(row);
                lastRowDir = direction;
                break;
            case 'B':
                first = Math.ceil(row);
                lastRowDir = direction;
                break;
            case 'L':
                right = Math.floor(col);
                lastColDir = direction;
                break;
            case 'R':
                left = Math.ceil(col)
                lastColDir = direction;
                break;
        }
    }

    row = lastRowDir === 'F' ? Math.floor(row) : Math.ceil(row);
    col = lastColDir === 'L' ? Math.floor(col) : Math.ceil(col);
    return row * 8 + col;
}

const maxSeatId = (input) => {
    let result = 0;
    let id;

    for (let pass of input) {
        id = getSeatId(pass);

        if (id > result) {
            result = id;
        }
    }

    return result;
}

console.log(maxSeatId(input)); // 822

// PART 2 solution
const findPlace = (input) => {
    let results = input.map(el => getSeatId(el)).sort();
    let freePlace = 0;

    for (let i = 0, j = 1; j < results.length; i++, j++) {
        if (results[j] - results[i] === 2) {
            freePlace = (results[j] + results[i]) / 2;
            break;
        }
    }

    return freePlace;
}

console.log(findPlace(input)); // 705