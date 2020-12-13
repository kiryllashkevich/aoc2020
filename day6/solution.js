const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt', '\n\n').map(el => el.replace(/\n/g, " "));

const getAllAnswers = (input, calculator) => {
    let result = 0;

    for (let data of input) {
        result += calculator(data);
    }

    return result;
}

// PART 1 solution
const getAnswers = (str) => {
    let uniq = new Set();

    for (let c of str) {
        if (c !== ' ') {
            uniq.add(c);
        }
    }

    return uniq.size;
}

console.log(getAllAnswers(input, getAnswers));  //6506

// PART 2 solution
const getAnswers2 = (str) => {
    let answers = str.split(' ');
    let answerCount = {};

    for (let answer of answers) {
        for (let c of answer) {
            answerCount[c] = (answerCount[c] || 0) + 1;
        }
    }

    return Object.values(answerCount).filter(v => v === answers.length).length;
}

console.log(getAllAnswers(input, getAnswers2));  //3243