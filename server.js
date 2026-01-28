const http = require('http');
const url = require('url');
const Utils = require('./modules/utils');

class Server {
    constructor(port) {
        this.port = port;
        this.utils = new Utils();
    }

    start() {
        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);
            const pathname = parsedUrl.pathname;

            // Part B: getDate
            if (pathname === '/COMP4537/labs/3/getDate/' ||
                pathname === '/COMP4537/labs/3/getDate') {

                const name = parsedUrl.query.name;

                if (!name) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end("<p style='color:red;'>Error: name is required</p>");
                }

                const message = this.utils.getDate(name);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(message);
            }

            // Part C.1: writeFile
            if (pathname === '/COMP4537/labs/3/writeFile/' ||
                pathname === '/COMP4537/labs/3/writeFile') {

                const text = parsedUrl.query.text;

                if (!text) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end("<p style='color:red;'>Error: text is required</p>");
                }

                this.utils.writeToFile(text, (err, msg) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        return res.end("<p style='color:red;'>Error writing to file</p>");
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`<p>${msg}</p>`);
                });

                return;
            }

            // Part C.2: readFile/file.txt
            if (pathname === '/COMP4537/labs/3/readFile/file.txt') {

                this.utils.readFromFile((err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        return res.end(`<p style='color:red;'>404: ${err.message}</p>`);
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`<pre>${data}</pre>`);
                });

                return;
            }

            // Default 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("<p style='color:red;'>404 Not Found</p>");
        });

        server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const app = new Server(3000);
app.start();
