const http    = require('http');
const fs      = require('fs');
const admin   = require('firebase-admin');
// const banco   = require('./app/core/banco.js');
const server  = http.createServer();

var config = {
    apiKey: "AIzaSyA-vogzQVjd4aIf28jQmpyTZgHOBfePymM",
    authDomain: "certisign-c342c.firebaseapp.com",
    databaseURL: "https://certisign-c342c.firebaseio.com",
    projectId: "certisign-c342c",
    storageBucket: "",
    messagingSenderId: "917936955307"
};

admin.initializeApp(config);

const db = admin.database();

server.on('request', function(req, res) {

    const { url, method } = req;

    if (url === '/') {

        res.writeHead(200);
        return res.end(fs.readFileSync('view/index.html'))       

    }
    
    if (url === '/cadastro') {

        // banco._insert(usuario, res);

        var ref = db.ref('assinantes/cpf');

        console.log(ref.orderByKey());

        res.writeHead(200);
        return res.end('show');

        ref.orderByKey().on("child_added", function(snapshot) {
            console.log(snapshot.key);
        });

    }

    res.writeHead(200);
    return res.end('<h1>Error 404, Nada encontrado</h1>');

});

server.listen(3030, 'localhost', function () {
  console.log('--- O servidor arrancou –--');
});

console.log('Servidor iniciado em localhost:3030. Ctrl+C para encerrar…');