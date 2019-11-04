//chemlambda + IC version of the kali system, or anharmonic lambda, grown from: 
// https://github.com/chorasimilarity/chemlambda-gui/blob/gh-pages/dynamic/README.md
// https://arxiv.org/abs/1807.02058
//
// this program is forked and modified from https://mbuliga.github.io/kali-try.js on 24.10.2019, which is 
// a modification of the js version https://github.com/ishanpm/chemlambda-editor of my chemlambda v2, see the issue https://github.com/chorasimilarity/chemlambda-gui/issues/9 
// author: Marius Buliga
// last modified: 04.11.2019
// 

// set up the D3 visualisation
var w = 500,
    h = 500;

// force parameters

var chargeForceStrength = -8;
var gravForceStrength = 0.12;

var forceStrength = 2;
var forceAlpha = 0.1;
var forceAlphaDecay = 0;
var forceVelocityDecay = 0.1;

// colors 

var redCol = "#b80000";
var orangeCol = "#FF6C03";
var orange2Col = "#FFA500";
var yellowCol = "#FFCE54";
var greenCol = "#9fc952";
var middleCol = "#4A89DC";
var blueCol = "#00F";
var violetCol = "#D503FF";

var whiteCol = "#fff";

//priority of rewrites, for the moment only eta
var etaPriority = 0;

var graph;
var mode = "transform";
var addType = 0;
var selection = null;
var speed = 0;
var startVar = 0;
var newNodeIndex = 0;
var autoFilter = ["D","L","A","FI","FOX","FOE","FO","T","Arrow","GAMMA","DELTA"];
//var centerList = []; // List of 'center' nodes (not half-edges)
var transformCache = []; // Nodes ready for transformation

var nodeValence = {
  "L":  [0,1,1], // (12) , 1-z 
  "FOX": [0,1,1], // (13) , z/(z-1)
  "FOE":[0,1,1], // (23) , 1/z 
  "D": [0,0,1],  // ()   , z
  "A":  [0,0,1], // (231), (z-1)/z
  "FI": [0,0,1], // (312), 1/(1-z)
  "FO": [0,1,1], //
  "T":  [0],
  "FRIN":[1],
  "FROUT":[0],
  "Arrow":[0,1],
// added interaction combinators
  "GAMMA":[0,0,0],
  "DELTA":[0,0,0],
}

