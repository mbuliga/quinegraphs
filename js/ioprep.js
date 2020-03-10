// IO and preparation functions
// author: Marius Buliga
// last updated: 10.03.2020




// IO functions








function importMolVector(str,chara) {
  var lines = str.split(chara);
  var output = [], line;

  for (var i=0; i<lines.length; i++) {
    line = lines[i].trim().split(" ");
    output.push(line);
  }
  
  return output;
}



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

function importMol(str) {

  importMolGen(str,"\n");
  var molIntermed = exportMol();
  removeAllNodes();
  importMolGen(molIntermed,"<br>");
}

function importMolFromLib(str) {

  importMolGen(str,"^");
  var molIntermed = exportMol();
  removeAllNodes();
  importMolGen(molIntermed,"<br>");
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

