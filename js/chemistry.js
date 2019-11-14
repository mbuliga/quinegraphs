// general COMB rewrites

function chemistry(id) {

switch (id) {
  case "COMB": 
    var out = [
  {left:"any",right:"Arrow",action:"arrow", named:"COMB", kind:"COMPOSE"},
];
  break;


// general pure termination T rewrites

  case "T":
    var out = [
  {left:"T",right:"T",action:"remove4", named:"T-T", kind:"TERMINATION"},
  {left:"FRIN",right:"T",action:"remove4", named:"FRIN-T", kind:"TERMINATION"},
  {left:"T",right:"FROUT",action:"remove4", named:"T-FROUT", kind:"TERMINATION"},
  {left:"null",right:"T",action:"remove1", named:"?-T", kind:"TERMINATION"},
  {left:"null",right:"T",action:"remove1", kind:"TERMINATION"},
];
  break;


// chemlambda-v2 rewrites

  case "CHEMLAMBDA":
    var out = [
  {left:"L",right:"A",action:"beta-arrow-X", named:"L-A", t1:"Arrow",t2:"Arrow", kind:"BETA"},      // action modified from "beta" to "beta-arrow-X" which is the original beta rewrite from chemlambda
  {left:"FI",right:"FOE",action:"beta-arrow", named:"FI-FOE", t1:"Arrow",t2:"Arrow", kind:"BETA"},  // action modified from "beta" to "beta-arrow" which is the original FI-FOE rewrite from chemlambda
// DIST rewrites
  {left:"L",right:"FOE",action:"DIST7", named:"L-FOE", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FOE-L"], kind:"DIST"},
  {left:"L",right:"FO",action:"DIST7", named:"L-FO", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FO-L"], kind:"DIST"}, // 
//
  {left:"A",right:"FOE",action:"DIST1", named:"A-FOE", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"], kind:"DIST"},
  {left:"A",right:"FO",action:"DIST1", named:"A-FO", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"], kind:"DIST"}, // 
//
  {left:"FI",right:"FO",action:"DIST1", named:"FI-FO", t1:"FO",t2:"FO",t3:"FI",t4:"FI",blocks:["FO-FI"], kind:"DIST"}, // 
//
  {left:"FO",right:"FOE",action:"DIST7", named:"FO-FOE", t1:"FOE",t2:"FI",t3:"FO",t4:"FO",blocks:["FOE-FO"], kind:"DIST"}, //       
// Pruning rewrites
  {left:"FO",right:"T",action:"term1", named:"FO-T", kind:"TERMINATION"},  // 
  {left:"T",right:"FO",action:"termin2", named:"T-FO", kind:"TERMINATION"}, // 
  {left:"T",right:"FOE",action:"termin2", named:"T-FOE", kind:"TERMINATION"}, //  
  {left:"FRIN",right:"FO",action:"terminfrin", named:"FRIN-FO", kind:"TERMINATION"}, //    
//  {left:"FRIN",right:"FOE",action:"terminfrin", named:"FRIN-FOE", kind:"TERMINATION"}, // 
  {left:"FRIN",right:"FI",action:"termFI", named:"FRIN-FI", kind:"TERMINATION"}, // 
//
  {left:"L",right:"T",action:"termL", named:"L-T", kind:"TERMINATION"},
  {left:"A",right:"T",action:"term", named:"A-T", kind:"TERMINATION"},
  {left:"FI",right:"T",action:"term", named:"FI-T", kind:"TERMINATION"},
  {left:"FOE",right:"T",action:"term1", named:"FOE-T", kind:"TERMINATION"}, // 
];
  break;

// IC rewrites

  case "IC":
    var out = [
  {left:"GAMMA",right:"GAMMA",action:"GAMMA-GAMMA-arrow", named:"GAMMA-GAMMA", t1:"Arrow",t2:"Arrow",t3:"Arrow",t4:"Arrow", kind:"BETA"}, // action modified from "GAMMA-GAMMA" with 2 pairs Arrow-Arrow added, in order to be sure that COMB rewrite, as is, eliminates all arrows
  {left:"DELTA",right:"DELTA",action:"DELTA-DELTA-arrow", named:"DELTA-DELTA", t1:"Arrow",t2:"Arrow",t3:"Arrow",t4:"Arrow", kind:"BETA"}, // action modified from "DELTA-DELTA" with 2 pairs Arrow-Arrow added, in order to be sure that COMB rewrite, as is, eliminates all arrows
  {left:"GAMMA",right:"DELTA",action:"GAMMA-DELTA", named:"GAMMA-DELTA", t1:"DELTA",t2:"DELTA",t3:"GAMMA",t4:"GAMMA", kind:"DIST"}, // notice that due to symmetry there is no need for DELTA-GAMMA
  {left:"GAMMA",right:"T",action:"term3", named:"GAMMA-T", kind:"TERMINATION"},
  {left:"DELTA",right:"T",action:"term3", named:"DELTA-T", kind:"TERMINATION"},
];
  break;



  default:
  var out = "";
  break;
}
return out;
}


// reactions, i.e. graph rewrites (find and do) transforms algorithms

function findTransform(n1) {
  if (!isCenter(n1)) return;

  var e1 = findLinkedOfType(n1,"in");
  var e2 = findLinkedHalfEdge(e1);
  var n2 = null;
  var n2type = null;
  
  if (e2 == null) {
    e2type = "null"
    n2type = "null";
  } else {
    n2 = findLinkedCenter(e2);
    n2type = n2.type;
    e2type = e2.type;
  }

  for (var i=0; i<transformList.length; i++) {
    var trans = transformList[i];
    if (trans.left == n2type && trans.right == n1.type) {
      switch (trans.action) {
        case "beta": case "beta-arrow": case "beta-arrow-X": case "DIST0": case "DIST1": case "DIST2":  case "DIST3": case "DIST4": case "DIST5": case "DIST6": case "DIST7": case "termsplit": case "term": case "termL": 
          if (e2type == "out") return trans;
        break;

        case "GAMMA-GAMMA": case "GAMMA-GAMMA-arrow": case "DELTA-DELTA": case "DELTA-DELTA-arrow": case "GAMMA-DELTA":  
          if (e2type == "in") return trans;
        break;
        
        case "termin": case "termin2": case "term3":
          if (e2type == "in") return trans;
        break;
        
        case "terminfrin": case "termFI": 
          if (e2type == "in") return trans;
        break;
        
        case "term1":
          if (e2type == "middle" || e2type == "out") return trans;
        break;
        
        case "remove1":
          if (e2type == "null") return trans;
        break;
        
        case "remove4": 
          return trans;
        break;
        
        case "eta":
          if (e2type == "out") {
          var bmid  = findLinkedOfType(n2,"middle");
          var ccmid = findLinkedHalfEdge(bmid);
          var cmid  = findLinkedOfType(n1,"middle");
          if (ccmid == cmid) return trans;
          }
        break;
      }
    } else if (trans.left == "any" && trans.right == n1.type) {
      return trans;
    }
  }
  
  return null;

// end function findTransform
}


function findAllTransforms() {
  transformCache = [];
  
  for (var i=0; i<nodes.length; i++) {
    if (!isCenter(nodes[i])) continue;
    
    var trans = findTransform(nodes[i]);
    
    if (trans) {
      transformCache.push({node: nodes[i], trans: trans})
    }
  }
  
  return transformCache;
}


function updateTransform(node) {
  if (!isCenter(node)) return;

  var oldTrans = transformCache.findIndex(function(e) { return e.node == node;});

  var trans = findTransform(node);
  
  if (trans !== null) {
    if (oldTrans == -1) {
      transformCache.push({node: node, trans: trans})
    } else {
      transformCache[oldTrans].trans = trans;
    }
  } else {
    if (oldTrans != -1) {
      transformCache.splice(oldTrans, 1);
    }
  }
}








function doTransform(n1, trans) {

  
  var e1 = findLinkedOfType(n1,"in");
  var e2 = findLinkedHalfEdge(e1);
  var n2, a, b, b1, c, d, a1;
  if (e2 != null) {
    n2 = findLinkedCenter(e2);

    a  = findLinkedOfType(n2,"in")
    b  = findLinkedOfType(n2,"middle")
    b1 = findLinkedOfType(n2,"out")
  }
  a1 = findLinkedOfType(n1,"in")
  c  = findLinkedOfType(n1,"middle")
  d  = findLinkedOfType(n1,"out")

  switch (trans.action) {
    case "arrow":
      // Remove those arrows
      moveLink2(e1,d);
      removeNodeAndEdges(n1);
      break;
    case "beta":
      // L-A, D-FOX and FI-FOE transitions:
      // Link in to out and middle to middle
      moveLink2(a,d);
      moveLink2(b,c);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "beta-arrow-X":
      // L-A transitions:
      // Arrow a d^Arrow c b
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      moveLink1(a,ar1[1]);
      moveLink1(b,ar2[2]);
      moveLink1(c,ar2[1]);
      moveLink1(d,ar1[2]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "beta-arrow":
      // D-FOX and FI-FOE transitions:
      // Arrow a d^Arrow b c
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      moveLink1(a,ar1[1]);
      moveLink1(b,ar2[1]);
      moveLink1(c,ar2[2]);
      moveLink1(d,ar1[2]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "eta":
      // FOX-D-eta, A-L-eta and FOE-FI-eta transitions:
      moveLink2(a,d);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST0":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[3],nc[2],2);
      addLink(na[2],nd[1],2);
      addLink(nb[2],nc[3],2);
      addLink(nb[3],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST1":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[1],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[3],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST2":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[3],nc[1],2);
      addLink(na[2],nd[2],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[3],nd[1],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST3":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[3],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[3],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST4":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[2],2);
      addLink(na[3],nd[1],2);
      addLink(nb[1],nc[3],2);
      addLink(nb[2],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST5":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[3],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[1],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST6":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[1],2);
      addLink(na[3],nd[2],2);
      addLink(nb[1],nc[2],2);
      addLink(nb[2],nd[1],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST7":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[1],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[1],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "GAMMA-GAMMA":
      // GAMMA-GAMMA transition:
      // Link out n1 to middle n2 and middle n1 to out n2
      moveLink2(d,b);
      moveLink2(c,b1);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "GAMMA-GAMMA-arrow":
      // GAMMA-GAMMA transition:
      // Arrow b f^Arrow d f^Arrow b1 g^Arrow c g
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);
      var ar4 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar3 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      addLink(ar1[2],ar2[2],2);
      addLink(ar3[2],ar4[2],2);

      moveLink1(b,ar2[1]);
      moveLink1(d,ar1[1]);
      moveLink1(b1,ar3[1]);
      moveLink1(c,ar4[1]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "DELTA-DELTA":
      // DELTA-DELTA transition:
      // Link out n1 to out n2 and middle n1 to middle n2
      moveLink2(d,b1);
      moveLink2(b,c);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "DELTA-DELTA-arrow":
      // DELTA-DELTA transition:
      // Arrow b1 f^Arrow d f^Arrow b g^Arrow c g
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);
      var ar4 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar3 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      addLink(ar1[2],ar2[2],2);
      addLink(ar3[2],ar4[2],2);

      moveLink1(b1,ar2[1]);
      moveLink1(d,ar1[1]);
      moveLink1(b,ar3[1]);
      moveLink1(c,ar4[1]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "GAMMA-DELTA":
      //  Distributive transition GAMMA-DELTA,

      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      
      addLink(na[2],nc[2],2);
      addLink(na[3],nd[2],2);
      addLink(nb[2],nc[3],2);
      addLink(nb[3],nd[3],2);

      moveLink1(b,na[1]);
      moveLink1(b1,nb[1]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[1]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "term3":
      // Terminator transition for GAMMA and DELTA
      // Make another terminator
      na = addNodeAndEdges("T",n2.x,n2.y);
      
      moveLink1(b1,e1.id)
      moveLink1(b,na[1])
      
      removeNodeAndEdges(n2);
      break;

    case "remove1":
      // Just remove an unconnected T
      removeNodeAndEdges(n1);
      break;
    case "remove4":
      // Just remove the pair of nodes
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "term":
      // Terminator transition for A and FI
      // Make another terminator
      na = addNodeAndEdges("T",n2.x,n2.y);
      
      moveLink1(a,e1.id)
      moveLink1(b,na[1])
      
      removeNodeAndEdges(n2);
      break;
    case "termL":
      // Terminator transition for L
      // Make a FRIN
      na = addNodeAndEdges("FRIN",n2.x,n2.y);
      
      moveLink1(a,e1.id)
      moveLink1(b,na[1])
      
      removeNodeAndEdges(n2);
      break;

    case "termFI":
      // Terminator transition for FRIN-FI

      moveLink2(c,d)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "term1": case "term2":
      // Terminator transition for FO and FOE
      // Remove the node and terminator
      if (e2.type == "out") {
        moveLink2(a,b)
      } else {
        moveLink2(a,b1)
      }
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "termin":
      // Terminator transition for T-FOX, T-D
      // Remove the node and terminator
      moveLink2(c,d)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "termin2":
      // Terminator transition for T-FO
      // Make another terminator
      na = addNodeAndEdges("T",n1.x,n1.y);
      nb = addNodeAndEdges("T",n2.x,n2.y);
      
      moveLink1(c,nb[1],2)
      moveLink1(d,na[1],2)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "terminfrin":
      // Terminator transition for FRIN-FO
      // Make another terminator
      na = addNodeAndEdges("FRIN",n1.x,n1.y);
      nb = addNodeAndEdges("FRIN",n2.x,n2.y);
      
      moveLink1(c,nb[1],2)
      moveLink1(d,na[1],2)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "termsplit":
      // Terminator transition for L
      // Terminate left and leave out alone
      moveLink1(a,e1.id)
      
      removeNodeAndEdges(n2);
      break;

    default:
      console.error("Invalid transformation "+trans.action)
  }

  findAllTransforms();

// end function doTransform
}


