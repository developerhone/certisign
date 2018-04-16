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

app.post('/assinantes', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var id = md5(req.body.email);

    req.body.date_update = new Date();

    return db.ref('assinantes').child(id).set(req.body, (err) => {
        return res.send(200, { message: err ? err : 'Salvo com sucesso.' });
    });
});

app.post('/assinantes/uploads', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    for (i=0; i < req.body.length; i++) {

        var id = req.body[i].certisignId;

        req.body[i].date_update = new Date();
        req.body[i].assinante_id =  md5(req.body[i].email);

        if (i === req.body.length - 1) {
            db.ref('assinantes/uploads').child(id).set(req.body[i], (err) => {
                return res.send(200, { message: err ? err : 'Salvo com sucesso.' });
            });
        } else {
            db.ref('assinantes/uploads').child(id).set(req.body[i], (err) => {
                if (err)
                    return res.send(200, { message: err });
            });
        }
    }

});

app.post('/certisign', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.send(200, { id : req.body.assinantes, message: err ? err : 'Salvo com sucesso.' });
});

app.get('/assinantes', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var getAssinantes = [];

    return db.ref('assinantes').once('value', (snapshot) => {
        // if data exists

        snapshot.forEach((childSnapshot) => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            getAssinantes.push(childData);
        });

        return res.send(200, { message: getAssinantes });
    });
});

app.post('/download', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return db.ref('assinantes').child(md5(request.body.email)).set(request.body, (err) => {
        return res.send(200, { id : md5(request.body.email), message: err ? err : 'Salvo com sucesso.' });
    });

});

exports.app = functions.https.onRequest(app);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
