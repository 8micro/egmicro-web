const request = require('request');
const config = require('./../config');
const util = require('./../common/util');

exports.islogin = (req, res, next) => {

    let result = {
        IsLogin: false
    };

    if (req.session.currentUser && req.session.currentUser.UserID) {
        result.IsLogin = true;
        getUserById(req.session.currentUser.UserID)
            .then(userInfo => {
                result.userInfo = userInfo;
                res.json(result);
            })
            .catch(err => next(err));
    } else {
        res.json(result);
    }
}

exports.login = (req, res, next) => {
    let password = util.md5Crypto(req.body.password);
    login(req.body.username, password, false)
        .then(userInfo => {
            req.session.currentUser = userInfo;
            if (!!req.body.rememberMe) {
                req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
            }
            res.json(userInfo);
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
    let userId = req.session.currentUser.UserID;
    getUserById(userId)
        .then(userInfo => {
            res.json(userInfo);
        })
        .catch(err => next(err));
}

let login = (userId, password, needCrypto) => {
    if (needCrypto) {
        password = util.md5Crypto(password);
    }

    let options = {
        uri: `${config.prest.hostAPI}/users?Email=bobliu0909@gmail.com&Password=dbaad9bcf92df7207c624d45a6a81299`,
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.zn_edhltxROuxiSeAqG_Dn1IgSTt5UGa8ZWrlnXOIPs' }
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
                var userInfo = JSON.parse(body);
                if (userInfo.length === 0) {
                    let err = new Error('auth failure, user password is not correct.');
                    err.statusCode = 401;
                    return reject(err);
                }
                return resolve(userInfo[0]);
            } catch (err) {
                err.statusCode = 500;
                return reject(err);
            }
        });
    });
}

let getUserById = (userId) => {
    let options = {
        uri: `${config.prest.hostAPI}/users?UserID=ash7sWXpf3`,
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.zn_edhltxROuxiSeAqG_Dn1IgSTt5UGa8ZWrlnXOIPs' }
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
                var userInfo = JSON.parse(body);
                if (userInfo.length === 0) {
                    let err = new Error('user not found.');
                    err.statusCode = 404;
                    return reject(err);
                }
                return resolve(userInfo[0]);
            } catch (err) {
                err.statusCode = 500;
                return reject(err);
            }
        });
    });
}