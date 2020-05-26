const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(params["telegram-bot-token"], { polling: false });
params = require('./params.json')

function sendMessage(text) {
    bot.sendMessage(params.adminid, '[admin] ' + text)
}

module.exports = {
    sendMessage: sendMessage
}