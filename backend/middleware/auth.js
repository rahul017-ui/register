const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
   // console.log("config.get('jwtPrivateKey')",config.get('jwtPrivateKey'))
    const secretKey = config.get('jwtPrivateKey')
    if (!token) return res.status(401).send('Acess denied.No token provided.');
    try {
        //console.log(token, secretKey)
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // req.user.id = decoded._id;
        // console.log(req.user.id)
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token.')
    }
}



module.exports = auth;