var transformListOrig = [
  {left:"L",right:"A",action:"beta", named:"L-A"},
  {left:"FI",right:"FOE",action:"beta", named:"FI-FOE"},
// DIST rewrites
  {left:"L",right:"FOE",action:"DIST7", named:"L-FOE", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FOE-L"]},
  {left:"L",right:"FO",action:"DIST7", named:"L-FO", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FO-L"]}, // 
//
  {left:"A",right:"FOE",action:"DIST1", named:"A-FOE", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"]},
  {left:"A",right:"FO",action:"DIST1", named:"A-FO", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"]}, // 
//
  {left:"FI",right:"FO",action:"DIST1", named:"FI-FO", t1:"FO",t2:"FO",t3:"FI",t4:"FI",blocks:["FO-FI"]}, // 
//
  {left:"FO",right:"FOE",action:"DIST7", named:"FO-FOE", t1:"FOE",t2:"FI",t3:"FO",t4:"FO",blocks:["FOE-FO"]}, //       
// Pruning rewrites
  {left:"FO",right:"T",action:"term1", named:"FO-T"},  // 
  {left:"T",right:"FO",action:"termin2", named:"T-FO"}, // 
  {left:"T",right:"FOE",action:"termin2", named:"T-FOE"}, //  
  {left:"FRIN",right:"FO",action:"terminfrin", named:"FRIN-FO"}, //    
  {left:"FRIN",right:"FOE",action:"terminfrin", named:"FRIN-FOE"}, // 
  {left:"FRIN",right:"FI",action:"termFI", named:"FRIN-FI"}, // 
//
  {left:"L",right:"T",action:"termL", named:"L-T"},
  {left:"A",right:"T",action:"term", named:"A-T"},
  {left:"FI",right:"T",action:"term", named:"FI-T"},
  {left:"FOE",right:"T",action:"term1", named:"FOE-T"}, // 
// only T rewrites
  {left:"T",right:"T",action:"remove4", named:"T-T"},
  {left:"FRIN",right:"T",action:"remove4", named:"FRIN-T"},
  {left:"T",right:"FROUT",action:"remove4", named:"T-FROUT"},
  {left:"null",right:"T",action:"remove1", named:"?-T"},
  {left:"null",right:"T",action:"remove1"},
// COMB
  {left:"any",right:"Arrow",action:"arrow", named:"COMB"},
// IC rewrites
  {left:"GAMMA",right:"GAMMA",action:"GAMMA-GAMMA", named:"GAMMA-GAMMA"},
  {left:"DELTA",right:"DELTA",action:"DELTA-DELTA", named:"DELTA-DELTA"},
  {left:"GAMMA",right:"DELTA",action:"GAMMA-DELTA", named:"GAMMA-DELTA", t1:"DELTA",t2:"DELTA",t3:"GAMMA",t4:"GAMMA"},
  {left:"GAMMA",right:"T",action:"term3", named:"GAMMA-T"},
  {left:"DELTA",right:"T",action:"term3", named:"DELTA-T"},
]

transformList = transformListOrig;

function myGraph(selector) {

  // Add and remove elements on the graph object
  this.addNode = function (id, type, x, y) {
    nodes.push({"id": id, "type": type, x: x, y: y, vx:0, vy:0, links:[]});
    return nodes[nodes.length-1];
  };

  this.removeNode = function (id) {
    var n = findNode(id);
    while (n.links.length > 0) {
      removeLinkIndex(links.indexOf(n.links[0]));
    }
    nodes.splice(findNodeIndex(id), 1);
  };

  var removeLinkIndex = function(i) {
    var slinks = links[i].source.links;
    slinks.splice(slinks.indexOf(links[i]), 1);
    var tlinks = links[i].target.links;
    tlinks.splice(tlinks.indexOf(links[i]), 1);
    links.splice(i, 1);
  }

  this.removeLink = function (source, target) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].source.id == source && links[i].target.id == target) {
        removeLinkIndex(i);
        break;
      }
    }
  };

  this.removeAllLinks = function () {
    links.splice(0, links.length);
    update();
  };

  this.removeAllNodes = function () {
    nodes.splice(0, nodes.length);
    links.splice(0, links.length);
    newNodeIndex = 0;
    update();
  };

  this.addLink = function (source, target, value) {
    var nsource = findNode(source);
    var ntarget = findNode(target);
    var newLink = {"source": nsource, "target": ntarget, "value": value};
    nsource.links.push(newLink);
    ntarget.links.push(newLink);
    links.push(newLink);
  };

  this.findNode = function (id) {
            for (var i in nodes) {
                if (nodes[i]["id"] === id) return nodes[i];
            }
            ;
        };

  var findNodeIndex = function (id) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        return i;
      }
    }

  };

  this.getLinked = function (node) {
    return node.links.map(function(e) {
      return (e.source === node ? e.target : e.source);
    });
  }
  
  this.screenToWorldPoint = function(x,y) {
    var svgEl = svg.node();
    var pt = svgEl.createSVGPoint();
        pt.x = x;
        pt.y = y;
        pt =  pt.matrixTransform(vis.node().getCTM().inverse());
    return pt;
  }

  // set up the D3 visualisation in the specified element

  var color = d3.scaleOrdinal()
  .domain(["in","out","middle","L","A","FI","D","FOE","FOX","FO","T","FRIN","FROUT","Arrow","GAMMA","DELTA"])
  .range([yellowCol,blueCol,middleCol,redCol,greenCol,violetCol,blueCol,yellowCol,orangeCol,orange2Col,"#345",yellowCol,blueCol,whiteCol,"#ff9933","#0099ff"]);

  var svg = d3.select(selector)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "svg")
    .attr("pointer-events", "all")
    .attr("viewBox", "0 0 " + w + " " + h)
    .attr("perserveAspectRatio", "xMinYMid")
    .on("click",backClick)
  
  var vis = svg.append('svg:g');

  var force = d3.forceSimulation();

  this.nodes = force.nodes()
  this.links = [];

  d3.select("input[type=range]")
    .on("input", inputted);

  this.update = function () {
    // Update transform list
    findAllTransforms();
    
    // Update graph
    var link = vis.selectAll("line")
    .data(links, function (d) {
      return d.source.id + "-" + d.target.id;
    });

    var linkEnter = link.enter()
      .append("line")
      .style("stroke-opacity",0).style("fill-opacity",0)
      .attr("id", function (d) {
      return d.source.id + "-" + d.target.id;
    })
      .attr("stroke-width", function (d) {
      return d.value / 10;
    })
      .transition()
//      .delay(0.2)
      .duration(2)
      .style("stroke-opacity",1).style("fill-opacity",1)
      .attr("class", "link")
    //link.append("title")
    //        .text(function (d) {
    //            return d.value;
    //        });
    link.exit().remove();

    link = link.merge(linkEnter)

    var node = vis.selectAll("g.node")
    .data(nodes, function (d) {
      return d.id;
    });

    var nodeEnter = node.enter().append("g")
    .attr("class", "node")

    nodeEnter.append("svg:circle")
      .style("stroke-opacity",0).style("fill-opacity",0)
      .transition()
//      .delay(0.2)
      .duration(1)
      .style("stroke-opacity",1).style("fill-opacity",1)
      .attr("r", function(d) {
      if (d.type == "in" || d.type == "out" || d.type == "middle") {
        return 4;
      } else {
        return 8;
      }
    })
      .attr("id", function (d) {
      return "Node;" + d.id;
    })
      .attr("class", "nodeStrokeClass")
      .attr("fill", function(d) { return color(d.type); })
    //nodeEnter.append("svg:text")
    //        .attr("class", "textClass")
    //        .attr("x", 14)
    //        .attr("y", ".31em")
    //        .text(function (d) {
    //            return d.type;
    //        });

    node.exit().remove();
    
    node = node.merge(nodeEnter)
      .on("click",nodeClick)
      .on("mouseenter",nodeHover)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    function dragstarted(d) {
      if (!d3.event.active) force.alphaTarget(0.1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
        
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
        
    function dragended(d) {
      if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function gravForce() {
      var gravi = (document.getElementById("gravRange").value) / 1000;
      return gravi;
    }
    
    // Keep node objects on top of edges
    $(".nodeStrokeClass").each(function( index ) {
      var gnode = this.parentNode;
      gnode.parentNode.appendChild(gnode);
    });

    d3.zoom().on("zoom", function zoom_actions(){
      vis.attr("transform", d3.event.transform)
    })(svg)
    // Restart the force layout.
    
    force
      .alpha(forceAlpha)
      .alphaDecay(forceAlphaDecay)
      .velocityDecay(forceVelocityDecay)
      .force("charge_force", d3.forceManyBody().strength(chargeForceStrength))
      .force("center_x", d3.forceX(w / 2).strength(gravForce))
      .force("center_y", d3.forceY(h / 2).strength(gravForce))
      .force("links", d3.forceLink(links).id(function (d) { return d.id; }).distance(function(d) {
        if (d.value == 1) {
          return 2;
        } else {
          return 1;
        }
      }).strength(forceStrength))
      .on("tick", function () {

      node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

      link.attr("x1", function (d) {
        return d.source.x;
      })
        .attr("y1", function (d) {
        return d.source.y;
      })
        .attr("x2", function (d) {
        return d.target.x;
      })
        .attr("y2", function (d) {
        return d.target.y;
      });
    })
    .restart();

// end definition update()
  };

function inputted() {
  force.alphaTarget(1);
  force.restart();
  update();
}

// Make it all go
  update();

// end function myGraph
}

graph = myGraph("#svgdiv")

function setMode(newMode, newType) {
  mode = newMode;
  addType = newType;
  selection = null;
}

function setSpeed(newSpeed) {
  speed = newSpeed;
}

function setStart(varStart) {
  startVar = varStart;
}

function findLinkedOfType(node, type) {
  var linked = getLinked(node);
  for (var i=0; i<linked.length; i++) {
    var o = linked[i];
    if (o.type == type) {
      return o;
    }
  }
}

function findLinkedHalfEdge(node) {
  var linked = getLinked(node);
  for (var i=0; i<linked.length; i++) {
    var o = linked[i];
    if (!isCenter(o)) {
      return o;
    }
  }
}

function findLinkedCenter(node) {
  if (isCenter(node)) {
    return node;
  }
  var linked = getLinked(node);
  for (var i=0; i<linked.length; i++) {
    var o = linked[i];
    if (isCenter(o)) {
      return o;
    }
  }
}

function isCenter(node) {
  return !(node.type == "in" || node.type == "out" || node.type == "middle");
}

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
        case "beta": case "DIST0": case "DIST1": case "DIST2":  case "DIST3": case "DIST4": case "DIST5": case "DIST6": case "DIST7": case "termsplit": case "term": case "termL": 
          if (e2type == "out") return trans;
        break;

        case "GAMMA-GAMMA": case "DELTA-DELTA": case "GAMMA-DELTA":  
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
    case "DELTA-DELTA":
      // DELTA-DELTA transition:
      // Link out n1 to out n2 and middle n1 to middle n2
      moveLink2(d,b1);
      moveLink2(b,c);
      
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

function removeNodeAndEdges(center) {
  var linked2 = getLinked(center);
  for (var i=0; i<linked2.length; i++) {
    removeNode(linked2[i].id);
  }
  removeNode(center.id);
}

function addNodeAndEdges(type,x,y) {
  x = x || w/2;
  y = y || h/2;

  var i = newNodeIndex;
  
  var valence = nodeValence[type];

  if (!valence) throw new TypeError("Unknown type" +  type);

  var portTypes = [["in"],["in","out"],["in","middle","out"]][valence.length-1];
  var portList = [i];
  
  for (k=0; k<valence.length; k++) {
    addNode(i+k+1, portTypes[k], x + (Math.random()*20), y + (Math.random()*20))
    findNode(i+k+1).dir = valence[k];
    portList.push(i+k+1);
  }
  
  addNode(i, type, x, y);
  
  for (k=0; k<valence.length; k++) {
    addLink(i, i+k+1)
  }
  
  newNodeIndex += valence.length + 1;
  
  return portList;
}

function backClick(d,i) {
  var e = d3.event;
  var pt = screenToWorldPoint(e.offsetX,e.offsetY)
      
  switch (mode) {
    case "add":
      addNodeAndEdges(addType,pt.x,pt.y);
      update();
      break;
    case "delete":
      break;
    case "transform":
      break;
    case "link":
      selection = null;
      break;
  }
}

function nodeClick(d,i) {
  var e = d3.event;
  switch (mode) {
    case "add":
      break;
    case "delete":
      var center = findLinkedCenter(d);

      removeNodeAndEdges(center);
      update();

      break;
    case "transform":
      var trans = findTransform(d);
      if (trans) {
        doTransform(d, trans);
        update();
      }

      break;
    case "link":
      var linkCount = getLinked(d).length;

      if (isCenter(d)) {
        return;
      }

      if (linkCount == 1) {
        if (selection != null && selection.dir != d.dir) {
          addLink(selection.id, d.id, 2);
          update();
          selection = null;
        } else {
          selection = d;
        }
      } else {
        var other = findLinkedHalfEdge(d);
        removeLink(d.id, other.id);
        removeLink(other.id, d.id);
        selection = null;
      }
      update();
      break;
  }

  e.stopPropagation();
}

function nodeHover(d,i) {
  var e = d3.event;
  switch (mode) {
    case "transform":
      var trans = findTransform(d);
      if (trans) {
        doTransform(d, trans);
        update();
      }

      break;
  }
}

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
      if (edges['e'+line[k]]) addLink(edges['e'+line[k]], newNode[k]);
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
      if (edges['e'+line[k]]) addLink(edges['e'+line[k]], newNode[k]);
      else edges['e'+line[k]] = newNode[k];
    }
  }
  
  update();
}

