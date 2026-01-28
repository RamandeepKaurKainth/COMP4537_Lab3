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

            // Endpoint: /COMP4537/labs/3/getDate/
            if (parsedUrl.pathname === '/COMP4537/labs/3/getDate/') {
                const name = parsedUrl.query.name;

                if (!name) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end("<p style='color:red;'>Error: name is required</p>");
                }

                const message = this.utils.getDate(name);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(message);
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
