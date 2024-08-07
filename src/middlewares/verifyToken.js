const jwt = require('jsonwebtoken');
const errors = require('./handleErrors');

const verify_token = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return errors.unauthorized('Required authorization', res);
    const access_token = token.split(' ')[1];
    jwt.verify(access_token, process.env.JWT_SECRET, (error, decode) => {
        if(error){
            const isExpired = error instanceof jwt.TokenExpiredError;
            if(isExpired) return errors.unauthorized('Access token is expired', res, isExpired);
            return errors.unauthorized('Access token is invalid', res, isExpired);
        }
        req.user = decode;
        next();
    })

}

module.exports = verify_token;

