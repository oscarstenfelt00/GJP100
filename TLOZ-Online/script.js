// Hämtar in canvasen i scriptet
let canvas = document.getElementById("spel");

// 
let ctx = canvas.getContext("2d");

//Böjrar med att säga att knappen ej är aktiverad
document.addEventListener("keydown", tryck, false);

//Böjrar med att säga att knappen ej är aktiverad
document.addEventListener("keyup", slapp, false);

// Zoomar in documentet 288%
document.body.style.zoom = "288%";

//Sätter fps (frames per second) till 60
let fps = 60;

//Tar bort funktionen att använda pilangenterna till att scrolla
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Värld sprites
let worldSprites = new Image()
worldSprites.src='./Sprites/tiles-overworld.png'

//Link sprites
let link = new Image()
link.src='./Sprites/link-sprite.png'

//Hud Sprites
let hud = new Image()
hud.src = './Sprites/pausescreen.png'

// Övriga karaktärer 1 sprites
let karakt1 = new Image()
karakt1.src ='./Sprites/chars1.png'

// Övriga karaktärer 2 sprites
let karakt2 = new Image()
karakt2.src ='./Sprites/chars2.png'

// Fiender sprites
let fiender = new Image()
fiender.src ='./Sprites/enemies.png'

//Sätter tangenterna till false så dem inte aktiveras när jag inte trycker på dem
let hogerTryck = false;
let vansterTryck = false;
let uppTryck = false;
let nerTryck = false;
let sistaKnapptryck = "upp";

let hogerD = false;
let vansterA = false;
let uppW = false;
let nerS = false;
let sistaWASD = "W";

//Hur snabbt animationen går 
let animation = 0;

//Vart vi är i animationen
let nuvarandeAnimation = 0;

//Hur snabbt animationen rör sig 
let animationsFart = 10;

//Vart link ska ritas ut på skärmen 
let linkX = 116;
let linkY = 135; 

let link2X = 80;
let link2Y = 135; 

let spelObjekt = []; // Array med objekt inom en karta
let arrKartor = []; //En array med alla kartor
let spelKarta = null;

let sistaUpplockadeObejkt = 0;
let objektAnimation = false;

let antalRubiner = 0;
let linkHalsa = 3;
let nuvarandeHalsa = 3;
let antalNycklar = 1;
let antalBomber = 5;
let utrustatSvard = 0; 

let harSvard = false;
let arLinkAttakerar = false;
let kanLinkAttakeraIgen = true;

// Alla objekt i spelet
function SpelObjekt(){
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.nyKarta = 0;
	this.newLinkX = -1;
	this.newLinkY = -1;
	this.arPortal = false;
	this.raknare = 0;
	this.bildNum = 0;
	this.arText = false;
	this.line1Full = "";
	this.line2Full = "";
	this.nuvarandeLine1 = "";
	this.nuvarandeLine2 = "";
	this.line1X = 0;
	this.line1Y = 0;
	this.line2X = 0;
	this.line2Y = 0;
	this.arGammalMan = false;
	this.arObjekt = false;
	this.objektNum = 0;
	this.arFlamma = false;
	this.arGammalDam = false;
	this.objektNamn = "";
	this.arFiende = false;
	this.fiendeTyp = 0; 
	this.nextX = 0;
	this.nextY = 0;
	this.attakerar = false;
	this.fiendeHalsa = 0;
	this.direction = "upp";
	this.fiende = [];
	this.raknare = 0;
	this.frame = 0;
	this.behoverStuds = false; 
	this.studsY = 0;
	this.studsX = 0;
}

function KartBunt(m, o){
	this.karta = m;
	this.spelobjekts = o;
}

//Funktion som spelar ljud
function spelaLjud(source){
	let ljud = new Audio()
	ljud.src = source
	ljud.play();
}

