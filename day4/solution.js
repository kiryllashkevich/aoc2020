const { readFile } = require('../utils/readFile');

// Read input from file, replace new lines with spaces
const input = readFile(__dirname + '/input.txt', '\n\n').map(el => el.replace(/\n/g, " "));
//const exampleInput = readFile(__dirname + '/example.txt', '\n\n').map(el => el.replace(/\n/g, " "));

// PART 1 solution

const requiredFields = {
    'byr': true, //(Birth Year)
    'iyr': true, //(Issue Year)
    'eyr': true, //(Expiration Year)
    'hgt': true, //(Height)
    'hcl': true, //(Hair Color)
    'ecl': true, //(Eye Color)
    'pid': true, //(Passport ID)
    'cid': false, //(Country ID)
};

const requiredCount = Object.values(requiredFields).filter(el => el === true).length;

const countValid = (input, validator) => {
    let result = 0;
    for (let data of input) {
        if (validator(data)) {
            result ++;
        }
    }

    return result;
}

const isValidPassport = (data) => {
    let found = new Set();

    let pairs = data.split(' ');
    let key;
    for (let pair of pairs) {
        key = pair.split(':')[0];
        if (requiredFields[key]) {
            found.add(key);
        }
    }

    // If all required fields are found, return true
    return found.size === requiredCount;
}

console.log(countValid(input, isValidPassport)); //242

// PART 2 solution
const isStrInRange = (value, min, max, digits) => {
    if (digits && value.length !== digits) {
        return false;
    }

    const intValue = parseInt(value);

    return intValue >= min && intValue <= max;
}

const validators = {
    'byr': (value) => {
        return isStrInRange(value, 1920, 2002, 4);
    },
    'iyr': (value) => {
        return isStrInRange(value, 2010, 2020, 4);
    },
    'eyr': (value) => {
        return isStrInRange(value, 2020, 2030, 4);
    },
    'hgt': (value) => {
        let unit = value.slice(-2);
        if (unit === 'cm') {
            return isStrInRange(value, 150, 193);
        } else if (unit === 'in') {
            return isStrInRange(value, 59, 76);
        } else {
            return false;
        }
    },
    'hcl': (value) => {
        const colorEx = /^#[0-9a-f]{6}$/i;
        return colorEx.test(value);
    },
    'ecl': (value) => {
        const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        return colors.includes(value);
    },
    'pid': (value) => {
        const passportEx = /^[0-9]{9}$/i;
        return passportEx.test(value);
    },
    'cid': (value) => {
        return true;
    },
}

const isValidPassport2 = (data) => {
    let key, value;

    const results = {
        'byr': false, //(Birth Year)
        'iyr': false, //(Issue Year)
        'eyr': false, //(Expiration Year)
        'hgt': false, //(Height)
        'hcl': false, //(Hair Color)
        'ecl': false, //(Eye Color)
        'pid': false, //(Passport ID)
    }

    let pairs = data.split(' ');

    for (let pair of pairs) {
        [key, value] = pair.split(':');
        results[key] = validators[key](value);
    }

    // All validations are successfull
    return Object.values(results).every(r => r === true);
}

console.log(countValid(input, isValidPassport2)); //186