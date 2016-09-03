

/* deux fonctions :
	start()
	update()

   et deux variables :
	window.fps
	window.souris
*/

window.fps = 30
window.souris = new Point (0, 0)


window.onload = function () {
	start()
	loop () }


document.onmousemove = function(e) {
	var event = e || window.event // a quoi cela sert ?
	window.souris = new Point (event.clientX, event.clientY) }


function loop() {
	setTimeout(function() {
		requestAnimationFrame(loop)
		update()
	}, 1000 / window.fps) }





//////////////////////////////////////////////////////////////



// Ca a l'air trop compliqué d'inclure Vecteur.js ici
// donc je copie-colle
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
}