const params = require('./params.json')

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(params["telegram-bot-token"], { polling: true });
const db = require('./db.js')
const helpers = require('./helpers.js')

db.update();

bot.on('message', (msg) => {
    // /login admin pass
    const text = msg.text.split(' ')
    const type = text[1];
    const pass = text[2];
    const id = msg.from.id;
    switch (true) {
        case /\/login/.test(msg.text):
            bot.sendMessage(msg.chat.id, db.checkCredentialsAndLogin(type, msg.from.id, pass))
            break;
        case /\/update/.test(msg.text):
            // update database
            if (db.checkCredentials(["poweruser", "admin"], id)) {
                bot.sendMessage(msg.chat.id, 'updating');
                db.update();
            } else {
                bot.sendMessage(msg.chat.id, 'elevated credentials required');
            }
            break;
        case /\/test/.test(msg.text):
            // update database
            if (db.checkCredentials(["admin"], id)) {
                bot.sendMessage(msg.chat.id, db.test());
            } else {
                bot.sendMessage(msg.chat.id, 'elevated credentials required');
            }
            break;
        case /\/query/.test(msg.text):
            if (db.checkCredentials(["poweruser"], id)) {
                bot.sendMessage(msg.chat.id, db.query(helpers.fixQueryTextTelegram(msg.text)));
                // örnek bir query:
                // /query ".cem" zş
                // cevap acem
            } else {
                bot.sendMessage(msg.chat.id, 'elevated credentials required');
            }
            break;
        default:
            // query
            bot.sendMessage(msg.chat.id, 'unrecognized');
            break;
    }
})