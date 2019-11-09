/* 
page look (buttons, etc)
*/

function selectionStarter() {
setSpeed(0); setStart(0); whichButtons(); voidMolToScreenAfter(); molSelect(); exportMolToScreen();
}

function selectionLink(link) {
document.getElementById("listofmols").value = link;
selectionStarter();
}



var ButtonOriginal = [
  {"Id":"button3", "Class":"image2", "Visibility":"hidden", "Onclick": function () {selectionStarter();}, "Text":"new"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"}
];



var ButtonRandomGraph = [
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {selectionStarter();}, "Text":"new"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"}
];


var ButtonGreedyAlgorithm = [
  {"Id":"button3", "Class":"image2", "Visibility":"visible", "Onclick": function () {selectionStarter();}, "Text":"greedy"},
  {"Id":"button0", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(1); setStart(1); loop();}, "Text":"start"},
  {"Id":"button1", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0);}, "Text":"stop"},
  {"Id":"button2", "Class":"image2", "Visibility":"visible", "Onclick": function () {setStart(0); loop2();}, "Text":"step"},
  {"Id":"button4", "Class":"image2", "Visibility":"visible", "Onclick": function () {setSpeed(0); setStart(0); reloadCode();}, "Text":"reload"}
];


//var Button = ButtonOriginal;



function showAllButtons(butto) {

// var verificare = "";

  for (var i = 0; i < butto.length; i++) {
    showButton(butto[i]);
//    verificare += " , " + butto[i].Id + ": " + butto[i].Visibility;
  }

// document.getElementById("verificare").innerHTML = verificare; 
}




function showButton(buttt) {

//var modificationOnclick = "function() { " + buttt.Onclick + " }";
 
document.getElementById(buttt.Id).onclick = buttt.Onclick;

document.getElementById(buttt.Id).style.visibility = buttt.Visibility;

document.getElementById(buttt.Id).innerHTML = buttt.Text;




}



function whichButtons() {

var choiceButtons = document.getElementById("listofmols").value;



switch (choiceButtons) {

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







