const request = require('request');
const config = require('./../config');
const util = require('./../common/util');

exports.islogin = (req, res, next) => {
    let result = {
        isLogin: false
    };
    if (req.session.currentUser && req.session.currentUser.UserID) {
        result.isLogin = true;
        getBaseUserById(req.session.currentUser.UserID)
            .then(userData => {
                req.session.currentUser = userData;
                result.userData = userData;
                res.json(result);
            })
            .catch(err => next(err));
    } else {
        res.json(result);
    }
}

exports.login = (req, res, next) => {
    let userPassword = util.md5Crypto(req.body.userPassword);
    login(req.body.userAccount, userPassword, false)
        .then(userData => {
            req.session.currentUser = userData;
            if (!!req.body.rememberMe) {
                req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
            }
            res.json(userData);
        })
        .catch(err => next(err));
}

exports.logout = (req, res, next) => {
    let cookies = req.cookies;
    for (let prop in cookies) {
        if (!cookies.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', { maxAge: -1 });
    }
    req.session.currentUser = null;
    res.json({ result: true });
}

exports.getCurrentUser = (req, res, next) => {
    if (req.session.currentUser && req.session.currentUser.UserID) {
        getBaseUserById(req.session.currentUser.UserID)
            .then(userData => {
                req.session.currentUser = userData;
                res.json(userData);
            })
            .catch(err => next(err));
    } else {
        res.json({});
    }
}

let login = (userAccount, userPassword, needCrypto) => {
    let authField;
    let regExp = /[\w-\.]+@([\w-]+\.)+[a-z]{2,3}/;
    if (regExp.test(userAccount)) {
        authField = `Email`;
    } else {
        authField = `Mobile`;
    }

    if (needCrypto) {
        userPassword = util.md5Crypto(userPassword);
    }
    let token = util.JwtToken(config.prest.jwtSecret, config.prest.jwtExpired);
    let options = {
        uri: `${config.prest.hostAPI}/users?${authField}=${userAccount}&Password=${userPassword}&_select=UserID,NickName,Email,Mobile,Sex,BirthDay,Area,Signature,Avatar,HomePage,State,Level,Score`,
        headers: { 'Authorization': `Bearer ${token}` }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            if (res.statusCode != 200) {
                let err = new Error('auth error, server response exception.');
                err.statusCode = res.statusCode;
                return reject(err);
            }
            try {
                var users = JSON.parse(body);
                if (users.length === 0) {
                    let err = new Error('auth failure, user password is not correct.');
                    err.statusCode = 401;
                    return reject(err);
                }
                return resolve(users[0]);
            } catch (err) {
                err.statusCode = 500;
                return reject(err);
            }
        });
    });
}

let getBaseUserById = (userId) => {
    let token = util.JwtToken(config.prest.jwtSecret, config.prest.jwtExpired);
    let options = {
        uri: `${config.prest.hostAPI}/users?UserID=${userId}&_select=UserID,NickName,Email,Mobile,Sex,BirthDay,Area,Signature,Avatar,HomePage,State,Level,Score`,
        headers: { 'Authorization': `Bearer ${token}` }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            if (res.statusCode != 200) {
                let err = new Error('get user failure.');
                err.statusCode = res.statusCode;
                return reject(err);
            }
            try {
                var users = JSON.parse(body);
                if (users.length === 0) {
                    let err = new Error('user not found.');
                    err.statusCode = 404;
                    return reject(err);
                }
                return resolve(users[0]);
            } catch (err) {
                err.statusCode = 500;
                return reject(err);
            }
        });
    });
}