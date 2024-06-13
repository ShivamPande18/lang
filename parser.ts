import { lex } from "./lexer";
import { Token } from "./lexer";
import * as fs from "fs";

enum precedence{C_PAREN, O_PAREN, ADD, SUB, MULT, DIV, MOD, EOS, OPERAND};

const isp:number[] = [  0, 19, 12, 12, 13, 13, 13, 0 ]; // in stack
const icp:number[] = [ 20, 19, 12, 12, 13, 13, 13, 0 ]; //before stack

function get_token(token:string):number{
    switch(token)
    {
        case "EOS": return precedence.EOS;
        case '(': return precedence.O_PAREN ;
        case ')': return precedence.C_PAREN;
        case '+': return precedence.ADD;
        case '-': return precedence.SUB;
        case '*': return precedence.MULT;
        case '/': return precedence.DIV; 
        case '%': return precedence.MOD; 
        default : return precedence.OPERAND;
    }
}

fs.readFile("code.txt","utf-8",(err,data)=>{
        if(err){
            console.log(err.message);
            return;
        }
        const tokens = lex(data);
        console.log(tokens);        
    });
