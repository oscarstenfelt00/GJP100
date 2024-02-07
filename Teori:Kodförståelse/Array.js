var jul = ["Hajar som hajar","Snö", "Julklapp", "Gran"];
// Lägger till ett fjärde värde som är snöängel 
jul[4]= "Snöängel";
// Lägger till värdet glögg längst bak i arrayen
jul.push("Glögg");
// Lägger till värdet pepparkakshus längst bak i arrayen
jul.push("Pepparkakshus");
//tat bort första värdet i arrayen 
jul.shift();
// Skriver ut första värdet i arrayen, men efersom vi tog bort hajar som hajar
// så skrivs Snö ut. 
alert(jul[0]);
//loopen används för att skriva ut allt som finns i arrayen
for (var i=0 ; i < jul.length;i++)
  {
  alert(jul[i]);
  }
  //Slumpar ett tal mellan noll och hur lång som arrayen är 
  //Skriver sedan ut värdet som sparades i variabeln slumptal
var slumptal = Math.floor(Math.random() * jul.length);
alert("Slumpade nyckelen till julfriden:" + jul[slumptal]);