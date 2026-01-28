const messages = require('../lang/en/en');

class Utils {
    getDate(name) {
        const now = new Date();
        const message = messages.greeting.replace("%1", name);

        return `<p style="color: blue;">${message} ${now}</p>`;
    }
}

module.exports = Utils;
