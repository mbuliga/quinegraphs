// parser for lambda calculus to mol
// author: Marius Buliga
// last updated: 11.12.2019

var op = {
"lparen": "(",
"rparen": ")",
"dot": ".",
"lambda": "\\", 
"app": "@",
"bof": "[",
"eof": "]",
};

function isOp(x) {
var res = false;
if (x == op.lparen || x == op.rparen || x == op.dot || x == op.lambda || x == op.app || x == op.bof || x == op.eof) res = true;
return res; 
}
function isVar(x) {
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
  prepared = prepared.replace(/&lambda;/g, " \\ ");
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
// check for matching parens and if OK add op.app where needed
  var parens = 0;
  for (var i=0; i<lexA.length; i++) {
    if (lexA[i] == op.lparen) parens = parens + 1;
    if (lexA[i] == op.rparen) parens = parens - 1;
    if (parens < 0) {
      errorsline = "Wrong parentheses";
      document.getElementById("errors").innerHTML += errorsline;
      throw "Wrong parentheses";
      break;
    }
  }
  if (parens > 0) {
    errorsline = "Missing parentheses";
    document.getElementById("errors").innerHTML += errorsline;
    throw "Missing parentheses";
  } else {
    for (var i=0; i<lexA.length - 1; i++) {
      addedApp = "";
      current = lexA[i];
      lex2A.push(current);
      next = lexA[i+1];
      if ( (isVar(current) || current == op.rparen) && ( next == op.lparen || isVar(next) || next == op.lambda)) {   
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
        errorsline = "Malformed expression";
        document.getElementById("errors").innerHTML += errorsline;
        throw "Malformed expression";
      } else {
        if (!(isVar(lex2A[i+1]) || lex2A[i+1] == op.lparen || lex2A[i+1] == op.lambda)) { 
          errorsline = "Malformed expression";
          document.getElementById("errors").innerHTML += errorsline;
          throw "Malformed expression";
        }
      }
    }
    if (lex2A[i] == op.lambda) {
      ji = i + 4;
      if (ji >= lex2A.length) {
        errorsline = "Malformed expression";
        document.getElementById("errors").innerHTML += errorsline;
        throw "Malformed expression";
      } else {
        if ( isOp(lex2A[i+1]) || lex2A[i+2] !== op.dot) {
          errorsline = "Malformed expression";
          document.getElementById("errors").innerHTML += errorsline;
          throw "Malformed expression";
        }
      }     
    }
  }


// <debug> print lexer result
/*
  document.getElementById("lexer").innerHTML = "lexer:<br><br>";
  for (var i=0; i<lex2A.length; i++) {
    document.getElementById("lexer").innerHTML += lex2A[i] + ",";
  }
*/
// </debug>

  return lex2A;


}

// parser to mol with variables
var molV = "";
var rootAdd = true;

function parser(term) {
  var stack = term.content, current, termout = {}, iLeftAbs = 0, iRightAbs = 0, iMiddleAbs = 0;
  var rootAddCurrent;
  rootAddCurrent = rootAdd;
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
      var parens = 1;
      while (parens > 0) {
        if (stack[term.right] == op.lparen) {
          parens +=1;
        } else if (stack[term.right] == op.rparen) {
          parens = parens - 1;
        }
        if (parens > 0) {
          termout.content.push(stack[term.right]);
        }
        term.right +=1;
      }
      termout.content.push(op.eof);
      parser(termout);
      term.middle = term.right;
      current = stack[term.right];
    } else if (current == op.lambda) {                                   
      term.middle = term.right + 1;
      var next = stack[term.middle];
      iMiddleAbs = term.middle + term.absolute;
      if (isVar(next)) {
        molV += "FROUT " + next + " " + iMiddleAbs + "^";
        term.left = term.middle + 1;
        if (stack[term.left] == op.dot) {
          iLeftAbs =  term.left + term.absolute;
          iRightAbs = term.right + term.absolute;
          molV += "L " + iLeftAbs + " " + iMiddleAbs + " " + iRightAbs + "^";
          term.left = term.left - 2;
          term.right = term.right + 2;
          termout.left = 0;
          termout.middle =  0;
          termout.right =  0;  
          termout.absolute = term.right + term.absolute;
          termout.content = [op.bof];
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
              errorsline = "Not a variable in lambda: \"\\" + next + " " + stack[term.middle] + stack[term.left] + "\"";
              document.getElementById("errors").innerHTML += errorsline;
              throw "Not a variable in lambda: \"\\" + next + " " + stack[term.middle] + stack[term.left] + "\"";
        }
      } else {
              errorsline = "Not a variable in lambda: \"\\" + stack[term.middle] + "\"";
              document.getElementById("errors").innerHTML += errorsline;
              throw "Not a variable in lambda: \"\\" + stack[term.middle] + "\"";
      }
    } else if (current == op.app) {
      term.middle = term.right;
      iLeftAbs = term.left+ term.absolute;
      term.middle +=1;
      if (stack[term.middle] == op.lambda) {
        var itempo = term.right + term.absolute;
        if (rootAdd) {
        molV += "Arrow" + " " + itempo + " " + term.absolute + "^";}       
        rootAddCurrent = false;
      } 
      iMiddleAbs = term.middle + term.absolute;
      iRightAbs = term.right + term.absolute;
      molV += "A " + iLeftAbs + " " + iMiddleAbs + " " + iRightAbs + "^";
      term.left = term.right;
      term.right = term.middle; 
      term.middle = term.right;
      current = stack[term.right];
    } else if (current == op.eof) {
      iRightAbs = term.right + term.absolute;
      molV += "Arrow" + iRightAbs + " " + term.absolute + "^";
      current = stack[term.right];
    }
  }
  iLeftAbs = term.left + term.absolute;
  if (rootAddCurrent) {
  molV += "Arrow" + " " + iLeftAbs + " " + term.absolute + "^";}
}

