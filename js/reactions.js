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

function doTransform(n1, trans) {
  function moveLink1(s1,d2i) {
    // Connect the other side of s1 to d2
    var s2 = findLinkedHalfEdge(s1);
    if (s2 != null) {
      removeLink(s1.id,s2.id);
      removeLink(s2.id,s1.id);
      addLink(s2.id,d2i,2);
    }
  }
  function moveLink2(s1,d1) {
    // Connect the other side of two half-edges to each other
    var s2 = findLinkedHalfEdge(s1);
    var d2 = findLinkedHalfEdge(d1);
    if (s2 != null) {
      removeLink(s1.id,s2.id);
      removeLink(s2.id,s1.id);
    }
    if (d2 != null) {
      removeLink(d1.id,d2.id);
      removeLink(d2.id,d1.id);
    }
    if (s2 != null && d2 != null && s2 != d1)
      addLink(s2.id,d2.id,2);
  }
  
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

