

const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola, mundo desde Node.js');
});
server.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3001');
});