function lambdaToMol() {
var input = document.getElementById("inputlambda").value;
document.getElementById("errors").innerHTML = "";

var inputArray = sanitize(input);
var lexArray = lexer(inputArray);
molV = "ROOT 0^";
var maxCount = lexArray.length;
var stack0 = {
  "left":0, 
  "right":0,
  "middle":0,
  "absolute":0,
  "content":lexArray,
};

parser(stack0);

// put molV in a better format
var molvLines = molV.split("^");
var molvDet = [], molvL, molvC, jline, varNm, varIn, varOut, varBound;

// document.getElementById("molv").innerHTML = "molvDet:<br><br>";                     // <debug>

for (var i=0; i<molvLines.length; i++) {
  molvL = molvLines[i].split(" ");
  if (molvL.length >= 2) {
    molvDet.push(molvL);
//    document.getElementById("molv").innerHTML += i + ": " + molvL + "<br>";          // <debug>
  }
}
//find edges of the graph, until now, free and bound variables
var molVedges = [], boundEdges = [],  freeEdges = [], oneEdge;
for (var i=0; i<=maxCount; i++) {
molVedges.push([]);
}
// walk the edges function
function molvOtherEnd(lin,pos) {
  var imolve = molvDet[lin][pos];
  for (var i=0; i<molVedges[imolve].length; i++) {
    if (lin !== (molVedges[imolve][i]).line || pos !== (molVedges[imolve][i]).position) { 
      return molVedges[imolve][i];
    }
  }
}
//
for (var i=0; i<molvDet.length; i++) {
  molvL = molvDet[i];
  freeEdges.push(false);
  switch (molvL[0]) {
    default:
    boundEdges.push([false]);
    for (var k=1; k<molvL.length; k++) {
      oneEdge = molvL[k];
      molVedges[oneEdge].push({"line":i, "position":k});
    }
    break;       
    case "FRIN":
    boundEdges.push([false]);
    oneEdge = molvL[2];
    molVedges[oneEdge].push({"line":i, "position":2});
    break;
    case "FROUT":
    boundEdges.push([true]);
    oneEdge = molvL[2];
    molVedges[oneEdge].push({"line":i, "position":2});
    break;
    case "ROOT":
    boundEdges.push([false]);
    oneEdge = molvL[1];
    molVedges[oneEdge].push({"line":i, "position":1});
    break;
  }
}
// check if every edge variable appears exactly twice, otherwise throw an error

//  document.getElementById("edges").innerHTML = "edges:<br><br>";                        // <debug>

  var edgesprettyline = "", errorsline = "";
for (var i=0; i<molVedges.length; i++) {
  edgesprettyline = "";
  if (molVedges[i].length > 0) { 
    edgesprettyline = "";
    for (var j=0; j<molVedges[i].length; j++) {
    edgesprettyline += " (" + molVedges[i][j].line + "," + molVedges[i][j].position + ")";
    }
//  document.getElementById("edges").innerHTML += edgesprettyline + "<br>";             // <debug>
  }
  switch (molVedges[i].length){
    case 2: case 0:
    continue;
    break;

    case 1:
      errorsline = "Probably the graph is disconnected, because of missing parantheses.";
      document.getElementById("errors").innerHTML += errorsline;
//      throw "edge " + i + " has only one end. Probably the graph is disconnected, because of missing parantheses?";
    break;

    default:
      errorsline = "Malformed graph. Try to add parantheses in textarea.";
      document.getElementById("errors").innerHTML += errorsline;
      throw "edge " + i + " has " + molVedges[i].length + " ends: " +  edgesprettyline + " Malformed graph. Try to add parantheses in textarea.";
    break;
  }
}
var walkCount = 0, maxwalkCount = 2 * molvDet.length;
var stopb, jwalk;
for (var i=0; i<molvDet.length; i++) {
  molvL = molvDet[i];
  stopb = true;
  if (molvL[0] == "FRIN") {
    varNm = molvL[1];
    varIn = molvL[2];
    varOut = molvOtherEnd(i,2);
    walkCount = 0;
    while (stopb) {
      walkCount += 1;
      if (walkCount > maxwalkCount) { 
        errorsline = "Running circles in the graph. Stopped.";
        document.getElementById("errors").innerHTML += errorsline;
        throw "From " + molvL + " ,running circles in the graph. Stopped.";
        stopb = false;
      }
      jwalk = varOut.line;
      molvC = molvDet[jwalk];
      switch (molvC[0]) {
        case "A":
        varOut = molvOtherEnd(jwalk,3);
        break;
        case "Arrow":
        varOut = molvOtherEnd(jwalk,2);
        break;
        case "L":
        var imov =  molvOtherEnd(jwalk,2);
        if (varNm == molvDet[imov.line][1]) {
        boundEdges[imov.line].push(i); 
        stopb = false;
        } else {
        varOut = molvOtherEnd(jwalk,3);
        }
        break;
        case "ROOT":
        freeEdges[i] = true;
        stopb = false;
        break;
        default:
        errorsline = "Enter through a FRIN node and exited in a weird place. Stopped. Put parantheses in the textarea?";
        document.getElementById("errors").innerHTML += errorsline;
        throw "From "  + molvL + " ,exit through " + molvC + " which is weird. Stopped.";
        break;
      }
    }
  }
}


var nodeCnt = maxCount + 1;
// add FO and T nodes for the bounded vars
for (var i=0; i<boundEdges.length; i++) {
  if (boundEdges[i][0]) {
    switch (boundEdges[i].length) {
      case 1:
      molvDet[i] = ["T", molvDet[i][2]];
      break;
      case 2:
      molvDet[boundEdges[i][1]] = ["Arrow", molvDet[i][2], molvDet[boundEdges[i][1]][2]];
      molvDet[i] = [];
      break;
      default:
      var jstart = molvDet[i][2];
      for (var j=1; j<boundEdges[i].length - 1; j++) {
        molvDet[boundEdges[i][j]] = ["FO",jstart,molvDet[boundEdges[i][j]][2],nodeCnt];
        jstart = nodeCnt;
        nodeCnt += 1;
      }
      molvDet[boundEdges[i][boundEdges[i].length - 1]] = ["Arrow",jstart,molvDet[boundEdges[i][boundEdges[i].length - 1]][2]];
      molvDet[i] = [];
      break;
    }
  }
}
maxCount = nodeCnt;
// ad FO for multiple free vars
var addFreeFO = [], varunu, vardoi;
for (var i=0; i<freeEdges.length; i++) {
addFreeFO.push([freeEdges[i]]);
}
for (var i=0; i<freeEdges.length; i++) {
  if (freeEdges[i]) {
  varunu = molvDet[i][1];
    for (var j=i; j<freeEdges.length; j++) {
      if (freeEdges[j]) {
        vardoi = molvDet[j][1];
        if (varunu == vardoi) {
            addFreeFO[i].push(j);
            freeEdges[j] = false;
        }
      }
    }
  }
}
for (var i=0; i<freeEdges.length; i++) {
  if (addFreeFO[i][0]) {
    switch (addFreeFO[i].length) {
      case 2:
      molvDet[i] = ["FRIN", molvDet[i][2]];
      break;

      default:
      var jstart = nodeCnt;
      molvDet.push(["FRIN", nodeCnt]);
      for (var j=1; j<addFreeFO[i].length - 1; j++) {
        nodeCnt += 1;
        molvDet[addFreeFO[i][j]] = ["FO",jstart,molvDet[addFreeFO[i][j]][2],nodeCnt];
        jstart = nodeCnt;
        addFreeFO[addFreeFO[i][j]][0] = false;
      }
        molvDet[addFreeFO[i][addFreeFO[i].length - 1]] = ["Arrow",nodeCnt,molvDet[addFreeFO[i][addFreeFO[i].length - 1]][2]];
        addFreeFO[addFreeFO[i][addFreeFO[i].length - 1]] = false;
      break;
    }
  }
}
// final grooming
molvDet[0][0] = "FROUT";
for (var i=0; i<molvDet.length; i++) {
  if (molvDet[i].length == 0) {
  molvDet.splice(i,1);
  }
}
var molFromLambda = "";
var molline = "";
for (var i=0; i<molvDet.length; i++) {
  molline = molvDet[i].toString();
  molline = molline.replace(/,/g, " ");
  molFromLambda += molline + "^";
}
document.getElementById("molyoulookat").innerHTML = molFromLambda;
}
