
function Point(x, y) {
	// sans argument, on crée un vecteur nul
	if (x === undefined && y == undefined) {
		this.x = 0
		this.y = 0
	} else if (y === undefined) {
		console.error('Point constructor has only one argument, it needs two.')
	} else {
		this.x = x
		this.y = y
	}
	// permet d'être SUR que le vecteur se comporte comme un nombre
	// methode de l'objet Point
	// permet : point.devient(autrePoint.x,autrePoint.y)
	// ou :     point.devient(autrePoint)
	// sans création d'un nouvel objet (clone)
	this.devient = function devient(a,b) {
		if (b === undefined) {
			// s'il n'y a qu'un argument alors c'est un point
			this.x = a.x
			this.y = a.y
		} else {
			this.x = a
			this.y = b
		}
	}
}


// fonctions statiques

function clone(a) { return new Point (a.x, a.y) }

var vecteurNul = new Point ( 0, 0)
var right      = new Point ( 1, 0)
var left       = new Point (-1, 0)
var down       = new Point ( 0, 1)
var up         = new Point ( 0,-1)
var rightDown  = new Point ( 1, 1)
var leftDown   = new Point (-1, 1)
var leftUp     = new Point (-1,-1)
var rightUp    = new Point ( 1,-1)

function estNul(v)       { return (v.x == 0 && v.y == 0) }
function estVertical(v)   { return v.x == 0 }
function estHorizontal(v) { return v.y == 0 }

function aimRight(v)     { return v.x > 0 }
function aimLeft(v)      { return v.x < 0 }
function aimUp(v)        { return v.y < 0 }
function aimDown(v)      { return v.y > 0 }
function aimRightDown(v) { return v.x >= 0 && v.y >= 0 }
function aimLeftDown(v)  { return v.x <= 0 && v.y >= 0 }
function aimLeftUp(v)    { return v.x <= 0 && v.y <= 0 }
function aimRightUp(v)   { return v.x >= 0 && v.y <= 0 }

function sontEgaux(a,b) { return a.x == b.x && a.y == b.y }

///////////////////////////////////////////////////////
function direction(alpha) {
	return new Point (Math.cos(alpha), Math.sin(alpha))
}
function vecteur (alpha, mag) {
	return setMag (direction(alpha), mag)
}
///////////////////////////////////////////////////////
function add(a, b) {
	return new Point (a.x + b.x, a.y + b.y)
}
function sub(a, b) {
	return new Point (a.x - b.x, a.y - b.y)
}
function milieu(a, b) {
	return new Point ((a.x + b.x) / 2, (a.y + b.y) / 2)
}
function trajet(a, b) {
	return sub(b,a)
}
///////////////////////////////////////////////////////
function angleEntre(a, b) {
	return normaliserAngle( angle(b) - angle(a) )
}
function distance(a, b) {
	return mag( trajet(a,b) )
}
function distanceCarre(a, b) {
	return magCarre( trajet(a,b) )
}
function dot(a, b) {
	return a.x * b.x + a.y + b.y
}
///////////////////////////////////////////////////////
function mag(v) {
	return Math.sqrt(magCarre(v))
}
function magCarre(v) {
	return (v.x * v.x + v.y * v.y)
}
function angle(v) { // entre 0 et tau, sens trigonometrique
	if (estNul (v)) { return 0 } else
	if (estHorizontal (v)) {
		if (aimRight (v)) { return 0 }
		else              { return Math.PI }
	} else
	if (estVertical (v)) {
		if (aimUp (v))    { return Math.PI * 1/2 }
		else              { return Math.PI * 3/2 }

	} else {
		var alpha = Math.atan(Math.abs(v.y/v.x))

		if (aimRightUp (v)) {
			return             alpha
		} else
		if (aimLeftUp (v)) {
			return   Math.PI - alpha
		} else
		if (aimLeftDown (v)) {
			return   Math.PI + alpha
		} else {
			// donc aimRightDown
			return Math.PI*2 - alpha
		}
	}
}
///////////////////////////////////////////////////////
function normer(v) {
	if (v.x == 0 && v.y == 0) {
		return right;
	} else {
		return divPar(v, mag(v))
	}
}
///////////////////////////////////////////////////////
function invert (v) {
	return new Point (-v.x, -v.y)
}
function invertX (v) {
	return new Point (-v.x,  v.y)
}
function invertY (v) {
	return new Point ( v.x, -v.y)
}
///////////////////////////////////////////////////////
function multPar(v, k) {
	return new Point (v.x * k, v.y * k)
}
function divPar(v, k) {
	if (k == 0) {
		return new Point (0, 0)
	} else {
		return new Point (v.x / k, v.y / k)
	}
}
function augmenteDe(v, k) {
	return setMag ( v, (mag(v) + k) )
}
function reduitDe(v, k) {
	return augmenteDe(v, -k)
}
///////////////////////////////////////////////////////
function setMag(v, k) {
	return multPar(normer(v), k)
}
function limiter(v,k) {
	if (mag(v) > k) {
		return setMag(v,k)
	} else {
		return v
	}
}
///////////////////////////////////////////////////////
function setAngle(v, alpha) {
	return multPar(direction(alpha), mag(v))
}
function tournerDe(v, alpha) {
	return setAngle(v, alpha + angle(v))
}
///////////////////////////////////////////////////////
function lerp (a, b, t) {
	return add(a, multPar( trajet(a,b), t ))
}
///////////////////////////////////////////////////////
function vecteurAleatoire() {
	return normer(new Point(Math.random()-0.5,Math.random()-0.5))
}
function pointAleatoireDansRect(v) {
	return new Point(
		Math.random()*v.x,
		Math.random()*v.y)
}


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function normaliserAngle(a) {
	return modulo(a, Math.PI * 2)
}

function modulo(a,b) {
	return a - b * Math.floor(a/b)
}

