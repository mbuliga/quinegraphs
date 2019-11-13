//chemlambda + IC only version of the kali system, or anharmonic lambda, grown from: 
// https://github.com/chorasimilarity/chemlambda-gui/blob/gh-pages/dynamic/README.md
// https://arxiv.org/abs/1807.02058
//
// this program is forked and modified from https://mbuliga.github.io/kali-try.js on 24.10.2019, which is 
// a modification of the js version https://github.com/ishanpm/chemlambda-editor of my chemlambda v2, see the issue https://github.com/chorasimilarity/chemlambda-gui/issues/9 
// author: Marius Buliga http://imar.ro/~mbuliga/index.html
// last modified: 12.11.2019
// 



var graph;
var mode = "transform";
var addType = 0;
var selection = null;
var newNodeIndex = 0;
var transformCache = []; // Nodes ready for transformation



// which chemistries (i.e. graph rewrite systems) we use?
var graphRewriteSystems = ["CHEMLAMBDA","IC","T","COMB"];

//priority of rewrites, for the moment only COMB
var combPriority = 1;

// build the list of graph rewrites
var transformList = [];
for (var ichem=0; ichem<graphRewriteSystems.length; ichem++) {
  var addChemistry = chemistry(graphRewriteSystems[ichem]);
  for (var ichemadd=0; ichemadd<addChemistry.length; ichemadd++) {
  transformList.push(addChemistry[ichemadd]);
  }
}

// build the d3 graph
graph = myGraph("#svgdiv")

// main loop
function loop(dt) {
  var anyMoves = false;

  var maxNumberOfNodesStr = document.getElementById("maxnodenumber").innerHTML;
  var maxNumberOfNodes = maxNumberOfNodesStr - 2;
  var numberOfCenterNodes = Math.floor(nodes.length / 4);
  document.getElementById("nodenumber").innerHTML = numberOfCenterNodes;

  if (nodes.length > 4*maxNumberOfNodes) { setSpeed(0);}

  if (speed == 1 && transformCache.length > 0) {

    var putTransformCacheAlt = "";
    for (var i=0; i<transformCache.length; i++) {      
      putTransformCacheAlt += transformCache[i].node.id + ": " + transformCache[i].trans.named;
      putTransformCacheAlt += "<br>";
    }

  exportMolToScreen();

  document.getElementById("puttransformcachealt").innerHTML = putTransformCacheAlt;

// added priority to COMB rewrites
    var priority = 0;

    if (combPriority == 1) {
      for (var iprior=0; iprior<transformCache.length; iprior++) {
        if (priority == 0) {
          var transPrior = transformCache[iprior].trans.action;
          if (transPrior == "arrow") {
            var choice = iprior;
            priority = 1;
          }
        }
      }
    }



    if (priority == 0) {
    var choice = Math.floor(Math.random() * transformCache.length);
    }    


    var node = transformCache[choice].node;
    var trans = transformCache[choice].trans;
    
    if (autoFilter.indexOf(node.type) != -1) {
      anyMoves = true;
      doTransform(node, trans);

      var chosenTransform =  node.id + ": " + trans.named + "<br>";
      document.getElementById("chosentransform").innerHTML = chosenTransform;
//
    }
  } 

  if (anyMoves) {
    update();

    var putTransformCacheAlt = "";
    for (var i=0; i<transformCache.length; i++) {      
      putTransformCacheAlt += transformCache[i].node.id + ": " + transformCache[i].trans.named;
      putTransformCacheAlt += "<br>";
    }
  

  exportMolToScreenAfter();

  document.getElementById("puttransformcachealtafter").innerHTML = putTransformCacheAlt;
  }
  if (startVar == 1) requestAnimationFrame(loop);
}

loop();

function loop2(dt) {
  setSpeed(1);
  loop();

}



