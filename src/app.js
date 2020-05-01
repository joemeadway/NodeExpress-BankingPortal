const fs = require('fs');
const path = require('path');
const express = require('express');

const { accounts, users, writeJSON } = require('./data');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));


app.get('/', (request, response) => {
    response.render('index', { "title": "Account Summary", "accounts":accounts });
});

app.get('/savings', (request, response) => {
    response.render('account', { "title": "Account Summary", "account":accounts.savings });
});

app.get('/checking', (request, response) => {
    response.render('account', { "title": "Account Summary", "account":accounts.checking });
});

app.get('/credit', (request, response) => {
    response.render('account', { "title": "Account Summary", "account":accounts.credit });
});

app.get('/profile', (request, response) => {
    response.render('profile', { "title": "Profile", "user":users[0] });
});

app.get('/transfer', (request, response) => {
    response.render('transfer', { "title": "Transfer", "user":users[0] });
});

app.post('/transfer', (request, response) => {
    let from = request.body["from"];
    let to = request.body["to"];
    let amt = parseInt(request.body["amount"]);

    accounts[from].balance -= amt;
    accounts[to].balance += amt;

    writeJSON(accounts);

    response.render('transfer', { message:"Transfer Completed" });
});


app.get('/payment', (request, response) => {
    response.render('payment', { account:accounts.credit });
});

app.post('/payment', (request, response) => {
    let amt = parseInt(request.body.amount)
    accounts.credit.balance -= amt;
    accounts.credit.available += amt;

    writeJSON(accounts);
    
    response.render('payment', { message:"Payment Successful", account:accounts.credit });
});

app.listen(3000, () => console.log("PS Project Running on port 3000!"));