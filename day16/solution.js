const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt', '\n\n');
//const input = readFile(__dirname + '/example.txt', '\n\n');

// Parses rule string like 'row: 6-11 or 33-44' and returns an object with ranges
const parseRule = (str) => {
    const re = /^(.*):\s*(\d+)-(\d+)\s*or\s*(\d+)-(\d+)/gm;

    const match = re.exec(str);

    return {
        parameter: match[1],
        ranges: [[+match[2], +match[3]], [+match[4], +match[5]]]
    }
}

// Separate input data into meaningful chunks
const [rulesStr, myTicketStr, ticketsStr] = input;
const rules = rulesStr.split('\n').map(str => parseRule(str));
const myTicketValues = myTicketStr.split(':\n')[1].split(',').map(x => +(x));
const allTicketValues = ticketsStr.split(':\n')[1].split('\n').map(str => str.split(',').map(x => +(x)));
// Array with valid tickets, will be populated in part 1 solution
const validTicketValues = [];

// If the value satisfies any rule, 0 will be returned, otherwise the value itself
const validateValue = (rules, value) => {
    for (let rule of rules) {
        if (rule.ranges.filter(range => (value >= range[0]) && (value <= range[1])).length > 0) {
            return 0;
        }
    }

    return value;
}

// PART 1 solution
const solution1 = () => {
    let result = 0;
    let validation;

    // Validate every ticket according to rules
    for (let ticket of allTicketValues) {
        validation = ticket.reduce((acc, value) => acc += validateValue(rules, value), 0);
        result += validation;

        // Filter out valid tickets
        if (validation === 0) {
            validTicketValues.push(ticket);
        }
    }

    return result;
}

console.log(solution1()); // 23115

// PART 2 solution
const solution2 = () => {
    let potentialLabels = [];

    // 1. Find all rules (potential labels) matching for each column
    for (let i = 0; i < validTicketValues[0].length; i++) {
        let columnValues = validTicketValues.map(ticket => ticket[i]);

        let matchingRules = [];
        for (let rule of rules) {
            let validationSummary = columnValues.reduce((acc, value) => acc += validateValue([rule], value), 0);
            if (validationSummary === 0) {
                matchingRules.push(rule.parameter);
            }
        }
        potentialLabels.push(matchingRules);
    }

    // 2. Find correct single labels for each column
    const foundLabels = {};

    while (true) {
        // Find columns that have only one potential label
        let oneLabelIndex = potentialLabels.findIndex(cols => cols.length === 1);
        if (oneLabelIndex === -1) {
            break;
        }

        // Save the label - index relation
        let uniqueValue = potentialLabels[oneLabelIndex][0];
        foundLabels[oneLabelIndex] = uniqueValue;

        // Remove the found label from the potential lists
        potentialLabels = potentialLabels.map(cols => cols.filter(c => c !== uniqueValue));
    }

    // 3. Finally, multiply all values in my ticket starting with 'departure'

    let result = 1;
    for (let index in myTicketValues) {
        if (foundLabels[index].startsWith('departure')) {
            result *= myTicketValues[index];
        }
    }

    return result;
}

console.log(solution2());  // 239727793813
