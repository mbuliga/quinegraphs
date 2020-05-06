// IO and preparation functions
// see Acknowledgements in myD3Graph.js
// last updated: 17.03.2020




// IO functions


/*
Functions which convert mols and mol patterns from records into vectors of mol modes.

*/


/* Splits a record str into a vector of lines by using the separator chara. 
Each lines element is split into a vector, by using the space character 
(after supplimentary spaces are trimmed).

*/

function importMolVector(str,chara) {
  var lines = str.split(chara);
  var output = [], line;

  for (var i=0; i<lines.length; i++) {
    line = lines[i].trim().split(" ");
    output.push(line);
  }
  
  return output;
}


/* Turns a record str, by using the separator "separator", into a d3 graph. 
Checks if the mol nodes are well defined. Does not add FRIN or FROUT nodes.

*/


function importMolGen(str,separator) {
  var lines = str.split(separator);
  var edges = {};

  for (var i=0; i<lines.length; i++) {
    var line = lines[i].trim().split(" ");

    if (line[0] == '') continue;
    
    var valence = nodeValence[line[0]];
    if (!valence) { var ii=i+1;
      showImportError("line " + ii + ": Unrecognized node type " + line[0]);
      return;
    }
    if (line.length-1 < valence.length) { var ii=i+1;
      showImportError("line " + ii + ": " + line[0] + " has " + line.length-1 + "edges, expected " + valence.length);
    }
    
    var newNode = addNodeAndEdges(line[0]);
    
    for (var k=1; k<newNode.length; k++) {
      if (edges['e'+line[k]]) addLink(edges['e'+line[k]], newNode[k], 2);
      else edges['e'+line[k]] = newNode[k];
    }
  }
  update();
}



/* Turns a record str which has newline as separator, into a d3 graph. 

It first call importMolGen(str,"\n"), which checks the correctness of 
the mol pattern record "str" and creates a d3 graph. 

This graph is exported with exportMol(), which adds 'FRIN" and "FROUT" 
mol nodes if needed (although the d3 graph does not have them!). 

The graph is removed and the exported mol is imported again 
(this time with separator "<br>").

This creates a graph which does not have free edges.

*/



function importMol(str) {

  importMolGen(str,"\n");
  var molIntermed = exportMol();
  removeAllNodes();
  importMolGen(molIntermed,"<br>");
}

/* The same as importMol, but adapted to imports from molLibrary, 
i.e. with separator "^". Same effect as importMol.

*/

function importMolFromLib(str) {

  importMolGen(str,"^");
  var molIntermed = exportMol();
  removeAllNodes();
  importMolGen(molIntermed,"<br>");
}

function importMolTextarea(textarea) {
  setSpeed(0);
// added age reset
  setAge(0);
  removeAllNodes();
  var molIn = document.getElementById(textarea).value;
  molIn = molIn.replace(/\^/g,"\n");
  molIn = molIn.replace(/<br>/g,"\n");
  molIn = molIn.replace(/[^a-z.A-Z\\0-9\s\n]/g, "");
  var molCode = molIn.replace(/\n/g,"\^");
  importMol(molIn);
  exportMolToScreen();
  exportMolToScreenAfter();
  document.getElementById("molyoulookat").innerHTML = molCode;
}

function updateMolTextarea(textarea) {
  setSpeed(0);
// added age reset
//  setAge(0);
  removeAllNodes();
  var molIn = document.getElementById("molexportafter").innerHTML;
  if (molIn == "") molIn = document.getElementById("molexport").innerHTML;
  molIn = molIn.replace(/\^/g,"\n");
  molIn = molIn.replace(/<br>/g,"\n");
  molIn = molIn.replace(/[^a-z.A-Z\\0-9\s\n]/g, "");
  var molCode = molIn.replace(/\n/g,"\^");
  importMol(molIn);
  exportMolToScreen();
  exportMolToScreenAfter();
//  document.getElementById("molyoulookat").innerHTML = molCode;
  var molCodeAr = molCode.split("^");
  var molCodeWfree = "";
  for (var i=0; i<molCodeAr.length; i++) {
    var lineMol = molCodeAr[i].trim().split(" ");
    if (lineMol[0] == "FRIN" || lineMol[0] == "FROUT") {
      continue;
    } else {
      molCodeWfree += molCodeAr[i] + "^";
    }
  }
  molCodeWfree = molCodeWfree.replace(/\^+/g, "\^");
  document.getElementById(textarea).value = molCodeWfree; 
}


