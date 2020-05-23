const params = require('./params.json')
const lineReader = require('line-reader');
const wordArray = [];
const adminArray = [];
adminArray.push("16401208")
const poweruserArray = [];
poweruserArray.push("16401208")
const helpers = require('./helpers')

function query(qword) {
    if (qword.error) {
        return "unrecognized"
    } else {
        let queryReturn = "";
        let regexQ = "^";
        let neg = "";
        if (qword["wrong-letters"].length == 0) {
            neg = ".";
        } else {
            neg = "[^" + (qword["wrong-letters"]) + "]";
        }
        for (let i = 0; i < qword.letters.length; i++) {
            if (qword.letters[i] == '.') {
                regexQ += neg;
            } else {
                regexQ += qword.letters[i];
            }
        }
        regexQ += "$";
        /*
        queryReturn += regexQ;
        queryReturn += "\n";
        */
        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i].match(regexQ)) {
                queryReturn += wordArray[i];
                queryReturn += "\n";
            }
        }
        if (queryReturn.length == 0)
        {
            queryReturn = "no matching words found."
        }
        return queryReturn;
    }
}

function queryWholeWord(word) {
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i] == word) {
            return true;
        }
    }
    return false;
}

function update() {
    lineReader.eachLine(params['lexicon-file-path'], function (line, last) {
        let currWord = helpers.fixLine(line);
        if (queryWholeWord(currWord)) {
            helpers.log(currWord + ' already exists in db. skipping.')
        } else {
            wordArray.push(currWord)
            helpers.log(currWord + ' added.')
        }
    })
}

function checkCredentials(type, id) {
    for (let i = 0; i < type.length; i++) {
        if (doesUserExist(type[i], id)) {
            return true
        }
    }
    return false
}

function test() {
    return ("db contains " + wordArray.length + " words.")
}

function checkCredentialsAndLogin(type, id, pass) {
    if ((type == "admin") || (type == "poweruser")) {
        if (doesUserExist(type, id)) {
            return ("already logged in as " + type)
        } else {
            if (checkPassword(type, pass)) {
                addUser(type, id);
                helpers.log(id)
                return ("user log in as " + type + " successful")
            } else {
                return ("incorrect " + type + " password")
            }
        }
    } else {
        return "unrecognized"
    }
}
function checkPassword(type, pass) {
    if (type == "admin") {
        return (pass == params["admin-pass"])
    }

    if (type == "poweruser") {
        return (pass == params["poweruser-pass"])
    }

    return error;
}
function addUser(type, id) {
    if (type == "admin") {
        adminArray.push(id);
        return
    }

    if (type == "poweruser") {
        poweruserArray.push(id);
        return
    }

    return error;
}

function doesUserExist(type, id) {
    if (type == "admin") {
        for (let i = 0; i < adminArray.length; i++) {
            if (adminArray[i] == id) {
                return true;
            }
        }
        return false;
    }

    if (type == "poweruser") {
        for (let i = 0; i < poweruserArray.length; i++) {
            if (poweruserArray[i] == id) {
                return true;
            }
        }
        return false;
    }

    return error;
}


module.exports = {
    update: update,
    checkCredentialsAndLogin: checkCredentialsAndLogin,
    checkCredentials: checkCredentials,
    test: test,
    query: query
}
