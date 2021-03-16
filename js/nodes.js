// nodes info
// this version: 15.03.2021, 

/*
In order to define mols (molecules) and mol patterns, we introduce mol node types and 
their nodeValence vectors.
*/



// mol nodes

/*
The mol nodes types are listed in the vector autofilter. For the theory, let NT be the 
finite  set of mol node types.
*/

var autoFilter = ["L","A","FI","D","FOE","FOX","FO","T","Arrow","GAMMA","DELTA","FRIN","FROUT"];

var balanceOfnodes =  [];
for (var ibal=0; ibal < autoFilter.length; ibal++) {
  balanceOfnodes.push(0);
}

/*
nodeValence associates to any mol node type a valence vector, with elements 0 or 1, whose length is the valence of the mol node. 

Mathematically, given the set NT of mol node types, the nodeValence is a function which 
associates to a mol node type "t" the word w = nodeValence(t). Here the word w is made of 
letters "0" and "1". The valence of the mol node type is the length of the word w. 

In the following definition of nodeValence we see some mol node types with comments. These mol 
node types can be decorated with permutations of 3 elements, or with elements of the anharmonic 
group. These decorations are a bridge from the present work to emergent algebras (see for 
example https://arxiv.org/abs/1807.02058) which are "commutative" in the sense that they satisfy 
"the shuffle trick". 

Here we are going to use this correspondence only heuristically, for example to choose the form 
of the rewrites "DIST", which increase the number of nodes. 
(See more at: 
- anharmonic lambda calculus https://mbuliga.github.io/kali24.html
- the tool to choose DIST rewrites https://mbuliga.github.io/rhs.html
- the commented js script https://mbuliga.github.io/rhs.js
but mind that this is work in progress.)

*/

/*
Only the node type arity will matter. Arity is nodeValence[node].length.
*/
var nodeValence = {
  "L":  [0,1,1], // (12) , 1-z 
  "A":  [0,0,1], // (231), (z-1)/z
  "FI": [0,0,1], // (312), 1/(1-z)
  "D": [0,0,1],  // ()   , z
  "FOE":[0,1,1], // (23) , 1/z 
  "FOX": [0,1,1], // (13) , z/(z-1)
  "FO": [0,1,1], //
  "T":  [0],
  "FRIN":[1],
  "FROUT":[0],
  "Arrow":[0,1],
// added interaction combinators
  "GAMMA":[0,0,0],
  "DELTA":[0,0,0],
}

/*
Now we can define mols.

Given a nonempty, finite set of edge tags E, a mol node whose ports are E-decorated is a vector 
(t, &eta;)
where:
- t is a mol node type, called the type of the mol node
- &eta; is a word over the alphabet E, such that:
  -- any letter from E appears at most twice,
  -- the length of &eta; equals the valence of t.

For a mol node we shall use a notation like 

L a b c

where "L" is a mol node type and "abc" is the word &eta; with letters from an alphabet E 
which contains a, b, c. You can see that the mol node type L has nodeValence vector [0,1,1], whose length is 3, equal to the length of the word abc. 

A mol pattern (which is E-decorated) is a vector of mol nodes, such that any letter from E 
appears at most twice over all mol nodes. 

Any letter which appears exactly once in a mol pattern P, is called a free edge. The set of free edges of the mol pattern P is denoted by Free(P). 

A mol, or molecule (which is E-decorated), is a mol pattern without free edges. 

For mol patterns, in particular for mols, we use a notation like 

L a b c
A c d e

which is amenable to a record with a line separator (here we use newline) which separates the record into lines. Each line is a mol node, itself a record with a field separator (here we use 
space, therefore we can't admit space or newline in the alphabet E). 

Such records are available in iceMol.js, in the form of the function molLibrary(). In those records the line separator is "^". 

Note that any mol pattern can be turned into a mol by adding some new mol nodes "FRIN" (i.e. "free in") and "FROUT" (i.e. "free out"). 



*/


// used in myGraph function


