


function termLibrary(lambdaName) {

switch (lambdaName) {
  case "PRED (POW 3 4)":
  var lambdaTerm = "(\n.(\f.(\x.(((n (\g.(\h.(h (g f))))) (\u.x)) (\u.u))))) (((\b.(\e.(e b))) (\f.(\x.(f (f (f x)))))) (\f.(\x.(f(f (f (f x)))))))";
  break;

  case "(SUBSTRACT ((MULTLONG 3) 4)) 4":
  var lambdaTerm = "(((\m.\n.((n (\n.(\f.(\x.(((n (\g.(\h.(h (g f))))) (\u.x)) (\u.u)))))) m)) (((\m.(\n.((m ((\m.(\n.((m (\n.(\f.(\x.(f ((n f) x)))))) n))) n)) (\f.(\x.x))))) (\f.(\x.(f (f (f x)))))) (\f.(\x.(f(f (f (f x)))))))) (\f.(\x.(f(f (f (f x)))))))";
  break;

  case "PRED (POW 3 4)":
  var lambdaTerm = "(\n.(\f.(\x.(((n (\g.(\h.(h (g f))))) (\u.x)) (\u.u))))) (((\b.(\e.(e b))) (\f.(\x.(f (f (f x)))))) (\f.(\x.(f(f (f (f x)))))))";
  break;


  default:
  var lambdaTerm = "";
  break;
}
return lambdaTerm;
}

