// general parameters


// set up the d3 visualisation
var w = 560,
    h = 480;

// node radii

var smallNode = 6,
    bigNode = 10;

// d3 force graph parameters

var chargeForceStrength = -16;
var gravForceStrength = 0.12;

var forceStrength = 0.5;
var forceAlpha = 0.1;
var forceAlphaDecay = 0;
var forceVelocityDecay = 0.1;

// colors 

var redCol = "#FF0000";            //"red";                          // "#b80000";
var orangeCol = "#F08080";         //"lightcoral";                // "#FF6C03";
var orange2Col = "#FF8C00";        //"darkorange";               // "#FFA500";
var yellowCol = "#FFD700";         //"gold";                      // "#FFCE54";
var greenCol = "#008000";          //"green";                      // "#9fc952";
var middleCol = "#4682B4";         //"steelblue";                 // "#4A89DC";
var blueCol = "#0000FF";           //"blue";                        // "#00F";
var violetCol = "#D503FF";
var whiteCol = "#fff";

// 

var speed = 0;
var startVar = 0;
var arenaVar = 0;
var fightersVar = 0;
var combOnly = 0;
