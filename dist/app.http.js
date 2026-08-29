import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page not found</h1>');
    }
});
server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/\n');
});
//# sourceMappingURL=app.http.js.map