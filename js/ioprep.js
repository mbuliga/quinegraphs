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
  
  for (var i=0; i<nodes.length; i++) {
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
            edges[other.id] = edgeCount
            line += " " + edgeCount;
          } else {
            line += " free" + edgeCount;
// adds FRIN or FROUT to the exported mol
            if (nodeValence[nodes[i].type][k] == 0 ) { 
              line += "<br>FRIN" + " free" + edgeCount;
            } else {
              line += "<br>FROUT" + " free" + edgeCount;
            }
//
          }
        }
      }
      
      line += "<br>";
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

function doClearImport(textarea) {
  removeAllNodes();
  importMol(textarea.value);
}

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

