
// canvas & context
var canvas    = document.getElementById('canvas1')
canvas.width  = document.body.clientWidth
canvas.height = document.body.clientHeight
var ctx       = canvas.getContext('2d')
// ctx.mozImageSmoothingEnabled = false;

// slider
initSliders()
showNest = false
setCheckBoxValue('showNest', showNest)
showMouse = false
setCheckBoxValue('showMouse', showMouse)

var params = {
	default : {
		howMany: 25,
		speed: 0.97,
		maxSpeed: 10,
		minGap: 13,
		sizeNest: 28,
		attractionForce: 0.001,
		mouseSize: 240,
		repulsionForce: 0.008
	},
	pool : {
		howMany: 20,
		speed: 0.97,
		maxSpeed: 40,
		minGap: 21,
		sizeNest: document.body.clientHeight/2,
		attractionForce: 0.024,
		mouseSize: 70,
		repulsionForce: 1
	},
	electrons : {
		howMany: 5,
		speed: 1,
		maxSpeed: 40,
		minGap: 28,
		sizeNest: 44,
		attractionForce: 0.02,
		mouseSize: 160,
		repulsionForce: 0.116
	},
	essaim : {
		howMany: 25,
		speed: 0.97,
		maxSpeed: 40,
		minGap: 13,
		sizeNest: 28,
		attractionForce: 0.03,
		mouseSize: 240,
		repulsionForce: 0.05
	},
	fluide: {
		howMany: 80,
		speed: 1,
		maxSpeed: 11,
		minGap: 1,
		sizeNest: 50,
		attractionForce: 0.01,
		mouseSize: 220,
		repulsionForce: 0.072
	},
	groupe: {
		howMany: 20,
		speed: 0.9,
		maxSpeed: 40,
		minGap: 2,
		sizeNest: 100,
		attractionForce: 0.017,
		mouseSize: 376,
		repulsionForce: 0.012
	},
	phlegmatic : {
		howMany: 50,
		speed: 0.71,
		maxSpeed: 40,
		minGap: 28,
		sizeNest: 555,
		attractionForce: 0.006,
		mouseSize: 180,
		repulsionForce: 0.05
	},
	sardine : {
		howMany: 70,
		speed: 0.93,
		maxSpeed: 7,
		minGap: 15,
		sizeNest: 55,
		attractionForce: 0.014,
		mouseSize: 290,
		repulsionForce: 0.028
	},
}
setParams(params.default)

// points remarquables
window.souris           = new Point (0, 0)
window.sourisPrecedente = new Point (0, 0)
window.sourisVel        = new Point (0, 0)
var fenetre             = new Point (document.body.clientWidth, document.body.clientHeight)
var nid                 = divPar(fenetre, 2)

// Images
var ImageParticule = document.getElementById('ImageParticule');
var ImagePloup     = document.getElementById('ImagePloup');
var Cercle         = document.getElementById('Cercle');

// options
var tableau = document.getElementById('Tableau')
var maxAttration = document.getElementById("attractionForce").max

// ploups
var ploups = []










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
	howMany         = getSliderValue('howMany')
	speed           = getSliderValue('speed')
	maxSpeed        = getSliderValue('maxSpeed')
	minGap          = getSliderValue('minGap')
	mouseSize       = getSliderValue('mouseSize')
	repulsionForce  = getSliderValue('repulsionForce')
	sizeNest        = getSliderValue('sizeNest')
	attractionForce = getSliderValue('attractionForce')

	// checkbox
	showMouse = getCheckBoxValue('showMouse')
	showNest  = getCheckBoxValue('showNest')


	// souris
	window.sourisVel = trajet(window.sourisPrecedente, window.souris)
	window.sourisPrecedente = clone(window.souris)

	// ploups
	dif = (howMany - ploups.length)
	if (dif != 0) {
		if (dif > 0) creerPloups(dif)
		else supprimerPloups(-dif)
	}

	ploups.map(x => x.move())

	// compteur de particules emises par les ploups
	if (document.getElementById("Compteur")) {
		document.getElementById("Compteur")
			.getElementsByTagName('span')[0]
			.innerHTML = ploups.map(
			p => p.particuleSystem.particules.length)
			.reduce((a, b) => a + b, 0)
	}

	draw()
}



