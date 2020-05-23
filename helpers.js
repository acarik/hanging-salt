function fixQueryText(text) {
    if (queryTestCheck(text)) {
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

function queryTestCheck(inp) {
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
    fixQueryText: fixQueryText
}