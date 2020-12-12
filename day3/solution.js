const { readFile } = require('../utils/readFile');

const input = readFile(__dirname + '/input.txt');
//const exampleInput = readFile(__dirname + '/example.txt');

// Gets Nth char of the string. If N is bigger, counts from the beginning
const getChar = (str, index) => {
    if (!str) {
        return '';
    }

    return str[index % str.length];
}

// PART 1 solution
const countTrees = (input) => {
    let posX = 0;
    let trees = 0;

    // Moving down the route
    for (let line of input) {
        // If there is a tree, increment the counter
        if(getChar(line, posX) === '#') {
            trees ++;
        }

        // We move +1 vertically and +3 horizontally
        posX += 3;
    }

    return trees;
}

console.log(countTrees(input)); //286

// PART 2 solution
// Refactor the trees counting function for different slopes
const countTrees2 = (input, moveX, moveY) => {
    let posX = 0;
    let trees = 0;

    // Moving down the route
    for (let posY = 0; posY < input.length; posY += moveY) {
        // If there is a tree, increment the counter
        if(getChar(input[posY], posX) === '#') {
            trees ++;
        }

        // We move +moveY vertically and +moveX horizontally
        posX += moveX;
    }

    return trees;
}

const solution2 = (input) => {
    const slopes = [
        [1,1],
        [3,1],
        [5,1],
        [7,1],
        [1,2],
    ];

    let multiResult = 1;

    for (let slope of slopes) {
        multiResult *= countTrees2(input, slope[0], slope[1]);
    }

    return multiResult;
}

console.log(solution2(input)); // 3638606400