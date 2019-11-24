// parser for lambda calculus to mol

var op = {
"lparen": "(",
"rparen": ")",
"dot": ".",
"lambda": "\\", 
"app": "*",
"bof": "[",
"eof": "]",

};



function isOp(x) {
var res = false;
if (x == op.lparen || x == op.rparen || x == op.dot || x == op.lambda || x == op.app || x == op.bof || x == op.eof) res = true;
return res; 
}

function isVar(x) {
// var res = false;
// if (!isOp(x)) res = true;
//return res;
return !isOp(x);
}

// sanitize input
function sanitize(input) {
  var prepared = input.replace(/\[/g, " ( ");
  prepared = prepared.replace(/\]/g, " ) ");
  prepared = prepared.replace(/\(/g, " ( ");
  prepared = prepared.replace(/\)/g, " ) ");
  prepared = prepared.replace(/\{/g, " ( ");
  prepared = prepared.replace(/\}/g, " ) ");
  prepared = prepared.replace(/lambda/g, " \\ ");
  prepared = prepared.replace(/Lambda/g, " \\ ");
  prepared = prepared.replace(/[^a-z.A-Z\\0-9()\s\.]/g, "");
  prepared = prepared.replace(/\\/g, " \\ ");
  prepared = prepared.replace(/\./g, " . ");
  prepared = prepared.replace(/\s+/g, " ");
  var res = prepared.split(" ");
  return res;
}

// lexer
function lexer(input) {
  var lexA = ["["];
  var lex2A = [], lex3A = [], current, next, nextnext, addedApp;
  for (var i=0; i<input.length; i++) {
    if (input[i] !== "") lexA.push(input[i]);
  }
  lexA.push("]");
// check for mathching parens and if OK add op.app where needed
  var parens = 0;
  for (var i=0; i<lexA.length; i++) {
    if (lexA[i] == op.lparen) parens = parens + 1;
    if (lexA[i] == op.rparen) parens = parens - 1;
    if (parens < 0) {
      document.getElementById("output").innerHTML =  "Wrong parentheses";
      throw "Wrong parentheses";
      break;
    }
  }
  if (parens > 0) {
    document.getElementById("output").innerHTML =  "Missing parentheses";
    throw "Missing parentheses";
  } else {
    for (var i=0; i<lexA.length - 1; i++) {
      addedApp = "";
      current = lexA[i];
      lex2A.push(current);
      next = lexA[i+1];
      if ( isVar(current) && ( next == op.lparen || isVar(next) || next == op.lambda)) {
        addedApp = op.app;
        lex2A.push(addedApp);
      } else if (current == op.rparen && (next ==  op.lparen || isVar(next)))  {
        addedApp = op.app;
        lex2A.push(addedApp);
      }
    }
    lex2A.push(lexA[lexA.length - 1]);
  }
// check for malformed abstractions or applications
  var ji;
  for (var i=0; i<lex2A.length; i++) {
    if (lex2A[i] == op.app || lex2A[i] == op.dot) {
      ji = i + 2;
      if (ji >= lex2A.length) {
        throw "Malformed expression";
      } else {
        if (!(isVar(lex2A[i+1]) || lex2A[i+1] == op.lparen || lex2A[i+1] == op.lambda)) throw "Malformed expression";
      }
    }
    if (lex2A[i] == op.lambda) {
      ji = i + 4;
      if (ji >= lex2A.length) {
        throw "Malformed expression";
      } else {
        if ( isOp(lex2A[i+1]) || lex2A[i+2] !== op.dot) throw "Malformed expression";
      }     
    }
  }
  return lex2A;
}

// parser to mol with variables

var molV = "";

function parser(term) {

var stack = term.content;

var current;
var termout = {};
var iLeftAbs = 0, iRightAbs = 0, iMiddleAbs = 0;

  current = stack[term.left];

  while (current !== op.eof) {

    if (isVar(current)) {
      iRightAbs = term.right + term.absolute;
      molV += "FRIN " + current + " " + iRightAbs + "^";
      term.right += 1;
      term.middle = term.right;
      current = stack[term.right];
    } else if (current == op.bof || current == op.eof) {
      term.right += 1;
      term.left= term.right;
      term.middle = term.right;
      current = stack[term.right];
} else if (current == op.lparen) {
      term.middle = term.right;
      termout.left = 0;
      termout.middle =  0;
      termout.right =  0;  
      termout.absolute = term.right + term.absolute;
      termout.content = [op.bof];
      term.right +=1;
      while (stack[term.right] !== op.rparen) {
        termout.content.push(stack[term.right]);
        term.right +=1;
      }
      termout.content.push(op.eof);
      parser(termout);
      term.right +=1;
      term.middle = term.right;
      current = stack[term.right];
    } else if (current == op.lambda) {
      term.middle = term.right + 1;
      var next = stack[term.middle];
      iMiddleAbs = term.middle + term.absolute;
      if (isVar(next)) {
        molV += "FRIN " + next + " " + iMiddleAbs + "^";
        term.right = term.middle + 1;
        if (stack[term.right] == op.dot) {
          term.left = term.right + 1;
          iLeftAbs =  term.left + term.absolute;
          iRightAbs = term.right + term.absolute;
          molV += "L " + iLeftAbs + " " + iMiddleAbs + " " + iRightAbs + "^";
          term.left = term.left - 1;
          term.right = term.right + 1;
          termout.left = 0;
          termout.middle =  0;
          termout.right =  0;  
//          term.absolute += 1;
          termout.absolute = term.left + term.absolute;
          termout.absolute +=1;
          termout.content = [op.bof, stack[term.right]];
          term.right +=1;
          while (stack[term.right] !== op.eof) {
            termout.content.push(stack[term.right]);
            term.right +=1;
          }
          termout.content.push(op.eof);
          parser(termout);
          term.middle = term.right;
          current = stack[term.right];
        } else {
              throw "Not a variable in lambda: \"\\" + next + " " + stack[term.middle] + stack[term.left] + "\"";
        }
      } else {
              throw "Not a variable in lambda: \"\\" + stack[term.middle] + "\"";
      }
    } else if (current == op.app) {
      term.middle = term.right;
      iLeftAbs = term.left+ term.absolute;
      term.middle +=1;
      if (stack[term.middle] == op.lambda) {
        iMiddleAbs = term.middle + 2;
        iMiddleAbs = iMiddleAbs + term.absolute;
      } else {
        iMiddleAbs = term.middle + term.absolute;
      }
      iRightAbs = term.right + term.absolute;
      molV += "A " + iLeftAbs + " " + iMiddleAbs + " " + iRightAbs + "^";
      term.left = term.right;
      term.right = term.middle; 
      current = stack[term.right];
    } else if (current == op.eof) {
      iRightAbs = term.right + term.absolute;
      molV += "Arrow" + iRightAbs + " " + term.absolute + "^";
      current = stack[term.right];
    }
  }
  iLeftAbs = term.left + term.absolute;
  molV += "Arrow" + " " + iLeftAbs + " " + term.absolute + "^";
}

function main() {

var input = document.getElementById("input").value;

var inputArray = sanitize(input);
var lexArray = lexer(inputArray);

molV = "ROOT 0^";

var stack0 = {
  "left":0, 
  "right":0,
  "middle":0,
  "absolute":0,
  "content":lexArray,
};

parser(stack0);

document.getElementById("output").innerHTML = lexArray;

//var molpretty = molV.replace(/\^/g, "<br>");

 document.getElementById("molres").innerHTML = molV;


}
