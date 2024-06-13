"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var fs = require("fs");
fs.readFile("code.txt", "utf-8", function (err, data) {
    if (err) {
        console.log(err.message);
        return;
    }
    var tokens = (0, lexer_1.lex)(data);
    console.log(tokens);
});
