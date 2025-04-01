const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/sumar') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const { matriz1, matriz2 } = JSON.parse(body);
            const resultado = sumarMatrices(matriz1, matriz2);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ resultado }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

function sumarMatrices(matriz1, matriz2) {
    return matriz1.map((fila, i) => fila.map((num, j) => num + matriz2[i][j]));
}

server.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
