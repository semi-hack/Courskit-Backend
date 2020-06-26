const jwt = require('jsonwebtoken');
const { secret } = require('./helper');

const verifyToken = () => {
    return new promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded)
        });
    }); 
}


module.exports = { createToken, verifyToken}
