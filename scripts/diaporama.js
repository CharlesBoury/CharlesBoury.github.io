


$(document).ready(function(){
	

	/* accroche une data ‘current' valant 1 
	au diaporama (une lettre, pas un chiffre) */
	$("#Diaporama").data('current', 1);

	var diapos = $("#Diaporama").find('.diapo');
	// nombre de diapos
	var max = diapos.length;
	// cacher les diapos sauf la première
	diapos.css("display","none");
	diapos.first().css("display","initial");

	// écriture du compteur
	$("#Diaporama").find('.compteur').text('1 / ' + max);


	// quand on clique sur un bouton d'un diaporama
	$('#Diaporama').on('click', '.bouton', function(event){ 

		// si c'est un bouton suivant, aller à l'image suivante
		if ($(this).hasClass('suivant')) {
			changerDiapo(1)
		}
		// si c'est un bouton precedent, aller à l'image précédente
		else if ($(this).hasClass('precedent')) {
			changerDiapo(-1)
		}
	});

	function changerDiapo(val) {

		// pointeur vers les diapos
		var diapos = $("#Diaporama").find('.diapo');
		// Récupère compteur de l'instance courante
		var current = parseInt($("#Diaporama").data('current'), 10);
		// nombre de diapos du diaporama
		var max = diapos.length;

		current+= val // val est soit 1 soit -1

		// si on fait suivant à partir de la dernière image, on revient au début
		if (current > max) {
			current = 1;
		}
		// si on fait précédent à partir de la première image, on va à la fin
		if (current < 1) {
			current = max
		}

		// Transition transparente des diapos
		diapos.fadeOut(200);
		diapos.eq(current-1).fadeIn(200).css("display","block");
		
		// mise à jour du compteur
		$("#Diaporama").find('.compteur').text(current+' / '+max);
		// Met à jour le compteur de l'instance courante
		$("#Diaporama").data('current', current);
	}

	function listen() {document.addEventListener("keydown", k)}
	function forget() {document.removeEventListener("keydown", k)}
	listen()
	document.addEventListener("keyup", listen)

	function k(event) {
		// si c'est une fleche de direction
		if (event.keyCode >= 37 && event.keyCode <= 40) {
			event.preventDefault()
			// sinon les fleches permettent de pan les grandes images
			// mais ca ne marche pas très bien (Parce qu'on forget())
		}
		if (event.key === "ArrowLeft") {
			changerDiapo(-1)
		}
		if (event.key === "ArrowRight") {
			changerDiapo(1)
		}
		forget()
	}
});