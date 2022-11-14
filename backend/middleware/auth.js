const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log("config.get('jwtPrivateKey')",config.get('jwtPrivateKey'))
    if (!token) return res.status(401).send('Acess denied.No token provided.');
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token.')
    }
}



module.exports = auth;