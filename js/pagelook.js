/* 
page look (buttons, etc), import-export mol
*/

var versusVar = "<br><br> VS. <br><br>";

function selectionLambda() {

setSpeed(0); 
setStart(0); 
var lambdatext = document.getElementById('listofmols').value; 
document.getElementById('inputlambda').value = termLibrary(lambdatext); 
if (termLibrary(lambdatext) == "") {
  voidMolToScreenAfter(); 
  molSelect(); 
  exportMolToScreen();
} else {
lambdaToMol(); 
reloadCode();
var molCom = molComments(lambdatext);
document.getElementById("comments").innerHTML = molCom; 
}
setComb(1);setSpeed(1); setStart(1); loop();
}


function selectionStarter() {
  setSpeed(0); 
  setStart(0); 
  if ( arenaVar == 0 ) {
  whichButtons(); 
  }
  voidMolToScreenAfter(); 
  molSelect(); 
  exportMolToScreen();
  if (arenaVar == 1) {
    document.getElementById("listofmols").value = "arena";
  }
}

function selectionLink(link) {
document.getElementById("listofmols").value = link;
selectionStarter();
}

var ButtonOriginal = [
  {"Id":"button3", "Class":"image2", "Visibility":"hidden", "Onclick": function () {selectionStarter();}, "Text":"new"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"},
//  {"Id":"lambdatomolbutton", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); lambdaToMol(); reloadCode();}, "Text":"&lambda;>mol"}
];

var ButtonLambda = [
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); lambdaToMol(); reloadCode(); setComb(1);setSpeed(1); setStart(1); loop();}, "Text":"&lambda;>mol"}, 
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"start"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"},
/*  {"Id":"lambdatomolbutton", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); lambdaToMol(); reloadCode();}, "Text":"&lambda;>mol"}*/
];


var ButtonRandomGraph = [
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {selectionStarter();}, "Text":"new"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"}
];


var ButtonArena = [
  {"Id":"button1", "Class":"image2", "Visibility":"hidden", "Onclick": function () {document.getElementById("listofmols").value = "arena"; setArena(1); selectionStarter();}, "Text":"add"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"fight"},
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"purge"}
];

var ButtonGreedyAlgorithm = [
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {selectionStarter();}, "Text":"greedy"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"}
];

function showAllButtons(butto) {
  for (var i = 0; i < butto.length; i++) {
    showButton(butto[i]);
  }
}

function showButton(buttt) {
  document.getElementById(buttt.Id).onclick = buttt.Onclick;
  document.getElementById(buttt.Id).style.visibility = buttt.Visibility;
  document.getElementById(buttt.Id).innerHTML = buttt.Text;
}



function whichButtons() {
  var choiceButtons = document.getElementById("listofmols").value;
  switch (choiceButtons) {

    case "lambdanote":
    var selectedButtons = ButtonLambda;
    break;


    case "arena":
    var selectedButtons = ButtonArena;
    break;

    case "greedy":
    var selectedButtons = ButtonGreedyAlgorithm;
    break;

    case "random_16_quine_A_L_FI_FO_duplicate":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_egg_A_L_FI_FO":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_egg_A_L_FI_FOE":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_10_quine_bubbles":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_egg_G_G_D_D":
    var selectedButtons = ButtonRandomGraph;
    break;

    default:
    var selectedButtons = ButtonOriginal;
    break;
  }
  showAllButtons(selectedButtons);
}

function voidMolToScreenAfter() {
  document.getElementById("puttransformcachealt").innerHTML = "";
  document.getElementById("chosentransform").innerHTML = "";
  document.getElementById("puttransformcachealtafter").innerHTML = "";
//  document.getElementById("nodenumber").innerHTML = 0; 
  if (arenaVar == 0) { 
    document.getElementById("molexport").innerHTML = ""; 
    document.getElementById("molexportafter").innerHTML = ""; 
  } else {
    document.getElementById("molexport").innerHTML += "<br>"; 
    document.getElementById("molexportafter").innerHTML += "<br>"; 
  }
}

function setSpeed(newSpeed) {
  speed = newSpeed;
}

function setStart(varStart) {
  startVar = varStart;
}

function setArena(varArena) {
  arenaVar = varArena;
}

function setComb(newComb) {
  combOnly = newComb;
}



// IO functions
function importMol(str) {
  var lines = str.split("\n");
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

function importMolFromLib(str) {
  var lines = str.split("^");
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



function reloadCode() {
  removeAllNodes();
  setSpeed(0);
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

function molSelect() {
  setSpeed(0);
  var molN = document.getElementById("listofmols").value;
  doClearImportFromLib(molN);
  var initNrOfCenterNodes = Math.floor(nodes.length / 4);
  document.getElementById("nodenumber").innerHTML = initNrOfCenterNodes;
}



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

function exportMolToScreen() {
  document.getElementById("molexport").innerHTML = exportMol(); 
}

function exportMolToScreenAfter() {
  document.getElementById("molexportafter").innerHTML = exportMol(); 
}

function showImportError(e) {
  alert(e);
}





