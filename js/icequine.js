//chemlambda + IC only version of the kali system, or anharmonic lambda, grown from: 
// https://github.com/chorasimilarity/chemlambda-gui/blob/gh-pages/dynamic/README.md
// https://arxiv.org/abs/1807.02058
//
// this program is forked and modified from https://mbuliga.github.io/kali-try.js on 24.10.2019, which is 
// a modification of the js version https://github.com/ishanpm/chemlambda-editor of my chemlambda v2, see the issue https://github.com/chorasimilarity/chemlambda-gui/issues/9 
// author: Marius Buliga http://imar.ro/~mbuliga/index.html
//
//
// last modified: 15.03.2021
// 



var graph;
var mode = "transform";
var addType = 0;
var selection = null;
var newNodeIndex = 0;
var transformCache = []; // rewrites cache





// which chemistries (i.e. graph rewrite systems) we use? UPDATE: moved to pagelook.js, selectionStarter(), selectionLambda()
var graphRewriteSystems = [];



//priority of rewrites, for the moment only COMB
var combPriority = 1;

// build the list of graph rewrites UPDATE: moved to pagelook.js, selectionStarter(), selectionLambda()



// build the d3 graph
graph = myGraph("#svgdiv")

// main loop
function loop(dt) {
  var anyMoves = false;



// added age increase
  age +=1;

  var maxNumberOfNodesStr = document.getElementById("maxnodenumber").innerHTML;
  var maxNumberOfNodes = maxNumberOfNodesStr - 2;
//  var numberOfCenterNodes = Math.floor(nodes.length / 4);
//  document.getElementById("nodenumber").innerHTML = numberOfCenterNodes;
       
        
  var rewriteWeight = (document.getElementById("rewritesRange").value) / 100;
          
  if (nodes.length > 4*maxNumberOfNodes) { setSpeed(0);}
          
  if (speed == 1 && transformCache.length > 0) {
        
    // shuffle transformCache
           
    var transformCacheLength = transformCache.length;
    var iswap, tswap;

// compute minimal age of transforms

    var minAgeTransform = transformCache[0].age;
    for (var i=1; i<transformCache.length; i++) { 
      minAgeTransform = Math.min(minAgeTransform,transformCache[i].age);
    }
   
// for olderFirst = 1 we keep only the oldest transforms or the COMB transforms

    if (olderFirst == 1) {
//      var transformCacheDeterministic = [];
      var removeFromCache = [];
      for (var i=1; i<transformCache.length; i++) { 
        if (transformCache[i].trans.action != "arrow" && transformCache[i].age > minAgeTransform) {
//          transformCacheDeterministic.push(transformCache[i]);
            removeFromCache.push(i);
        }
      }
      for (var i=removeFromCache.length - 1; i >=0; i--) { 
        transformCache.splice(removeFromCache[i],1);
      }

      transformCacheLength = transformCache.length;
    }
  }

  if (speed == 1 && transformCache.length > 0) {

    while (transformCacheLength) {
           
    // Pick a remaining element
    iswap = Math.floor(Math.random() * transformCacheLength--);
          
    // And swap it with the current element.
    tswap = transformCache[transformCacheLength];
    transformCache[transformCacheLength] = transformCache[iswap];
    transformCache[iswap] = tswap;
    }
        
    var putTransformCacheAlt = "";
    for (var i=0; i<transformCache.length; i++) {      
      putTransformCacheAlt += transformCache[i].node.id + ": " + transformCache[i].trans.named + " age: " + transformCache[i].age;
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
    if (combOnly == 1 && priority == 0) {
      priority = 1;
      setComb(0);
      setSpeed(0); 
      setStart(0);
    } else {   
    if (priority == 0) {
      var haveIchoosedBeta = 0;
      var haveIchoosedDist = 0;
      for (var ichoo=0; ichoo<transformCache.length; ichoo++) {
        var transKind = transformCache[ichoo].trans.kind;  
        if (haveIchoosedBeta == 0) {
          switch(transKind) {
            case "TERMINATION":
              var varChoiceBeta = ichoo;
              haveIchoosedBeta = 1;
            break;
             
            case "BETA":
              var varChoiceBeta = ichoo;
              haveIchoosedBeta = 1;
            break;
          }
        }  
        if (haveIchoosedDist == 0 && transKind == "DIST") {
          var varChoiceDist = ichoo;
          haveIchoosedDist = 1;
        }
      }
      var choiceDice = Math.random();
      var haveIchoosedBoth = haveIchoosedBeta + haveIchoosedDist;
      if (haveIchoosedBoth == 2) { 
        if (choiceDice <= rewriteWeight) {
          var choice = varChoiceBeta;
        } else {
          var choice = varChoiceDist;
        }
      } else {
        switch(haveIchoosedBeta) {
          case 0:
            var choice = varChoiceDist;
          break;
 
          case 1:
            var choice = varChoiceBeta;
          break;
        }
      }
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
  if (startVar == 1) {requestAnimationFrame(loop); showBalanceOfNodes();} else {setBalanceOfNodes();}
}

loop();

function loop2(dt) {
  setSpeed(1);
  loop();

}



