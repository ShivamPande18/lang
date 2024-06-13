"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lex = void 0;
var Token = /** @class */ (function () {
    function Token(type, name, value) {
        this.type = type;
        this.name = name;
        this.value = value;
    }
    return Token;
}());
var TokenTypes;
(function (TokenTypes) {
    TokenTypes["IDENTIFIER"] = "IDENTIFIER";
    TokenTypes["INT"] = "INT";
    TokenTypes["FLOAT"] = "FLOAT";
    TokenTypes["ADD"] = "ADD";
    TokenTypes["SUB"] = "SUB";
    TokenTypes["DIV"] = "DIV";
    TokenTypes["MULT"] = "MULT";
    TokenTypes["EQUALS"] = "EQUALS";
    TokenTypes["O_PAREN"] = "O_PAREN";
    TokenTypes["C_PAREN"] = "C_PAREN";
})(TokenTypes || (TokenTypes = {}));
function lex(code) {
    var tokens = new Array();
    var src = code.split("");
    while (src.length > 0) {
        switch (src[0]) {
            case "(":
                tokens.push(new Token(TokenTypes.O_PAREN, src[0], null));
                src.shift();
                break;
            case ")":
                tokens.push(new Token(TokenTypes.C_PAREN, src[0], null));
                src.shift();
                break;
            case "+":
                tokens.push(new Token(TokenTypes.ADD, src[0], "+"));
                src.shift();
                break;
            case "-":
                tokens.push(new Token(TokenTypes.SUB, src[0], "-"));
                src.shift();
                break;
            case "*":
                tokens.push(new Token(TokenTypes.MULT, src[0], "*"));
                src.shift();
                break;
            case "/":
                tokens.push(new Token(TokenTypes.DIV, src[0], "/"));
                src.shift();
                break;
            case "=":
                tokens.push(new Token(TokenTypes.EQUALS, src[0], "="));
                src.shift();
                break;
            case " ":
            case "\n":
            case "\r":
            case "\t":
                src.shift();
                break;
            default:
                //multiline
                if (!isNaN(Number(src[0]))) {
                    var num = "";
                    while (src.length > 0 && (src[0] == "." || !isNaN(Number(src[0])))) {
                        num += src.shift();
                    }
                    var fnum = parseFloat(num);
                    var inum = parseInt(num);
                    if (fnum == inum)
                        tokens.push(new Token(TokenTypes.INT, inum.toString(), inum));
                    else
                        tokens.push(new Token(TokenTypes.FLOAT, fnum.toString(), fnum));
                }
                else {
                    var key = "";
                    var regex = /^[a-zA-Z]+$/;
                    while (src.length > 0 && regex.test(src[0])) {
                        key += src.shift();
                    }
                    tokens.push(new Token(TokenTypes.IDENTIFIER, key, null));
                }
                break;
        }
    }
    return tokens;
}
exports.lex = lex;