function exportMol() {
  var edgeCount = 0;
  var result = "";
  var edges = {};
  
  for (var i=0; i<nodes.length; i++) {
    if (isCenter(nodes[i])) {
      var linked = getLinked(nodes[i]);
      var line = nodes[i].id + " : " + nodes[i].type;

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
    }
  }
  
  return result;
}

function voidMolToScreenAfter() {
document.getElementById("molexport").innerHTML = ""; 
document.getElementById("molexportafter").innerHTML = ""; 
document.getElementById("puttransformcachealt").innerHTML = "";
document.getElementById("chosentransform").innerHTML = "";
document.getElementById("puttransformcachealtafter").innerHTML = "";
}

function doClearImportFromLib(molname) {
  removeAllNodes();
  var molL = molLibrary(molname);
document.getElementById("molyoulookat").innerHTML = molL; 
  importMolFromLib(molL);
}

function reloadCode() {
  removeAllNodes();
  setSpeed(0);
  voidMolToScreenAfter(); 
  var molL = document.getElementById("molyoulookat").innerHTML;
  importMolFromLib(molL);
}

function molSelect() {
  setSpeed(0);
  var molN = document.getElementById("listofmols").value;
  doClearImportFromLib(molN);
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

//

function showImportError(e) {
  alert(e);
}

function loop(dt) {
  var anyMoves = false;

  var maxNumberOfNodesStr = document.getElementById("maxnodenumber").innerHTML;
  var maxNumberOfNodes = maxNumberOfNodesStr - 2;

  if (nodes.length > 4*maxNumberOfNodes) { setSpeed(0);}

  if (speed == 1 && transformCache.length > 0) {

    var putTransformCacheAlt = "";
    for (var i=0; i<transformCache.length; i++) {      
      putTransformCacheAlt += transformCache[i].node.id + ": " + transformCache[i].trans.named;
      putTransformCacheAlt += "<br>";
    }

  exportMolToScreen();

  document.getElementById("puttransformcachealt").innerHTML = putTransformCacheAlt;

    var choice = Math.floor(Math.random() * transformCache.length);
    
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


