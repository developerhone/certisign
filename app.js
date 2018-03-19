const http    = require('http');
const fs      = require('fs');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin   = require('firebase-admin');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// const banco   = require('./app/core/banco.js');
const server  = http.createServer();

admin.initializeApp(functions.config().firebase);

const db = admin.database();

exports.run = function () {
    server.on('request', function(req, res) {

        const { url, method } = req;

        if (url === '/') {

            res.writeHead(200);
            return res.end(fs.readFileSync('view/index.html'))

        }

        if (url === '/cadastro') {

            // banco._insert(usuario, res);

            var ref = db.ref('assinantes');

            var cpfRef = ref.child("cpf");

            cpfQuery.orderByKey().on('child_added', function(snap) {
                console.log(snap.getKey(), snap.val());
            });

            res.writeHead(200);
            return res.end('show');

        }

        res.writeHead(200);
        return res.end('<h1>Error 404, Nada encontrado</h1>');

    });

    server.listen(3000, 'localhost', function () {
    console.log('--- O servidor arrancou –--');
    });

    console.log('Servidor iniciado em localhost:3000. Ctrl+C para encerrar…');

};