//////////////////////////////////////////////////
//////////////////////////////////////////////////
function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height)

	if (tableau.style.display == "block") {
		if (showNest) afficherCercle(nid, sizeNest, attractionForce * (15 / maxAttration))
		if (showMouse) afficherCercle(window.souris, mouseSize, repulsionForce * 15, "#325664")
	}
	ploups.map(x => x.particuleSystem.afficher())
	ploups.map(x => x.afficher())
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
		if (distanceCarre(this.pos, window.souris) < mouseSize*mouseSize) {
			var trajetVersSouris = trajet(this.pos, window.souris)
			// force necessaire pour sortir le plus vite possible du cercle de peur
			forceSouris = invert( setMag(trajetVersSouris, mouseSize - mag(trajetVersSouris)) )
			// reduite par le facteur 'repulsionForce'
			forceSouris = multPar(forceSouris, repulsionForce)
		}

		// force qu'exerce la Nid
		forceNid.devient(0,0);
		if (distanceCarre(this.pos, nid) > sizeNest*sizeNest) {
			// si on est à l'exterieur du nid
			forceNid = trajet(this.pos, nid)
			forceNid = multPar(forceNid,attractionForce)
		}


		// ajout des forces à la vélocité
		this.vel = add(this.vel, forceNid)
		this.vel = add(this.vel, forceSouris)
		// ralentissement par frottement
		this.vel = multPar(this.vel,speed)
		// clamp vel
		if (magCarre(this.vel)> maxSpeed*maxSpeed) {
			this.vel = setMag(this.vel, maxSpeed)
		}
		var newPos = add(this.pos, this.vel)
		
		// test de collision (tres gourmand)
		for (var i = 0; i < ploups.length; i++) {
			var posDeLautre = ploups[i].pos
			if (distanceCarre(newPos, posDeLautre) < minGap*minGap) {
				ploups[i].pos = 
					add(newPos, setMag(trajet(newPos, posDeLautre),minGap))
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
			mag(this.vel)/(maxSpeed*2),
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
	ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform matrix
}
function afficherImgPloup(pos, scaleFactor, angle) {
	ctx.translate(pos.x,pos.y)
	ctx.rotate(-angle) // sens trigonometrique bordel
	ctx.scale(1+scaleFactor,1-scaleFactor/2)
	ctx.drawImage(ImagePloup, -12,-11)
	ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform matrix
}
function afficherCercle(centre, rayon, epaisseur, couleur) {
	if (epaisseur != 0) epaisseur = Math.max(epaisseur, 1) // pas moins de 1, ou zero
	couleur = couleur || "#ea463f"

	ctx.beginPath()
	if (rayon == 0) {
		ctx.arc(centre.x, centre.y, 3, 0, Math.PI*2, true)
		ctx.fillStyle = couleur;
		ctx.fill()
	} else {
		ctx.arc(centre.x, centre.y, rayon, 0, Math.PI*2, true)
		ctx.strokeStyle = couleur;
		ctx.lineWidth = epaisseur;
	    ctx.stroke();
    }
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
			new Ploup( add(multPar(vecteurAleatoire(), getRandom(0,sizeNest)),nid) )
		)
	}
}
function supprimerPloups(nombre) {
	ploups.splice(0, nombre);
}



//////////////////////////////////////////////////

function setParams(options) {
	options = options || params.default
	if (options.howMany        ) setSliderValue('howMany',         options.howMany)
	if (options.speed          ) setSliderValue('speed',           options.speed)
	if (options.maxSpeed       ) setSliderValue('maxSpeed',        options.maxSpeed)
	if (options.minGap         ) setSliderValue('minGap',          options.minGap)
	if (options.mouseSize      ) setSliderValue('mouseSize',       options.mouseSize)
	if (options.repulsionForce ) setSliderValue('repulsionForce',  options.repulsionForce)
	if (options.sizeNest       ) setSliderValue('sizeNest',        options.sizeNest)
	if (options.attractionForce) setSliderValue('attractionForce', options.attractionForce)
}


//////////////////////////////////////////////////


document.getElementById('Presets').onchange = function(){
	var preset = document.getElementById('Presets').value
	setParams(params[preset])
}

document.getElementById('Options').onclick = function(){toggleTableau()}

// mémorise la position de la souris dans une globale
document.addEventListener('mousemove', onMouseUpdate, false)
document.getElementById('canvas1').addEventListener('mouseenter', onMouseUpdate, true)
function onMouseUpdate(e) {
	var event = e || window.event // a quoi cela sert ?
	window.souris.devient(event.clientX, event.clientY)
}


function toggleTableau() {
	// console.log('toggle')
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