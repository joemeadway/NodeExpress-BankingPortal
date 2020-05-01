const express = require('express');
const router = express.Router();
const {accounts, writeJSON} = require('../data');

router.get('/transfer', (request, response) => {
    response.render('transfer', { "title": "Transfer", "user":users[0] });
});

router.post('/transfer', (request, response) => {
    let from = request.body["from"];
    let to = request.body["to"];
    let amt = parseInt(request.body["amount"]);

    accounts[from].balance -= amt;
    accounts[to].balance += amt;

    writeJSON(accounts);

    response.render('transfer', { message:"Transfer Completed" });
});


router.get('/payment', (request, response) => {
    response.render('payment', { account:accounts.credit });
});

router.post('/payment', (request, response) => {
    let amt = parseInt(request.body.amount)
    accounts.credit.balance -= amt;
    accounts.credit.available += amt;

    writeJSON(accounts);

    response.render('payment', { message:"Payment Successful", account:accounts.credit });
});

module.exports = router;