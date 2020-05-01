const express = require('express');
const {accounts} = require('../data');
const router = express.Router();


router.get('/savings', (request, response) => {
    response.render('account', { "title": "Account Summary", "account":accounts.savings });
});

router.get('/checking', (request, response) => {
    response.render('account', { "title": "Account Summary", "account":accounts.checking });
});

router.get('/credit', (request, response) => {
    response.render('account', { "title": "Account Summary", "account":accounts.credit });
});

module.exports = router;
