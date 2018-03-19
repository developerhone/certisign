var nedb    = require('nedb'),
    db      = new nedb({filename: 'banco.db', autoload: true});

exports._insert = (req, res) => {
    db.insert(req, function(err) {
        if (err)
            return res.end(err);

        return res.end('Novo usuário adicionado!');
    });
}