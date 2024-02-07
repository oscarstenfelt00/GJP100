function getGrade(studentPoints,minPointsForG,minPointsForVG)
  {
    // Om parametern studentPoints (5) är mindre än parametern minPointsForG(10) så ska den skriva ut U
  if (studentPoints < minPointsForG)
    {
    return "U";
    }
    // Om parametern studentPoints (12) är mindre än parametern minPointsForG(10) så ska den skriva ut G
  else if(studentPoints < minPointsForVG)
    {
    return "G";
    }// annars så ska den skriva ut VG 
  else
    {
    return "VG";
    }
  }

// eftersom vi tidigare i koden har sagt att getGrade funktionen vill ha parametrar, så ger vi dem här,
// allt vi skriver inom parantersena skickas in som parametrar 
alert(getGrade(5,10,16));
alert(getGrade(12,10,16));	
alert(getGrade(18,10,16));

// Här säger vi att variablen grade är lika med 8 (studentPoints) 10 (minPointsForG) och 16 (minPointsForVG)
var grade = getGrade(8,10,16);
// Om grade är lika med u så ska den skriva ut detta 
if (grade == "U")
  {
  alert("tyvärr du fick "+ grade +" och behöver göra omexamination")
  }