/* 
mol library, contains some mols adapted to kali.
*/




function molLibrary(molName) {

switch (molName) {
  case "SKK":
  var mol = "FROUT o^A 1 K2 o^A S K1 1^L 1S xS S^L 2S yS 1S^L 3S zS 2S^FOE zS 6S 7S^A 4S 5S 3S^A xS 6S 4S^A yS 7S 5S^L 1K1 xK1 K1^L xK1 yK1 1K1^T yK1^L 1K2 xK2 K2^L xK2 yK2 1K2^T yK2";
  break;
  case "omegaSKI":
  var mol = "FROUT o^A 1 2 o^A 3 bI 1^A S1 aI 3^A 4 cI 2^A S2 dI 4^L 1S1 xS1 S1^L 2S1 yS1 1S1^L 3S1 zS1 2S1^FO zS1 6S1 7S1^A 4S1 5S1 3S1^A xS1 6S1 4S1^A yS1 7S1 5S1^L 1S2 xS2 S2^L 2S2 yS2 1S2^L 3S2 zS2 2S2^FO zS2 6S2 7S2^A 4S2 5S2 3S2^A xS2 6S2 4S2^A yS2 7S2 5S2^A a1 aK2 aI^A aS aK1 a1^L a1S axS aS^L a2S ayS a1S^L a3S azS a2S^FO azS a6S a7S^A a4S a5S a3S^A axS a6S a4S^A ayS a7S a5S^L a1K1 axK1 aK1^L axK1 ayK1 a1K1^T ayK1^L a1K2 axK2 aK2^L axK2 ayK2 a1K2^T ayK2^A b1 bK2 bI^A bS bK1 b1^L b1S bxS bS^L b2S byS b1S^L b3S bzS b2S^FO bzS b6S b7S^A b4S b5S b3S^A bxS b6S b4S^A byS b7S b5S^L b1K1 bxK1 bK1^L bxK1 byK1 b1K1^T byK1^L b1K2 bxK2 bK2^L bxK2 byK2 b1K2^T byK2^A c1 cK2 cI^A cS cK1 c1^L c1S cxS cS^L c2S cyS c1S^L c3S czS c2S^FO czS c6S c7S^A c4S c5S c3S^A cxS c6S c4S^A cyS c7S c5S^L c1K1 cxK1 cK1^L cxK1 cyK1 c1K1^T cyK1^L c1K2 cxK2 cK2^L cxK2 cyK2 c1K2^T cyK2^A d1 dK2 dI^A dS dK1 d1^L d1S dxS dS^L d2S dyS d1S^L d3S dzS d2S^FO dzS d6S d7S^A d4S d5S d3S^A dxS d6S d4S^A dyS d7S d5S^L d1K1 dxK1 dK1^L dxK1 dyK1 d1K1^T dyK1^L d1K2 dxK2 dK2^L dxK2 dyK2 d1K2^T dyK2";
  break;
  case "rewrite-L-T":
  var mol = "L 1 2 3^T 3^FRIN 1^FRIN 2";
  break;

  case "FOE-FI":
  var mol = "FOE 1 2 3^FI 3 4 5^FRIN 1^FROUT 2^FRIN 4^FROUT 5";
  break;

  case "FOX-D":
  var mol = "FOX 1 2 3^D 3 4 5^FRIN 1^FROUT 2^FRIN 4^FROUT 5";
  break;

  case "L-A-DIST":
  var mol = "L 1 2 3^A 3 4 5^FRIN 1^FROUT 2^FRIN 4^FROUT 5";
  break;


  case "L-FO-FOE-conflict":
  var mol = "L 1 1 2^FO 2 3 4^FROUT 3^FOE 4 5 6^FROUT 5^FROUT 6";
  break;

  case "A-L-FO-FOE-conflict":
  var mol = "L 1 1 2^A 2 7 8^FRIN 7^FO 8 3 4^FOE 3 9 10^FROUT 9^FROUT 10^FOE 4 5 6^FROUT 5^FROUT 6";
  break;

  case "ishan_example":
  var mol = "FO 0 11 12^FO 5 6 7^L 8 5 0^A 7 6 9^A 10 9 8^L 1 2 10^A 3 4 1^FO 2 4 3^FROUT 11^FROUT 12";
  break;

  case "ishan_example_foe":
  var mol = "FOE 0 11 12^FO 5 6 7^L 8 5 0^A 7 6 9^A 10 9 8^L 1 2 10^A 3 4 1^FO 2 4 3^FROUT 11^FROUT 12";
  break;

    case "ishan_example_fox":
  var mol = "FOX 0 11 12^FO 5 6 7^L 8 5 0^A 7 6 9^A 10 9 8^L 1 2 10^A 3 4 1^FO 2 4 3^FROUT 11^FROUT 12";
  break;

  case "ishan_example_2":
  var mol = "L 1 2 3^L 4 5 6^A 2 5 4^FO 3 free7 free8^L 9 10 11^A 12 13 9^FO 10 13 12^A 11 6 1^FROUT free7^FROUT free8";
  break;

  case "ishan_example_2_foe":
  var mol = "L 1 2 3^L 4 5 6^A 2 5 4^FOE 3 free7 free8^L 9 10 11^A 12 13 9^FO 10 13 12^A 11 6 1^FROUT free7^FROUT free8";
  break;

    case "ishan_example_2_fox":
  var mol = "L 1 2 3^L 4 5 6^A 2 5 4^FOX 3 free7 free8^L 9 10 11^A 12 13 9^FO 10 13 12^A 11 6 1^FROUT free7^FROUT free8";
  break;

  case "ishan_example_2_A":
  var mol = "L 1 2 3^L 4 5 6^A 2 5 4^FO 3 free7 free8^L 9 10 11^A 12 13 9^FO 10 13 12^A 11 6 1^A free7 id1 free77^A free8 id2 free88^L id11 id11 id1^L id22 id22 id2^FROUT free77^FROUT free88";
  break;

  case "ishan_example_2_pair":
  var mol = "FROUT out^A first prm out^L 1first pfirst first^A pfirst 2first 1first^L 3first xfirst 2first^L xfirst yfirst 3first^T yfirst^A 1q b prm^A pair a 1q^L 1pair xpair pair^L 2pair ypair 1pair^L 3pair zpair 2pair^A 4pair ypair 3pair^A zpair xpair 4pair^L 1 2 3^L 4 5 6^A 2 5 4^FOE 3 a b^L 9 10 11^A 12 13 9^FO 10 13 12^A 11 6 1";
  break;

  case "ishan_example_2_pair_fo":
  var mol = "FROUT out^A first prm out^L 1first pfirst first^A pfirst 2first 1first^L 3first xfirst 2first^L xfirst yfirst 3first^T yfirst^A 1q b prm^A pair a 1q^L 1pair xpair pair^L 2pair ypair 1pair^L 3pair zpair 2pair^A 4pair ypair 3pair^A zpair xpair 4pair^L 1 2 3^L 4 5 6^A 2 5 4^FO 3 a b^L 9 10 11^A 12 13 9^FO 10 13 12^A 11 6 1";
  break;

  case "first_pair":
  var mol = "FROUT out^A first 1 out^A 2 b 1^A pair a 2^L 1pair xpair pair^L 2pair ypair 1pair^L 3pair zpair 2pair^A 4pair ypair 3pair^A zpair xpair 4pair^L 1first pfirst first^A pfirst 2first 1first^L 3first xfirst 2first^L xfirst yfirst 3first^T yfirst^L 1c0 fc0 b^L xc0 xc0 1c0^T fc0^L 2num 1num a^L 3num xnum 2num^FO 1num m1num l1pnum^A m1num r1pnum 3num^FO l1pnum m1pnum l1ppnum^A m1pnum r1ppnum r1pnum^FO l1ppnum m1ppnum l1num^A m1ppnum r1num r1ppnum^FO l1num m2num l2num^A m2num r2num r1num^A l2num xnum r2num";
  break;

  case "dodecahedron":
  var mol = "FOE 10x 10xai 10xbi^FI 10xb 10xa 0x^FOE 10xai 10xaia 10xaib^FI 10xaib 10xaia 10xa^FOE 10xbi 10xbia 10xbib^FI 10xbib 10xbia 10xb^FOE 10y 10yai 10ybi^FI 10yb 10ya 0y^FOE 10yai 10yaia 10yaib^FI 10yaib 10yaia 10ya^FOE 10ybi 10ybia 10ybib^FI 10ybib 10ybia 10yb^FOE 1ky 1kyai 1kybi^FI 1kyb 1kya 1y^FOE 1kybi 1kybia 1kybib^FI 1kybib 1kybia 1kyb^FOE 1kyai 1kyaia 1kyaib^FI 1kyaib 1kyaia 1kya^A 9x 12ad 10x^L 9y 12ad 1ky^A 8x 22ad 9x^L 8y 22ad 10y^A 7x 12 8x^L 7y 12 9y^A 6x 22 7x^L 6y 22 8y^A 5x 32 6x^L 5y 32 7y^A 4x 42 5x^L 4y 42 6y^A 3x 12o 4x^L 3y 12o 5y^A 2x 22o 3x^L 2y 22o 4y^A 1x 32o 2x^L 1y 32o 3y^A 0x 42o 1x^L 0y 42o 2y";
  break;

  case "y_comb":
  var mol = "A 1 g out^L 2 f 1^FO f 11 12^A 3 4 2^L 9 x 3^FO x 5 6^A 5 6 13^A 11 13 9^L 10 y 4^FO y 7 8^A 7 8 14^A 12 14 10^FRIN g^FROUT out";
  break;

  case "y_comb_id":
  var mol = "A 1 g out^L 2 f 1^FO f 11 12^A 3 4 2^L 9 x 3^FO x 5 6^A 5 6 13^A 11 13 9^L 10 y 4^FO y 7 8^A 7 8 14^A 12 14 10^FROUT out^L z z g";
  break;

  case "16_quine_A_L_FI_FO":
  var mol = "FO a1 a2 a3^L a4 a5 a7^FO a6 a8 a9^FOE a10 a11 a12^FI a7 a20 a10^FI a2 a8 a6^FOE a17 a13 a14^FI a3 a9 a16^A a11 a13 a21^A a12 a14 a4^FI a19 a16 a20^FI a5 a22 a17^FOE a21 a18 a23^FI a15 a24 a22^L a18 a24 a1^L a23 a15 a19";
  break;

  case "20_quine":
  var mol = "FOE 6 16 7^A 15 2 6^L 20 35 36^A 36 1 37^FOE 8 18 9^A 17 7 8^FI 28 42 26^FOE 26 30 17^FI 38 39 24^FOE 24 1 15^L 9 19 10^FOE 10 20 11^A 30 16 27^FI 33 32 38^FI 19 31 28^FI 21 35 34^FI 34 37 33^L 27 42 39^L 18 31 32^L 11 21 2";
  break;

  case "A":
  var mol = "A 1 2 3";
  break;

  case "L":
  var mol = "L 1 2 3";
  break;

  case "28_quine":
  var mol = "FOE 2 12 3^FOE 3 13 4^FOE 4 14 5^FOE 6 16 7^FOE 8 18 9^FOE 10 20 11^FOE 24 29 15^FOE 26 30 17^A 12 22 1^A 23 13 22^A 41 25 40^A 15 5 6^A 29 14 25^A 30 16 27^A 17 7 8^A 36 1 37^FI 28 42 26^FI 33 32 38^FI 38 39 24^FI 19 31 28^FI 21 35 34^FI 34 37 33^L 40 41 23^L 27 42 39^L 18 31 32^L 9 19 10^L 20 35 36^L 11 21 2";
  break;

  case "3_3_FI_FO_A_L":
  var mol = "A 0 1 2^L 2 1 3^FI 3 4 5^FO 5 4 0";
  break;

  case "9_quine":
  var mol = "FOE 1 11 10^FOE 9 17 16^FOE 7 15 14^A 8 6 5^A 16 14 6^A 17 15 7^FI 12 13 1^L 10 12 8^L 11 13 9";
  break;

  case "10_quine_bubbles":
  var mol = "L 5 1 2^FI 1 7 6^A 2 3 4^FI 4 6 9^L 8 7 10^FOE 9 5 8^FOE 10 12 11^A 12 15 13^FOE 13 15 14^A 11 14 3";
  break;

  case "20_20_hybrid":
  var mol = "FOE 6a 16 7bc^FOE 8 18 9b^FOE 10a 20 11b^FOE 24 1 15b^FOE 26a 30 17b^A 15 2 6b^A 30a 16 27b^A 17 7 8b^A 36a 1 37b^FI 28 42 26b^FI 33a 32 38b^FI 38 39 24b^FI 19a 31 28b^FI 21 35 34b^FI 34a 37 33b^L 27 42 39b^L 18a 31 32b^L 9 19 10b^L 20a 35 36b^L 11 21 2b^FOE 6 16a 7abc^FOE 8a 18a 9ab^FOE 10 20a 11ab^FOE 24a 1a 15ab^FOE 26 30a 17ab^A 15a 2a 6ab^A 30 16a 27ab^A 17a 7a 8ab^A 36 1a 37ab^FI 28a 42a 26ab^FI 33 32a 38ab^FI 38a 39a 24ab^FI 19 31a 28ab^FI 21a 35a 34ab^FI 34 37a 33ab^L 27a 42a 39ab^L 18 31a 32ab^L 9a 19a 10ab^L 20 35a 36ab^L 11a 21a 2ab^FOE 6ab 16b 7c^FOE 8b 18b 9^FOE 10ab 20b 11^FOE 24b 1b 15^FOE 26ab 30b 17^A 15b 2b 6^A 30ab 16b 27^A 17b 7b 8^A 36ab 1b 37^FI 28b 42b 26^FI 33ab 32b 38^FI 38b 39b 24^FI 19ab 31b 28^FI 21b 35b 34^FI 34ab 37b 33^L 27b 42b 39^L 18ab 31b 32^L 9b 19b 10^L 20ab 35b 36^L 11b 21b 2^FOE 6b 16ab 7ac^FOE 8ab 18ab 9a^FOE 10b 20ab 11a^FOE 24ab 1ab 15a^FOE 26b 30ab 17a^A 15ab 2ab 6a^A 30b 16ab 27a^A 17ab 7ab 8a^A 36b 1ab 37a^FI 28ab 42ab 26a^FI 33b 32ab 38a^FI 38ab 39ab 24a^FI 19b 31ab 28a^FI 21ab 35ab 34a^FI 34b 37ab 33a^L 27ab 42ab 39a^L 18b 31ab 32a^L 9ab 19ab 10a^L 20b 35ab 36a^L 11ab 21ab 2a^FOE 6ac 16c 7b^FOE 8c 18c 9bc^FOE 10ac 20c 11bc^FOE 24c 1c 15bc^FOE 26ac 30c 17bc^A 15c 2c 6bc^A 30ac 16c 27bc^A 17c 7c 8bc^A 36ac 1c 37bc^FI 28c 42c 26bc^FI 33ac 32c 38bc^FI 38c 39c 24bc^FI 19ac 31c 28bc^FI 21c 35c 34bc^FI 34ac 37c 33bc^L 27c 42c 39bc^L 18ac 31c 32bc^L 9c 19c 10bc^L 20ac 35c 36bc^L 11c 21c 2bc^FOE 6c 16ac 7ab^FOE 8ac 18ac 9abc^FOE 10c 20ac 11abc^FOE 24ac 1ac 15abc^FOE 26c 30ac 17abc^A 15ac 2ac 6abc^A 30c 16ac 27abc^A 17ac 7ac 8abc^A 36c 1ac 37abc^FI 28ac 42ac 26abc^FI 33c 32ac 38abc^FI 38ac 39ac 24abc^FI 19c 31ac 28abc^FI 21ac 35ac 34abc^FI 34c 37ac 33abc^L 27ac 42ac 39abc^L 18c 31ac 32abc^L 9ac 19ac 10abc^L 20c 35ac 36abc^L 11ac 21ac 2abc^FOE 6abc 16bc 7^FOE 8bc 18bc 9c^FOE 10abc 20bc 11c^FOE 24bc 1bc 15c^FOE 26abc 30bc 17c^A 15bc 2bc 6c^A 30abc 16bc 27c^A 17bc 7bc 8c^A 36abc 1bc 37c^FI 28bc 42bc 26c^FI 33abc 32bc 38c^FI 38bc 39bc 24c^FI 19abc 31bc 28c^FI 21bc 35bc 34c^FI 34abc 37bc 33c^L 27bc 42bc 39c^L 18abc 31bc 32c^L 9bc 19bc 10c^L 20abc 35bc 36c^L 11bc 21bc 2c^FOE 6bc 16abc 7a^FOE 8abc 18abc 9ac^FOE 10bc 20abc 11ac^FOE 24abc 1abc 15ac^FOE 26bc 30abc 17ac^A 15abc 2abc 6ac^A 30bc 16abc 27ac^A 17abc 7abc 8ac^A 36bc 1abc 37ac^FI 28abc 42abc 26ac^FI 33bc 32abc 38ac^FI 38abc 39abc 24ac^FI 19bc 31abc 28ac^FI 21abc 35abc 34ac^FI 34bc 37abc 33ac^L 27abc 42abc 39ac^L 18bc 31abc 32ac^L 9abc 19abc 10ac^L 20bc 35abc 36ac^L 11abc 21abc 2ac";
  break;

  case "16_quine_A_L_FI_FO_duplicate":
  var mol = "FO a1 a2 a3^L a4 a5 a7^FO a6 a8 a9^FOE a10 a11 a12^FI a7 a20 a10^FI a2 a8 a6^FOE a17 a13 a14^FI a33 a9 a16^A a11 a13 a21^A a12 a14 a4^FI a19 a16 a20^FI a5 a22 a17^FOE a21 a18 a23^FI a15 a24 a22^L a18 a24 a1^L a23 a15 a19^FI a3 2 1^FO 1 2 a33";
  break;

  case "random_16_quine_A_L_FI_FO_duplicate":
  var shu = [];
  for (var i=0; i<27; i++) {
    shu.push(i);
  }
  var mi = 27, tm, ii;
  // While there remain elements to shuffle
  while (mi) {
    // Pick a remaining element
    ii = Math.floor(Math.random() * mi--);
    // And swap it with the current element.
    tm = shu[mi];
    shu[mi] = shu[ii];
    shu[ii] = tm;
  }
  var mol = "FO 0 " + shu[6] + " " + shu[24] + "^L 1 " + shu[17] + " " + shu[4] + "^FO 2 " + shu[7] + " " + shu[10] + "^FOE 3 " + shu[11] + " " + shu[13] + "^FI 4 5 " + shu[3] + "^FI 6 7 " + shu[2] + "^FOE 8 " + shu[12] + " " + shu[14] + "^FI 9 10 " + shu[16] + "^A 11 12 " + shu[19] + "^A 13 14 " + shu[1] + "^FI 15 16 " + shu[5] + "^FI 17 18 " + shu[8] + "^FOE 19 " + shu[22] + " " + shu[23] + "^FI 20 21 " + shu[18] + "^L 22 " + shu[21] + " " + shu[0] + "^L 23 " + shu[20] + " " + shu[15] + "^FI 24 25 " + shu[26] + "^FO 26 " + shu[25] + " " + shu[9];
  break;



  case "bigpred_train":
  var mol = "FOE 2 12 3a^A 12 22a 1^FOE 3a na1 3o1^A na1 22a1 22a^FOE 3o1 na2 3o2^A na2 22a2 22a1^FOE 3o2 na3 3o3^A na3 22a3 22a2^FOE 3o3 na4 3o4^A na4 22a4 22a3^FOE 3o4 na5 3o5^A na5 22a5 22a4^FOE 3o5 na6 3o6^A na6 22a6 22a5^FOE 3o6 na7 3o7^A na7 22a7 22a6^FOE 3o7 na8 3o8^A na8 22a8 22a7^FOE 3o8 na9 3o9^A na9 22a9 22a8^FOE 3o9 na10 3o10^A na10 22a10 22a9^FOE 3o10 na11 3o11^A na11 22a11 22a10^FOE 3o11 na12 3o12^A na12 22a12 22a11^FOE 3o12 na13 3o13^A na13 22a13 22a12^FOE 3o13 na14 3o14^A na14 22a14 22a13^FOE 3o14 na15 3o15^A na15 22a15 22a14^FOE 3o15 na16 3o16^A na16 22a16 22a15^FOE 3o16 na17 3o17^A na17 22a17 22a16^FOE 3o17 na18 3o18^A na18 22a18 22a17^FOE 3o18 na19 3o19^A na19 22a19 22a18^FOE 3o19 na20 3o20^A na20 22a20 22a19^FOE 3o20 na21 3o21^A na21 22a21 22a20^FOE 3o21 na22 3o22^A na22 22a22 22a21^FOE 3o22 na23 3o23^A na23 22a23 22a22^FOE 3o23 na24 3o24^A na24 22a24 22a23^FOE 3o24 na25 3o25^A na25 22a25 22a24^FOE 3o25 na26 3o26^A na26 22a26 22a25^FOE 3o26 na27 3o27^A na27 22a27 22a26^FOE 3o27 na28 3o28^A na28 22a28 22a27^FOE 3o28 na29 3o29^A na29 22a29 22a28^FOE 3o29 na30 3o30^A na30 22a30 22a29^FOE 3o30 na31 3o31^A na31 22a31 22a30^FOE 3o31 na32 3^A na32 22 22a31^FOE 3 13 4^FOE 4 14 5^FOE 6 16 7^FOE 8 18 9^FOE 10 20 11^FOE 24 29 15^FOE 26 30 17^A 23 13 22^A 41 25 40^A 15 5 6^A 29 14 25^A 30 16 27^A 17 7 8^A 36 1 37^FI 28 42 26^FI 33 32 38^FI 38 39 24^FI 19 31 28^FI 21 35 34^FI 34 37 33^L 40 41 23^L 27 42 39^L 18 31 32^L 9 19 10^L 20 35 36^L 11 21 2";
  break;

  case "spiral_boole_construct":
  var mol = "A inter outunu out^A num outsuc inter^L 1num fnum num^L 2num xnum 1num^FO fnum m1num le1num^A m1num ri1num 2num^FO le1num m2num le2num^A m2num ri2num ri1num^FO le2num m3num le3num^A m3num ri3num ri2num^FO le3num m4num le4num^A m4num ri4num ri3num^FO le4num m5num m6num^A m5num ri5num ri4num^A m6num xnum ri5num^A 0eu 0a2 0a1^A 0a1 0n 0wu^A 0a7 0a6 0ed^L 0a8 0a7 0s^A 0a5 0wd 0a6^L 0a9 0a9 0a8^L 0a4 0a3 0a2^L 0a3 0a5 0a4^A 1eu 1a2 1a1^A 1a1 1n 0eu^A 1a7 1a6 1ed^L 1a8 1a7 1s^A 1a5 0ed 1a6^L 1a9 1a9 1a8^L 1a4 1a3 1a2^L 1a3 1a5 1a4^A 2eu 2a2 2a1^A 2a1 2n 1eu^A 2a7 2a6 2ed^L 2a8 2a7 2s^A 2a5 1ed 2a6^L 2a9 2a9 2a8^L 2a4 2a3 2a2^L 2a3 2a5 2a4^A 3eu 3a2 3a1^A 3a1 3n 2eu^A 3a7 3a6 3ed^L 3a8 3a7 3s^A 3a5 2ed 3a6^L 3a9 3a9 3a8^L 3a4 3a3 3a2^L 3a3 3a5 3a4^A 4eu 4a2 4a1^A 4a1 4n 3eu^A 4a7 4a6 4ed^L 4a8 4a7 4s^A 4a5 3ed 4a6^L 4a9 4a9 4a8^L 4a4 4a3 4a2^L 4a3 4a5 4a4^A 5eu 5a2 5a1^A 5a1 5n 4eu^A 5a7 5a6 5ed^L 5a8 5a7 5s^A 5a5 4ed 5a6^L 5a9 5a9 5a8^L 5a4 5a3 5a2^L 5a3 5a5 5a4^A ar1 ar0 5eu^A ar2 5s ar1^A ar3 4s ar2^A ar4 3s ar3^A ar5 2s ar4^A ar6 1s ar5^A ar7 0s ar6^A ar8 5ed ar7^L 0wu ar0 br1^L br1 5n br2^L br2 4n br3^L br3 3n br4^L br4 2n br5^L br5 1n br6^L br6 0n br7^L br7 0wd br8^L br8 ar8 outsuc^L p0wu par0 pbr1^L pbr1 p5n pbr2^L pbr2 p4n pbr3^L pbr3 p3n pbr4^L pbr4 p2n pbr5^L pbr5 p1n pbr6^L pbr6 p0n pbr7^L pbr7 p0wd outunu^^A p5n par1 p5eu^A p4n par2 par1^A p3n par3 par2^A p2n par4 par3^A p1n par5 par4^A p0n par6 par5^A p0wd par0 par6";
  break;

  case "tubefact":
  var mol = "L 0p lp outsuc^L 1s lfs 0p^L 0s 1in 1s^L 0i 0in 0s^A 1i 0out 0i^A 0f 1out 1i^A lp lfs 0f^FO 1in a b^A succ a 1out^A tms b c^A c 0in 0out^L 1succ nsucc succ^L 2succ ssucc 1succ^L 3succ zsucc 2succ^A 4succ 6succ 3succ^FO ssucc 4succ 5succ^A 7succ zsucc 6succ^A nsucc 5succ 7succ^L 1tms mtms tms^L 2tms ntms 1tms^L 3tms ftms 2tms^A mtms 4tms 3tms^A ntms ftms 4tms^A inter outunu out^A num outsuc inter^L p1s plfs outunu^L p0s p1in p1s^L p0i p0in p0s^A plfs p1in p1i^A p1i p0in p0i^A out 1numb numbers^A numbers 1nums 2numb^A 2numb 2nums outfinal^L 11nums f1nums 1nums^L 21nums x1nums 11nums^A f1nums x1nums 21nums^L 12nums f2nums 2nums^L 22nums x2nums 12nums^A f2nums x2nums 22nums^L 1num fnum num^L 2num xnum 1num^FO fnum m1num le1num^A m1num ri1num 2num^FO le1num m2num le2num^A m2num ri2num ri1num^FO le2num m3num le4num^A m3num ri4num ri2num^FO le4num m5num m6num^A m5num ri5num ri4num^A m6num xnum ri5num";
  break;

  case "ackermann_2_2":
  var mol = "A 1 cb o^A 2 ca 1^L 3 a 2^L 4 b 3^A 5 b 4^A 6 sp1 5^A a f 6^L 1s1 ns1 sp1^L 2s1 ss1 1s1^L 3s1 zs1 2s1^A 4s1 5s1 3s1^A 6s1 zs1 5s1^A ns1 7s1 6s1^FO ss1 4s1 7s1^L 1f Af f^L 2f bf 1f^A 3f cone 2f^A 4f Af 3f^A sp2 bf 4f^L 1s2 ns2 sp2^L 2s2 ss2 1s2^L 3s2 zs2 2s2^A 4s2 5s2 3s2^A 6s2 zs2 5s2^A ns2 7s2 6s2^FO ss2 4s2 7s2^L 1cone fcone cone^L 2cone xcone 1cone^A fcone xcone 2cone^L 1ca fca ca^L 2ca xca 1ca^A 3ca 4ca 2ca^A 5ca xca 4ca^FO fca 3ca 5ca^L 1cb fcb cb^L 2cb xcb 1cb^A 3cb 4cb 2cb^A 5cb xcb 4cb^FO fcb 3cb 5cb^FROUT o";
  break;

  case "ackermann_2_2-var":
  var mol = "A 1 cb o^A 2 ca 1^L 3 a 2^L 4 b 3^A 5 b 4^A 6 sp1 5^A a f 6^L 1s1 ns1 sp1^L 2s1 ss1 1s1^L 3s1 zs1 2s1^A 4s1 5s1 3s1^A 6s1 zs1 5s1^A ns1 7s1 6s1^FO ss1 4s1 7s1^L 1f Af f^L 2f bf 1f^A 3f cone 2f^A 4f Af 3f^A sp2 bf 4f^L 1s2 ns2 sp2^L 2s2 ss2 1s2^L 3s2 zs2 2s2^A 4s2 5s2 3s2^A 6s2 zs2 5s2^A ns2 7s2 6s2^FOE ss2 4s2 7s2^L 1cone fcone cone^L 2cone xcone 1cone^A fcone xcone 2cone^L 1ca fca ca^L 2ca xca 1ca^A 3ca 4ca 2ca^A 5ca xca 4ca^FO fca 3ca 5ca^L 1cb fcb cb^L 2cb xcb 1cb^A 3cb 4cb 2cb^A 5cb xcb 4cb^FOE fcb 3cb 5cb^FROUT o";
  break;

  case "ackermann_3_2":
  var mol = "A 1 cb o^A 2 ca 1^L 3 a 2^L 4 b 3^A 5 b 4^A 6 sp1 5^A a f 6^L 1s1 ns1 sp1^L 2s1 ss1 1s1^L 3s1 zs1 2s1^A 4s1 5s1 3s1^A 6s1 zs1 5s1^A ns1 7s1 6s1^FO ss1 4s1 7s1^L 1f Af f^L 2f bf 1f^A 3f cone 2f^A 4f Af 3f^A sp2 bf 4f^L 1s2 ns2 sp2^L 2s2 ss2 1s2^L 3s2 zs2 2s2^A 4s2 5s2 3s2^A 6s2 zs2 5s2^A ns2 7s2 6s2^FO ss2 4s2 7s2^L 1cone fcone cone^L 2cone xcone 1cone^A fcone xcone 2cone^L 1ca fca ca^L 2ca xca 1ca^A 3ca 5ca 2ca^FO fca 3ca 4ca^A 6ca 8ca 5ca^FO 4ca 6ca 7ca^A 7ca xca 8ca^L 1cb fcb cb^L 2cb xcb 1cb^A 3cb 4cb 2cb^A 5cb xcb 4cb^FO fcb 3cb 5cb";
  break;



  case "times_only":
  var mol = "L 14c1c1 24c1c1 c0^L 44c1c1 44c1c1 14c1c1^T 24c1c1^L 2num 1num v^L 3num xnum 2num^FO 1num m1num l1pnum^A m1num r1pnum 3num^FO l1pnum m1pnum l1ppnum^A m1pnum r1ppnum r1pnum^FO l1ppnum m1ppnum l1num^A m1ppnum r1num r1ppnum^FO l1num m2num l2num^A m2num r2num r1num^A l2num xnum r2num^L 2num1 1num1 u^L 3num1 xnum1 2num1^FO 1num1 m1num1 l1pnum1^A m1num1 r1pnum1 3num1^FO l1pnum1 m1pnum1 l1ppnum1^A m1pnum1 r1ppnum1 r1pnum1^FO l1ppnum1 m1ppnum1 l1num1^A m1ppnum1 r1num1 r1ppnum1^FO l1num1 m2num1 l2num1^A m2num1 r2num1 r1num1^A l2num1 xnum1 r2num1^A 1tms c0 tms^A v 2tms 1tms^A plus u 2tms^L 3tms 4tms plus^L 5tms 6tms 3tms^A 7tms 4tms 5tms^A 6tms succ 7tms^L 1succ nsucc succ^L 2succ ssucc 1succ^L 3succ zsucc 2succ^A 4succ 6succ 3succ^FO ssucc 4succ 5succ^A 7succ zsucc 6succ^A nsucc 5succ 7succ^FROUT tms";
  break;

  case "times_only_short":
  var mol = "FROUT out^A 1 u out^A 2 v 1^L 3 m 2^L 4 n 3^L 5 f 4^A m 6 5^A n f 6^L 2num 1num v^L 3num xnum 2num^FO 1num m1num l1pnum^A m1num r1pnum 3num^FO l1pnum m1pnum l1ppnum^A m1pnum r1ppnum r1pnum^FO l1ppnum m1ppnum l1num^A m1ppnum r1num r1ppnum^FO l1num m2num l2num^A m2num r2num r1num^A l2num xnum r2num^L 2num1 1num1 u^L 3num1 xnum1 2num1^FO 1num1 m1num1 l1pnum1^A m1num1 r1pnum1 3num1^FO l1pnum1 m1pnum1 l1ppnum1^A m1pnum1 r1ppnum1 r1pnum1^FO l1ppnum1 m1ppnum1 l1num1^A m1ppnum1 r1num1 r1ppnum1^FO l1num1 m2num1 l2num1^A m2num1 r2num1 r1num1^A l2num1 xnum1 r2num1";
  break;

  case "times_only_long":
  var mol = "FROUT out^A 1 num1 out^A 2 num 1^L 3 m 2^L 4 n 3^A 5 c0 4^A m 6 5^A PLUS n 6^L 1PLUS mPLUS PLUS^L 2PLUS nPLUS 1PLUS^A 3PLUS nPLUS 2PLUS^A mPLUS SUCC 3PLUS^L 1SUCC nSUCC SUCC^L 2SUCC fSUCC 1SUCC^L 3SUCC xSUCC 2SUCC^FO fSUCC 5SUCC 6SUCC^A 5SUCC 4SUCC 3SUCC^A 7SUCC xSUCC 4SUCC^A nSUCC 6SUCC 7SUCC^L 1c0 fc0 c0^L xc0 xc0 1c0^T fc0^L 2num 1num num^L 3num xnum 2num^FO 1num m1num l1pnum^A m1num r1pnum 3num^FO l1pnum m1pnum l1ppnum^A m1pnum r1ppnum r1pnum^FO l1ppnum m1ppnum l1num^A m1ppnum r1num r1ppnum^FO l1num m2num l2num^A m2num r2num r1num^A l2num xnum r2num^L 2num1 1num1 num1^L 3num1 xnum1 2num1^FO 1num1 m1num1 l1pnum1^A m1num1 r1pnum1 3num1^FO l1pnum1 m1pnum1 l1ppnum1^A m1pnum1 r1ppnum1 r1pnum1^FO l1ppnum1 m1ppnum1 l1num1^A m1ppnum1 r1num1 r1ppnum1^FO l1num1 m2num1 l2num1^A m2num1 r2num1 r1num1^A l2num1 xnum1 r2num1";
  break;

  case "times_only_long_2":
  var mol = "FROUT out^A 1 num1 out^A 2 num 1^L 3 m 2^L 4 n 3^A 5 c0 4^A m 6 5^A PLUS n 6^L 1PLUS mPLUS PLUS^L 2PLUS nPLUS 1PLUS^L 3PLUS fPLUS 2PLUS^FO fPLUS 7PLUS 8PLUS^L 4PLUS xPLUS 3PLUS^A 5PLUS 6PLUS 4PLUS^A mPLUS 7PLUS 5PLUS^A 9PLUS xPLUS 6PLUS^A nPLUS 8PLUS 6PLUS^L 1c0 fc0 c0^L xc0 xc0 1c0^T fc0^L 2num 1num num^L 3num xnum 2num^FO 1num m1num l1pnum^A m1num r1pnum 3num^FO l1pnum m1pnum l1ppnum^A m1pnum r1ppnum r1pnum^FO l1ppnum m1ppnum l1num^A m1ppnum r1num r1ppnum^FO l1num m2num l2num^A m2num r2num r1num^A l2num xnum r2num^L 2num1 1num1 num1^L 3num1 xnum1 2num1^FO 1num1 m1num1 l1pnum1^A m1num1 r1pnum1 3num1^FO l1pnum1 m1pnum1 l1ppnum1^A m1pnum1 r1ppnum1 r1pnum1^FO l1ppnum1 m1ppnum1 l1num1^A m1ppnum1 r1num1 r1ppnum1^FO l1num1 m2num1 l2num1^A m2num1 r2num1 r1num1^A l2num1 xnum1 r2num1";
  break;

  case "pwheel_8":
  var mol = "A p1 p1b p1a^FOE p1a p1out p1b^A p2 p2b p2a^FOE p2a p2out p2b^A p3 p3b p3a^FOE p3a p3out p3b^A p4 p4b p4a^FOE p4a p4out p4b^A p5 p5b p5a^FOE p5a p5out p5b^A p6 p6b p6a^FOE p6a p6out p6b^A p7 p7b p7a^FOE p7a p7out p7b^A p8 p8b p8a^FOE p8a p8out p8b^L a8 a1 p1^L a1 a2 p2^L a2 a3 p3^L a3 a4 p4^L a4 a5 p5^L a5 a6 p6^L a6 a7 p7^L a7 a8 p8";
  break;

  case "omega":
  var mol = "FROUT out^A 1 2 out^L 3 x 1^FO x 5 7^A 5 7 3^L 4 y 2^FO y 6 8^A 6 8 4";
  break;

  case "lisfact_2_mod":
  var mol = "A 1 2c1c1 1out^A 2 3c1c1 2out^L 12c1c1 22c1c1 2c1c1^L 42c1c1 32c1c1 12c1c1^A 22c1c1 32c1c1 42c1c1^L 13c1c1 23c1c1 3c1c1^L 43c1c1 33c1c1 13c1c1^A 23c1c1 33c1c1 43c1c1^FOE 3 1 2^A num 4 3^L 2num 1num num^L 3num xnum 2num^FO 1num m1num l1pnum^A m1num r1pnum 3num^FO l1pnum m1pnum l1num^A m1pnum r1num r1pnum^FO l1num m2num l2num^A m2num r2num r1num^A l2num xnum r2num^FI 6 5 4^L tms v 6^L sp 8 5^FO 8 in1 u^L 1sp 2sp sp^L 4sp 3sp 1sp^FO 2sp 5sp 6sp^A 5sp 7sp 4sp^A 8sp 3sp 7sp^A in1 6sp 8sp^L 1times mtimes times^L 2times ntimes 1times^L 3times ftimes 2times^A mtimes 4times 3times^A ntimes ftimes 4times^A times u utms^A utms v tms^A 2out succ coco^A coco c0 outfin^L 1succ nsucc succ^L 2succ ssucc 1succ^L 3succ zsucc 2succ^A 4succ 6succ 3succ^FO ssucc 4succ 5succ^A 7succ zsucc 6succ^A nsucc 5succ 7succ^L 1c0 2c0 c0^L 3c0 3c0 1c0^T 2c0";
  break;



  case "claudia_starmaker":
  var mol = "FI dcba3 dcba1 dcba15^FOE dcba15 dcba4 dcb2^L dcba4 dcba1 dcba5^L dcba2 dcba3 dcba12^FOE dcba5 dcba6 dcba8^FOE dcba12 dcba7 dcba9^A dcba6 dcba7 dcba14^A dcba8 dcba9 dcba11^FO dcba10 dcba17 dcba20^FO dcba16 dcba19 dcba18^FI dcba17 dcba19 dcba16^FI dcba20 dcba18 dcba13^A dcba13 dcba11 dcba10^FI dcb3 dcb1 dcb15^FOE dcb15 dcb4 dc2^L dcb4 dcb1 dcb5^L dcb2 dcb3 dcb12^FOE dcb5 dcb6 dcb8^FOE dcb12 dcb7 dcb9^A dcb6 dcb7 dcb14^A dcb8 dcb9 dcb11^FO dcb10 dcb17 dcb20^FO dcb16 dcb19 dcb18^FI dcb17 dcb19 dcb16^FI dcb20 dcb18 dcb13^A dcb13 dcb11 dcb10^FI dc3 dc1 dc15^FOE dc15 dc4 d2^L dc4 dc1 dc5^L dc2 dc3 dc12^FOE dc5 dc6 dc8^FOE dc12 dc7 dc9^A dc6 dc7 dc14^A dc8 dc9 dc11^FO dc10 dc17 dc20^FO dc16 dc19 dc18^FI dc17 dc19 dc16^FI dc20 dc18 dc13^A dc13 dc11 dc10^FI d3 d1 d15^FOE d15 d4 2^L d4 d1 d5^L d2 d3 d12^FOE d5 d6 d8^FOE d12 d7 d9^A d6 d7 d14^A d8 d9 d11^FO d10 d17 d20^FO d16 d19 d18^FI d17 d19 d16^FI d20 d18 d13^A d13 d11 d10^FI 3 1 15^FOE 15 4 dcba2^L 4 1 5^L 2 3 12^FOE 5 6 8^FOE 12 7 9^A 6 7 14^A 8 9 11^FO 10 17 20^FO 16 19 18^FI 17 19 16^FI 20 18 13^A 13 11 10";
  break;

  case "tape_long_4653_2":
  var mol = "FOE q13 q6 5^FOE q14 4 q3^A q23 q12 q13^FO q12p qb13 qb12^A qb13 qb12 q12^L q24 q12p q14^A q33 q22 q23^L q34 q22 q24^A q43 q32 q33^FO q32p qb33 qb32^A qb33 qb32 q32^L q44 q32p q34^A q1 q42 q43^L q2 q42 q44^A q23o q12o q1^FO q12po qb13o qb12o^A qb13o qb12o q12o^L q24o q12po q2^A q33o q22o q23o^L q34o q22o q24o^A q43o q32o q33o^FO q32po qb33o qb32o^A qb33o qb32o q32o^L q44o q32po q34o^A qzz13 q42o q43o^L qzz14 q42o q44o^A qzz23 qzz12 qzz13^FO qzz12p qzzb13 qzzb12^A qzzb13 qzzb12 qzz12^L qzz24 qzz12p qzz14^A qzz33 qzz22 qzz23^L qzz34 qzz22 qzz24^A qzz43 qzz32 qzz33^FO qzz32p qzzb33 qzzb32^A qzzb33 qzzb32 qzz32^L qzz44 qzz32p qzz34^A qzz1 qzz42 qzz43^L qzz2 qzz42 qzz44^A qzz23o qzz12o qzz1^FO qzz12po qzzb13o qzzb12o^A qzzb13o qzzb12o qzz12o^L qzz24o qzz12po qzz2^A qzz33o qzz22o qzz23o^L qzz34o qzz22o qzz24o^A qzz43o qzz32o qzz33o^FO qzz32po qzzb33o qzzb32o^A qzzb33o qzzb32o qzz32o^L qzz44o qzz32po qzz34o^A q1o qzz42o qzz43o^L q2o qzz42o qzz44o^Arrow 4 q1a^Arrow q6 q2a^Arrow q5 q1b^Arrow q3 q2b^FI q1a q1b q1o^FI q2a q2b q2o^FOE 13 6 q5^FOE 14 q4 3^A 23 12 13^FO 12p b13 b12^A b13 b12 12^L 24 12p 14^A 33 22 23^L 34 22 24^A 43 32 33^FO 32p b33 b32^A b33 b32 32^L 44 32p 34^A 1 42 43^L 2 42 44^A 23o 12o 1^FO 12po b13o b12o^A b13o b12o 12o^L 24o 12po 2^A 33o 22o 23o^L 34o 22o 24o^A 43o 32o 33o^FO 32po b33o b32o^A b33o b32o 32o^L 44o 32po 34o^A zz13 42o 43o^L zz14 42o 44o^A zz23 zz12 zz13^FO zz12p zzb13 zzb12^A zzb13 zzb12 zz12^L zz24 zz12p zz14^A zz33 zz22 zz23^L zz34 zz22 zz24^A zz43 zz32 zz33^FO zz32p zzb33 zzb32^A zzb33 zzb32 zz32^L zz44 zz32p zz34^A zz1 zz42 zz43^L zz2 zz42 zz44^A zz23o zz12o zz1^FO zz12po zzb13o zzb12o^A zzb13o zzb12o zz12o^L zz24o zz12po zz2^A zz33o zz22o zz23o^L zz34o zz22o zz24o^A zz43o zz32o zz33o^FO zz32po zzb33o zzb32o^A zzb33o zzb32o zz32o^L zz44o zz32po zz34o^A 1o zz42o zz43o^L 2o zz42o zz44o^Arrow q4 1a^Arrow 6 2a^Arrow 5 1b^Arrow 3 2b^FI 1a 1b 1o^FI 2a 2b 2o";
  break;

  case "bigpred":
  var mol = "L 3 2 1^T 2^L 6 6 5^L 4 3 7^L 7 8 9^A 10 8 11^A 12 11 13^L 13 12 14^L 14 10 a43^A a42 5 4^A a03 1 a02^FO a13b a11 a03^A a11 a02 a12b^FO a43 a41 a13^A a41 a12 a42^FO a13 u1 u2l^A u1 u2r a12^FO u2l u2 u3l^FO u3l u3 u4l^FO u4l u4 u5l^FO u5l u5 u6l^FO u6l u6 u7l^FO u7l u7 u8l^FO u8l u8 u9l^FO u9l u9 u2ls^A u2 u3r u2r^A u3 u4r u3r^A u4 u5r u4r^A u5 u6r u5r^A u6 u7r u6r^A u7 u8r u7r^A u8 u9r u8r^A u9 u2rs u9r^FO u2ls u2s u3ls^FO u3ls u3s u4ls^FO u4ls u4s u5ls^FO u5ls u5s u6ls^FO u6ls u6s u7ls^FO u7ls u7s u8ls^FO u8ls u8s u9ls^FO u9ls u9s u2ld^A u2s u3rs u2rs^A u3s u4rs u3rs^A u4s u5rs u4rs^A u5s u6rs u5rs^A u6s u7rs u6rs^A u7s u8rs u7rs^A u8s u9rs u8rs^A u9s u2rd u9rs^FO u2ld u2d u3ld^FO u3ld u3d u4ld^FO u4ld u4d u5ld^FO u5ld u5d u6ld^FO u6ld u6d u7ld^FO u7ld u7d u8ld^FO u8ld u8d u9ld^FO u9ld u9d a13b^A u2d u3rd u2rd^A u3d u4rd u3rd^A u4d u5rd u4rd^A u5d u6rd u5rd^A u6d u7rd u6rd^A u7d u8rd u7rd^A u8d u9rd u8rd^A u9d a12b u9rd";
  break;

  case "bigpred_bif":
  var mol = "FOE y2 y12 y3a^A y12 y22a y1^FOE y3a yna1 y3o1^A yna1 y22a1 y22a^FOE y3o1 yna2 y3o2^A yna2 y22a2 y22a1^FOE y3o2 yna3 y3o3^A yna3 y22a3 y22a2^FOE y3o3 yna4 y3o4^A yna4 y22a4 y22a3^FOE y3o4 yna5 y3o5^A yna5 y22a5 y22a4^FOE y3o5 yna6 y3o6^A yna6 y22a6 y22a5^FOE y3o6 yna7 y3o7^A yna7 y22a7 y22a6^FOE y3o7 yna8 y3o8^A yna8 y22a8 y22a7^FOE y3o8 yna9 y3o9^A yna9 y22a9 y22a8^FOE y3o9 yna10 y3o10^A yna10 y22a10 y22a9^FOE y3o10 yna11 y3o11^A yna11 y22a11 y22a10^FOE y3o11 yna12 y3o12^A yna12 y22a12 y22a11^FOE y3o12 yna13 y3o13^A yna13 y22a13 y22a12^FOE y3o13 yna14 y3o14^A yna14 y22a14 y22a13^FOE y3o14 yna15 y3o15^A yna15 y22a15 y22a14^FOE y3o15 yna16 y3o16^A yna16 y22a16 y22a15^FOE y3o16 yna17 y3o17^A yna17 y22a17 y22a16^FOE y3o17 yna18 y3o18^A yna18 y22a18 y22a17^FOE y3o18 yna19 y3o19^A yna19 y22a19 y22a18^FOE y3o19 yna20 y3o20^A yna20 y22a20 y22a19^FOE y3o20 yna21 y3o21^A yna21 y22a21 y22a20^FOE y3o21 yna22 y3o22^A yna22 y22a22 y22a21^FOE y3o22 yna23 y3o23^A yna23 y22a23 y22a22^FOE y3o23 yna24 y3o24^A yna24 y22a24 y22a23^FOE y3o24 yna25 y3o25^A yna25 y22a25 y22a24^FOE y3o25 yna26 y3o26^A yna26 y22a26 y22a25^FOE y3o26 yna27 y3o27^A yna27 y22a27 y22a26^FOE y3o27 yna28 y3o28^A yna28 y22a28 y22a27^FOE y3o28 yna29 y3o29^A yna29 y22a29 y22a28^FOE y3o29 yna30 y3o30^A yna30 y22a30 y22a29^FOE y3o30 yna31 y3o31^A yna31 y22a31 y22a30^FOE y3o31 yna32 y3^A yna32 y22 y22a31^FOE y3 y13 y4^FOE y4 y14 y5^FOE y6 y16 y7^FOE y8 y18 y9^FOE y10 y20 y11^FOE y24 y29 y15^FOE y26 y30 y17^A y23 y13 y22^A y41 y25 y40^A y15 y5 y6^A y29 y14 y25^A y30 y16 y27^A y17 y7 y8^A y36 y1 y37^FI y28 y42 26^FI y33 y32 38^FI y38 y39 24^FI y19 y31 28^FI y21 y35 34^FI y34 y37 33^L y40 y41 y23^L y27 y42 y39^L y18 y31 y32^L y9 y19 y10^L y20 y35 y36^L y11 y21 y2^FOE 2 12 3a^A 12 22a 1^FOE 3a na1 3o1^A na1 22a1 22a^FOE 3o1 na2 3o2^A na2 22a2 22a1^FOE 3o2 na3 3o3^A na3 22a3 22a2^FOE 3o3 na4 3o4^A na4 22a4 22a3^FOE 3o4 na5 3o5^A na5 22a5 22a4^FOE 3o5 na6 3o6^A na6 22a6 22a5^FOE 3o6 na7 3o7^A na7 22a7 22a6^FOE 3o7 na8 3o8^A na8 22a8 22a7^FOE 3o8 na9 3o9^A na9 22a9 22a8^FOE 3o9 na10 3o10^A na10 22a10 22a9^FOE 3o10 na11 3o11^A na11 22a11 22a10^FOE 3o11 na12 3o12^A na12 22a12 22a11^FOE 3o12 na13 3o13^A na13 22a13 22a12^FOE 3o13 na14 3o14^A na14 22a14 22a13^FOE 3o14 na15 3o15^A na15 22a15 22a14^FOE 3o15 na16 3o16^A na16 22a16 22a15^FOE 3o16 na17 3o17^A na17 22a17 22a16^FOE 3o17 na18 3o18^A na18 22a18 22a17^FOE 3o18 na19 3o19^A na19 22a19 22a18^FOE 3o19 na20 3o20^A na20 22a20 22a19^FOE 3o20 na21 3o21^A na21 22a21 22a20^FOE 3o21 na22 3o22^A na22 22a22 22a21^FOE 3o22 na23 3o23^A na23 22a23 22a22^FOE 3o23 na24 3o24^A na24 22a24 22a23^FOE 3o24 na25 3o25^A na25 22a25 22a24^FOE 3o25 na26 3o26^A na26 22a26 22a25^FOE 3o26 na27 3o27^A na27 22a27 22a26^FOE 3o27 na28 3o28^A na28 22a28 22a27^FOE 3o28 na29 3o29^A na29 22a29 22a28^FOE 3o29 na30 3o30^A na30 22a30 22a29^FOE 3o30 na31 3o31^A na31 22a31 22a30^FOE 3o31 na32 3^A na32 22 22a31^FOE 3 13 4^FOE 4 14 5^FOE 6 16 7^FOE 8 18 9^FOE 10 20 11^FOE 24 29 15^FOE 26 30 17^A 23 13 22^A 41 25 40^A 15 5 6^A 29 14 25^A 30 16 27^A 17 7 8^A 36 1 37^FI 28 42 y26^FI 33 32 y38^FI 38 39 y24^FI 19 31 y28^FI 21 35 y34^FI 34 37 y33^L 40 41 23^L 27 42 39^L 18 31 32^L 9 19 10^L 20 35 36^L 11 21 2";
  break;

  case "medium_big":
  var mol = "A bobin bobr bobo^L bobo bobr 12nordfoe^A danin danr dano^L dano danr 21westfoe^Arrow 12southfoe 22nordfoe^Arrow 12southa 22norda^Arrow 22southfoe 32nordfoe^Arrow 22southa 32norda^Arrow 13southfoe 23nordfoe^Arrow 13southa 23norda^Arrow 23southfoe 33nordfoe^Arrow 23southa 33norda^Arrow 11southfoe 21nordfoe^Arrow 11southa 21norda^Arrow 21southfoe 31nordfoe^Arrow 21southa 31norda^Arrow 21eastfoe 22westfoe^Arrow 21easta 22westa^Arrow 22eastfoe 23westfoe^Arrow 22easta 23westa^Arrow 31eastfoe 32westfoe^Arrow 31easta 32westa^Arrow 32eastfoe 33westfoe^Arrow 32easta 33westa^Arrow 11eastfoe 12westfoe^Arrow 11easta 12westa^Arrow 12eastfoe 13westfoe^Arrow 12easta 13westa^FOE 11nordfoe 11bobm1 11bobf2^A 11bobm1 11norda 11boba2^FOE 11alicef2 11alicem2 11southfoe^A 11alicem2 11alicea2 11southa^FOE 11westfoe 11danm1 11danf2^A 11danm1 11westa 11dana2^FOE 11clairef2 11clairem2 11eastfoe^A 11clairem2 11clairea2 11easta^FOE 11bob 11bob0 11bob1^FOE 11bob0 11bob00 11bob01^FOE 11bob1 11bob10 11bob11^FOE 11bob00 11bob000 11alice^FOE 11dan 11dan0 11dan1^FOE 11dan0 11dan00 11dan01^FOE 11dan01 11claire 11dan011^A 11bob01 11eve1 11eve2^A 11dan1 11eve2 11eve3^A 11bob10 11eve3 11eve4^A 11dan00 11eve4 11eve5^A 11bob11 11eve6 11eve7^A 11dan011 11eve7 11eve8^A 11bob000 11eve8 11eve9^FOE 11bobf2 11bobm2 11bob^A 11bobm2 11boba2 11eve1^FOE 11alice 11alicem1 11alicef2^A 11alicem1 11eve5 11alicea2^FOE 11danf2 11danm2 11dan^A 11danm2 11dana2 11eve6^FOE 11claire 11clairem1 11clairef2^A 11clairem1 11eve9 11clairea2^FOE 12nordfoe 12bobm1 12bobf2^A 12bobm1 12norda 12boba2^FOE 12alicef2 12alicem2 12southfoe^A 12alicem2 12alicea2 12southa^FOE 12westfoe 12danm1 12danf2^A 12danm1 12westa 12dana2^FOE 12clairef2 12clairem2 12eastfoe^A 12clairem2 12clairea2 12easta^FOE 12bob 12bob0 12bob1^FOE 12bob0 12bob00 12bob01^FOE 12bob1 12bob10 12bob11^FOE 12bob00 12bob000 12alice^FOE 12dan 12dan0 12dan1^FOE 12dan0 12dan00 12dan01^FOE 12dan01 12claire 12dan011^A 12bob01 12eve1 12eve2^A 12dan1 12eve2 12eve3^A 12bob10 12eve3 12eve4^A 12dan00 12eve4 12eve5^A 12bob11 12eve6 12eve7^A 12dan011 12eve7 12eve8^A 12bob000 12eve8 12eve9^FOE 12bobf2 12bobm2 12bob^A 12bobm2 12boba2 12eve1^FOE 12alice 12alicem1 12alicef2^A 12alicem1 12eve5 12alicea2^FOE 12danf2 12danm2 12dan^A 12danm2 12dana2 12eve6^FOE 12claire 12clairem1 12clairef2^A 12clairem1 12eve9 12clairea2^FOE 13nordfoe 13bobm1 13bobf2^A 13bobm1 13norda 13boba2^FOE 13alicef2 13alicem2 13southfoe^A 13alicem2 13alicea2 13southa^FOE 13westfoe 13danm1 13danf2^A 13danm1 13westa 13dana2^FOE 13clairef2 13clairem2 13eastfoe^A 13clairem2 13clairea2 13easta^FOE 13bob 13bob0 13bob1^FOE 13bob0 13bob00 13bob01^FOE 13bob1 13bob10 13bob11^FOE 13bob00 13bob000 13alice^FOE 13dan 13dan0 13dan1^FOE 13dan0 13dan00 13dan01^FOE 13dan01 13claire 13dan011^A 13bob01 13eve1 13eve2^A 13dan1 13eve2 13eve3^A 13bob10 13eve3 13eve4^A 13dan00 13eve4 13eve5^A 13bob11 13eve6 13eve7^A 13dan011 13eve7 13eve8^A 13bob000 13eve8 13eve9^FOE 13bobf2 13bobm2 13bob^A 13bobm2 13boba2 13eve1^FOE 13alice 13alicem1 13alicef2^A 13alicem1 13eve5 13alicea2^FOE 13danf2 13danm2 13dan^A 13danm2 13dana2 13eve6^FOE 13claire 13clairem1 13clairef2^A 13clairem1 13eve9 13clairea2^FOE 21nordfoe 21bobm1 21bobf2^A 21bobm1 21norda 21boba2^FOE 21alicef2 21alicem2 21southfoe^A 21alicem2 21alicea2 21southa^FOE 21westfoe 21danm1 21danf2^A 21danm1 21westa 21dana2^FOE 21clairef2 21clairem2 21eastfoe^A 21clairem2 21clairea2 21easta^FOE 21bob 21bob0 21bob1^FOE 21bob0 21bob00 21bob01^FOE 21bob1 21bob10 21bob11^FOE 21bob00 21bob000 21alice^FOE 21dan 21dan0 21dan1^FOE 21dan0 21dan00 21dan01^FOE 21dan01 21claire 21dan011^A 21bob01 21eve1 21eve2^A 21dan1 21eve2 21eve3^A 21bob10 21eve3 21eve4^A 21dan00 21eve4 21eve5^A 21bob11 21eve6 21eve7^A 21dan011 21eve7 21eve8^A 21bob000 21eve8 21eve9^FOE 21bobf2 21bobm2 21bob^A 21bobm2 21boba2 21eve1^FOE 21alice 21alicem1 21alicef2^A 21alicem1 21eve5 21alicea2^FOE 21danf2 21danm2 21dan^A 21danm2 21dana2 21eve6^FOE 21claire 21clairem1 21clairef2^A 21clairem1 21eve9 21clairea2^FOE 22nordfoe 22bobm1 22bobf2^A 22bobm1 22norda 22boba2^FOE 22alicef2 22alicem2 22southfoe^A 22alicem2 22alicea2 22southa^FOE 22westfoe 22danm1 22danf2^A 22danm1 22westa 22dana2^FOE 22clairef2 22clairem2 22eastfoe^A 22clairem2 22clairea2 22easta^FOE 22bob 22bob0 22bob1^FOE 22bob0 22bob00 22bob01^FOE 22bob1 22bob10 22bob11^FOE 22bob00 22bob000 22alice^FOE 22dan 22dan0 22dan1^FOE 22dan0 22dan00 22dan01^FOE 22dan01 22claire 22dan011^A 22bob01 22eve1 22eve2^A 22dan1 22eve2 22eve3^A 22bob10 22eve3 22eve4^A 22dan00 22eve4 22eve5^A 22bob11 22eve6 22eve7^A 22dan011 22eve7 22eve8^A 22bob000 22eve8 22eve9^FOE 22bobf2 22bobm2 22bob^A 22bobm2 22boba2 22eve1^FOE 22alice 22alicem1 22alicef2^A 22alicem1 22eve5 22alicea2^FOE 22danf2 22danm2 22dan^A 22danm2 22dana2 22eve6^FOE 22claire 22clairem1 22clairef2^A 22clairem1 22eve9 22clairea2^FOE 23nordfoe 23bobm1 23bobf2^A 23bobm1 23norda 23boba2^FOE 23alicef2 23alicem2 23southfoe^A 23alicem2 23alicea2 23southa^FOE 23westfoe 23danm1 23danf2^A 23danm1 23westa 23dana2^FOE 23clairef2 23clairem2 23eastfoe^A 23clairem2 23clairea2 23easta^FOE 23bob 23bob0 23bob1^FOE 23bob0 23bob00 23bob01^FOE 23bob1 23bob10 23bob11^FOE 23bob00 23bob000 23alice^FOE 23dan 23dan0 23dan1^FOE 23dan0 23dan00 23dan01^FOE 23dan01 23claire 23dan011^A 23bob01 23eve1 23eve2^A 23dan1 23eve2 23eve3^A 23bob10 23eve3 23eve4^A 23dan00 23eve4 23eve5^A 23bob11 23eve6 23eve7^A 23dan011 23eve7 23eve8^A 23bob000 23eve8 23eve9^FOE 23bobf2 23bobm2 23bob^A 23bobm2 23boba2 23eve1^FOE 23alice 23alicem1 23alicef2^A 23alicem1 23eve5 23alicea2^FOE 23danf2 23danm2 23dan^A 23danm2 23dana2 23eve6^FOE 23claire 23clairem1 23clairef2^A 23clairem1 23eve9 23clairea2^FOE 31nordfoe 31bobm1 31bobf2^A 31bobm1 31norda 31boba2^FOE 31alicef2 31alicem2 31southfoe^A 31alicem2 31alicea2 31southa^FOE 31westfoe 31danm1 31danf2^A 31danm1 31westa 31dana2^FOE 31clairef2 31clairem2 31eastfoe^A 31clairem2 31clairea2 31easta^FOE 31bob 31bob0 31bob1^FOE 31bob0 31bob00 31bob01^FOE 31bob1 31bob10 31bob11^FOE 31bob00 31bob000 31alice^FOE 31dan 31dan0 31dan1^FOE 31dan0 31dan00 31dan01^FOE 31dan01 31claire 31dan011^A 31bob01 31eve1 31eve2^A 31dan1 31eve2 31eve3^A 31bob10 31eve3 31eve4^A 31dan00 31eve4 31eve5^A 31bob11 31eve6 31eve7^A 31dan011 31eve7 31eve8^A 31bob000 31eve8 31eve9^FOE 31bobf2 31bobm2 31bob^A 31bobm2 31boba2 31eve1^FOE 31alice 31alicem1 31alicef2^A 31alicem1 31eve5 31alicea2^FOE 31danf2 31danm2 31dan^A 31danm2 31dana2 31eve6^FOE 31claire 31clairem1 31clairef2^A 31clairem1 31eve9 31clairea2^FOE 32nordfoe 32bobm1 32bobf2^A 32bobm1 32norda 32boba2^FOE 32alicef2 32alicem2 32southfoe^A 32alicem2 32alicea2 32southa^FOE 32westfoe 32danm1 32danf2^A 32danm1 32westa 32dana2^FOE 32clairef2 32clairem2 32eastfoe^A 32clairem2 32clairea2 32easta^FOE 32bob 32bob0 32bob1^FOE 32bob0 32bob00 32bob01^FOE 32bob1 32bob10 32bob11^FOE 32bob00 32bob000 32alice^FOE 32dan 32dan0 32dan1^FOE 32dan0 32dan00 32dan01^FOE 32dan01 32claire 32dan011^A 32bob01 32eve1 32eve2^A 32dan1 32eve2 32eve3^A 32bob10 32eve3 32eve4^A 32dan00 32eve4 32eve5^A 32bob11 32eve6 32eve7^A 32dan011 32eve7 32eve8^A 32bob000 32eve8 32eve9^FOE 32bobf2 32bobm2 32bob^A 32bobm2 32boba2 32eve1^FOE 32alice 32alicem1 32alicef2^A 32alicem1 32eve5 32alicea2^FOE 32danf2 32danm2 32dan^A 32danm2 32dana2 32eve6^FOE 32claire 32clairem1 32clairef2^A 32clairem1 32eve9 32clairea2^FOE 33nordfoe 33bobm1 33bobf2^A 33bobm1 33norda 33boba2^FOE 33alicef2 33alicem2 33southfoe^A 33alicem2 33alicea2 33southa^FOE 33westfoe 33danm1 33danf2^A 33danm1 33westa 33dana2^FOE 33clairef2 33clairem2 33eastfoe^A 33clairem2 33clairea2 33easta^FOE 33bob 33bob0 33bob1^FOE 33bob0 33bob00 33bob01^FOE 33bob1 33bob10 33bob11^FOE 33bob00 33bob000 33alice^FOE 33dan 33dan0 33dan1^FOE 33dan0 33dan00 33dan01^FOE 33dan01 33claire 33dan011^A 33bob01 33eve1 33eve2^A 33dan1 33eve2 33eve3^A 33bob10 33eve3 33eve4^A 33dan00 33eve4 33eve5^A 33bob11 33eve6 33eve7^A 33dan011 33eve7 33eve8^A 33bob000 33eve8 33eve9^FOE 33bobf2 33bobm2 33bob^A 33bobm2 33boba2 33eve1^FOE 33alice 33alicem1 33alicef2^A 33alicem1 33eve5 33alicea2^FOE 33danf2 33danm2 33dan^A 33danm2 33dana2 33eve6^FOE 33claire 33clairem1 33clairef2^A 33clairem1 33eve9 33clairea2";
  break;



case "random_egg_A_L_FI_FO":
  var shu = [];
  for (var i=0; i<6; i++) {
    shu.push(i);
  }
  var mi = 6, tm, ii;
  // While there remain elements to shuffle
  while (mi) {
    // Pick a remaining element
    ii = Math.floor(Math.random() * mi--);
    // And swap it with the current element.
    tm = shu[mi];
    shu[mi] = shu[ii];
    shu[ii] = tm;
  }
  var mol = "A 0 1 " + shu[0] + "^L 2 " + shu[1] + " " + shu[2] + "^FI 3 4 " + shu[3] + "^FO 5 " + shu[4] + " " + shu[5];
  break;


case "random_egg_A_L_FI_FOE":
  var shu = [];
  for (var i=0; i<6; i++) {
    shu.push(i);
  }
  var mi = 6, tm, ii;
  // While there remain elements to shuffle
  while (mi) {
    // Pick a remaining element
    ii = Math.floor(Math.random() * mi--);
    // And swap it with the current element.
    tm = shu[mi];
    shu[mi] = shu[ii];
    shu[ii] = tm;
  }
  var mol = "A 0 1 " + shu[0] + "^L 2 " + shu[1] + " " + shu[2] + "^FI 3 4 " + shu[3] + "^FOE 5 " + shu[4] + " " + shu[5];
  break;

  case "random_10_quine_bubbles":
  var shu = [];
  for (var i=0; i<15; i++) {
    shu.push(i);
  }
  var mi = 15, tm, ii;
  // While there remain elements to shuffle
  while (mi) {
    // Pick a remaining element
    ii = Math.floor(Math.random() * mi--);
    // And swap it with the current element.
    tm = shu[mi];
    shu[mi] = shu[ii];
    shu[ii] = tm;
  }
  var mol = "L 0 " + shu[1] + " " + shu[3] + "^FI 1 2 " + shu[6]+ "^A 3 4 " + shu[5] + "^FI 5 6 " + shu[8] + "^L 7 " + shu[2] + " " + shu[9] + "^FOE 8 " + shu[0] 
+ " " + shu[7] + "^FOE 9 " + shu[10] + " " + shu[13] + "^A 10 11 " + shu[12] + "^FOE 12 " + shu[11] + " " + shu[14] + "^A 13 14 " + shu[4];
  break;


  case "random_10_quine_bubbles_var":
  var shu = [];
  for (var i=0; i<15; i++) {
    shu.push(i);
  }
  var mi = 15, tm, ii;
  // While there remain elements to shuffle
  while (mi) {
    // Pick a remaining element
    ii = Math.floor(Math.random() * mi--);
    // And swap it with the current element.
    tm = shu[mi];
    shu[mi] = shu[ii];
    shu[ii] = tm;
  }
  var mol = "L 0 " + shu[1] + " " + shu[3] + "^A 1 2 " + shu[6]+ "^FI 3 4 " + shu[5] + "^A 5 6 " + shu[8] + "^FO 7 " + shu[2] + " " + shu[9] + "^FOE 8 " + shu[0] 
+ " " + shu[7] + "^L 9 " + shu[10] + " " + shu[13] + "^FI 10 11 " + shu[12] + "^FO 12 " + shu[11] + " " + shu[14] + "^A 13 14 " + shu[4];
  break;

  case "shuffle_10_A3E2974C16B85D0":
  var mol = "L 0 10 3^FI 1 2 14^A 3 4 2^FI 5 6 9^L 7 7 4^FOE 8 12 1^FOE 9 6 11^A 10 11 8^FOE 12 5 13^A 13 14 0";
  break;

  case "shuffle_10_0368BCDE2541A97":
  var mol = "L 0 0 3^FI 1 2 6^A 3 4 8^FI 5 6 11^L 7 12 13^FOE 8 14 2^FOE 9 5 4^A 10 11 1^FOE 12 10 9^A 13 14 7";
  break;

  case "shuffle_10_04C92C86BE5A317":
  var mol = "L 0 0 4^FI 1 2 12^A 3 4 9^FI 5 6 2^L 7 13 8^FOE 8 6 11^FOE 9 14 5^A 10 11 10^FOE 12 3 1^A 13 14 7";
  break;


  case "shuffle_10_8639A7BC024DE51":
  var mol = "L 0 8 6^FI 1 2 3^A 3 4 9^FI 5 6 10^L 7 7 11^FOE 8 12 0^FOE 9 2 4^A 10 11 13^FOE 12 14 5^A 13 14 1";
  break;

  case "shuffle_10_6AC0379E12D5B48":
  var mol = "L 0 6 10^FI 1 2 12^A 3 4 0^FI 5 6 3^L 7 7 9^FOE 8 14 1^FOE 9 2 13^A 10 11 5^FOE 12 11 4^A 13 14 8";
  break;

  case "shuffle_10_8C72046E53B9DA1":
  var mol = "L 0 8 12^FI 1 2 7^A 3 4 2^FI 5 6 0^L 7 4 6^FOE 8 14 5^FOE 9 3 11^A 10 11 9^FOE 12 13 10^A 13 14 1";
  break;

  case "shuffle_10_018C23A7B6E49D5":
  var mol = "L 0 0 1^FI 1 2 8^A 3 4 12^FI 5 6 2^L 7 3 10^FOE 8 7 11^FOE 9 6 14^A 10 11 4^FOE 12 9 13^A 13 14 5";
  break;

  case "shuffle_10_5681ECD297AB304":
  var mol = "L 0 5 6^FI 1 2 8^A 3 4 1^FI 5 6 14^L 7 12 13^FOE 8 2 9^FOE 9 7 10^A 10 11 11^FOE 12 3 0^A 13 14 4";
  break;

  case "shuffle_10_035B17C469E82AD":
  var mol = "L 0 0 3^FI 1 2 5^A 3 4 11^FI 5 6 1^L 7 7 12^FOE 8 4 6^A 10 11 8^FOE 12 2 10";
  break;

  case "shuffle_10_3D25C769B1E804A":
  var mol = "L 0 3 13^FI 1 2 2^A 3 4 5^FI 5 6 12^L 7 7 6^FOE 8 9 11^FOE 9 1 14^A 10 11 8^FOE 12 0 4^A 13 14 10";
  break;

  case "shuffle_10_D35C680B7AE2149":
  var mol = "L 0 13 3^FI 1 2 5^A 3 4 12^FI 5 6 6^L 7 8 0^FOE 8 11 7^FOE 9 10 14^A 10 11 2^FOE 12 1 4^A 13 14 9";
  break;

  case "shuffle_10_2AC4D156E30789B":
  var mol = "L 0 2 10^FI 1 2 12^A 3 4 4^FI 5 6 13^L 7 1 5^FOE 8 6 14^FOE 9 3 0^A 10 11 7^FOE 12 8 9^A 13 14 11";
  break;


  case "shuffle_10_5A49728D0CB361E":
  var mol = "L 0 5 10^FI 1 2 4^A 3 4 9^FI 5 6 7^L 7 2 8^FOE 8 13 0^FOE 9 12 11^A 10 11 3^FOE 12 6 1^A 13 14 14";
  break;

  case "shuffle_10_DAB62013EC87459":
  var mol = "L 0 13 10^FI 1 2 11^A 3 4 6^FI 5 6 2^L 7 0 1^FOE 8 3 14^FOE 9 12 8^A 10 11 7^FOE 12 4 5^A 13 14 9";
  break;

  case "shuffle_10_0A8E7D9132C546B":
  var mol = "L 0 0 10^FI 1 2 8^A 3 4 14^FI 5 6 7^L 7 13 9^FOE 8 1 3^FOE 9 2 12^A 10 11 5^FOE 12 4 6^A 13 14 11";
  break;

  case "shuffle_10_51D3E60BA74C928":
  var mol = "L 0 5 1^FI 1 2 13^A 3 4 3^FI 5 6 14^L 7 6 0^FOE 8 11 10^FOE 9 7 4^A 10 11 12^FOE 12 9 2^A 13 14 8";
  break;

  case "shuffle_10_D870619BC345AE2":
  var mol = "L 0 13 8^FI 1 2 7^A 3 4 0^FI 5 6 6^L 7 1 9^FOE 8 11 12^FOE 9 3 4^A 10 11 5^FOE 12 10 14^A 13 14 2";
  break;

  case "shuffle_10_290C1735B6A4DE8":
  var mol = "L 0 2 9^FI 1 2 0^A 3 4 12^FI 5 6 1^L 7 7 3^FOE 8 5 11^FOE 9 6 10^A 10 11 4^FOE 12 13 14^A 13 14 8";
  break;

  case "shuffle_10_D984763ABEC5120":
  var mol = "L 0 13 9^FI 1 2 8^A 3 4 4^FI 5 6 7^L 7 6 3^FOE 8 10 11^FOE 9 14 12^A 10 11 5^FOE 12 1 2^A 13 14 0";
  break;


  case "sensitive1":
  var mol = "L 0 11 12^FI 1 2 2^A 3 4 8^FI 5 6 7^L 7 1 4^FOE 8 6 10^FOE 9 14 0^A 10 11 5^FOE 12 3 13^A 13 14 9";
  break;


  case "sensitive2":
  var mol = "L 0 11 9^FI 1 2 13^A 3 4 3^FI 5 6 14^L 7 10 0^FOE 8 7 4^FOE 9 2 6^A 10 11 5^FOE 12 1 8^A 13 14 12";
  break;

  case "sensitive3":
  var mol = "L 0 4 8^FI 1 2 11^A 3 4 12^FI 5 6 7^L 7 13 5^FOE 8 9 1^FOE 9 3 10^A 10 11 2^FOE 12 14 0^A 13 14 6";
  break;

  case "sensitive4":
  var mol = "L 0 14 3^FI 1 2 11^A 3 4 2^FI 5 6 1^L 7 0 12^FOE 8 5 13^FOE 9 10 7^A 10 11 6^FOE 12 8 4^A 13 14 9";
  break;


  case "cone":
  var mol = "L 0 14 9^FI 1 2 2^A 3 4 11^FI 5 6 1^L 7 7 8^FOE 8 6 5^FOE 9 0 3^A 10 11 12^FOE 12 13 4^A 13 14 10";
  break;

  case "9sparkhybrid":
  var mol = "A 0 1 2^L 2 4c 3^FI 3 4 5^FO 5 0a 1^A 0a 1a 2a^L 2a 4a 3a^FI 3a 4a 5a^FO 5a 0bc 1a^A 0b 1b 2b^L 2b 4b 3b^FI 3b 4b 5b^FO 5b 0 1b^A 0c 1c 2c^L 2c 4d 3c^FI 3c 4c 5c^FO 5c 0ac 1c^A 0ac 1ac 2ac^L 2ac 4ac 3ac^FI 3ac 4ac 5ac^FO 5ac 0bd 1ac^A 0bc 1bc 2bc^L 2bc 4bc 3bc^FI 3bc 4bc 5bc^FO 5bc 0c 1bc^A 0d 1d 2d^L 2d 4 3d^FI 3d 4d 5d^FO 5d 0ad 1d^A 0ad 1ad 2ad^L 2ad 4ad 3ad^FI 3ad 4ad 5ad^FO 5ad 0b 1ad^A 0bd 1bd 2bd^L 2bd 4bd 3bd^FI 3bd 4bd 5bd^FO 5bd 0d 1bd";
  break;

  case "spark_243501":
  var mol = "A 0 1 2^L 2 4 3^FI 3 4 5^FO 5 0 1";
  break;

  case "spark_234501":
  var mol = "A 0 1 2^L 2 3 4^FI 3 4 5^FO 5 0 1";
  break;

  case "spark_301542":
  var mol = "A 0 1 3^L 2 0 1^FI 3 4 5^FO 5 4 2";
  break;

  case "spark_401523":
  var mol = "A 0 1 4^L 2 0 1^FI 3 4 5^FO 5 2 3";
  break;

  case "spark_214530":
  var mol = "A 0 1 2^L 2 1 4^FI 3 4 5^FO 5 3 0";
  break;

  case "spark_213504":
  var mol = "A 0 1 2^L 2 1 3^FI 3 4 5^FO 5 0 4";
  break;


  case "spark_245013":
  var mol = "A 0 1 2^L 2 4 5^FI 3 4 0^FO 5 1 3";
  break;


  case "sparkFOE_540213":
  var mol = "A 0 1 5^L 2 4 0^FI 3 4 2^FOE 5 1 3";
  break;

  case "bubble_214503":
  var mol = "A 0 1 2^L 2 1 4^FI 3 4 5^FO 5 0 3";
  break;

  case "spark_spark":
  var mol = "A 0s 1s 2s^L 2s 4s 5s^FI 3s 4s 0s^FO 5s 1s 3s^A 0 1 2^L 2 4 3^FI 3 4 5^FO 5 0 1";
  break;


  case "x_214530":
  var mol = "A 0 1 2^L 2 1 4^FI 3 4 5^FO 5 3 0";
  break;

  case "seed_021543":
  var mol = "FI 3 4 5^FO 5 4 3";
  break;

  case "x_413520":
  var mol = "A 0 1 4^L 2 1 3^FI 3 4 5^FO 5 2 0";
  break;

  case "x_541023":
  var mol = "A 0 1 5^L 2 4 1^FI 3 4 0^FO 5 2 3";
  break;

  case "x_541032":
  var mol = "A 0 1 5^L 2 4 1^FI 3 4 0^FO 5 3 2";
  break;

  case "x_543120":
  var mol = "A 0 1 5^L 2 4 3^FI 3 4 1^FO 5 2 0";
  break;

  case "x_013524":
  var mol = "A 0 1 0^L 2 1 3^FI 3 4 5^FO 5 2 4";
  break;

  case "x_401532":
  var mol = "A 0 1 4^L 2 0 1^FI 3 4 5^FO 5 3 2";
  break;

  case "x_235014":
  var mol = "A 0 1 2^L 2 3 5^FI 3 4 0^FO 5 1 4";
  break;

  case "paradox":
  var mol = "A 1 outa out^A 1a out outa^L 2 3 1^A 4 7 2^A 6 5 4^FO 8 6 7^FO 3 9 10^A 9 10 8^L 2a 3a 1a^A 4a 7a 2a^A 6a 5a 4a^FO 8a 6a 7a^FO 3a 9a 10a^A 9a 10a 8a";
  break;

  case "L-FO-FOE_conflict":
  var mol = "L 1 1 2^FO 2 3 4^FOE 4 5 6";
  break;

  case "wrong1":
  var mol = "L 1 3 2^FO 2 4 4";
  break;

  case "LA":
  var mol = "L 1 2 3^A 3 4 5^FRIN 1^FROUT 2^FRIN 4^FROUT 5";
  break;


  case "bubble":
  var mol = "Arrow 1 2^Arrow 2 3^Arrow 3 1";
  break;

  case "AFO":
  var mol = "A 1 2 3^FO 3 4 5^FRIN 1^FRIN 2^FROUT 4^FROUT 5";
  break;

  case "LFO":
  var mol = "L 1 2 3^FO 3 4 5^FRIN 1^FROUT 2^FROUT 4^FROUT 5";
  break;

  case "GAMMAGAMMA":
  var mol = "GAMMA 1 2 3^GAMMA 1 4 5^FRIN 2^FRIN 3^FRIN 4^FRIN 5";
  break;

  case "DELTADELTA":
  var mol = "DELTA 1 2 3^DELTA 1 4 5^FRIN 2^FRIN 3^FRIN 4^FRIN 5";
  break;

  case "GAMMADELTA":
  var mol = "GAMMA 1 2 3^DELTA 1 4 5^FRIN 2^FRIN 3^FRIN 4^FRIN 5";
  break;

  case "DELTAGAMMA":
  var mol = "DELTA 1 2 3^GAMMA 1 4 5^FRIN 2^FRIN 3^FRIN 4^FRIN 5";
  break;

  case "DELTAT":
  var mol = "DELTA 1 2 3^T 1^FRIN 2^FRIN 3";
  break;

  case "GAMMAT":
  var mol = "GAMMA 1 2 3^T 1^FRIN 2^FRIN 3";
  break;

  case "TT":
  var mol = "T 1^T 1";
  break;

  case "Lafont-quine":
  var mol = "GAMMA 1 2 3^DELTA 1 3 4^T 2^T 4";
  break;

  case "random_egg_G_G_D_D":
    var shu = [];
    for (var i=0; i<12; i++) {
      shu.push(i);
    }
    var mi = 12, tm, ii;
    // While there remain elements to shuffle
    while (mi) {
      // Pick a remaining element
      ii = Math.floor(Math.random() * mi--);
      // And swap it with the current element.
      tm = shu[mi];
      shu[mi] = shu[ii];
      shu[ii] = tm;
    }
    var mol = "GAMMA 0 1 2^GAMMA 3 4 5^DELTA 6 7 8^DELTA 9 10 11" + "^Arrow " + shu[0] + " " + shu[1] + "^Arrow " + shu[2] + " " + shu[3] + "^Arrow " + shu[4] + " " + shu[5] + "^Arrow " + shu[6] + " " + shu[7] + "^Arrow " + shu[8] + " " + shu[9] + "^Arrow " + shu[10] + " " + shu[11];
    break;

  case "4_IC_6B784A053912":
  var mol = "GAMMA 0 1 1^GAMMA 3 4 0^DELTA 6 7 7^DELTA 3 4 6";
  break;

  case "4_IC_84B7362190A5":
  var mol = "GAMMA 0 1 1^GAMMA 3 4 5^DELTA 3 7 4^DELTA 0 5 7";
  break;

  case "4_IC_60852B93A714":
  var mol = "GAMMA 0 1 2^GAMMA 3 1 5^DELTA 0 7 5^DELTA 3 7 2";
  break;

  case "4_IC_5AB718246309":
  var mol = "GAMMA 0 1 2^GAMMA 3 2 5^DELTA 3 7 1^DELTA 0 5 7";
  break;

  case "4_IC_820963B71A54":
  var mol = "GAMMA 0 1 2^GAMMA 3 4 4^DELTA 3 7 2^DELTA 0 1 7";
  break;

  case "4_IC_45182379AB06":
  var mol = "GAMMA 0 1 2^GAMMA 2 4 4^DELTA 0 7 1^DELTA 7 10 10";
  break;

  case "4_IC_63407B5A9812":
  var mol = "GAMMA 0 1 1^GAMMA 3 0 5^DELTA 3 7 8^DELTA 8 5 7";
  break;

  case "4_IC_41580936B2A7":
  var mol = "GAMMA 0 1 2^GAMMA 3 1 5^DELTA 3 7 5^DELTA 0 7 2";
  break;
}
return mol;
}






