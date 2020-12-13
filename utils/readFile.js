const fs = require('fs');

exports.readFile = (fileName, splitter = '\n') => {
    return fs.readFileSync(fileName, 'utf8').split(splitter);
}