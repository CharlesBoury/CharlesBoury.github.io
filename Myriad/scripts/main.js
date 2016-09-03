// fps meter
// var meter = new FPSMeter()
// meter.set('theme', 'transparent');
// meter.set('graph', '1');

// canvas & context
var canvas    = document.getElementById('canvas1')
canvas.width  = document.body.clientWidth
canvas.height = document.body.clientHeight
var ctx       = canvas.getContext('2d')
ctx.mozImageSmoothingEnabled = false;

// slider
initSliders()
var nombre             = getSliderValue('nombre')
var vitesse            = getSliderValue('vitesse')
var vitesseMax         = getSliderValue('vitesseMax')
var distanceEntreElles = getSliderValue('distanceEntreElles')
var tailleSouris       = getSliderValue('tailleSouris')
var forceDeRepulsion   = getSliderValue('forceDeRepulsion')
var tailleNid          = getSliderValue('tailleNid')
var forceDattraction   = getSliderValue('forceDattraction')

// points remarquables
window.souris           = new Point (0, 0)
window.sourisPrecedente = new Point (0, 0)
window.sourisVel        = new Point (0, 0)
var fenetre             = new Point (document.body.clientWidth, document.body.clientHeight)
var nid                 = divPar(fenetre, 2)

// Images
var ImageParticule = document.getElementById('ImageParticule');
var ImagePloup = document.getElementById('ImagePloup');
var Cercle = document.getElementById('Cercle');
// bruitages
var bruitagePassage=document.getElementById("Passage");
var velMax = 0

// ploups
var ploups = []

// autres variable
var compteur = 0;
var aCreer = 0;








//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
function update() {
	// sliders
	nombre             = getSliderValue('nombre')
	vitesse            = getSliderValue('vitesse')
	vitesseMax         = getSliderValue('vitesseMax')
	distanceEntreElles = getSliderValue('distanceEntreElles')
	tailleSouris       = getSliderValue('tailleSouris')
	forceDeRepulsion   = getSliderValue('forceDeRepulsion')
	tailleNid          = getSliderValue('tailleNid')
	forceDattraction   = getSliderValue('forceDattraction')

	// souris
	window.sourisVel = trajet(window.sourisPrecedente, window.souris)
	window.sourisPrecedente = clone(window.souris)

	// ploups
	dif = (nombre - ploups.length)
	if (dif != 0) {
		if (dif > 0) { creerPloups(dif) }
		else         { supprimerPloups(-dif) }
	}

	ploups.map(x => x.move())


	// audio
	velSomme = ploups.map(p => mag(p.vel)).reduce((a, b) => a+b, 0)
	velSomme /= ploups.length
	bruitagePassage.volume = Math.max(Math.min(1,velSomme*2/vitesseMax),0)

	// compteur de particules emises par les ploups
	if (document
			.getElementById("Compteur")) {
		compteur = ploups.map(
			p => p.particuleSystem.particules.length)
			.reduce((a, b) => a + b, 0)
		document
			.getElementById("Compteur")
			.getElementsByTagName('span')[0]
			.innerHTML = compteur
	}

	draw()
}



//////////////////////////////////////////////////
//////////////////////////////////////////////////
function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height)

	// afficherNid(tailleNid)
	// afficherCercle(window.souris,tailleSouris)
	ploups.map(x => x.particuleSystem.afficher())
	ploups.map(x => x.afficher())
	/*
	// velocite souris
	ctx.strokeStyle = "orange"
	ctx.lineWidth=4
	afficherSegment(
		sub(window.souris, window.sourisVel), // depart
		window.souris) // arrivee
	*/
	// meter.tick()
}









//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
function Ploup(pos) {
	this.pos  = pos
	this.vel  = new Point()
	var forceNid    = new Point()
	var forceSouris = new Point()
	this.particuleSystem = new ParticuleSystem(this.pos)

	this.move = function move() {

		// force qu'exerce la souris
		forceSouris.devient(0,0);
		// si on est dans la zone de la souris
		if (distanceCarre(this.pos, window.souris) < tailleSouris*tailleSouris) {
			var trajetVersSouris = trajet(this.pos, window.souris)
			// force necessaire pour sortir le plus vite possible du cercle de peur
			forceSouris = invert( setMag(trajetVersSouris, tailleSouris - mag(trajetVersSouris)) )
			// reduite par le facteur 'forceDeRepulsion'
			forceSouris = multPar(forceSouris, forceDeRepulsion)
		}

		// force qu'exerce la Nid
		forceNid.devient(0,0);
		if (distanceCarre(this.pos, nid) > tailleNid*tailleNid) {
			// si on est à l'exterieur du nid
			forceNid = trajet(this.pos, nid)
			forceNid = multPar(forceNid,forceDattraction)
		}


		// ajout des forces à la vélocité
		this.vel = add(this.vel, forceNid)
		this.vel = add(this.vel, forceSouris)
		// ralentissement par frottement
		this.vel = multPar(this.vel,vitesse)
		// clamp vel
		if (magCarre(this.vel)> vitesseMax*vitesseMax) {
			this.vel = setMag(this.vel, vitesseMax)
		}
		var newPos = add(this.pos, this.vel)
		
		// test de collision (tres gourmand)
		for (var i = 0; i < ploups.length; i++) {
			var posDeLautre = ploups[i].pos
			if (distanceCarre(newPos, posDeLautre) < distanceEntreElles*distanceEntreElles) {
				ploups[i].pos = 
					add(newPos, setMag(trajet(newPos, posDeLautre),distanceEntreElles))
			}
		}

		this.pos = newPos
		// particuleSystem
		this.particuleSystem.pos = this.pos
		this.particuleSystem.creerParticules(Math.sqrt(mag(this.vel))/6)
		this.particuleSystem.update()
	}
	this.afficher = function afficher(){
		afficherImgPloup(
			this.pos,
			mag(this.vel)/(vitesseMax*2),
			angle(this.vel))
	}
}






