const { readFile } = require('../utils/readFile');

// Read input from file
const input = readFile(__dirname + '/input.txt');
//const input = readFile(__dirname + '/example.txt');

const timestamp = parseInt(input[0]);
const allSchedules = input[1].split(',');
const schedules = allSchedules.filter(s => s !== 'x').map(s => parseInt(s));

// PART 1 solution
const findSoonestBus = (timestamp, schedules) => {
    let closestTime = Infinity;
    let busNumber = 0;

    for (let busNum of schedules) {
        let arrivalTime = Math.ceil(timestamp / busNum) * busNum;
        if (arrivalTime < closestTime) {
            closestTime = arrivalTime;
            busNumber = busNum;
        }
    }

    return (closestTime - timestamp) * busNumber;
}

console.log(findSoonestBus(timestamp, schedules));  // 2165

// PART 2 solution
const schedulesWithDeltas = [];
for (let i = 0; i < allSchedules.length; i++) {
    if (allSchedules[i] !== 'x') {
        schedulesWithDeltas.push({value: parseInt(allSchedules[i]), delta: i});
    }
}

// Appying Chinese remainder theorem
const getAllInRow = (schedulesWithDeltas) => {
    let step = schedulesWithDeltas[0].value;
    let t = step;

    for(let j=1; j<schedulesWithDeltas.length; j++) {
        while ((t + schedulesWithDeltas[j].delta) % schedulesWithDeltas[j].value !== 0) {
            t += step;
        }
        step *= schedulesWithDeltas[j].value;
    }

    return t;
}
console.log(getAllInRow(schedulesWithDeltas));  // 534035653563227
