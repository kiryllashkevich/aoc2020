const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt').map(row => Array.from(row));
//const exampleInput = readFile(__dirname + '/example.txt').map(row => Array.from(row));

const EMPTY = 'L';
const FLOOR = '.';
const WALL = '|';
const OCCUPIED = '#';

// PART 1 solution
const getAdjacentPlaces = (rows, i, j) => {
    // Will store the number of adjacent elements by category
    let placeTypes = {};

    let place;

    // Iterating over all cells around
    for (let r = i - 1; r <= i + 1; r++) {
        for (let c = j - 1; c <= j + 1; c++) {
            // Skipping the cell itself
            if ( r === i && c === j) {
                continue;
            }

            // Check if we are going out of bounds. If we are, saving the wall
            if (r >= 0 && r < rows.length && c >= 0 && c < rows[r].length) {
                place = rows[r][c];
                placeTypes[place] = (placeTypes[place] || 0) + 1;
            } else {
                placeTypes[WALL] = (placeTypes[WALL] || 0) + 1;
            }
        }
    }

    return placeTypes;
}

// Makes one round of seating
const populateRound = (rows, occupationLimit, adjacentMethod) => {
    let adjacent;
    let newRows = [];
    let changes = 0;

    // 1. Iterate over rows
    for (let i = 0; i < rows.length; i++) {
        newRows.push([]);
        // 2. Iterate over individual seats
        for (let j = 0; j < rows[i].length; j++) {
            // 3. Apply rules
            // Get all adjacent places
            adjacent = adjacentMethod(rows, i, j);

            // Apply seating rules and saving updated seating to newRows
            if (rows[i][j] === EMPTY && !adjacent[OCCUPIED]) {
                newRows[i].push(OCCUPIED);
                changes ++;
            } else if (rows[i][j] === OCCUPIED && adjacent[OCCUPIED] >= occupationLimit) {
                newRows[i].push(EMPTY);
                changes ++;
            } else {
                newRows[i].push(rows[i][j]);
            }
        }
    }

    return { rows: newRows, changes };
}

const stabilizeSeating = (rows, occupationLimit, adjacentMethod) => {
    let newSeating = populateRound(rows, occupationLimit, adjacentMethod);

    while (newSeating.changes) {
        newSeating = populateRound(newSeating.rows, occupationLimit, adjacentMethod);
    }

    let occupiedCount = 0;

    for (let i = 0; i < newSeating.rows.length; i++) {
        for (let j = 0; j < newSeating.rows[i].length; j++) {
            if (newSeating.rows[i][j] === OCCUPIED) {
                occupiedCount ++;
            }
        }
    }

    return occupiedCount;
}

console.log(stabilizeSeating(input, 4, getAdjacentPlaces));  // 2470

// PART 2 solution

// Returns the closest object if we are looking in the specific direction from the place
const lookInDirection = (rows, i, j, inc_i, inc_j) => {
    let row = i;
    let col = j;

    while (true) {
        row += inc_i;
        col += inc_j;

        if (row < 0 || row >= rows.length || col < 0 || col >= rows[row].length) {
            return WALL;
        };

        if (rows[row][col] !== FLOOR) {
            return rows[row][col];
        }
    }
}

const getAdjacentPlaces2 = (rows, i, j) => {
    let placeTypes = {};

    let place;

    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            if ( r === 0 && c === 0) {
                continue;
            }

            place = lookInDirection(rows, i, j, r, c);
            //console.log(`Direction: vert ${r} hor ${c}, RESULT: ${place}`);

            placeTypes[place] = (placeTypes[place] || 0) + 1;
        }
    }

    return placeTypes;
}

console.log(stabilizeSeating(input, 5, getAdjacentPlaces2));  // 2259