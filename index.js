require('./telegram-bot.js');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const helpers = require('./helpers.js')
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(express.static('public'));
const db = require('./db.js')

app.get('/', function (req, res) {
    res.render('index', { yanit: null, error: null })
})

app.listen(helpers.getPortNumber(), function () {
    helpers.log('Example app listening on port ' + helpers.getPortNumber() + '!')
})


app.post('/', function (req, res) {
    let letters = req.body.letters;
    let wrongLetters = req.body.wrongLetters;
    helpers.log(letters)
    helpers.log(wrongLetters)

    let queryResult = db.query(helpers.fixQueryTextWeb({ "letters": letters, "wrongLetters": wrongLetters }))
    res.render('index', {
        yanit: queryResult,
        letters: letters,
        wrongLetters: wrongLetters,
        error: null
    })
})