let karta7_7 =[
//HUD
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
//Kartan
	[ 61, 61, 61, 61, 61, 61, 61,  2,  2, 61, 61, 61, 61, 61, 61, 61],
	[ 61, 61, 61, 61, 28, 61, 62,  2,  2, 61, 61, 61, 61, 61, 61, 61],
	[ 61, 61, 61, 62,  2,  2,  2,  2,  2, 61, 61, 61, 61, 61, 61, 61],
	[ 61, 61, 62,  2,  2,  2,  2,  2,  2, 61, 61, 61, 61, 61, 61, 61],
	[ 61, 62,  2,  2,  2,  2,  2,  2,  2, 60, 61, 61, 61, 61, 61, 61],
	[  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],
	[ 43, 44,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 43, 43],
	[ 61, 61,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 61, 61],
	[ 61, 61,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 61, 61],
	[ 61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
	[ 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61]
];
let objekt7_7 =[];

// Ingången till grottan
let gO = new SpelObjekt();
gO.x = 72;
gO.y = 72;
gO.width = 8;
gO.height = 16;
gO.nyKarta = 1;
gO.newLinkX = 120;
gO.newLinkY = 220;
gO.arPortal = true;
objekt7_7.push(gO);

//Placerar fiende
gO = new SpelObjekt();
gO.x = 160;
gO.y = 184;
gO.width = 16;
gO.height = 16;
gO.fiendeTyp = 1;
gO.arFiende = true;
objekt7_7.push(gO);

let bunt = new KartBunt(karta7_7, objekt7_7);
arrKartor.push(bunt);

let kartaC1 = [
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
	[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
	/////////////////////////////////////////////////////////////////
	[ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
	[ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
	[ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
	[ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
	[ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
	[ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
	[ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
	[ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
	[ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
	[ 55, 55, 37, 37, 37, 37, 37, 28, 28, 37, 37, 37, 37, 37, 55, 55],
	[ 55, 55, 55, 55, 55, 55, 55, 28, 28, 55, 55, 55, 55, 55, 55, 55]];
let spelObjektC1 = [];

//Gammla mannen och kvinnan i grottan, text och flammor
gO = new SpelObjekt()
gO.x = (4*16) + 8;
gO.y = (8*16);
gO.width = 16;
gO.height = 16;
gO.arFlamma= true;
spelObjektC1.push(gO);

gO = new SpelObjekt()
gO.x = (10*16) + 8;
gO.y = (8*16);
gO.width = 16;
gO.height = 16;
gO.arFlamma= true;
spelObjektC1.push(gO);

gO = new SpelObjekt()
gO.x = (7*16) + 8;
gO.y = (8*16);
gO.width = 16;
gO.height = 16;
gO.arGammalMan= true;
spelObjektC1.push(gO);

gO = new SpelObjekt()
gO.arText = true;
gO.line1Full = "IT'S DANGEROUS TO GO";
gO.line2Full = "ALONE! TAKE THIS.";
gO.line1X = 3 * 16;
gO.line1Y = 7 * 16;
gO.line2X = 4 * 16;
gO.line2Y = (8 * 16) - 6;
spelObjektC1.push(gO);

// Portal mellan arrKartorna 
gO = new SpelObjekt();
gO.x = 112;
gO.y = 240;
gO.width = 16;
gO.height = 16;
gO.nyKarta = 0;
gO.newLinkX = 68;
gO.newLinkY = 96;
gO.arPortal = true;
spelObjektC1.push(gO);

gO = new SpelObjekt();
gO.x = 115;
gO.y = 240;
gO.width = 16;
gO.height = 16;
gO.nyKarta = 0;
gO.newLinkX = 68;
gO.newLinkY = 96;
gO.arPortal = true;
spelObjektC1.push(gO);

//Trä Svärd
gO = new SpelObjekt();
gO.x = (8*16)-4;
gO.y = (9.5*16);
gO.width = 8;
gO.height = 16;
gO.arObjekt = true;
gO.objektNum = 14;
spelObjektC1.push(gO);

bunt = new KartBunt(kartaC1, spelObjektC1);
arrKartor.push(bunt);

spelKarta = arrKartor[0].karta;
spelObjekt = arrKartor[0].spelobjekts;

//En function som reagerar vaje gång en piltangent är tryckt
function tryck(e){
	if(e.keyCode == 37){
		vansterTryck = true;
		sistaKnapptryck = "vänster"

	} else if(e.keyCode == 39){
		hogerTryck = true;
		sistaKnapptryck = "höger"

	} else if(e.keyCode == 38){
		uppTryck = true;
		sistaKnapptryck = "upp"

	} else if(e.keyCode == 40){
		nerTryck = true;
		sistaKnapptryck = "ner"
	}
	// Om man trycker på mellanslagstangenten ska Link attakera
	if(e.keyCode == 32 && kanLinkAttakeraIgen && harSvard){
		arLinkAttakerar = true;
		nuvarandeAnimation = 0;
		kanLinkAttakeraIgen = false;
		spelaLjud("./Ljud/LOZ_sword_slash.wav")
	}
	if(e.keyCode == 65){
		vansterA = true;
		sistaKnapptryck = "A"

	} else if(e.keyCode == 68){
		hogerD = true;
		sistaKnapptryck = "D"

	} else if(e.keyCode == 87){
		uppW = true;
		sistaKnapptryck = "W"

	} else if(e.keyCode == 83){
		nerS = true;
		sistaKnapptryck = "S"
	}
	// Om man trycker på mellanslagstangenten ska Link attakera
	if(e.keyCode == 32 && kanLinkAttakeraIgen && harSvard){
		arLinkAttakerar = true;
		nuvarandeAnimation = 0;
		kanLinkAttakeraIgen = false;
		spelaLjud("./Ljud/LOZ_sword_slash.wav")
	}
}

//En function som reagerar vaje gång en piltangent är släppt
function slapp(e){
	if(e.keyCode == 37){
		vansterTryck = false;

	} else if(e.keyCode == 39){
		hogerTryck = false;

	} else if(e.keyCode == 38){
		uppTryck = false;

	} else if(e.keyCode == 40){
		nerTryck = false;
	}	if(e.keyCode == 65){
		vansterA = true;
		sistaKnapptryck = "A"

	} else if(e.keyCode == 68){
		hogerD = true;
		sistaKnapptryck = "D"

	} else if(e.keyCode == 87){
		uppW = true;
		sistaKnapptryck = "W"

	} else if(e.keyCode == 83){
		nerS = true;
		sistaKnapptryck = "S"
	}
}

// En function som ritar link
function ritaLink(){
	//Farten som link spriten rör sig över skärmen
	let speed = 2;
	//Varje frame ska räknaren ökas
	animation++;
	if(objektAnimation){
		if(animation < 150){
			ctx.drawImage(link, 1, 150, 16, 16, linkX, linkY, 16, 16)
		} else{
			objektAnimation = false;
		}
		switch(sistaUpplockadeObejkt)
			{
				case 0:
					break;

				case 1:
					break;

				case 2:
					break;

				case 3:
					break;

				case 4:
					break;

				case 5:
					break;	

				case 6:
					break;

				case 7:
					break;

				case 8:
					break;

				case 9:
					break;

				case 10:
					break;

				case 11:
					break;

				case 12:
					break;

				case 13:
					break;

				case 14:
					ctx.drawImage(hud, 555, 137, 8, 16, linkX - 2 , linkY - 14, 8, 16);
					break;
			}
	} 

	//Förhindrar Link från att röra sig medans animationen spelar
	else{
	if(arLinkAttakerar && harSvard){
		if(nuvarandeAnimation == 1){
			if(sistaKnapptryck == "ner" ){
				ctx.drawImage (link, 0, 84, 16, 27, linkX, linkY, 16, 27);
				spelObjektKollision(linkX + 7, linkY + 16, spelObjekt, false, true); 
			}
			if(sistaKnapptryck == "upp" ){
				ctx.drawImage (link, 62, 84, 16, 26, linkX, linkY - 14, 16, 26);
				spelObjektKollision(linkX + 3, linkY - 14, spelObjekt, false, true); 
			}
			if(sistaKnapptryck == "vänster" ){
				ctx.drawImage (link, 22, 84, 26, 27, linkX - 10, linkY - 8, 27, 27);
				spelObjektKollision(linkX - 8, linkY + 5, spelObjekt, false, true); 
			}
			if(sistaKnapptryck == "höger" ){
				ctx.drawImage (link, 91, 60, 16, 16, linkX, linkY, 16, 16);
				spelObjektKollision(linkX + 14, linkY + 5, spelObjekt, false, true); 
			}
		}
		if(nuvarandeAnimation == 0){
			if(sistaKnapptryck == "ner" ){
				ctx.drawImage (link, 0, 60, 16, 16, linkX, linkY, 16, 16);
			}
			if(sistaKnapptryck == "upp" ){
				ctx.drawImage (link, 62, 60, 16, 16, linkX, linkY, 16, 16);
			}
			if(sistaKnapptryck == "vänster" ){
				ctx.drawImage (link, 30, 60, 16, 16, linkX, linkY, 16, 16);
			}
			if(sistaKnapptryck == "höger" ){
				ctx.drawImage (link, 84, 84, 26, 26, linkX, linkY - 8, 26, 26);
			}
		}
		if(animation >= 6){
			nuvarandeAnimation ++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
				arLinkAttakerar = false;
				kanLinkAttakeraIgen = true;
			}
		}
	}
	//När man trycker på tangenten åt vänster ska link röra sig årtvänster 
	else if(vansterTryck && !kollision(linkX - speed, linkY, spelKarta)){
		linkX -= speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 30, 0, 16, 16, linkX, linkY, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 30, 30, 16, 16, linkX, linkY, 16, 16); 
		}
		//Hur många gånger den ska cykla genom animationen varje frame
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else if(hogerTryck && !kollision(linkX + speed, linkY, spelKarta)){
		linkX += speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 91, 0, 16, 16, linkX, linkY, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 91, 30, 16, 16, linkX, linkY, 16, 16); 
		}
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else if(uppTryck && !kollision(linkX, linkY - speed, spelKarta)){
		linkY -= speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 62, 0, 16, 16, linkX, linkY, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 62, 30, 16, 16, linkX, linkY, 16, 16); 
		}
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else if(nerTryck && !kollision(linkX, linkY + speed, spelKarta)){
		linkY += speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 0, 0, 16, 16, linkX, linkY, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 0, 30, 16, 16, linkX, linkY, 16, 16); 
		}
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else{
		if (sistaKnapptryck == "ner"){
			ctx.drawImage(link, 0, 0, 16, 16, linkX, linkY, 16, 16); 			
		} else if (sistaKnapptryck == "upp"){
			ctx.drawImage(link, 62, 0, 16, 16, linkX, linkY, 16, 16); 			
		} else if (sistaKnapptryck == "höger"){
			ctx.drawImage(link, 91, 0, 16, 16, linkX, linkY, 16, 16); 			
		} else if (sistaKnapptryck == "vänster"){
			ctx.drawImage(link, 30, 0, 16, 16, linkX, linkY, 16, 16); 			
		} 
	} 
	}
}
function ritaLink2(){
	//Farten som link spriten rör sig över skärmen
	let speed = 2;
	//Varje frame ska räknaren ökas
	animation++;
	if(objektAnimation){
		if(animation < 150){
			ctx.drawImage(link, 1, 150, 16, 16, link2X, link2Y, 16, 16)
		} else{
			objektAnimation = false;
		}
		switch(sistaUpplockadeObejkt)
			{
				case 0:
					break;

				case 1:
					break;

				case 2:
					break;

				case 3:
					break;

				case 4:
					break;

				case 5:
					break;	

				case 6:
					break;

				case 7:
					break;

				case 8:
					break;

				case 9:
					break;

				case 10:
					break;

				case 11:
					break;

				case 12:
					break;

				case 13:
					break;

				case 14:
					ctx.drawImage(hud, 555, 137, 8, 16, link2X - 2 , link2Y - 14, 8, 16);
					break;
			}
	} 

	//Förhindrar Link från att röra sig medans animationen spelar
	else{
	if(arLinkAttakerar && harSvard){
		if(nuvarandeAnimation == 1){
			if(sistaKnapptryck == "S" ){
				ctx.drawImage (link, 0, 84, 16, 27, link2X, link2Y, 16, 27);
				spelObjektKollision(link2X + 7, link2Y + 16, spelObjekt, false, true); 
			}
			if(sistaKnapptryck == "W" ){
				ctx.drawImage (link, 62, 84, 16, 26, link2X, link2Y - 14, 16, 26);
				spelObjektKollision(link2X + 3, link2Y - 14, spelObjekt, false, true); 
			}
			if(sistaKnapptryck == "A" ){
				ctx.drawImage (link, 22, 84, 26, 27, link2X - 10, link2Y - 8, 27, 27);
				spelObjektKollision(link2X - 8, link2Y + 5, spelObjekt, false, true); 
			}
			if(sistaKnapptryck == "D" ){
				ctx.drawImage (link, 91, 60, 16, 16, link2X, link2Y, 16, 16);
				spelObjektKollision(link2X + 14, link2Y + 5, spelObjekt, false, true); 
			}
		}
		if(nuvarandeAnimation == 0){
			if(sistaKnapptryck == "S" ){
				ctx.drawImage (link, 0, 60, 16, 16, link2X, link2Y, 16, 16);
			}
			if(sistaKnapptryck == "W" ){
				ctx.drawImage (link, 62, 60, 16, 16, link2X, link2Y, 16, 16);
			}
			if(sistaKnapptryck == "A" ){
				ctx.drawImage (link, 30, 60, 16, 16, link2X, link2Y, 16, 16);
			}
			if(sistaKnapptryck == "D" ){
				ctx.drawImage (link, 84, 84, 26, 26, link2X, link2Y - 8, 26, 26);
			}
		}
		if(animation >= 6){
			nuvarandeAnimation ++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
				arLinkAttakerar = false;
				kanLinkAttakeraIgen = true;
			}
		}
	}
	//När man trycker på tangenten åt vänster ska link röra sig årtvänster 
	else if(vansterA && !kollision(link2X - speed, link2Y, spelKarta)){
		link2X -= speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 30, 0, 16, 16, link2X, link2Y, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 30, 30, 16, 16, link2X, link2Y, 16, 16); 
		}
		//Hur många gånger den ska cykla genom animationen varje frame
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else if(hogerD && !kollision(link2X + speed, link2Y, spelKarta)){
		link2X += speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 91, 0, 16, 16, link2X, link2Y, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 91, 30, 16, 16, link2X, link2Y, 16, 16); 
		}
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else if(uppW && !kollision(link2X, link2Y - speed, spelKarta)){
		link2Y -= speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 62, 0, 16, 16, link2X, link2Y, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 62, 30, 16, 16, link2X, link2Y, 16, 16); 
		}
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else if(nerS && !kollision(link2X, link2Y + speed, spelKarta)){
		link2Y += speed;
		// Om den nuvarande animationen är 0 så ska vi rita spriten som tittat åt vänster
		if(nuvarandeAnimation == 0){
			ctx.drawImage(link, 0, 0, 16, 16, link2X, link2Y, 16, 16); 
		} else if(nuvarandeAnimation == 1){
			ctx.drawImage(link, 0, 30, 16, 16, link2X, link2Y, 16, 16); 
		}
		if(animation >= 6){
			nuvarandeAnimation++;
			animation = 0;
			if(nuvarandeAnimation > 1){
				nuvarandeAnimation = 0;
			}
		}
	} else{
		if (sistaKnapptryck == "S"){
			ctx.drawImage(link, 0, 0, 16, 16, link2X, link2Y, 16, 16); 			
		} else if (sistaKnapptryck == "W"){
			ctx.drawImage(link, 62, 0, 16, 16, link2X, link2Y, 16, 16); 			
		} else if (sistaKnapptryck == "D"){
			ctx.drawImage(link, 91, 0, 16, 16, link2X, link2Y, 16, 16); 			
		} else if (sistaKnapptryck == "A"){
			ctx.drawImage(link, 30, 0, 16, 16, link2X, link2Y, 16, 16); 			
		} 
	} 
	}
}

// En function som ritar ut den nuvarande nivån du är på
function ritaKarta(niva)
{
	for(let i = 0; i < niva.length; i++)
	{
		for(let j = 0; j < niva[i].length; j++)
		{
			ctx.drawImage(worldSprites, ((niva[i][j]%18) * 17) + 1,
			(Math.floor(niva[i][j]/18) * 17) + 1, 
			16, 16, j *16, i *16, 16, 16);
		}
	}
}

// En functon som kollar om något år i vägen för vår sprite
function kollision(x, y, karta){
	for(let i = 0; i < karta.length; i++)
	{
		for(let j = 0; j < karta[i].length; j++)
		{
			if(karta[i][j] != 2 && karta[i][j] != 28){
				if(x <= j * 16 + 16 &&
				   x + 12 >= j * 16 &&
				   y + 10 <= i * 16 + 16 &&
				   y + 16  >= i * 16){
					return true;
				}
			}
		}
	}	
	return false;
}

// En Funktion som hanterar all kollision i spelet 
function spelObjektKollision(x, y, objects, arLink, arSvard, direction)
{
	// Kollision för link
	if(arLink)
	{
		// En loop som loopar genom alla objekten
		for(let i = 0; i < objects.length; i++)
		{
			//Kollar om det ör en kollison
			if(x <= objects[i].x + objects[i].width &&
			x + 16 >= objects[i].x &&
			y <= objects[i].y + objects[i].height &&
			y + 16 >= objects[i].y)
			{
				// Kollar vad det är vi kolliderar med
				
				// Kollision med portal 
				if(objects[i].arPortal)
				{
					spelKarta = arrKartor[objects[i].nyKarta].karta;
					spelObjekt = arrKartor[objects[i].nyKarta].spelobjekts;
					linkX = objects[i].newLinkX;
					linkY = objects[i].newLinkY;
				}
				// Kollision för alla upplocksbara objekt
				if(objects[i].arObjekt){
					objektAnimation = true;	 
					/// I spelet finns det massor olika upptagabara saker. 
					/// Dem första åtta kan man komma åt via inventory.
					/// Dem resterande 6 finns över inventoryt 
					/// och är automatiskt valda och använda av Link
		
					//0 - Boomerang
					//1 - Bomb
					//2 - Pilbåge
					//3 - Ljus
					//4 - Flöjt
					//5 - Kött
					//6 - Gift (Röd eller blå)
					//7 - Trollstav
					//8 - Flotte
					////////////
					//9 - Trollbok
					//10 - Ring
					//11 - Stege
					//12 - Nyckel 
					//13 - Armband
					//14 - Träsvärd
		
					switch(spelObjekt[i].objektNum)
					{
						case 0:
							break;
		
						case 1:
							break;
		
						case 2:
							break;
		
						case 3:
							break;
		
						case 4:
							break;
		
						case 5:
							break;	
		
						case 6:
							break;
		
						case 7:
							break;
		
						case 8:
							break;
		
						case 9:
							break;
		
						case 10:
							break;
		
						case 11:
							break;
		
						case 12:
							break;
		
						case 13:
							break;
		
						case 14:
							sistaUpplockadeObejkt = 14; 
							utrustatSvard = 1;
							harSvard = true;
							spelaLjud("./Ljud/Item.mp3")
							break;
					}
					objects.splice(i, 1);
				}
			}
		}
	}
	else{
		let svardW = 11;
		let svardH = 3;
		if(sistaKnapptryck == "upp" || sistaKnapptryck == "ner" ){
			svardW = 3;
			svardH = 11;
		} 
		//Kollar efter kollison med svärdet
		for (i = 0; i<objects.length; i++){
			if (sistaKnapptryck == "vänster"){
				if (x <= objects[i].x + objects[i].width &&
				x + svardW >= objects[i].x &&
				y <= objects[i].y + objects[i].height &&
				y + svardH >= objects[i].y){
				//Om det är en fiende så ska man tabort 1hp eller döda fienden
				if(objects[i].arFiende){
					objects[i].behoverStuds;
					studsLocation(objects[i], false, direction)
					objects[i].fiendeHalsa -= 1;
					if(objects[i].fiendeHalsa <= 0){
						spelaLjud("./Ljud/LOZ_enemy_die.wav");
					}
					else{
						spelaLjud("./Ljud/LOZ_enemy_hit.wav");
						}
					}
				}
			} else if (sistaKnapptryck == "höger"){
				if (x <= objects[i].x + objects[i].width &&
				x + svardW >= objects[i].x &&
				y <= objects[i].y + objects[i].height &&
				y + svardH >= objects[i].y){
				//Om det är en fiende så ska man tabort 1hp eller döda fienden
				if(objects[i].arFiende){
					objects[i].behoverStuds;
					studsLocation(objects[i], false, direction)
					objects[i].fiendeHalsa -= 1;
					if(objects[i].fiendeHalsa <= 0){
						spelaLjud("./Ljud/LOZ_enemy_die.wav");
					}
					else{
						spelaLjud("./Ljud/LOZ_enemy_hit.wav");
						}
					}
				}
			} else if (sistaKnapptryck == "upp"){
				if (x <= objects[i].x + objects[i].width &&
				x + svardW >= objects[i].x &&
				y <= objects[i].y + objects[i].height &&
				y + svardH >= objects[i].y){
				//Om det är en fiende så ska man tabort 1hp eller döda fienden
				if(objects[i].arFiende){
					objects[i].behoverStuds;
					studsLocation(objects[i], false, direction)
					objects[i].fiendeHalsa -= 1;
					if(objects[i].fiendeHalsa <= 0){
						spelaLjud("./Ljud/LOZ_enemy_die.wav");
					}
					else{
						spelaLjud("./Ljud/LOZ_enemy_hit.wav");
						}
					}
				}
			} else {
				if (x <= objects[i].x + objects[i].width &&
				x + svardW >= objects[i].x &&
				y <= objects[i].y + objects[i].height &&
				y + svardH >= objects[i].y){
				//Om det är en fiende så ska man tabort 1hp eller döda fienden
				if(objects[i].arFiende){
					objects[i].behoverStuds = true;
					studsLocation(objects[i], false, direction)
					objects[i].fiendeHalsa -= 1;
					if(objects[i].fiendeHalsa <= 0){
						spelaLjud("./Ljud/LOZ_enemy_die.wav");
					}
					else{
						spelaLjud("./Ljud/LOZ_enemy_hit.wav");
						}
					}
				}
			}
		}
	}
}

function studsLocation(gObject, igObjects, direction){
	let nuvarandeRad = Math.floor(gObject.y/16);
	let nuvarandeCollumn = Math.floor(gObject.x/16);
	if (direction == "upp"){
		if (spelKarta[nuvarandeRad -1][nuvarandeCollumn] == 2){
			gObject.studsY = gObject.y - 16;
			gObject.studsX = gObject.x;
		} else{
			gObject.studsY = gObject.y;
			gObject.studsX = gObject.x;
		}
	}
	if (direction == "ner"){
		if (spelKarta[nuvarandeRad + 1][nuvarandeCollumn] == 2){
			gObject.studsY = gObject.y + 16;
			gObject.studsX = gObject.x;
		} else{
			gObject.studsY = gObject.y;
			gObject.studsX = gObject.x;
		}
	}
	if (direction == "vänster"){
		if (spelKarta[nuvarandeRad][nuvarandeCollumn - 1] == 2){
			gObject.studsY = gObject.y;
			gObject.studsX = gObject.x - 16;
		} else{
			gObject.studsY = gObject.y;
			gObject.studsX = gObject.x;
		}
	}
	if (direction == "höger"){
		if (spelKarta[nuvarandeRad][nuvarandeCollumn + 1] == 2){
			gObject.studsY = gObject.y;
			gObject.studsX = gObject.x + 16;
		} else{
			gObject.studsY = gObject.y;
			gObject.studsX = gObject.x;
		}
	}
}

//En function för att rita ut alla interaktiva objekt i spelet
function ritaSpelObjekt(){
	for(let i = 0; i < spelObjekt.length; i++){
		if(spelObjekt[i].arObjekt){

			/// I spelet finns det massor olika upptagabara saker. 
			/// Dem första åtta kan man komma åt via inventory.
			/// Dem resterande 6 finns över inventoryt 
			/// och är automatiskt valda och använda av Link

			//0 - Boomerang
			//1 - Bomb
			//2 - Pilbåge
			//3 - Ljus
			//4 - Flöjt
			//5 - Kött
			//6 - Gift (Röd eller blå)
			//7 - Trollstav
			//8 - Flotte
			////////////
			//9 - Trollbok
			//10 - Ring
			//11 - Stege
			//12 - Nyckel 
			//13 - Armband
			//14 - Trä Svärd

			switch(spelObjekt[i].objektNum)
			{
				case 0:
					break;

				case 1:
					break;

				case 2:
					break;

				case 3:
					break;

				case 4:
					break;

				case 5:
					break;	

				case 6:
					break;

				case 7:
					break;

				case 8:
					break;

				case 9:
					break;

				case 10:
					break;

				case 11:
					break;

				case 12:
					break;

				case 13:
					break;
				// Skriver ut svärdet
				case 14:
					ctx.drawImage(hud, 555, 137, 8, 16, spelObjekt[i].x, spelObjekt[i].y, 8, 16);
					break;
			}
		}
		//Skriver ut och animerar texten och spelar upp ett ljud varje gång texten skrivs ut
		if(spelObjekt[i].arText){
			spelObjekt[i].raknare += 1;
			if(spelObjekt[i].raknare % 5 == 0 ){
				if(spelObjekt[i].line1Full.length != spelObjekt[i].nuvarandeLine1.length){
					spelObjekt[i].nuvarandeLine1 = spelObjekt[i].line1Full.substring(0, spelObjekt[i].nuvarandeLine1.length + 1);
					spelaLjud("./Ljud/LOZ_text_slow.wav")
				}else if(spelObjekt[i].line2Full.length != spelObjekt[i].nuvarandeLine2.length){
					spelObjekt[i].nuvarandeLine2 = spelObjekt[i].line2Full.substring(0, spelObjekt[i].nuvarandeLine2.length + 1);
					spelaLjud("./Ljud/LOZ_text_slow.wav")
				}
			}
		// Textens stil	
		ctx.fillStyle = "white";
		ctx.font = "12px Arial";
		ctx.fillText(spelObjekt[i].nuvarandeLine1, spelObjekt[i].line1X, spelObjekt[i].line1Y);
		ctx.fillText(spelObjekt[i].nuvarandeLine2, spelObjekt[i].line2X, spelObjekt[i].line2Y);
		}

		//Skriver ut och animerar flamman
		if(spelObjekt[i].arFlamma){
			spelObjekt[i].raknare++;
			if(spelObjekt[i].raknare % 5 == 0 ){
				spelObjekt[i].bildNum++;
			}
			if(spelObjekt[i].bildNum > 1){
				spelObjekt[i].bildNum = 0;
			}
			if(spelObjekt[i].bildNum == 0){
				ctx.drawImage(karakt2, 158, 11, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16)
			}
			if(spelObjekt[i].bildNum == 1){
				ctx.drawImage(karakt1, 52, 11, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16)
			}
		}

		//Skriver ut den gammle mannen
		if(spelObjekt[i].arGammalMan){
			ctx.drawImage(karakt1, 1, 11, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16)
		}

		//Skriver ut den gammle kvinnan
		if(spelObjekt[i].arGammalDam){	x
			ctx.drawImage(karakt1, 35, 11, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16)
		}

		//Skriver ut fiende
		if(spelObjekt[i].arFiende){

			if(spelObjekt[i].fiendeTyp == 1 ){
				spelObjekt[i].raknare++;

				if(spelObjekt[i].raknare >= 10){
					spelObjekt[i].frame++;
					spelObjekt[i].raknare = 0;

					if(spelObjekt[i].frame > 1){
						spelObjekt[i].frame = 0;
					}
					
				}

			}

				if (spelObjekt[i].direction == "ner"){
					if (spelObjekt[i].frame == 0){
						ctx.drawImage(fiender, 0, 0, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
					if (spelObjekt[i].frame == 1){
						ctx.drawImage(fiender, 0, 30, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
				} else if (spelObjekt[i].direction == "upp"){
					if (spelObjekt[i].frame == 0){
						ctx.drawImage(fiender, 60, 0, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
					if (spelObjekt[i].frame == 1){
						ctx.drawImage(fiender, 60, 30, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
				} else if (spelObjekt[i].direction == "vanster"){
					if (spelObjekt[i].frame == 0){
						ctx.drawImage(fiender, 30, 0, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
					if (spelObjekt[i].frame == 1){
						ctx.drawImage(fiender, 30, 30, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
				} else {
					if (spelObjekt[i].frame == 0){
						ctx.drawImage(fiender, 90, 0, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
					if (spelObjekt[i].frame == 1){
						ctx.drawImage(fiender, 90, 30, 16, 16, spelObjekt[i].x, spelObjekt[i].y, 16, 16 )
					}
				}
				if(spelObjekt[i].behoverStuds){
					if(spelObjekt[i].x != spelObjekt[i.bounceX]){
						if(spelObjekt.bounceX > spelObjekt[i].x){
							spelObjekt[i].x  += 4;
						}
						else {
							spelObjekt[i].x  -= 4;
						}
					}
					if(spelObjekt[i].y != spelObjekt[i.bounceY]){
						if(spelObjekt.bounceY > spelObjekt[i].y){
							spelObjekt[i].y  += 4;
						}
						else {
							spelObjekt[i].y -= 4;
						}
					}
					else {
						spelObjekt[i].behoverStuds = false;
					}
				}
			
		}

	}
		
}

//En function som ritar ut Heads Up Displayen 
function ritaHUD(){
	ctx.drawImage(hud, 258, 11, 256, 56, 0, 0, 256, 56);

	ctx.fillStyle = "black";
	ctx.fillRect (176, 32, 64, 16);

	let helaHjartan = Math.floor(nuvarandeHalsa);
	let halvaHjartan = nuvarandeHalsa - helaHjartan;

	// En loop som säger vart vi ska skriva ut våra hjärtan 
	for(i = 0; i < linkHalsa; i++){
		let hjartaY = 40;
		let hjartaX = 176 + (i * 8);
		if (i > 7){
			hjartaY = 40 - 8;
			hjartaX -= 64; 
		}
		ctx.drawImage(hud, 627, 117, 8, 8, hjartaX, hjartaY, 8, 8);
	}
	let halvaHjartanX = 0;
	let halvaHjartanY = 0;

	//Skriver ut hela hjärtan
	for (i = 0; i < helaHjartan; i++){
		let hjartaY = 40;
		let hjartaX = 176 + (i * 8);
		if (i > 7){
			hjartaY = 40 - 8;
			hjartaX -= 64; 
		}
		ctx.drawImage(hud, 645, 117, 8, 8, hjartaX, hjartaY, 8, 8);
		if(i == helaHjartan -1){
			if (i>6){
				halvaHjartanY = 40 - 8;
				halvaHjartanX = 176 +((i % 7) * 8);
			}
			else{
				halvaHjartanY = 40;
				halvaHjartanX = 176 +(i * 8) + 8;
			}
		}
	}
	//Skriver ut halva hjärtan
	if (halvaHjartan > 0 && helaHjartan >=1){
		ctx.drawImage(hud, 636, 117, 8, 8, halvaHjartanX, halvaHjartanY, 8, 8 )
	}
	else if(halvaHjartan > 0 && helaHjartan == 0) {
		ctx.drawImage(hud, 636, 117, 8, 8, 176, 40, 8, 8 )
	}

	// Täcker över de tomma pixlarna 
	ctx.fillStyle = "black";
	ctx.fillRect (96, 10, 24, 50);

	// Skriver ut antalet rubiner under 100 med ett X framför
	if(antalRubiner < 100){
		ctx.drawImage(hud, 519, 117, 8, 8, 96, 16, 8, 8);
		let forstaNum = antalRubiner % 10;
		ctx.drawImage(hud, 528 + (8 * forstaNum) + forstaNum, 117, 8, 8, 96 + 16, 16, 8, 8);
		let andraNum = Math.floor(antalRubiner / 10);
		ctx.drawImage(hud, 528 + (8 * andraNum) + andraNum, 117, 8, 8, 96 + 8, 16, 8, 8);
	}
	// Skriver ut antalet rubiner över 100 utan ett X framför
	else{
		let forstaNum = antalRubiner % 10;
		ctx.drawImage(hud, 528 + (8 * forstaNum) + forstaNum, 117, 8, 8, 96 + 16, 16, 8, 8);
		let tredjeNum = Math.floor(antalRubiner / 100) * 100;
		let andraNum = ((antalRubiner - tredjeNum) - forstaNum) / 10;
		ctx.drawImage(hud, 528 + (8 * andraNum) + andraNum, 117, 8, 8, 96 + 8, 16, 8, 8);
		tredjeNum = Math.floor(antalRubiner/100);
		ctx.drawImage(hud, 528 + (8 * tredjeNum) + tredjeNum, 117, 8, 8, 96, 16, 8, 8);
	}
	//Skriver hur många bomber och nycklar du har
	ctx.drawImage(hud, 519, 117, 8, 8, 96, 32, 8, 8);
	ctx.drawImage(hud, 519, 117, 8, 8, 96, 41, 8, 8);
	ctx.drawImage(hud, 528 + (8 * antalNycklar) + antalNycklar, 117, 8, 8, 96 + 8, 32, 8, 8);
	ctx.drawImage(hud, 528 + (8 * antalBomber) + antalBomber, 117, 8, 8, 96 + 8, 41, 8, 8);

	//Skriver ut svärdet i huden 
	ctx.fillRect (128, 24, 8, 16);
	ctx.fillRect (152, 24, 8, 16);
	if(utrustatSvard == 1){
		ctx.drawImage(hud, 555, 137, 8, 16, 152, 24, 8, 16);
	}

	//Fyller ut kartan
	ctx.fillStyle = "gray";
	ctx.fillRect (16, 8, 64, 48);
}

//En function som skriver ut allt 60 gånger/sekund
function draw () {
   setTimeout(function() {
   requestAnimationFrame(draw);
   ctx.fillStyle = "rgb(20,20,20)";
   ctx.fillRect(0,0,256,240);
//Alla anropningar till funktioner
   ritaKarta(spelKarta);
   ritaLink();
   ritaLink2();
   ritaHUD();
   ritaSpelObjekt() 
   spelObjektKollision(linkX, linkY, spelObjekt, true)
   },1000/fps);
}

draw();