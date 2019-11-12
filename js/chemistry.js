// general COMB rewrites





function chemistry(id) {

switch (id) {
  case "COMB": 
    var out = [
  {left:"any",right:"Arrow",action:"arrow", named:"COMB"},
];
  break;


// general pure termination T rewrites

  case "T":
    var out = [
  {left:"T",right:"T",action:"remove4", named:"T-T"},
  {left:"FRIN",right:"T",action:"remove4", named:"FRIN-T"},
  {left:"T",right:"FROUT",action:"remove4", named:"T-FROUT"},
  {left:"null",right:"T",action:"remove1", named:"?-T"},
  {left:"null",right:"T",action:"remove1"},
];
  break;


// chemlambda-v2 rewrites

  case "CHEMLAMBDA":
    var out = [
  {left:"L",right:"A",action:"beta-arrow-X", named:"L-A", t1:"Arrow",t2:"Arrow"},      // action modified from "beta" to "beta-arrow-X" which is the original beta rewrite from chemlambda
  {left:"FI",right:"FOE",action:"beta-arrow", named:"FI-FOE", t1:"Arrow",t2:"Arrow"},  // action modified from "beta" to "beta-arrow" which is the original FI-FOE rewrite from chemlambda
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
//  {left:"FRIN",right:"FOE",action:"terminfrin", named:"FRIN-FOE"}, // 
  {left:"FRIN",right:"FI",action:"termFI", named:"FRIN-FI"}, // 
//
  {left:"L",right:"T",action:"termL", named:"L-T"},
  {left:"A",right:"T",action:"term", named:"A-T"},
  {left:"FI",right:"T",action:"term", named:"FI-T"},
  {left:"FOE",right:"T",action:"term1", named:"FOE-T"}, // 
];
  break;

// IC rewrites

  case "IC":
    var out = [
  {left:"GAMMA",right:"GAMMA",action:"GAMMA-GAMMA-arrow", named:"GAMMA-GAMMA", t1:"Arrow",t2:"Arrow",t3:"Arrow",t4:"Arrow"}, // action modified from "GAMMA-GAMMA" with 2 pairs Arrow-Arrow added, in order to be sure that COMB rewrite, as is, eliminates all arrows
  {left:"DELTA",right:"DELTA",action:"DELTA-DELTA-arrow", named:"DELTA-DELTA", t1:"Arrow",t2:"Arrow",t3:"Arrow",t4:"Arrow"}, // action modified from "DELTA-DELTA" with 2 pairs Arrow-Arrow added, in order to be sure that COMB rewrite, as is, eliminates all arrows
  {left:"GAMMA",right:"DELTA",action:"GAMMA-DELTA", named:"GAMMA-DELTA", t1:"DELTA",t2:"DELTA",t3:"GAMMA",t4:"GAMMA"}, // notice that due to symmetry there is no need for DELTA-GAMMA
  {left:"GAMMA",right:"T",action:"term3", named:"GAMMA-T"},
  {left:"DELTA",right:"T",action:"term3", named:"DELTA-T"},
];
  break;



  default:
  var out = "";
  break;
}
return out;
}