//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
function ParticuleSystem(pos) {
	// se charge de créer, gérer et afficher les particules
	// faut juste lui dire combien, et où.
	// exemple
	//     system.pos = window.souris
	//     system.creerParticules(10)
	//     system.update()
	//     system.afficher()
	this.particules = []
	this.pos        = clone(pos)

	// var privées, pour calculer la vel
	var posTemp     = clone(pos)
	var vel         = new Point(0,0)
	var compteurTemp = 0

	// methodes
	this.creerParticules = function creerParticules(nombre) {
		compteurTemp += nombre
		if (compteurTemp < 1) {return}
		for (var i = 0; i < nombre; i++) {
			this.particules.push(
				new Particule(
					getRandomInt(10,40), // vie
					this.pos,             // position
					multPar(vel,0.03)      // velocite
				)
			)
		}
		compteurTemp %= 1
	}
	this.update = function update() {
		// calcul de la velocite
		vel = trajet(posTemp, this.pos)
		posTemp = this.pos
		// move every particle
		this.particules.map(x => x.move())
		// kill
		this.particules = this.particules.filter(x => x.vie >= 0)
		// this.particules = this.particules.filter(function(item) { return item.vie >=0; });
	}
	this.afficher = function afficher() {
		this.particules.map( function(item) {
			var pourcentageVie = item.vie/item.vieDeDepart
			return afficherImgParticule(
				item.pos,
				pourcentageVie,
				pourcentageVie,
				angle(item.vel)
			)
		})
	}
}













//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
function Particule(vie,pos,vel) {
	this.vie = vie
	this.vieDeDepart = vie
	this.pos = clone(pos)
	this.vel = vel

	this.move = function move() {
		if (this.vie >= 0) {
			this.pos = add(this.pos, this.vel)
			this.vie --;
		}
	}
}
















//////////////////////////////////////////////////
function afficherImgParticule(pos, scaleX, scaleY, angle) {
	ctx.translate(pos.x,pos.y)
	ctx.rotate(-angle) // sens trigonometrique bordel
	ctx.scale(scaleX,scaleY)
	ctx.drawImage(ImageParticule, -15,-9)
	ctx.resetTransform()
}
function afficherImgPloup(pos, scaleFactor, angle) {
	ctx.translate(pos.x,pos.y)
	ctx.rotate(-angle) // sens trigonometrique bordel
	ctx.scale(1+scaleFactor,1-scaleFactor/2)
	ctx.drawImage(ImagePloup, -12,-11)
	ctx.resetTransform()
}
function afficherCercle(pos, rayon) {
	ctx.translate(pos.x,pos.y)
	// l'image fait 300px, d'où les 150
	ctx.scale(rayon/150,rayon/150)
	ctx.drawImage(Cercle, -150,-150)
	ctx.resetTransform()
}
function afficherNid(rayon) {
	ctx.fillStyle = "#4D220F";
	ctx.beginPath()
	ctx.arc(nid.x, nid.y, rayon, 0, Math.PI*2, true)
	ctx.fill()
}
function afficherSegment(depart, arrivee) {
	ctx.beginPath()
	ctx.moveTo(depart.x,depart.y)
	ctx.lineTo(arrivee.x,arrivee.y)
	ctx.stroke()
}
//////////////////////////////////////////////////


function creerPloups(nombre) {
	for (var i = 0; i < nombre; i++) {
		ploups.push(
			new Ploup( add(multPar(vecteurAleatoire(), getRandom(0,tailleNid)),nid) )
		)
	}
}
function supprimerPloups(nombre) {
	ploups.splice(0, nombre);
}



//////////////////////////////////////////////////


// mémorise la position de la souris dans une globale
document.addEventListener('mousemove', onMouseUpdate, false)
document.getElementById('canvas1').addEventListener('mouseenter', onMouseUpdate, true)
function onMouseUpdate(e) {
	var event = e || window.event // a quoi cela sert ?
	window.souris.devient(event.clientX, event.clientY)
}


function toggleTableau() {
	console.log('toggle')
	var tableau = document.getElementById('Tableau')
	if (tableau.style.display == "none") {
		tableau.style.display = "block";
	} else {
		tableau.style.display = 'none';
	}
}

function toggleSon(){
	var image = document.getElementById("BoutonSon")

		if (image.src.match("Images/Playing.png")) {
			image.src = "Images/Muted.png"
			document.getElementById('Passage').muted = true
		} else {
			image.src = "Images/Playing.png"
			document.getElementById('Passage').muted = false
		}
}


// redimensionne le canvas quand la taille de la fenetre change
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);
function resizeGame() {
	canvas.style.width = document.body.clientWidth + "px"
	canvas.style.height = document.body.clientHeight + "px"
	canvas.width = document.body.clientWidth
	canvas.height = document.body.clientHeight
	// mettre à jour la taille de la fenetre
	fenetre.devient(document.body.clientWidth, document.body.clientHeight)
	nid = divPar(fenetre, 2)
}

var fps = 60
var loop = setInterval(function(){update()}, 1000/fps)