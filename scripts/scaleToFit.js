


// necessite que #diaporama soit au centre du viewport
function scaleToFit() {
	var w = document.body.clientWidth;
	var h = document.body.clientHeight;
	var ratio = w/h;
	var diaporama = document.getElementById("Diaporama");

	var scaling;
	if (ratio > diaporama.offsetWidth/diaporama.offsetHeight) {
		// panoramique
		scaling = h / diaporama.offsetHeight;
	}
	else {
		// portrait
		scaling = w / diaporama.offsetWidth;
	}

	if (scaling < 1) { // on ne scale que pour diminuer
		diaporama.style.transform = "scale("+scaling+")";
	} else {
		diaporama.style.transform = "scale(1)";
	}

	var retour = document.getElementById("Retour");
	if (retour && scaling < 1) {
		// test pour ne pas avoir d'erreur sur une page sans retour
		retour.style.transform = "scale("+scaling+")";
	} else if (retour) {
		retour.style.transform = "scale(1)";
	}
}