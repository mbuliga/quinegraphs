/* 
page look (buttons, etc), import-export mol
*/
// last updated: 16.03.2021

var versusVar = "<br><br> VS. <br><br>";
var transformList = [];

function chemistryChoice() {

// added chemistryChoice
  if (isChemlambda == 1) {
// which chemistries (i.e. graph rewrite systems) we use?
    graphRewriteSystems = ["T","COMB","IC","CHEMLAMBDABARE","CHEMLAMBDAEND"];
  } else {
    graphRewriteSystems = ["T","COMB","IC","CHEMLAMBDABARE","DICMOD"];
  }
  transformList = [];
  for (var ichem=0; ichem<graphRewriteSystems.length; ichem++) {
    var addChemistry = chemistry(graphRewriteSystems[ichem]);
    for (var ichemadd=0; ichemadd<addChemistry.length; ichemadd++) {
    transformList.push(addChemistry[ichemadd]);
    }
  }

}



function selectionLambda() {

setSpeed(0); 
setStart(0); 
var lambdatext = document.getElementById('listofmols').value; 
  location.hash = "#" + lambdatext;
  document.getElementById("citeas").innerHTML = location.hash;
document.getElementById('inputlambda').value = termLibrary(lambdatext); 
if (termLibrary(lambdatext) == "") {
  voidMolToScreenAfter(); 
  molSelect(); 
  exportMolToScreen();
} else {
lambdaToMol(); 
reloadCode();
var molCom = molComments(lambdatext);
document.getElementById("comments").innerHTML = molCom; 
}
setComb(1);setSpeed(1); setStart(1); loop();
}


function selectionStarter() {


  chemistryChoice();


  setSpeed(0); 
  setStart(0); 
  setAge(0);
  var whichPost = document.getElementById("listofmols").value;
  location.hash = "#" + whichPost;
  if ( arenaVar == 0 ) {
  whichButtons(whichPost); 
  }
  voidMolToScreenAfter(); 
  molSelect(); 
  exportMolToScreen();
  if (arenaVar == 1) {
    document.getElementById("listofmols").value = "arena";
    whichButtons("arena"); 
    location.hash = "#arena";
  }
  document.getElementById("citeas").innerHTML = location.hash;
}

function selectionLink(link) {
document.getElementById("listofmols").value = link;
selectionStarter();
}

var ButtonOriginal = [
  {"Id":"button3", "Class":"image2", "Visibility":"hidden", "Onclick": function () {selectionStarter();}, "Text":"new"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); chemistryChoice(); loop(); }, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"},
  {"Id":"buttonAge", "Class":"image2", "Visibility":"visible", "Onclick": function () {setOlder();}, "Text":"change"},
  {"Id":"buttonImportMol", "Class":"image2", "Visibility":"visible", "Onclick": function () {importMolTextarea("inputmol");}, "Text":"input mol"},
  {"Id":"buttonUpdateMol", "Class":"image2", "Visibility":"visible", "Onclick": function () {updateMolTextarea("inputmol");}, "Text":"update"},
//  {"Id":"buttonShot", "Class":"image2", "Visibility":"visible", "Onclick": function () {screenShot();}, "Text":"photo"} 
];

var ButtonLambda = [
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); lambdaToMol(); reloadCode(); setComb(1);setSpeed(1); setStart(1); loop();}, "Text":"&lambda;>mol"}, 
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1);  loop();}, "Text":"start"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2(); decoratorLambda();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); decoratorLambda();}, "Text":"mol>&lambda;"},
  {"Id":"buttonAge", "Class":"image2", "Visibility":"visible", "Onclick": function () {setOlder();}, "Text":"change"}, 
//  {"Id":"buttonShot", "Class":"image2", "Visibility":"visible", "Onclick": function () {screenShot();}, "Text":"photo"}  
];


