const express = require('express');
const userCtrl = require('./../controllers/user');

let router = express.Router();

router.get('/current-user',
    userCtrl.getCurrentUser
)

router.get('/islogin',
    userCtrl.islogin
)

router.post('/login',
    userCtrl.login
)

router.get('/logout',
    userCtrl.logout
)

module.exports = router;