const crypto = require('crypto');
const jwtBuilder = require('jwt-builder');

exports.md5Crypto = (text, salt) => {
    salt = salt || 'egmicro@2018';
    let str = `${text}-${salt}`;
    let cryptoCode = crypto.createHash('md5').update(str).digest('hex');
    return cryptoCode;
}


exports.JwtToken = (secret, expired) => {
    let builder = jwtBuilder()
        .exp(expired * 60)
        .algorithm('HS256')
        .secret(secret);

    let token = builder.build();
    return token;
}