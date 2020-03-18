// d3 force graphs related, i.e. visualization + physics
// last updated: 16.03.2020


/*
Acknowledgement: in my initial treatment 
https://github.com/chorasimilarity/chemlambda-gui/tree/gh-pages/dynamic 
the rewrites were done using awk programs (because awk has associative arrays which eliminate
the need to use global counters or namings). Then the list of rewrites was embedded into a d3.js 
script. This could be then visualized in a browser. 

The advantage was speed, independence on the graphical part and a more flexible program (for example 
concerning algorithms of rewrites). It was not good though that the output of the awk scripts was 
sometimes punishing for the browser. I used as intermediary the collection of animations 
https://chemlambda.github.io/collection.html 
and the outputs of experiments with the awk programs are collected in 
https://figshare.com/articles/The_Chemlambda_collection_of_simulations/4747390

However, I needed a more easy to use tool. This was provided by the contribution of ishanpm with his chemlambda-editor 
https://github.com/ishanpm/chemlambda-editor 
who took the effort to rewrite the reduction and graphical representation in a js-only way. 

Starting from his editor, I further rewritten his js scripts according to my needs, and added more of 
them. His contribution which allowed to work in js only is thanked! 

I also thank ishanpm because his initial scripts made me realize I can embedd with very little effort 
interaction combinators rewrites.
*/



/*
A d3 graph is an oriented, decorated graph.
*/

function myGraph(selector) {

/*
The vector of nodes is nodes. Each node is an object 
which has an id, type, screen coordinates x, y, and velocities vx, vy, a links vector and an age. 
*/

// Adds a node. age is from a global variable
  this.addNode = function (id, type, x, y) {
    nodes.push({"id": id, "type": type, x: x, y: y, vx:0, vy:0, links:[], "age":age});
    return nodes[nodes.length-1];
  };

// removes nodes based on id
  this.removeNode = function (id) {
    var n = findNode(id);
    while (n.links.length > 0) {
      removeLinkIndex(links.indexOf(n.links[0]));
    }
    nodes.splice(findNodeIndex(id), 1);
  };


// removes links based in index
  var removeLinkIndex = function(i) {
    var slinks = links[i].source.links;
    slinks.splice(slinks.indexOf(links[i]), 1);
    var tlinks = links[i].target.links;
    tlinks.splice(tlinks.indexOf(links[i]), 1);
    links.splice(i, 1);
  }

// removes link based on source and target
  this.removeLink = function (source, target) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].source.id == source && links[i].target.id == target) {
        removeLinkIndex(i);
        break;
      }
    }
  };


// removes all links
  this.removeAllLinks = function () {
    links.splice(0, links.length);
    update();
  };

// removes all nodes and all affected links
  this.removeAllNodes = function () {
    nodes.splice(0, nodes.length);
    links.splice(0, links.length);
    newNodeIndex = 0;
    update();
  };

/*
Each link has a source and a target. It also has a value (to be used for graphical purposes) and an age 
(from a global variable).
*/
  this.addLink = function (source, target, value) {
    var nsource = findNode(source);
    var ntarget = findNode(target);
    var newLink = {"source": nsource, "target": ntarget, "value": value, "age":age};
    nsource.links.push(newLink);
    ntarget.links.push(newLink);
    links.push(newLink);
  };


// finds node based on id
  this.findNode = function (id) {
            for (var i in nodes) {
                if (nodes[i]["id"] === id) return nodes[i];
            }
            ;
        };

// finds the age of a link between nodes with id id1 and id2
  this.findLinkAge = function (id1,id2) {
          for (var i in links) {
            if ((links[i].source == id1 && links[i].target == id2) || (links[i].source == id2 && links[i].target == id1) ) return links[i].age;
          }
        };

// finds the node index of a node with id 
  var findNodeIndex = function (id) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        return i;
      }
    }

  };


// finds linked nodes
  this.getLinked = function (node) {
    return node.links.map(function(e) {
      return (e.source === node ? e.target : e.source);
    });
  }
  

// graphical use
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
  .domain(graphNodes)
  .range(graphNodesColors);


  var svg = d3.select(selector)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "svg")
    .attr("pointer-events", "all")
    .attr("viewBox", "0 0 " + w + " " + h)
    .attr("preserveAspectRatio", "xMinYMin meet")  
    .on("click",backClick)


  
  var vis = svg.append('svg:g');

// defines a force simulation
  var force = d3.forceSimulation();

  this.nodes = force.nodes()
  this.links = [];

  d3.select("input[id='gravRange']")
    .on("input", inputted);

// triggers the search for rewrite patterns
  this.update = function () {
    // Update transform list
    findAllTransforms();
    
    // Update graph
    var link = vis.selectAll("line")
    .data(links, function (d) {
      return d.source.id + "-" + d.target.id;
    });

// adds a link representation as a line, the value is used for stroke width
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

// adds a node representation as a circle
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

    node.exit().remove();
    
    node = node.merge(nodeEnter)
      .on("click",nodeClick)
      .on("mouseenter",nodeHover)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

// mouse drag behaviour
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


// takes the value of gravity from the gravity slider
    function gravForce() {
      var gravi = (document.getElementById("gravRange").value) / 1000;
      return gravi;
    }
    
// keeps node objects on top of edges
    $(".nodeStrokeClass").each(function( index ) {
      var gnode = this.parentNode;
      gnode.parentNode.appendChild(gnode);
    });


// zoom behaviour
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

// end function update()
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



function setMode(newMode, newType) {
  mode = newMode;
  addType = newType;
  selection = null;
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


// predicate isCenter, see in nodes.js how a graph is obtained from a mol pattern
function isCenter(node) {
  return !(node.type == "in" || node.type == "out" || node.type == "middle");
}



// removes a center node and its ports and any affected links
function removeNodeAndEdges(center) {
  var linked2 = getLinked(center);
  for (var i=0; i<linked2.length; i++) {
    removeNode(linked2[i].id);
  }
  removeNode(center.id);
}

// adds a center node and ports of a given type, see in nodes.js how a graph is obtained from a mol node
function addNodeAndEdges(type,x,y) {
  x = x || w/2;
  y = y || h/2;

  var i = newNodeIndex;
  
  var valence = nodeValence[type];

  if (!valence) throw new TypeError("Unknown type" +  type);

  var portTypes = nodePortTypes[valence.length-1];
  var portList = [i];
  
  for (k=0; k<valence.length; k++) {
    addNode(i+k+1, portTypes[k], x + (Math.random()*20), y + (Math.random()*20))
    findNode(i+k+1).dir = valence[k];
    portList.push(i+k+1);
  }
  
  addNode(i, type, x, y);
  
  for (k=0; k<valence.length; k++) {
    addLink(i, i+k+1, 2)
  }
  
  newNodeIndex += valence.length + 1;
  
  return portList;
}


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


//backclick behaviour
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

//node click behaviour
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

// node hover behaviour
function nodeHover(d,i) {
  var e = d3.event;
  exportMolToScreen();
  switch (mode) {
    case "transform":
      var trans = findTransform(d);
      if (trans) {
        doTransform(d, trans);
        update();
      }

      break;
  }
  exportMolToScreenAfter();
}




