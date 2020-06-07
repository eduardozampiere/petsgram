const jwt = require('jsonwebtoken');
const auth = require('../config/jwt.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.auth;
    
    if(! authHeader) return res.status(400).send({msg: 'No token', tokenError: true});

    const parts = authHeader.split(' ');
    if(!parts.length === 2) return res.status(400).send({msg: 'Token error', tokenError: true});

    const [pre, token] = parts;
    if(!/^Bearer$/i.test(pre)) return res.status(400).send({msg: 'Malformated token', tokenError: true});

    jwt.verify(token, auth.secret, (err, decoded) => {
        if(err) return res.status(400).send({msg: 'Invalid token', tokenError: true});
        
        req.userId = decoded.id;
        return next();
    });
}