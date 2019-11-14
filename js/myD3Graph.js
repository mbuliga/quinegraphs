// d3 force graphs related, i.e. visualization + physics


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
  .domain(graphNodes)
  .range(graphNodesColors);


  var svg = d3.select(selector)
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "svg")
    .attr("pointer-events", "all")
    .attr("viewBox", "0 0 " + w + " " + h)
    .attr("preserveAspectRatio", "xMinYMin meet")  //mod
    .on("click",backClick)


  
  var vis = svg.append('svg:g');

  var force = d3.forceSimulation();

  this.nodes = force.nodes()
  this.links = [];

  d3.select("input[id='gravRange']")
    .on("input", inputted);

//  d3.select("input[id='rewritesRange']")
//    .on("input", inputted);

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

function isCenter(node) {
  return !(node.type == "in" || node.type == "out" || node.type == "middle");
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




