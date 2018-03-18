const crypto = require('crypto');

exports.md5Crypto = (text, salt) => {
    salt = salt || 'egmicro@2018';
    let str = `${text}-${salt}`;
    let cryptoCode = crypto.createHash('md5').update(str).digest('hex');
    return cryptoCode;
}