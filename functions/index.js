const admin = require('firebase-admin');
const functions = require('firebase-functions');
const md5 = require('md5');

admin.initializeApp(functions.config().firebase);

const db = admin.database();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.addAssinantes = functions.https.onRequest((request, response) => {

    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST");

    console.log(request.method);
    switch (request.method) {
        case 'GET':

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

        case 'POST':

            return db.ref('assinantes').child(md5(request.body.email)).set(request.body, (err) => {
                return response.send(200, { id : md5(request.body.email), message: err ? err : 'Salvo com sucesso.' });
            });

        default:
            return response.send(404);
    }

});