/*
This function transforms the current d3 graph into a mol with edge tags from naturals. 
It adds "FRIN" and "FROUT" mol nodes if needed. 

It does not modify the d3 graph. 
Therefore the "FRIN" and "FROUT" mol nodes which are added to 
the output mol do not have correspondent in the d3 graph. 

The edges tags start from 1 (using the counter edgeCount) and ends at 
some natural, say N, so that each number from 1 to N corresponds to 
an edge (i.e. there are no gaps in this count). 

This property is used in the function decoratorLambda() from 0parser.js. 

The mol record produced has separator "<br>" as newline.

This function also writes the number of center nodes (thus uses the predicate isCenter).

*/



function exportMol() {
  var edgeCount = 0;
  var numberOfCenterNodes = 0;

  var result = "";
  var edges = {};
  var addedFR = "";
  
  for (var i=0; i<nodes.length; i++) {
    addedFR = "";
    if (isCenter(nodes[i])) {
      var linked = getLinked(nodes[i]);
//      var line = nodes[i].id + " : " + nodes[i].type;
      var line = nodes[i].type;
      
      linked.sort(function (a,b) { return a.id - b.id;});
      
      for (var k=0; k<linked.length; k++) {
        if (edges[linked[k].id]) {
          line += " " + edges[linked[k].id];
        } else {
          edgeCount ++;
          
          var other = findLinkedHalfEdge(linked[k]);
          if (other != null) {
            edges[other.id] = edgeCount;
            line += " " + edgeCount;
          } else {
            line += " free" + edgeCount;
// adds FRIN or FROUT to the exported mol
            if (nodeValence[nodes[i].type][k] == 0 ) { 
              addedFR += "FRIN" + " free" + edgeCount + "<br>";
            } else {
              addedFR += "FROUT" + " free" + edgeCount + "<br>";
            }
//          
          }
        }
      }
      
      line += "<br>";
      line += addedFR;
      result += line;
      numberOfCenterNodes +=1;
    }
  }  
  document.getElementById("nodenumber").innerHTML = numberOfCenterNodes;
  return result;
}

/* Clears the d3 graph and imports from the molLibrary. 
Exception: if it is used in the arena.html, it adds the d3 graph 
from the imported mol to the actual graph.

*/
function doClearImportFromLib(molname) {
  var molL = molLibrary(molname);
  var molCom = molComments(molname);
  if (arenaVar == 0) {
  removeAllNodes();
  document.getElementById("molyoulookat").innerHTML = molL; 
  document.getElementById("comments").innerHTML = molCom; 
  } else {
    document.getElementById("molyoulookat").innerHTML = ""; 
    if (molname != "arena") {
      fightersVar += 1;
      if (fightersVar <= 1) { 
        var versusAdd = "<br>"; 
      } else {
        var versusAdd = versusVar;
      }
      document.getElementById("comments").innerHTML += versusAdd + molname;
    } 
  }
  importMolFromLib(molL);
}

/*
Clears the d3 graph. 
Stops the simulation. 
Resets age. 
Imports the mol record from the html element with id = "molyoulookat". 
Exports the mol to screen.
*/

function reloadCode() {
  removeAllNodes();
  setSpeed(0);
// added age reset
  setAge(0);
  if (arenaVar == 0) {
    voidMolToScreenAfter();
  } else {
    document.getElementById("puttransformcachealt").innerHTML = "";
    document.getElementById("chosentransform").innerHTML = "";
    document.getElementById("puttransformcachealtafter").innerHTML = "";
    document.getElementById("molexport").innerHTML = ""; 
    document.getElementById("molexportafter").innerHTML = ""; 
    document.getElementById("comments").innerHTML = "";
    fightersVar = 0;
  }
  var molL = document.getElementById("molyoulookat").innerHTML;
  importMolFromLib(molL);
  exportMolToScreen();
}

/*
Stops the simulation.
Imports from molLibrary the mol from the menu with doClearImportFromLib.
*/

function molSelect() {
  setSpeed(0);
  var molN = document.getElementById("listofmols").value;
  doClearImportFromLib(molN);
  var initNrOfCenterNodes = Math.floor(nodes.length / 4);
  document.getElementById("nodenumber").innerHTML = initNrOfCenterNodes;
}



