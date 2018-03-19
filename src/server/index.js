const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const errorHandler = require('errorhandler');
const request = require('request');

require("console-stamp")(console, 'yyyy/mm/dd HH:MM:ss.l');

const config = require('./config');
let isDebugMode = config.isDebugMode;
console.debug = function(args) {
    if (isDebugMode) {
        console.log(args);
    }
}

let app = express();
app.disable('x-powered-by');
app.disable('etag');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(session({
    name: 'egmicro.session.id',
    secret: config.encryptKey,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(compression());

app.use((req, res, next) => {
    let ext = path.extname(req.url);
    if (ext && ext.length > 6) ext = null;
    if (req.method === 'GET' && !req.url.startsWith('/api') && !ext) {
        req.url = 'index.html';
    }
    next();
});

app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/api/public/avatar', express.static(path.join(__dirname, 'public/avatar')));
app.use('/api/egmicro-faq', (req, res, next) => {
    res.json(config);
    return;
});

let ignoreAuthPaths = [
    '/api/users/islogin',
    '/api/users/login',
    '/api/users/logout',
    '/api/users/avatar',
];

app.all('/api/*', (req, res, next) => {
    let ignored = false;
    for (let i = 0; i < ignoreAuthPaths.length; i++) {
        if (req.path.startsWith(ignoreAuthPaths[i])) {
            ignored = true;
            break;
        }
    }

    if (ignored) {
        return next();
    }

    if (req.session.currentUser && req.session.currentUser.UserID) {
        if (req.session.cookie.originalMaxAge && req.session.cookie.originalMaxAge < (24 * 60 * 60 * 1000)) {
            req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
        }
        return next();
    } else {
        err = new Error('unauthorization. not login.')
        err.statusCode = 401;
        return next(err);
    }
});

app.use('/api/users', require('./routers/user'));

errorHandler.title = `egmicro website - 1.0.0`;
app.use(errorHandler({ log: false }));
app.listen(config.listenPort, () => {
    console.debug('initialize....');
    console.log(`egmicro website is started on port ${config.listenPort}`);
});