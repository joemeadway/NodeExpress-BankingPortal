const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

const accountData = fs.readFileSync('./src/json/accounts.json', {"encoding": "UTF8"});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('./src/json/users.json', {"encoding": "UTF8"});
const users = JSON.parse(userData);

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

    let accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, "UTF8")

    response.render('transfer', { message:"Transfer Completed" });
});


app.get('/payment', (request, response) => {
    response.render('payment', { account:accounts.credit });
});

app.post('/payment', (request, response) => {
    let amt = parseInt(request.body.amount)
    accounts.credit.balance -= amt;
    accounts.credit.available += amt;

    let accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json','accounts.json'), accountsJSON, "utf8");

    response.render('payment', { message:"Payment Successful", account:accounts.credit });
});

app.listen(3000, () => console.log("PS Project Running on port 3000!"));