/*
Imports/exports  mol from/to textarea.


function doImport(textarea) {
  importMol(textarea.value);
}

function doExport(textarea) {
  textarea.value = exportMol();
}

*/

function exportMolToScreen() {
  document.getElementById("molexport").innerHTML = exportMol(); 
}

function exportMolToScreenAfter() {
  document.getElementById("molexportafter").innerHTML = exportMol(); 
}

function showImportError(e) {
  alert(e);
}

/*
takes screenshots as sgv. Needs modifications.
*/

function screenShot() {

 var photo = document.getElementById("svgdiv").innerHTML;

 var wrap = "<div class=\"row\"> \n  <svg width=\"" + w + "\" height=\"" + h + "\">"; 

 wrap = wrap + photo;

 output = wrap + "\n </svg> \n </div>";

 var dimensions = "\"width=" + w + ",height=" + h + "\"";

 document.getElementById("photoTaken").innerHTML = output;

/*
 var myWindow = window.open("photobooth.html", "Photo Booth", function () { return dimensions;});

  myWindow.document.write(output);
*/
}



// parser from IC to chemlambda
// author: Marius Buliga
// last updated: 05.05.2020

function ic2chem() {


// take the mol from "molexport", if it is not void, else take it from "molexportafter"
  
  var molString =  document.getElementById("molexport").innerHTML;
  if (molString == "") { molString =  document.getElementById("molexport").innerHTML;}
  var molStringVect = molString.split("<br>");

// transform it into an array 
  var molArray = [], molLine = [];

  for (var i=0; i<molStringVect.length; i++) {
    molLine = molStringVect[i].trim().split(" ");
    if (molLine[0] == '') continue;
    molArray.push(molLine);
  }

  var edgesSeen = [], molNodeType, countIC = 0, porta, portb, portc, 
      portSigna = [], portSignb = [], portSignc = [], 
      portSignLeft = "L", portSignRight = "R", 
      translation = "";

  function edgePar(a) {
    var edgePa = 0, output;
    for (var i=0; i<edgesSeen.length; i++) {
      if (a == edgesSeen[i]) {
        edgePa = 1;
        break;
      }
    }
    if (edgePa == 0) {
      edgesSeen.push(a);
      output = [portSignLeft,portSignRight];
    } else {
      output = [portSignRight,portSignLeft];
    }
    return output;
  }

  for (var i=0; i<molArray.length; i++) {
    molNodeType = molArray[i][0]; 
    switch (molNodeType) {
      case "GAMMA":
      porta = molArray[i][1]; portSigna = edgePar(porta);
      portb = molArray[i][2]; portSignb = edgePar(portb);
      portc = molArray[i][3]; portSignc = edgePar(portc);
      translation += "FOE " + portSigna[0] + porta + " " + portSignb[1] + portb + " " +  portSignc[1] + portc + "<br>";
      translation += "FI " + portSignb[0] + portb + " " + portSignc[0] + portc + " " +  portSigna[1] + porta + "<br>";
      countIC = 1;
      break;

      case "DELTA":
      porta = molArray[i][1]; portSigna = edgePar(porta);
      portb = molArray[i][2]; portSignb = edgePar(portb);
      portc = molArray[i][3]; portSignc = edgePar(portc);
      translation += "A " + portSigna[0] + porta + " " + portSignb[0] + portb + " " +  portSignc[1] + portc + "<br>";
      translation += "L " + portSignc[0] + portc + " " + portSignb[1] + portb + " " +  portSigna[1] + porta + "<br>";
      countIC = 1;
      break;

      case "Arrow":
      porta = molArray[i][1]; portSigna = edgePar(porta);
      portb = molArray[i][2]; portSignb = edgePar(portb);
      translation += "Arrow " + portSigna[0] + porta + " " + portSignb[1] + portb  + "<br>";
      translation += "Arrow " + portSigna[1] + porta + " " + portSignb[0] + portb  + "<br>";
      break;

      case "T":
      porta = molArray[i][1]; portSigna = edgePar(porta);
      translation += "T " + portSigna[0] + porta + "<br>";
      translation += "T " + portSigna[1] + porta + "<br>";
      break;
    }

  }


  if (countIC == 1) {
    translation = translation.replace(/<br>/g, "^");
  } else {
    translation = molString.replace(/<br>/g, "^");

}
document.getElementById("molyoulookat").innerHTML = translation;


}














