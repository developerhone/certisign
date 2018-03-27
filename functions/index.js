const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.addAssinantes = functions.https.onRequest((request, response) => {

    exports.useMultipleWildcards;

    switch (request.method) {
        case 'GET':
            var getAssinantes = db.doc('assinantes/aeJbZLBQZsPl3PP5gP9d');

            response.status(200).send({ message: getAssinantes });       
            break;
        case 'PUT':
            response.status(200).send({ message: 'put firebase' }); 
            break;
        case 'POST':
            var setAssinante = db.collection('assinantes').doc('aeJbZLBQZsPl3PP5gP9d').set(request.body);
            response.status(200).send({ message: setAssinante });
            break;
        default:
            response.status(500).send({ error: 'Nenhum method de post encontrado.' });
            break;
    }

});
