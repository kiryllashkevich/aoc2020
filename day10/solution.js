const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt').map(el => parseInt(el));
//const exampleInput = readFile(__dirname + '/example.txt').map(el => parseInt(el));

// PART 1 solution
// 1. Charging Outlet - effective joltage 0
// 2. Adapters, all have output rating joltage (fixed), but can take input 1, 2, or 3 lower
// 3. Device adapter, rated 3 jolts higher than max rated adapter

const getFullChain = (input, outletRating = 0) => {
    // 1. Sort all the rating we have
    const sortedJoltages = input.sort((a,b) => a - b);

    sortedJoltages.unshift(outletRating);
    sortedJoltages.push(sortedJoltages[sortedJoltages.length - 1] + 3);

    return sortedJoltages;
}

const countDistributions = (input, outletRating = 0) => {
    // 1. Sort all the rating we have
    const voltages = getFullChain(input, outletRating);

    // 2. Loop over all voltages and count distributions
    let distributions = {};

    for (let i = 1; i < voltages.length; i++) {
        let diff = voltages[i] - voltages[i - 1];
        distributions[diff] = (distributions[diff] || 0) + 1;
    }

    return distributions;
}

const distributions = countDistributions(input);
console.log(distributions[1] * distributions[3]); // 2070

// PART 2 solution
const getCombinations = (sortedJoltages, outletRating = 0) => {
    // 1. Will use combinations hash map to count all combinations via DP
    let combinations = {};
    // We can get to the first el (0) only in one way
    combinations[outletRating] = 1;

    // 2. Iterate starting from the second element and try counting different ways how to reach the current adapter
    for (let i = 1; i < sortedJoltages.length; i++) {
        // 3. Count how many ways to reach here based on the existing adapters whith  -1, -2, -3 voltages (SUM)
        // ... and save it to the combinations map memo for further use
        combinations[sortedJoltages[i]] = [1, 2, 3].reduce((acc, x) => acc += (combinations[sortedJoltages[i] - x] || 0), 0);
    }

    // 4. Return all combinations for the las element in the chain
    return combinations[input.pop()];
}

// Input is already sorted in part 1
console.log(getCombinations(input)); // 24179327893504
