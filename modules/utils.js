const fs = require('fs');
const path = require('path');
const messages = require('../lang/en/en');

class Utils {
    getDate(name) {
        const now = new Date();
        const message = messages.greeting.replace("%1", name);
        return `<p style="color: blue;">${message} ${now}</p>`;
    }

    writeToFile(text, callback) {
        const filePath = path.join(__dirname, '../file.txt');

        fs.appendFile(filePath, text + '\n', (err) => {
            if (err) {
                return callback(err);
            }
            callback(null, `Text "${text}" has been appended to file.txt`);
        });
    }

    readFromFile(callback) {
        const filePath = path.join(__dirname, '../file.txt');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return callback(new Error('File file.txt not found'));
                }
                return callback(err);
            }
            callback(null, data);
        });
    }
}

module.exports = Utils;
