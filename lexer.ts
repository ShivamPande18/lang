export class Token {
    type:string;
    name:string;
    value:any;

    constructor(type:string, name:string, value:any) {
        this.type = type;
        this.name = name;
        this.value = value;
    }
}



enum TokenTypes{
    IDENTIFIER = "IDENTIFIER",
    INT = "INT",
    FLOAT = "FLOAT",
    ADD = "ADD",
    SUB = "SUB",
    DIV = "DIV",
    MULT = "MULT",
    EQUALS = "EQUALS",
    O_PAREN = "O_PAREN",
    C_PAREN = "C_PAREN",
    EOS = "EOS"
}


export function lex(code:string){
    const tokens = new Array<Token>();

    const src = code.split("");

    while(src.length>0){
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
                if(!isNaN(Number(src[0]))){
                    let num = "";
                    while (src.length > 0 && (src[0] == "." || !isNaN(Number(src[0])))) {
                        num += src.shift();
                    }
                
                    const fnum:number = parseFloat(num);
                    const inum:number = parseInt(num);
                    if(fnum == inum) tokens.push(new Token(TokenTypes.INT, inum.toString(), inum));
                    else tokens.push(new Token(TokenTypes.FLOAT, fnum.toString(), fnum));
                }
                else {
                    let key = "";
                    let regex = /^[a-zA-Z]+$/;
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