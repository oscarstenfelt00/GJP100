//Börjar med att skapa två variabler som har värfet 10 och 20 
var tal1 = 10;
var tal2 = 20;

// Om tal1 (10) är lika med 10 så ska detta hända
if(tal1 == 10)
  {
// Om tal1(10) är lika med 10 sp ska tal2 (Var 20 innan, nu 10) få värdet som tal1 har
  tal2=tal1;
  }
// Om tal2(10) är större än 10 ska detta hända 
if(tal2 > 10)
  {
// Om tal2(10) ör större än 10 så ska en alert ruta med texten hej poppa upp
  alert("hej");
  }
//Om tal2(10) inte är större än 10 så ska detta hända 
else
  {
    //Om tal2(10) inte är större än 10 så ska en alert ruta poppa upp och söga hmm
    //och så sla tal1 nu ha värdet 5
  alert("hmm");
  tal1=5;
  }
// Om tal1 (5) är större eller lika med tal2 (10) eller om tal2 är lika med 10 så ska detta hända
if(tal1 >= tal2 || tal2 ==10 )
  {
  alert ("Glad påsk!");
  }
//Om tal1 inte är större än eller lika med tal2 eller tal2 är lika med 10 tal1(5) är lika med tal2 (10)
else if(tal1 == tal2)
  {
  alert ("God jul!");
  }