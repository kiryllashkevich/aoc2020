const fs = require('fs');

exports.readFile = (fileName) => {
    return fs.readFileSync(fileName, 'utf8').split('\n');
}