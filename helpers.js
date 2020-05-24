params = require('./params.json')

function fixQueryTextTelegram(text) {
    if (queryTestCheckTelegram(text)) {
        const spl1 = text.split('"');
        const letters = spl1[1];
        const wrongLetters = spl1[2].split(" ").join(""); // remove whitespace
        return {
            "error": false,
            "letters": letters,
            "wrong-letters": wrongLetters
        }
    } else {
        return {
            "error": true,
            "message": "unrecognized query"
        }
    }
}

function fixQueryTextWeb(text) {
    if (queryTestCheckWeb(text)) {
        return {
            "error": false,
            "letters": text.letters,
            "wrong-letters": text.wrongLetters
        }
    } else {
        return {
            "error": true,
            "message": "unrecognized query"
        }
    }

}

function queryTestCheckWeb(text) {
    // TODO
    return true;
}

function getPortNumber() {
    if (process.env.PORT == undefined) {
        return params.portnumber;
    } else {
        return process.env.PORT;
    }
}

function queryTestCheckTelegram(inp) {
    //todo
    return true
}

function fixWord(str) {
    if (str.indexOf('â') > -1) {
        let newstr = str.replace('â', 'a')
        //log('fixed ' + str + ' to ' + newstr);
        return fixWord(newstr)
    }

    if (str.indexOf('(') > -1) {
        const words = str.split('(', 1);
        newstr = words[0];
        //log('fixed ' + str + ' to ' + newstr);
        return fixWord(newstr)
    }

    if (str.indexOf('.') > -1) {
        const words = str.split('.', 1);
        newstr = words[0];
        //log('fixed ' + str + ' to ' + newstr);
        return fixWord(newstr)
    }

    return str;
}

function fixLine(line) {
    const words = line.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; });
    // console.log(words);
    return fixWord(words[0]);
}

function log(str) {
    global.logCtr;
    if (global.logCtr == null) global.logCtr = 0;
    console.log(logCtr.toString() + " " + str);
    global.logCtr++;
}

module.exports = {
    fixLine: fixLine,
    log: log,
    fixQueryTextTelegram: fixQueryTextTelegram,
    getPortNumber: getPortNumber,
    fixQueryTextWeb: fixQueryTextWeb
}