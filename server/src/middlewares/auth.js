const jwt = require('jsonwebtoken');
const auth = require('../config/jwt.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.auth;
    
    if(! authHeader) return res.status(400).send({msg: 'No token'});

    const parts = authHeader.split(' ');
    if(!parts.length === 2) return res.status(400).send({msg: 'Token error'});

    const [pre, token] = parts;
    if(!/^Bearer$/i.test(pre)) return res.status(400).send({msg: 'Malformated token'});

    jwt.verify(token, auth.secret, (err, decoded) => {
        if(err) return res.status(400).send({msg: 'Invalid token'});

        req.userId = decoded.id;
        return next();
    });
}