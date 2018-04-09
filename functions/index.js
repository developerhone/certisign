const admin = require('firebase-admin');
const functions = require('firebase-functions');
const md5 = require('md5');

admin.initializeApp(functions.config().firebase);

const db = admin.database();

const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();

app.use(cors);
app.use(cookieParser);

app.post('/hello', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return db.ref('assinantes').child(md5(req.body.email)).set(req.body, (err) => {
        return res.send(200, { id : md5(req.body.email), message: err ? err : 'Salvo com sucesso.' });
    });
});

exports.app = functions.https.onRequest(app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.addAssinantes = functions.https.onRequest((request, response) => {

    return db.ref('assinantes').child(md5(request.body.email)).set(request.body, (err) => {
        return response.send(200, { id : md5(request.body.email), message: err ? err : 'Salvo com sucesso.' });
    });

});

exports.getAssinantes = functions.https.onRequest((request, response) => {

    var getAssinantes = [];

    return db.ref('assinantes').once('value', (snapshot) => {
        // if data exists

        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            getAssinantes.push(childData);
        });

        return response.send(200, { message: getAssinantes });
    });

});


exports.addDownload = functions.https.onRequest((request, response) => {

    return db.ref('assinantes').child(md5(request.body.email)).set(request.body, (err) => {
        return response.send(200, { id : md5(request.body.email), message: err ? err : 'Salvo com sucesso.' });
    });

});

