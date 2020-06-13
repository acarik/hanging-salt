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
    let word = req.body.word;
    let wrongLetters = req.body.wrongLetters;
    helpers.log("word: " + word)
    helpers.log("wrong letters: " + wrongLetters)

    let queryResult = db.query(helpers.fixQueryTextWeb({ "word": word, "wrongLetters": wrongLetters }))
    res.render('index', {
        yanit: queryResult,
        word: word,
        wrongLetters: wrongLetters,
        error: null
    })
})