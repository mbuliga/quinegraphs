/* 
comments of the mol library. For more mol files see my original library https://github.com/chorasimilarity/chemlambda-gui/tree/gh-pages/dynamic/mol
*/




function molComments(molName) {

switch (molName) {
  case "lambdanote":
  var mol = "In the textarea is PRED ((POW 3) 4)<br><br>This is a parser from lambda calculus to chemlambda<br><br>It is rather sensible for the moment...<br><br>It surely works if you put ALL the parantheses.<br><br>Examples:<br><br>(\\x.x x) (\\x.x x) is OK! <br>(\\x.xx) (\\x.xx) is NOT OK, because it believes \"xx\" is a variable<br><br>(\\x.\\y.x) z throws an error<br><br> but (\\x.(\\y.x)) z works OK! <br><br>Part of the repository <a href=\"https://github.com/mbuliga/quinegraphs\">Quine graphs</a>.<br><br>Type terms in textarea, click buttons!<br><br>Hover with the mouse over nodes to trigger rewrites.<br><br>Click+drag the nodes to arrange the graph.<br><br>Click on the background and drag to translate the graph.<br><br> Mouse wheel to resize the graph.<br><br>Use gravity slider to expand or contract the graph.<br><br>";
  break;

  case "howto":
  var mol = "If you know how to use this page then select one of the graphs from the drop-down menu.<br><br>After you select a graph...<br><br>Click on \"step\" for one random rewrite.<br><br>Click on \"start\" to apply random rewrites as long as there is any possible rewrite left.<br><br>Click on \"stop\" to stop.<br><br>Click on \"reload\" to reload the same graph.<br><br>There is a manual use too:<br><br>Hover with the mouse over nodes to trigger rewrites.<br><br>Click+drag the nodes to arrange the graph.<br><br>Click on the background and drag to translate the graph.<br><br> Mouse wheel to resize the graph.<br><br>Use gravity slider to expand or contract the graph.<br><br>";
  break;

  case "SKK":
  var mol = "In lambda calculus, define the combinators S and K by: <br><br>  S = (\\x.(\\y.(\\z.((x z) (y z))))) <br><br> K =  (\\x.(\\y.x)) <br> <br> Then (S K) K reduces to <br><br> I = (\\x.x) <br><br> Here we see this reduction in <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>.";
  break;
  case "omegaSKI":
  var mol = "In lambda calculus, we can use the combinators: <br><br> S = (\\x.(\\y.(\\z.((x z) (y z))))) <br><br> K =  (\\x.(\\y.x))<br><br> to express the combinator &Omega; = (\\x.x x) (\\x.x x)  as the result of reduction of <br> (((S ((S K) K)) ((S K) K)) ((S ((S K) K)) ((S K) K))) <br><br> In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a> this works most of the times (remember that we use the random rewrites algorithm), but not always.<br><br> It seems that it works all the time if you move the rewrites weights slider to the &beta; extremity. This forces any rewrite  which reduces the number of nodes (like the original &beta;, but also FI-FOE and TERMINATION rewrites) to be made before any rewrite which enlarges the number of nodes (DIST rewrites), whenever there is a choice. ";
  break;
  case "rewrite-L-T":
  var mol = "A rewrite L-T";
  break;

  case "L-FO-FOE-conflict":
  var mol = "Conflict in <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>: there are two rewrites whose left patterns overlap: L-FO and FO-FOE";
  break;

  case "A-L-FO-FOE-conflict":
  var mol = "Conflict in <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>: the left patterns of the rewrites A-L and L-FO overlap. Moreover the left patterns of L-FO and FO-FOE overlap. Therefore there are more than one maximal  collections of non-conflicting matches in this case.";
  break;

  case "alexo_example":
  var mol = "The lambda term  (\\a.a a)(\\x.((\\b.b b)(\\y.y x)))  should reduce to the &Omega; combinator, but instead in <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a> it eventually produce a FOE node.<br><br> This is a problem which all (known?) purely local graph rewrite  systems applied to lambda calculus have. Here by \"purely local\" I mean by using only local graph rewrites, only the random rewrites algorithm and the transformation of a lambda term into a graph should also be local, in the sense that the graph of the term CD should consist on only a new node A (for application) with inputs connected to outputs of the graphs of C and D, and the graph of the term \\x.C, where x is a free variable of C, should be made of only a new node L (for lambda abstraction) connected to the output of the graph of C and to the edge corresponding to the variable x. <br><br> I saw this lambda term, with a similar behaviour, in <a href=\"https://arxiv.org/pdf/1701.04691.pdf\">[arXiv:1701.04691]</a>, section 4.<br><br> Contrary to other lambda terms, it seems that the rewduction works if you move the rewrites weights slider more to the DIST extremity. This forces any rewrite which enlarges the number of nodes (DIST rewrites) to be done before those which reduce the number of nodes (like the original &beta;, but also FI-FOE and TERMINATION rewrites), whenever there is a choice. ";
  break;



  case "ishan_example":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, a FO node is used to duplicate (the graph of) the lambda term \\x.((\\.yy)(xx)). It works sometimes and other times it does not. Reload the graph and reduce it again to see this. <br><br> As a test for chemlambda, suggested <a href=\"https://github.com/chorasimilarity/chemlambda-gui/issues/8#issuecomment-504575084\">here</a>. ";
  break;

  case "ishan_example_foe":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, a FOE node is used to duplicate (the graph of) the lambda term \\x.((\\.yy)(xx)). It works sometimes and other times it does not. Reload the graph and reduce it again to see this.<br><br> As a test for chemlambda, suggested <a href=\"https://github.com/chorasimilarity/chemlambda-gui/issues/8#issuecomment-504575084\">here</a>. ";
  break;

  case "ishan_example_2":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, a FO node is used to duplicate (the graph of) the lambda term \\x.(\\f.ff)(\\y.xy). It works sometimes and other times it does not. Reload the graph and reduce it again to see this. <br><br> As a test for chemlambda, suggested <a href=\"https://github.com/chorasimilarity/chemlambda-gui/issues/8#issuecomment-530665120\">here</a>. ";
  break;

  case "ishan_example_2_foe":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, a FO node is used to duplicate (the graph of) the lambda term \\x.(\\f.ff)(\\y.xy). It works sometimes and other times it does not. Reload the graph and reduce it again to see this. <br><br> As a test for chemlambda, suggested <a href=\"https://github.com/chorasimilarity/chemlambda-gui/issues/8#issuecomment-530665120\">here</a>. ";
  break;

  case "ishan_example_2_A":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, we use this reduction to see if there are any problems caused by the incomplete duplication of the term suggested <a href=\"https://github.com/chorasimilarity/chemlambda-gui/issues/8#issuecomment-530665120\">here</a>. Here we duplicate with a FO node the term M = \\x.(\\f.ff)(\\y.xy), then we apply the copies (outputs) to I = \\x.x. Reload the graph and reduce it several times to see what happens.";
  break;

  case "ishan_example_2_pair":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, we use this reduction to see if there are any problems caused by the incomplete duplication of the term suggested <a href=\"https://github.com/chorasimilarity/chemlambda-gui/issues/8#issuecomment-530665120\">here</a>. Here we duplicate with a FOE node the term M = \\x.(\\f.ff)(\\y.xy), then we plug the copies (outputs) a and b to the term<br><br> FIRST (PAIR a b)<br><br> Here FIRST and PAIR are the lambda terms<br><br> FIRST = \\p.(p (\\x.\\y.x)) <br><br> PAIR =  \\x.\\y.\\z. z x y<br><br> Reload the graph and reduce it several times to see if you get the term M reduced.";
  break;

  case "ishan_example_2_pair_fo":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, we use this reduction to see if there are any problems caused by the incomplete duplication of the term suggested <a href=\"https://github.com/chorasimilarity/chemlambda-gui/issues/8#issuecomment-530665120\">here</a>. Here we duplicate with a FO node the term M = \\x.(\\f.ff)(\\y.xy), then we plug the copies (outputs) a and b to the term<br><br> FIRST (PAIR a b)<br><br> Here FIRST and PAIR are the lambda terms<br><br> FIRST = \\p.(p (\\x.\\y.x)) <br><br> PAIR =  \\x.\\y.\\z. z x y<br><br> Reload the graph and reduce it several times to see if you get the term M reduced.";
  break;

  case "first_pair":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, we use this reduction to see if we can graphically reduce the term<br><br> FIRST (PAIR 5 0)<br><br> Here FIRST and PAIR are the lambda terms<br><br> FIRST = \\p.(p (\\x.\\y.x)) <br><br> PAIR =  \\x.\\y.\\z. z x y<br><br>The terms 5 and 0 are Church numbers. Reload the graph and reduce it several times to see if you get the term 5.";
  break;

  case "dodecahedron":
  var mol = "As a graph, a dodecahedron is a <a href=\"https://en.wikipedia.org/wiki/Generalized_Petersen_graph\">generalized Petersen graph</a>. In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>, this is used to construct a 4X multiplication of a dodecahedron graph. See also <a href=\"http://chorasimilarity.github.io/chemlambda-gui/dynamic/dodecahedron.html\">this demo</a> and, for the connections with the chemlambda quines, <a href=\"https://chorasimilarity.wordpress.com/2019/03/02/lambda-calculus-inspires-experiments-with-chemlambda/\">this chorasimilarity post</a>. [add details here]";
  break;



  case "y_comb_id":
  var mol = "The Y combinator<br><br> Y =  (\\g.((\\x.(g (x x))) (\\x.(g (x x)))))<br><br> applied to I = (\\x.x) gives the<br><br> &Omega; = (\\ x.x x) (\\ x.x x)<br><br> combinator in lambda calculus. Here we do this reduction in <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>. Reload the graph and reduce it several times to see what happens.";
  break;

  case "16_quine_A_L_FI_FO":
  var mol = "This is a remarkable chemlambda quine.<br><br> It is called the 16 bubble quine because it has...<br><br> 18 nodes when it becomes a quine, but it comes from this 16 nodes graph.<br><br> It is remarkable because the generated 18 nodes graph is not connected: <br><br> it is made by this 16 nodes graph plus a separated pair of nodes.<br><br> At each step (in the greedy algorithm of rewrites) the 16 quine expels a pair of nodes and in the same time the existing pair of nodes disappears via the L-A and then COMB rewrites.";
  break;

  case "20_quine":
  var mol = "This is a chemlambda quine obtained from the graph of PRED N, where PRED is the predecessor term<br><br>PRED = \\n.\\f.\\x.n (\\g.\\h.h (g f)) (\\u.x) (\\u.u) <br><br> and N is a not small Church number. During this reduction I noticed that there is a pattern of periodic graph reductions which seemed to propagate in the bigger graph.<br><br> The 20 quine is a chemlambda quine with 20 nodes which is obtained from that pattern. Similar to the 28_quine, but smaller.";
  break;

  case "A":
  var mol = "Application node";
  break;

  case "L":
  var mol = "Lambda abstraction node";
  break;

  case "28_quine":
  var mol = "This is a chemlambda quine obtained from the graph of PRED N, where PRED is the predecessor term<br><br>PRED = \\n.\\f.\\x.n (\\g.\\h.h (g f)) (\\u.x) (\\u.u) <br><br> and N is a not small Church number. During this reduction I noticed that there is a pattern of periodic graph reductions which seemed to propagate in the bigger graph.<br><br> The 20 quine is a chemlambda quine with 20 nodes which is obtained from that pattern. Similar to the 20_quine but bigger.";
  break;


  case "9_quine":
  var mol = "This is the smallest chemlambda quine, excepting graphs which have termination (T) nodes and rewrites.";
  break;

  case "10_quine_bubbles":
  var mol = "This remarkable chemlambda quine is the 10_quine. <br><br>It has two properties: it can die and it can reproduce.<br><br> Recall that we use the random rewrites algorithm. <br><br>Because chemlambda admits conflicting graph rewrites, it follows that the random evolution of a graph can lead to different outcomes. <br><br>The 10_quine can die, in the sense that it, eventually, reduces to nothing.<br><br> In rare occasions the 10_quine reproduces itself, resulting into two 10_quines. <br><br>Reload the graph and reduce it several times to see what happens.";
  break;

  case "20_20_hybrid":
  var mol = "This is a chemlambda quine obtained by the operation of hybridization from two 20_quines.  [add details here]";
  break;

  case "16_quine_A_L_FI_FO_duplicate":
  var mol = "By adding two nodes to the 16 bubble quine \"16_quine_A_L_FI_FO\", the obtained graph reduces to two copies of the 16 bubble quine.<br><br> This is possible because the 16 bubble quine is a non connected quine which during its evolution eliminates connected sub-graphs.<br><br> For the building and properties of this graph see the chemlambda demo  <a href=\"http://chorasimilarity.github.io/chemlambda-gui/dynamic/mother_daughter.html\">True life</a>. [add details here] [remake demo]";
  break;

  case "random_16_quine_A_L_FI_FO_duplicate":
  var mol = "Each time you click the \"new\" button you get a random permutation of the edges of the graph \"16_quine_A_L_FI_FO_duplicate\". <br><br> In case you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you! ";
  break;

  case "claudia_starmaker":
  var mol = "This graph is made by the hybridization operation applied to 5 copies of the 16 bubble quine \"16_quine_A_L_FI_FO\". <br><br>Because of the remarkable properties of this quine, it can be used to build new graphs, disconnected from the \"factory\" graph. [add details here]";
  break;


  case "ackermann_2_2":
  var mol = "In chemlambda, the graphical reduction of Ackermann(2,2) to the Church number 7.<br><br> The <a href=\"https://en.wikipedia.org/wiki/Ackermann_function\">Ackermann function</a> is recursive but not primitively recursive.<br><br> The graphical reduction  works every time.<br><br> This is therefore a good candidate for the task to make complex computations with chemistry. <br><br>That is why I use this reduction in the article <a href=\"http://chorasimilarity.github.io/chemlambda-gui/dynamic/molecular.html\">Molecular computers</a> (also <a href=\"https://arxiv.org/abs/1811.04960\">arXiv:1811.04960</a>) where such a molecular computer is defined as <br><br>\"one molecule which transforms, by random chemical reactions mediated by a collection of enzymes, into a predictable other molecule, such that the output molecule can be conceived as the result of a computation encoded in the initial molecule\".<br><br> See <a href=\"https://chorasimilarity.github.io/chemlambda-gui/dynamic/cfp.html\">slides</a>. ";
  break;



  case "ackermann_3_2":
  var mol = "In chemlambda, the graphical reduction of Ackermann(3,2) to the Church number 29. The reduction is much longer than the one for Ackermann(2,2).";
  break;



  case "times_only":
  var mol = "In chemlambda, 5 X 5 = 25, by using a custom graph, inspired from lambda calculus. [add details here]";
  break;

  case "times_only_short":
  var mol = "In chemlambda, 5 X 5 = 25, by using the lambda term<br><br> 5 X 5 = ((MULT 5) 5)<br><br> where MULT is a multiplication term<br><br> MULT = (\\m.(\\n.(\\f.(m (n f)))))<br><br>and 5 is a Church number<br><br>5 = (\\f.(\\x.(f(f (f (f (f x)))))))";
  break;

  case "times_only_long":
  var mol = "In chemlambda, 5 X 5 = 25, by using the lambda term<br><br> 5 X 5 = (((\\m.(\\n.((m (PLUSLONG n)) 0))) 5) 5) <br><br> where 5 and 0 are Church numbers<br><br>5 = (\\f.(\\x.(f(f (f (f (f x)))))))<br>0 = (\\f.(\\x.x)) <br><br> PLUSLONG = (\\m.(\\n.((m (\\n.(\\f.(\\x.(f ((n f) x)))))) n))) <br> =  (\\m.(\\n.((m SUCC) n)))<br><br> is the  addition lambda term (multiplication is repeated addition) and <br><br> SUCC =  (\\n.(\\f.(\\x.(f ((n f) x)))))<br><br> is the successor term (addition is repeated application of successor).  Reload the graph and reduce it several times to see what happens.<br><br> It seems that it works all the time if you move the rewrites weights slider to the &beta; extremity. This forces any rewrite  which reduces the number of nodes (like the original &beta;, but also FI-FOE and TERMINATION rewrites) to be made before any rewrite which enlarges the number of nodes (DIST rewrites), whenever there is a choice. ";
  break;



  case "pwheel_8":
  var mol = "A chemlambda quine which is obtained from  the iteration (using a Y combinator graph) of a permutation of 8 elements function [add details here]";
  break;

  case "omega":
  var mol = "In lambda calculus there is only one quine, the <br><br> &Omega; = (\\x.x x) (\\x.x x) <br><br> combinator.<br><br>It gives a <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a> quine too.";
  break;



case "random_egg_A_L_FI_FO":
  var mol = "Each time you click the \"new\" button you get a random chemlambda graph with 4 nodes, A, L, FI and FO. <br><br>There are 6! = 720 such graphs. Some of them generate chemlambda quines.<br><br> These are named \"spark_*\" where * is the permutation used to build the particular 4 nodes graph.<br><br> In case you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;


case "random_egg_A_L_FI_FOE":
  var mol = "Each time you click the \"new\" button you get a random chemlambda graph with 4 nodes, A, L, FI and FOE.<br><br> There are 6! = 720 such graphs. Some of them generate chemlambda quines.<br><br> These are named \"sparkFOE_*\" where * is the permutation used to build the particular 4 nodes graph. <br><br>In case you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "random_10_quine_bubbles":
  var mol = "Each time you click the \"new\" button you get a random chemlambda graph with 10 nodes, obtained by a permutation of the edges of the 10_nodes quine. <br><br>There are more than 9 billions such graphs.<br><br> Some of them generate chemlambda quines. These are named \"shuffle_*\" where * is the permutation used to build the particular 10 nodes graph.<br><br> In case you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;




  case "shuffle_10_A3E2974C16B85D0":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_A3E2974C16B85D0\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine.<br><br> Reload it in case it dies. <br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_0368BCDE2541A97":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_0368BCDE2541A97\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_04C92C86BE5A317":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_04C92C86BE5A317\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine.<br><br> Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;


  case "shuffle_10_8639A7BC024DE51":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_8639A7BC024DE51\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine.<br><br> Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_6AC0379E12D5B48":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_6AC0379E12D5B48\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_8C72046E53B9DA1":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_8C72046E53B9DA1\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_018C23A7B6E49D5":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_018C23A7B6E49D5\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_5681ECD297AB304":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_5681ECD297AB304\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_035B17C469E82AD":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_035B17C469E82AD\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_3D25C769B1E804A":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_3D25C769B1E804A\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine.<br><br> Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_D35C680B7AE2149":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_D35C680B7AE2149\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_2AC4D156E30789B":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_2AC4D156E30789B\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine.<br><br> Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

// new one
  case "shuffle_10_5A49728D0CB361E":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_5A49728D0CB361E\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies. <br><br>Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_DAB62013EC87459":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_5A49728D0CB361E\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Reload it in case it dies.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_0A8E7D9132C546B":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_0A8E7D9132C546B\".<br><br> This is an immortal chemlambda quine, the same as the one which is generated from the 4 nodes graph \"spark_245013\".<br><br>  The name means that it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!  ";
  break;

// new one
  case "shuffle_10_51D3E60BA74C928":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  graph \"shuffle_10_51D3E60BA74C928\". That means it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br>Not a quine, but it dies, randomly, after it builds trees.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "shuffle_10_D870619BC345AE2":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_D870619BC345AE2\".<br><br> This seems to be an immortal chemlambda quine, despite the fact that it has conflicting rewrite patterns. <br><br>Reload it to see this, it produces different side graphs before it becomes a quine.<br><br>  The name means that it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine. <br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!  ";
  break;

  case "shuffle_10_290C1735B6A4DE8":
  var mol = "This is the chemlambda graph \"shuffle_10_290C1735B6A4DE8\".<br><br> It is very interesting for several reasons. <br><br>First, it may evolve into a quine, which can also be obtained from the 4 nodes graph \"spark_245013\".<br><br> But it can also evolve into other, different quines.<br><br> This is an example of nature vs nurture.<br><br> Second, many times it evolves into a process which is not periodic and it seems to have a wide variety of ways to do this. <br><br>Therefore, this is not a quine. It is even more interesting than one. <br><br> The name means that it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!  ";
  break;

  case "shuffle_10_D984763ABEC5120":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  quine \"shuffle_10_D984763ABEC5120\". <br><br>This is an immortal chemlambda quine. <br><br> The name means that it is obtained from a random permutation \"random_10_quine_bubbles\" of the edges of the 10 nodes quine.<br><br> Recall that you may baptize a quine. Indeed, if you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!  ";
  break;




  case "LA":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  L-A, or beta rewrite.<br><br> It uses a pair of Arrow nodes which are then eliminated by COMB rewrites. <br><br> Compare with the IC GAMMA-GAMMA rewrite, which uses 2 pairs of Arrow nodes, due to the fact that the IC graphs are not oriented.";
  break;


  case "bubble":
  var mol = "A disappearing \"bubble\" made of arrows, via the COMB rewrites";
  break;

  case "AFOE":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  A-FOE rewrite.<br><br> The wiring of the right pattern (i.e. the result of the rewrite) is similar to the one of the GAMMA-DELTA rewrite from <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a> .";
  break;

  case "LFO":
  var mol = "<a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">Chemlambda</a>  L-FO rewrite.<br><br> Similar wiring with the right pattern of GAMMA-DELTA, but the FO node disappears and it is replaced by two new nodes FOE ald FI.";
  break;

  case "GAMMAGAMMA":
  var mol = "<a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  GAMMA-GAMMA rewrite, as done here.<br><br> Click the \"step\" button for one random rewrite.<br><br>It uses 2 pairs of Arrow nodes, which are then eliminated via COMB rewrites.<br><br> To see this you may either use the \"start\" button and let the program reduce randomly the graph, or you may hover with the mouse over the nodes to trigger a rewrite. <br><br> You can also left-click and drag the nodes to re-arrange the graph, or you can resize the image by left-click/drag or mouse wheel. I suppose pinch gesture works.<br><br> Reload with \"reload\" button.<br><br> Compare with the chemlambda L-A rewrite which uses only one pair of Arrow nodes, due to the fact that chemlambda graphs are oriented.";
  break;

  case "DELTADELTA":
  var mol = "<a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  DELTA-DELTA rewrite, as done here.<br><br> It uses 2 pairs of Arrow nodes, which are then eliminated via COMB rewrites. <br><br>Compare with the chemlambda L-A rewrite which uses only one pair of Arrow nodes, due to the fact that chemlambda graphs are oriented.";
  break;

  case "GAMMADELTA":
  var mol = "<a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  GAMMA-DELTA rewrite.<br><br> The right pattern has the same wirings as a DIST rewrite in chemlambda.";
  break;

  case "DELTAGAMMA":
  var mol = "<a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  DELTA-GAMMA rewrite.<br><br> Due to the symmetry, this is actually a GAMMA-DELTA rewrite. There is no need to use both.";
  break;

  case "DELTAT":
  var mol = "<a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  DELTA-T rewrite, similar with the IC GAMMA-T rewrite or with the chemlambda A-T rewrite.";
  break;

  case "GAMMAT":
  var mol = "<a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  GAMMA-T rewrite, similar with the IC DELTA-T rewrite or with the chemlambda A-T rewrite.";
  break;

  case "TT":
  var mol = "This T-T rewrite eliminates pairs of termination nodes T.<br><br> Such a configuration is contradictory with the oriented chemlambda graphs, but not with the unoriented IC graphs.<br><br> Even in chemlambda, the use of the T node with one edge, regardless of the edge orientation, may be more useful than the introduction of supplimentary T nodes in the oriented case.";
  break;

  case "Lafont-quine":
  var mol = "A graph quine appears in the <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a> article, at page 9, Figure 3.<br><br> Lafont shows this 4 nodes graph.<br><br> The caption of the figure is \"a nonterminating computation\".<br><br> This is actually an Interaction Combinators quine!<br><br> It is made of 4 nodes, two of which are termination nodes. <br><br>In this page there are other examples of IC quines which do not contain termination nodes.<br><br>The idea of a graph quine came with the discovery of the <a href=\"ouroboros.html\">ouroboros</a>.";
  break;

  case "random_egg_G_G_D_D":
    var mol = "Each time you click the \"new\" button you get a random IC graph with 4 nodes, two GAMMA and two DELTA. <br><br>Some of them generate IC quines. <br><br>These are named \"4_IC_*\" where * is the permutation used to build the particular 4 nodes graph. <br><br>The notation is however not unique, for example \"4_IC_5AB718246309\" is the same graph as \"4_IC_2A3906847B15\". <br><br>This is because we have two pairs of identical nodes. <br><br> Anyway, in case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
    break;

  case "4_IC_6B784A053912":
  var mol = "IC quine \"4_IC_6B784A053912\".<br><br> It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";

  case "4_IC_84B7362190A5":
  var mol = "IC quine \"4_IC_84B7362190A5\".<br><br> It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "4_IC_60852B93A714":
  var mol = "IC quine \"4_IC_60852B93A714\".<br><br> It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "4_IC_5AB718246309":
  var mol = "IC quine \"4_IC_5AB718246309\".<br><br> It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> It is the same graph as \"4_IC_2A3906847B15\".<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "4_IC_2A3906847B15":
  var mol = "IC quine \"4_IC_2A3906847B15\".<br><br> It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> It is the same graph as \"4_IC_5AB718246309\".<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "4_IC_820963B71A54":
  var mol = "IC quine \"4_IC_820963B71A54\". <br><br>It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "4_IC_45182379AB06":
  var mol = "IC quine \"4_IC_45182379AB06\". <br><br>It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "4_IC_63407B5A9812":
  var mol = "IC quine \"4_IC_63407B5A9812\". <br><br>It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;

  case "4_IC_41580936B2A7":
  var mol = "4_IC_41580936B2A7\". <br><br>It is immortal, like all IC quines, because in <a href=\"https://pdfs.semanticscholar.org/6cfe/09aa6e5da6ce98077b7a048cb1badd78cc76.pdf\">Interaction Combinators</a>  there are no conflicting rewrites.<br><br> In case you discover a graph which you think is a IC quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;


  case "spark_243501":
    var mol = "One of the most symmetric small chemlambda quines.<br><br>The name means that it is generated a random chemlambda graph with 4 nodes, A, L, FI and FO. <br><br>There are 6! = 720 such graphs. Some of them generate chemlambda quines.<br><br> These are named \"spark_*\" where * is the permutation used to build the particular 4 nodes graph." 
//<br><br> In case you discover a graph which you think is a quine, please copy-paste the CODE and send me a mail at the address which is on top of <a href=\"http://imar.ro/~mbuliga/\">my homepage</a>.  <br><br>The quine, if is a new one, will be named by you!";
  break;


  case "bigpred":
  var mol = "This is a chemlambda graph obtained from the lambda term PRED N, where PRED is the predecessor term<br><br>PRED = (\\n.(\\f.(\\x.(((n (\\g.(\\h.(h (g f))))) (\\u.x)) (\\u.u))))) <br><br> and N is a Church number, like 28 (long one) or like <br><br>4 = (\\f.(\\x.(f(f (f (f x))))))<br><br> After the translation of PRED N to chemlambda, there are only two initial graph rewrites possible, namely two A-L rewrites, corresponding to two beta rewrites. This is the graph you are looking at.<br><br>The interesting part is in the middle of the computation, where you see something which propagates along the graph. <br><br> This led to the idea of <a href=\"ice.html\">IC &amp;chemlambda quines</a>. ";
  break;

  case "bigpred_train":
  var mol = "We take the graph of the lambda term PRED N, where PRED is the predecessor term<br><br>PRED = \\n.\\f.\\x.n (\\g.\\h.h (g f)) (\\u.x) (\\u.u) <br><br> we let it reduce until it exhibits a repeated pattern, then we cut only the interesting part and we glue back the free edges.<br><br> This is the \"ouroboros\" graph, the first discovered chemlambda quine.";
  break;


case "bigpred_bif":
  var mol = "Tow copies of the \"ouroboros\" graph are hybridized, i.e. we exchange the targets of two edges, thus transforming a graph with two connected components into a connected graph.<br><br> The topology of the graph, near the place where the edge exchanges were done, looks like a <a href=\"https://en.wikipedia.org/wiki/Holliday_junction\">Holliday junction</a>.<br><br>Remark that the result is still a quine.<br><br>Perhaps you may want to use the gravity slider and mouse wheel/drag to disentangle the graph first, in order to better see what's happening.<br><br>Or watch this <a href=\"https://www.youtube.com/watch?v=X4Bx2V-QMyA\">youtube video</a> done with the initial awk+js chemlambda programs.";
  break;

  case "bigpred_train_fun":
  var mol = "The pattern which circulates in the ouroboros can be reduced to a pair of nodes<br><br>A in x c<br>L c x out<br><br>This has a translation in lambda calculus, as<br><br> out = f(in) = \\ x.(in x)<br><br>The ouroboros can be understood as the passage of this term through a gate G with two inputs, two outputs,all lambda terms:<br><br>G(in1, in2) = (in1, in1 in2)<br><br>Then we have<br><br> G  (f &#215; id) (in1, in2) = (f(in1), f(in1) in2),<br><br> but f(in1) in2 = (\\ x.(in1 x)) in2 -> in1 in2<br><br>therefore we get:<br><br>G (f &#215; id) = (f &#215; id) G";
  break;

  case "bigpred_propagator":
  var mol = "In  \"<selectspan  onclick=\"selectionLink('bigpred_train_fun');\">ouroboros analyzed</selectspan>\" we used the pair of nodes <br><br>A in x c<br>L c x out<br><br> and the interpretation in lambda calculus<br><br> out = f(in) = \\ x.(in x)<br><br>You see how this pattern is duplicated via a (yellow) FOE node.<br><br>This pattern is an example of a propagator.<br><br>Propagators were introduced in <a href=\"https://www.mitpressjournals.org/doi/pdf/10.1162/978-0-262-32621-6-ch079\">Chemlambda, universality and self-multiplication</a><br><br> (Mind that the article uses a previous version of chemlambda, with some global rewrites, basically a simplification of <a href=\"http://www.complex-systems.com/abstracts/v22_i04_a01.html\">Graphic lambda calculus</a>.)";
  break;

  case "bigpred_multipropagator":
  var mol = "In <a href=\"http://imar.ro/~mbuliga/chemlambda-v2.html\">chemlambda</a> the propagation does not happen instantaneously.<br><br> Four our propagator, there are needed 3 rewrites, followed by two COMB rewrites, for each duplication (FOE) node.<br><br> Here you see how the propagation happens through an open path of FOE nodes.<br><br> Use the gravity slider to disentangle the graph.<br><br>See what happens when <selectspan  onclick=\"selectionLink('bigpred_circularpropagator');\">the path of FOE nodes is closed</selectspan>. ";
  break;

  case "bigpred_circularpropagator":
  var mol = "If we close the path of FOE nodes from the \"<selectspan  onclick=\"selectionLink('bigpred_multipropagator');\">propagation takes time</selectspan>\" example, then we obtain a half of the ouroboros, missing the other circular path of (green) A nodes.<br><br>Because the path of FOE nodes is circular, the propagator will eventually interact with itself.<br><br>This means we shall have a pattern<br><br>L c1 x1 out<br>A out x2 c2<br><br> or in lambda calculus, a term<br><br>c2 = (\\ x1. c1) x2<br><br> which reduces through &beta; or L-A rewrite. The propagation will continue until all the green A nodes will be cancelled (by L red nodes).<br><br>At the end we shall have L (red), FOE (yellow) and FI (fanin, magenta) nodes.<br><br>We need the other half of the ouroboros if we want to have a quine which lives longer.<br><br>Half of the ouroboros is though a quine, see <a href=\"ice.html\">other examples of quines</a>.";
  break;

  case "bigpred_generator":
  var mol = "In  \"<selectspan  onclick=\"selectionLink('bigpred_train_fun');\">ouroboros analyzed</selectspan>\" we have a propagator and a large, circular string of FOE-A gates.<br><br>It gives the impression that it is an immortal quine, which is false. Indeed in the \"<selectspan  onclick=\"selectionLink('bigpred_circularpropagator');\">circular propagation</selectspan>\" example we see that eventually the propagator will interact with itself, which ends the propagation.<br><br>In this example we take the shortest ouroboros: <span2>the propagator</span2> and the circular strings of gates is made of <span4>only one gate</span4>:<br><br><span2>A 1 2 3<br>L 3 2 4</span2><span4><br>FOE 4 5 1<br>A 5 6 6</span4><br><br>Use \"step\": there is only one rewrite possible, L-FOE. After that, you get this <span5>3 nodes pattern L-A-FOE</span5><br><br><span5>L 7 8 1<br>A 1 2 3<br>FOE 3 6 7</span5><br>L 6 9 4<br>A 4 5 5<br>FI 8 9 2<br><br> with two conflicting rewrites patterns: L-A and A-FOE.<br><br> The algorithm selects randomly:<br><br> if L-A then quine will die, <br>if A-FOE then quine lives for another day.";
  break;


  default:
  var mol = "";
  break;
}
return mol;
}







