const http    = require('http');
const fs      = require('fs');
const server  = http.createServer();

exports.run = function () {
    server.on('request', function(req, res) {

        const { url, method } = req;

        if (url === '/') {

            res.writeHead(200);
            return res.end(fs.readFileSync('public/index.html'))

        }

        res.writeHead(200);
        return res.end('<h1>Error 404, Nada encontrado</h1>');

    });

    server.listen(3000, 'localhost', function () {
    console.log('--- O servidor arrancou –--');
    });

    console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');

};