var ButtonRandomGraph = [
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {selectionStarter();}, "Text":"new"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1);  loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"},
  {"Id":"buttonAge", "Class":"image2", "Visibility":"visible", "Onclick": function () {setOlder();}, "Text":"change"},
  {"Id":"buttonImportMol", "Class":"image2", "Visibility":"visible", "Onclick": function () {importMolTextarea("inputmol");}, "Text":"input mol"},
  {"Id":"buttonUpdateMol", "Class":"image2", "Visibility":"visible", "Onclick": function () {updateMolTextarea("inputmol");}, "Text":"update"},
//  {"Id":"buttonShot", "Class":"image2", "Visibility":"visible", "Onclick": function () {screenShot();}, "Text":"photo"}  
];


var ButtonArena = [
  {"Id":"button1", "Class":"image2", "Visibility":"hidden", "Onclick": function () {document.getElementById("listofmols").value = "arena";  setArena(1); selectionStarter();}, "Text":"add"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1);  loop();}, "Text":"fight"},
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"purge"},
  {"Id":"buttonAge", "Class":"image2", "Visibility":"visible", "Onclick": function () {setOlder();}, "Text":"change"}, 
//  {"Id":"buttonShot", "Class":"image2", "Visibility":"visible", "Onclick": function () {screenShot();}, "Text":"photo"}  
];

var ButtonGreedyAlgorithm = [
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {selectionStarter();}, "Text":"greedy"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1);  loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"},
  {"Id":"buttonAge", "Class":"image2", "Visibility":"visible", "Onclick": function () {setOlder();}, "Text":"change"}, 
//  {"Id":"buttonShot", "Class":"image2", "Visibility":"visible", "Onclick": function () {screenShot();}, "Text":"photo"}  
];

function showAllButtons(butto) {
  for (var i = 0; i < butto.length; i++) {
    showButton(butto[i]);
  }
}

function showButton(buttt) {
  document.getElementById(buttt.Id).onclick = buttt.Onclick;
  document.getElementById(buttt.Id).style.visibility = buttt.Visibility;
  document.getElementById(buttt.Id).innerHTML = buttt.Text;
}



function whichButtons(choiceButtons) {
//  var choiceButtons = document.getElementById("listofmols").value;
  switch (choiceButtons) {

    case "lambdanote":
    var selectedButtons = ButtonLambda;
    break;


    case "arena":
    var selectedButtons = ButtonArena;
    break;

    case "greedy":
    var selectedButtons = ButtonGreedyAlgorithm;
    break;

    case "random_16_quine_A_L_FI_FO_duplicate":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_egg_A_L_FI_FO":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_egg_A_L_FI_FOE":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_10_quine_bubbles":
    var selectedButtons = ButtonRandomGraph;
    break;

    case "random_egg_G_G_D_D":
    var selectedButtons = ButtonRandomGraph;
    break;

    default:
    var selectedButtons = ButtonOriginal;
    break;
  }
  showAllButtons(selectedButtons);
}

function voidMolToScreenAfter() {
  document.getElementById("puttransformcachealt").innerHTML = "";
  document.getElementById("chosentransform").innerHTML = "";
  document.getElementById("puttransformcachealtafter").innerHTML = "";
  if (arenaVar == 0) { 
    document.getElementById("molexport").innerHTML = ""; 
    document.getElementById("molexportafter").innerHTML = ""; 
  } else {
    document.getElementById("molexport").innerHTML += "<br>"; 
    document.getElementById("molexportafter").innerHTML += "<br>"; 
  }
}

function setSpeed(newSpeed) {
  speed = newSpeed;
}

function setStart(varStart) {
  startVar = varStart;
}

function setArena(varArena) {
  arenaVar = varArena;
}

function setComb(newComb) {
  combOnly = newComb;
}

function setAge(newAge) {
  age = newAge;
}

function setOlder() {
  if (olderFirst == 1) {
    olderFirst = 0;
    document.getElementById("agetext").innerHTML = "random choices ";
  } else {
    olderFirst = 1;
    document.getElementById("agetext").innerHTML = "older is first ";
  }
}

function setBalanceOfNodes() {
  for (var ibal=0;  ibal < balanceOfnodes.length; ibal++) {
    balanceOfnodes[ibal] = 0;
  }

}