const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt');
// const exampleInput = readFile(__dirname + '/example.txt');

const directions = {
    'N': { forward: 'N', back: 'S', left: 'W', right: 'E'},
    'S': { forward: 'S', back: 'N', left: 'E', right: 'W'},
    'W': { forward: 'W', back: 'E', left: 'S', right: 'N'},
    'E': { forward: 'E', back: 'W', left: 'N', right: 'S'}
};

const parseInstruction = (str) => {
    return {
        action: str[0],
        value: parseInt(str.slice(1))
    };
}

const normalizeCoordinates = (positions) => {
    return {
        'N': Math.max((positions.N - positions.S), 0),
        'S': Math.max((positions.S - positions.N), 0),
        'W': Math.max((positions.W - positions.E), 0),
        'E': Math.max((positions.E - positions.W), 0)
    }
}

// PART 1 solution
const followInstructions = (input) => {
    // The ship starts by facing east
    let face = directions.E;
    // Positions on North - South and East - West axes
    let positions = {
        'N': 0,
        'S': 0,
        'E': 0,
        'W': 0
    };

    for (let row of input) {
        let instruction = parseInstruction(row);

        switch (instruction.action) {
            case 'N':
            case 'S':
            case 'W':
            case 'E':
                positions[instruction.action] += instruction.value;
                break;
            case 'F':
                positions[face.forward] += instruction.value;
                break;
            case 'L':
            case 'R':
                let turns = instruction.value / 90;
                for (let t = 0; t < turns; t++) {
                    if (instruction.action === 'L') {
                        face = directions[face.left];
                    } else {
                        face = directions[face.right];
                    }

                }
                break;
        }
    }

    positions = normalizeCoordinates(positions);

    return positions.N + positions.S + positions.W + positions.E;
}

console.log(followInstructions(input));  // 1457

// PART 2 solution
const followInstructions2 = (input) => {
    // The waypoint starts 10 units east and 1 unit north
    let waypointPositions = {
        'N': 1,
        'S': 0,
        'E': 10,
        'W': 0
    };

    // The ship starts by facing east
    let face = directions.E;
    // Positions on North - South and East - West axes
    let positions = {
        'N': 0,
        'S': 0,
        'E': 0,
        'W': 0
    };

    for (let row of input) {
        let instruction = parseInstruction(row);
        switch (instruction.action) {
            case 'N':
            case 'S':
            case 'W':
            case 'E':
                waypointPositions[instruction.action] += instruction.value;
                break;
            case 'F':
                waypointPositions = normalizeCoordinates(waypointPositions);
                positions.N += waypointPositions.N * instruction.value;
                positions.S += waypointPositions.S * instruction.value;
                positions.E += waypointPositions.E * instruction.value;
                positions.W += waypointPositions.W * instruction.value;
                break;
            case 'L':
            case 'R':
                waypointPositions = normalizeCoordinates(waypointPositions);
                let turns = instruction.value / 90;
                // Rotate the waypoint
                let head = directions.N;
                for (let t = 0; t < turns; t++) {
                    if (instruction.action === 'L') {
                        head = directions[head.right];
                    } else {
                        head = directions[head.left];
                    }
                }

                waypointPositions = {
                    N: waypointPositions[head.forward],
                    S: waypointPositions[head.back],
                    W: waypointPositions[head.left],
                    E: waypointPositions[head.right]
                }
                break;
        }
    }

    positions = normalizeCoordinates(positions);

    return positions.N + positions.S + positions.W + positions.E;
}

console.log(followInstructions2(input));  // 106860