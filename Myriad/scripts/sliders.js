


function initSliders() {
	/* fonction necessaire à l'affichage des valeurs

	sans elle les sliders fonctionnent quand même,
	c'est juste qu'on voit pas la valeur actuelle
	*/


	// pour tous les params
	var params = document.getElementsByClassName("param");
	for(var i = 0; i < params.length; i++) {

		// afficher la valeur actuelle
		updateDisplay(params[i].getElementsByTagName('input')[0].id)

		// ajouter un ecouteur (oninput)
		// qui mettra à jour l'affichage
		params[i].addEventListener('input', function(e) {
			updateDisplay(this.getElementsByTagName('input')[0].id)
		});	
	}
}


function updateDisplay(id) {
	// ecrit la valeur et le nom du slider dans les spans d'en dessous
	var slider = document.getElementById(id)
	var nom    = slider.parentNode.getElementsByClassName('nom')[0]
	var valeur = slider.parentNode.getElementsByClassName('valeur')[0]
	nom.innerHTML = slider.id
	valeur.innerHTML = slider.value
}



// Getters & Setters ! Magic !!

function getSliderValue(id) {
	return document.getElementById(id).value
}
function setSliderValue(id, newValue) {
	document.getElementById(id).value = newValue
	updateDisplay(id)
}