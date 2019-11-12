// nodes info

// nodes
var autoFilter = ["D","L","A","FI","FOX","FOE","FO","T","Arrow","GAMMA","DELTA"];

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

// used in myGraph function
var graphNodes = ["in","out","middle","L","A","FI","D","FOE","FOX","FO","T","FRIN","FROUT","Arrow","GAMMA","DELTA"];
var graphNodesColors = [yellowCol,blueCol,middleCol,redCol,greenCol,violetCol,blueCol,yellowCol,orangeCol,orange2Col,"#345",yellowCol,blueCol,whiteCol,"#ff9933","#0099ff"]


// used in addNodeAndEdges function
var nodePortTypes = [["in"],["in","out"],["in","middle","out"]];
