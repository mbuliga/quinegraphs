var dist-list = [

//DIST0 needs t1, t3
{left:"D",right:"D",action:"DIST0", named:"D-D", t1:"FOE",t2:"D",t3:"A",t4:"D",blocks:[],needs:["FOE","A"],kind:"DIST"},
{left:"D",right:"A",action:"DIST0", named:"D-A", t1:"FOX",t2:"A",t3:"A",t4:"D",blocks:[],needs:["FOX","A"],kind:"DIST"},
{left:"D",right:"FI",action:"DIST0", named:"D-FI", t1:"L",t2:"FI",t3:"A",t4:"D",blocks:[],needs:["L","A"],kind:"DIST"},

{left:"A",right:"D",action:"DIST0", named:"A-D", t1:"FOE",t2:"D",t3:"FI",t4:"A",blocks:[],needs:["FOE","FI"],kind:"DIST"},
{left:"A",right:"A",action:"DIST0", named:"A-A", t1:"FOX",t2:"A",t3:"FI",t4:"A",blocks:[],needs:["FOX","FI"],kind:"DIST"},
{left:"A",right:"FI",action:"DIST0", named:"A-FI", t1:"L",t2:"FI",t3:"FI",t4:"A",blocks:[],needs:["L","FI"],kind:"DIST"},

{left:"FI",right:"D",action:"DIST0", named:"FI-D", t1:"FOE",t2:"D",t3:"D",t4:"FI",blocks:[],needs:["FOE","D"],kind:"DIST"},
{left:"FI",right:"A",action:"DIST0", named:"FI-A", t1:"FOX",t2:"A",t3:"D",t4:"FI",blocks:[],needs:["FOX","D"],kind:"DIST"},
{left:"FI",right:"FI",action:"DIST0", named:"FI-FI", t1:"L",t2:"FI",t3:"D",t4:"FI",blocks:[],needs:["L","D"],kind:"DIST"},


//DIST1 needs t1, t3
{left:"D",right:"L",action:"DIST1", named:"D-L", t1:"L",t2:"L",t3:"D",t4:"D",blocks:["L-D",],needs:["L","D"],kind:"DIST"},
{left:"D",right:"FOE",action:"DIST1", named:"D-FOE", t1:"FOE",t2:"FOE",t3:"D",t4:"D",blocks:["FOE-D",],needs:["FOE","D"],kind:"DIST"},
{left:"D",right:"FOX",action:"DIST1", named:"D-FOX", t1:"FOX",t2:"FOX",t3:"D",t4:"D",blocks:["FOX-D",],needs:["FOX","D"],kind:"DIST"},

{left:"A",right:"L",action:"DIST1", named:"A-L", t1:"L",t2:"L",t3:"A",t4:"A",blocks:["L-A",],needs:["L","A"],kind:"DIST"},
{left:"A",right:"FOE",action:"DIST1", named:"A-FOE", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A",],needs:["FOE","A"],kind:"DIST"},      //
{left:"A",right:"FOX",action:"DIST1", named:"A-FOX", t1:"FOX",t2:"FOX",t3:"A",t4:"A",blocks:["FOX-A",],needs:["FOX","A"],kind:"DIST"},

{left:"FI",right:"L",action:"DIST1", named:"FI-L", t1:"L",t2:"L",t3:"FI",t4:"FI",blocks:["L-FI",],needs:["L","FI"],kind:"DIST"},            //
{left:"FI",right:"FOE",action:"DIST1", named:"FI-FOE", t1:"FOE",t2:"FOE",t3:"FI",t4:"FI",blocks:["FOE-FI",],needs:["FOE","FI"],kind:"DIST"},
{left:"FI",right:"FOX",action:"DIST1", named:"FI-FOX", t1:"FOX",t2:"FOX",t3:"FI",t4:"FI",blocks:["FOX-FI",],needs:["FOX","FI"],kind:"DIST"},

{left:"FI",right:"FO",action:"DIST1", named:"FI-FO", t1:"FO",t2:"FO",t3:"FI",t4:"FI",blocks:["FO-FI",],needs:["FOE","FI"],kind:"DIST"},

{left:"A",right:"FO",action:"DIST1-DEG", named:"A-FO", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A",],needs:["FOE","A"],kind:"DIST"},

///DIST2 needs t4,t1
{left:"D",right:"L",action:"DIST2", named:"D-L", t1:"FI",t2:"L",t3:"D",t4:"L",blocks:["FI-D","L-L",],needs:["L","FI"],kind:"DIST"},
{left:"D",right:"FOE",action:"DIST2", named:"D-FOE", t1:"D",t2:"FOE",t3:"D",t4:"L",blocks:["D-D","FOE-L",],needs:["L","D"],kind:"DIST"},
{left:"D",right:"FOX",action:"DIST2", named:"D-FOX", t1:"A",t2:"FOX",t3:"D",t4:"L",blocks:["A-D","FOX-L",],needs:["L","A"],kind:"DIST"},

{left:"A",right:"L",action:"DIST2", named:"A-L", t1:"FI",t2:"L",t3:"A",t4:"FOE",blocks:["FI-A","L-FOE",],needs:["FOE","FI"],kind:"DIST"},
{left:"A",right:"FOE",action:"DIST2", named:"A-FOE", t1:"D",t2:"FOE",t3:"A",t4:"FOE",blocks:["D-A","FOE-FOE",],needs:["FOE","D"],kind:"DIST"},
{left:"A",right:"FOX",action:"DIST2", named:"A-FOX", t1:"A",t2:"FOX",t3:"A",t4:"FOE",blocks:["A-A","FOX-FOE",],needs:["FOE","A"],kind:"DIST"},

{left:"FI",right:"L",action:"DIST2", named:"FI-L", t1:"FI",t2:"L",t3:"FI",t4:"FOX",blocks:["FI-FI","L-FOX",],needs:["FOX","FI"],kind:"DIST"},
{left:"FI",right:"FOE",action:"DIST2", named:"FI-FOE", t1:"D",t2:"FOE",t3:"FI",t4:"FOX",blocks:["D-FI","FOE-FOX",],needs:["FOX","D"],kind:"DIST"},
{left:"FI",right:"FOX",action:"DIST2", named:"FI-FOX", t1:"A",t2:"FOX",t3:"FI",t4:"FOX",blocks:["A-FI","FOX-FOX",],needs:["FOX","A"],kind:"DIST"},


//DIST3  needs t3,t1
{left:"D",right:"A",action:"DIST3", named:"D-A", t1:"A",t2:"A",t3:"FOX",t4:"D",blocks:["A-D",],needs:["FOX","A"],kind:"DIST"},
{left:"D",right:"FI",action:"DIST3", named:"D-FI", t1:"FI",t2:"FI",t3:"FOX",t4:"D",blocks:["FI-D",],needs:["FOX","FI"],kind:"DIST"},

{left:"A",right:"D",action:"DIST3", named:"A-D", t1:"D",t2:"D",t3:"L",t4:"A",blocks:["D-A",],needs:["L","D"],kind:"DIST"},
{left:"A",right:"FI",action:"DIST3", named:"A-FI", t1:"FI",t2:"FI",t3:"L",t4:"A",blocks:["FI-A",],needs:["L","FI"],kind:"DIST"},     //

{left:"FI",right:"D",action:"DIST3", named:"FI-D", t1:"D",t2:"D",t3:"FOE",t4:"FI",blocks:["D-FI",],needs:["FOE","D"],kind:"DIST"},
{left:"FI",right:"A",action:"DIST3", named:"FI-A", t1:"A",t2:"A",t3:"FOE",t4:"FI",blocks:["A-FI",],needs:["FOE","A"],kind:"DIST"},   //


//DIST4  needs t3,t2
{left:"L",right:"D",action:"DIST4", named:"L-D", t1:"D",t2:"FI",t3:"FOX",t4:"L",blocks:["D-L","FOX-FI",],needs:["FOX","FI"],kind:"DIST"},
{left:"L",right:"A",action:"DIST4", named:"L-A", t1:"A",t2:"D",t3:"FOX",t4:"L",blocks:["A-L","FOX-D",],needs:["FOX","D"],kind:"DIST"},
{left:"L",right:"FI",action:"DIST4", named:"L-FI", t1:"FI",t2:"A",t3:"FOX",t4:"L",blocks:["FI-L","FOX-A",],needs:["FOX","A"],kind:"DIST"},


{left:"FOE",right:"D",action:"DIST4", named:"FOE-D", t1:"D",t2:"FI",t3:"L",t4:"FOE",blocks:["D-FOE","L-FI",],needs:["L","FI"],kind:"DIST"},
{left:"FOE",right:"A",action:"DIST4", named:"FOE-A", t1:"A",t2:"D",t3:"L",t4:"FOE",blocks:["A-FOE","L-D",],needs:["L","D"],kind:"DIST"},
{left:"FOE",right:"FI",action:"DIST4", named:"FOE-FI", t1:"FI",t2:"A",t3:"L",t4:"FOE",blocks:["FI-FOE","L-A",],needs:["L","A"],kind:"DIST"},


{left:"FOX",right:"D",action:"DIST4", named:"FOX-D", t1:"D",t2:"FI",t3:"FOE",t4:"FOX",blocks:["D-FOX","FOE-FI",],needs:["FOE","FI"],kind:"DIST"},
{left:"FOX",right:"A",action:"DIST4", named:"FOX-A", t1:"A",t2:"D",t3:"FOE",t4:"FOX",blocks:["A-FOX","FOE-D",],needs:["FOE","D"],kind:"DIST"},
{left:"FOX",right:"FI",action:"DIST4", named:"FOX-FI", t1:"FI",t2:"A",t3:"FOE",t4:"FOX",blocks:["FI-FOX","FOE-A",],needs:["FOE","A"],kind:"DIST"},


//DIST5  needs t2,t3
{left:"L",right:"D",action:"DIST5", named:"L-D", t1:"D",t2:"FOX",t3:"A",t4:"L",blocks:["D-L",],needs:["FOX","A"],kind:"DIST"},
{left:"L",right:"A",action:"DIST5", named:"L-A", t1:"A",t2:"L",t3:"A",t4:"L",blocks:["A-L",],needs:["L","A"],kind:"DIST"},
{left:"L",right:"FI",action:"DIST5", named:"L-FI", t1:"FI",t2:"FOE",t3:"A",t4:"L",blocks:["FI-L",],needs:["FOE","A"],kind:"DIST"},


{left:"FOE",right:"D",action:"DIST5", named:"FOE-D", t1:"D",t2:"FOX",t3:"FI",t4:"FOE",blocks:["D-FOE",],needs:["FOX","FI"],kind:"DIST"},
{left:"FOE",right:"A",action:"DIST5", named:"FOE-A", t1:"A",t2:"L",t3:"FI",t4:"FOE",blocks:["A-FOE",],needs:["L","FI"],kind:"DIST"},
{left:"FOE",right:"FI",action:"DIST5", named:"FOE-FI", t1:"FI",t2:"FOE",t3:"FI",t4:"FOE",blocks:["FI-FOE",],needs:["FOE","FI"],kind:"DIST"},


{left:"FOX",right:"D",action:"DIST5", named:"FOX-D", t1:"D",t2:"FOX",t3:"D",t4:"FOX",blocks:["D-FOX",],needs:["FOX","D"],kind:"DIST"},
{left:"FOX",right:"A",action:"DIST5", named:"FOX-A", t1:"A",t2:"L",t3:"D",t4:"FOX",blocks:["A-FOX",],needs:["L","D"],kind:"DIST"},
{left:"FOX",right:"FI",action:"DIST5", named:"FOX-FI", t1:"FI",t2:"FOE",t3:"D",t4:"FOX",blocks:["FI-FOX",],needs:["FOE","D"],kind:"DIST"},


//DIST6  needs t2,t4
{left:"L",right:"L",action:"DIST6", named:"L-L", t1:"L",t2:"FOE",t3:"L",t4:"D",blocks:[],needs:["FOE","D"],kind:"DIST"},
{left:"L",right:"FOE",action:"DIST6", named:"L-FOE", t1:"FOE",t2:"FOX",t3:"L",t4:"D",blocks:[],needs:["FOX","D"],kind:"DIST"},
{left:"L",right:"FOX",action:"DIST6", named:"L-FOX", t1:"FOX",t2:"L",t3:"L",t4:"D",blocks:[],needs:["L","D"],kind:"DIST"},


{left:"FOE",right:"L",action:"DIST6", named:"FOE-L", t1:"L",t2:"FOE",t3:"FOE",t4:"A",blocks:[],needs:["FOE","A"],kind:"DIST"},
{left:"FOE",right:"FOE",action:"DIST6", named:"FOE-FOE", t1:"FOE",t2:"FOX",t3:"FOE",t4:"A",blocks:[],needs:["FOX","A"],kind:"DIST"},
{left:"FOE",right:"FOX",action:"DIST6", named:"FOE-FOX", t1:"FOX",t2:"L",t3:"FOE",t4:"A",blocks:[],needs:["L","A"],kind:"DIST"},


{left:"FOX",right:"L",action:"DIST6", named:"FOX-L", t1:"L",t2:"FOE",t3:"FOX",t4:"FI",blocks:[],needs:["FOE","FI"],kind:"DIST"},
{left:"FOX",right:"FOE",action:"DIST6", named:"FOX-FOE", t1:"FOE",t2:"FOX",t3:"FOX",t4:"FI",blocks:[],needs:["FOX","FI"},
{left:"FOX",right:"FOX",action:"DIST6", named:"FOX-FOX", t1:"FOX",t2:"L",t3:"FOX",t4:"FI",blocks:[],needs:["L","FI"],kind:"DIST"},


//DIST7  needs t4,t2
{left:"L",right:"FOE",action:"DIST7", named:"L-FOE", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FOE-L",],needs:["L","FI"],kind:"DIST"},    //
{left:"L",right:"FOX",action:"DIST7", named:"L-FOX", t1:"FOX",t2:"D",t3:"L",t4:"L",blocks:["FOX-L",],needs:["L","D"],kind:"DIST"},

{left:"L",right:"FO",action:"DIST7-DEG", named:"L-FO", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FO-L"],needs:["L","FI"],kind:"DIST"},


{left:"FOE",right:"L",action:"DIST7", named:"FOE-L", t1:"L",t2:"A",t3:"FOE",t4:"FOE",blocks:["L-FOE",],needs:["FOE","A"],kind:"DIST"},   //
{left:"FOE",right:"FOX",action:"DIST7", named:"FOE-FOX", t1:"FOX",t2:"D",t3:"FOE",t4:"FOE",blocks:["FOX-FOE",],needs:["FOE","D"],kind:"DIST"},


{left:"FOX",right:"L",action:"DIST7", named:"FOX-L", t1:"L",t2:"A",t3:"FOX",t4:"FOX",blocks:["L-FOX",],needs:["FOX","A"],kind:"DIST"},
{left:"FOX",right:"FOE",action:"DIST7", named:"FOX-FOE", t1:"FOE",t2:"FI",t3:"FOX",t4:"FOX",blocks:["FOE-FOX",],needs:["FOX","FI"],kind:"DIST"},

{left:"FO",right:"FOE",action:"DIST7", named:"FO-FOE", t1:"FOE",t2:"FI",t3:"FO",t4:"FO",blocks:["FOE-FO",],needs:["FOX","FI"],kind:"DIST"},

];
