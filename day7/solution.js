const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt');

const getRootAndChildren = (str) => {
    const re = /(.*)\s+bags\s+contain\s+(.*)./gm;

    const match = re.exec(str);

    if (match.length === 3) {
        let children = {};

        if (match[2] !== 'no other bags') {
            let childrenStrs = match[2].split(', ');

            for (let childStr of childrenStrs) {
                let parsedChild = parseChild(childStr);
                children[parsedChild.name] = parsedChild.count;
            }
        }

        return {
            name: match[1],
            children
        };
    }
}

const parseChild = (str) => {
    const re = /^(\d*)\s+(.*)\s+bag/gm;
    const match = re.exec(str);

    if (match.length === 3) {
        return {
            name: match[2],
            count: parseInt(match[1])
        };
    }

    return null;
}

// Preparation: parse and save all bag data in a handy data structure
const parsedBags = input.map(str => getRootAndChildren(str));

// PART 1 solution
const getParents = (bags, name) => {
    return bags.filter(b => b.children[name] !== undefined).map(b => b.name);
}

const countOuterBags = (bags, name) => {
    let found = new Set();

    // Getting the direct parents
    let parents = getParents(bags, name);

    // For each of these parents, get their direct parents
    while (parents.length > 0) {
        let current = parents.pop();
        found.add(current);
        parents = parents.concat(getParents(bags, current));
    }

    // Return the number of unique parents
    return found.size;
}

console.log(countOuterBags(parsedBags, 'shiny gold'));  //139

// PART 2 solution
// Recursive solution
const countInnerBags = (bags, name) => {
    // If the bag has no children, there is 0 inner bags
    let bag = bags.filter(b => b.name === name)[0];
    if (Object.keys(bag.children).length === 0) {
        return 0;
    }

    // If the bag has inner bags, counting them recursively
    let result = 0;

    for (let bagName in bag.children) {
        result += bag.children[bagName] + bag.children[bagName] * countInnerBags(bags, bagName);
    }

    return result;
}

console.log(countInnerBags(parsedBags, 'shiny gold')); // 58175