/*
A mol pattern, or a mol in particular, can be turned into a graph (here a d3 graph). In order to understand 
the conversion (done by functions in ioprep.js), we have to understand the relation between mol patterns and 
graphs. 

A graph is pair (G,E) where G is a finite nonempty set of nodes and E is a set of edges. Each edge is a set of two nodes (therefore the nodes have to be different). We say that an edge links the two nodes. There are no edges which connect a node with itself.

An oriented graph is a different mathematical object. It is a pair of functions (source, target) defined on a set E of edges, with values in a set G of nodes. An oriented graph admits edges with the source and target  being the same node. If an oriented graph does not have such edges, then it can be turned into a graph (as  defined previously) by associating to each edge e the set formed by the nodes source(e) and target(e). 

d3 graphs are oriented graphs. See more about d3 graphs in myD3Graph.js. 

However, we use d3 graphs as usual graphs. This is done in the follwoing way. 

First we introduce a set GT of graph node types. Further we exploit the fact that here we use mol node types with valence at most 3 (but the extension to any valence should be obvious). 

If NT is the set of mol node types, then GT is obtained from NT by adding 3 new types: 
- "in", "middle", "out".

We also have a predicate isCenter, which is true for any graph node type which is not "in", "middle" or "out". We shall say that a graph node is a center if it has a graph node type for which isCenter is true. 

A node which is not a center is called a port node.

GT is kept in the vector graphNodes.
*/

var graphNodes = ["in","out","middle","L","A","FI","D","FOE","FOX","FO","T","FRIN","FROUT","Arrow","GAMMA","DELTA"];

/*
Because we want to represent graphically the nodes, we associate colors to each graph node type. Remark that we don't use a bijection from the graph node types to the colors.

Each node of the graph (which are goind to define from a mol pattern) is graphically represented by a colored circle. The radius of the circle is a function of the predicate isCenter, that is center nodes have a radius and the port nodes have a different radius.
*/

var graphNodesColors = [yellowCol,blueCol,middleCol,redCol,greenCol,violetCol,blueCol,yellowCol,orangeCol,orange2Col,"#345",yellowCol,blueCol,whiteCol,"#ff9933","#0099ff"]


// used in addNodeAndEdges function

/*
To each mol node we associate a graph. The association is the following. 

There is a center graph according to the mol node type. There are port nodes, one for each letter of the mol node word. Here we exploit the fact that we use mol nodes of valence at most 3. 

The function which associates a vector of graph node types (among "in", "out" or "middle") to the valence of a mol node is  nodePortTypes.
*/

var nodePortTypes = [["in"],["in","out"],["in","middle","out"]];

/*
So the first port node is always "in", the last one (for valence at least 2) is always "out", the remaining port is "middle".

The graph associated to a mol node is formed by the center node and the port nodes, with edges from the center nodes to the port nodes. 
Specifically, we draw a center graph node as an "o" and a port node as a dash "|" with a number (starting from 1). 

Then a mol node of valence 1, of mol node type "t" and edge "a" 

t a

becomes a graph 

           1
     t  o--|-- a
          "in"

A mol node of valence 2, of mol node type "t" and edges "ab"

t a b

becomes a graph 


          1     2
       a --|--o--|-- b
        "in" t  "out"

A mol node of valence 3, of mol type "t" and edges "abc"

t a b c

becomes a graph



                  b     
               2_/ "middle"
                /
         1     /
    a  --|----o   t
        "in"   \
                \_3 "out"
                 \
                  c  




To the mol pattern we associate the graph formed by (the graphs of) all mol nodes, with edges connecting port nodes which have the same edge tag. The definition of a mol pattern assures us that this is possible, because each edge tag cannot occur more than twice. 

Let us come back to the d3 graphs, which are oriented. The orientation (i.e. which node is the source and which one is the target) wil be neglected. This is possible because the graphs which we obtain do not have edges which connect a node with itself. Indeed, even if an edge tag appears twice in the same mol node, the corresponding edge connects different node ports. 

See the functions: 
- getLinked, which gives the nodes connected, as sources or targets, to the given node
- findLinkedHalfEdge, which returns the unique other port node which is linked to a port node (actually the 
first found other port node)
- findLinkedCenter, which returns the only center node linked (or identical with) the given node
- findLinkedOfType, which returns the only node of given type, linked to the given node. 


*/


