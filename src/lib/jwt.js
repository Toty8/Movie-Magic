const jwt = require('jsonwebtoken');
const util = require('util');

function sign(payload, secretOrPrivateKey, options = {}){
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if(err){
                return reject(err);
            }
            resolve(token);
        });
    });
    return promise;
}

const verify = util.promisify(jwt.verify);

module.exports = {
    sign
}