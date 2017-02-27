$(document).ready(function(){


	// ---------------------------------------------
	// global variables

	/* need

		#Diaporama
			.diapo
			.diapo
			#vignettes
				li
				li
			<p class="compteur"><span class="current"></span> / <span class="total"></span></p>
	*/

	let vignettes   = $("#vignettes").find('li')
	let diapos      = $("#Diaporama").find('.diapo')
	let globalIndex = 0



	// ---------------------------------------------
	// intial

	// select first vignette
	vignettes.removeClass("selected")
	vignettes.first().addClass("selected")

	// show only first diapo
	diapos.css("display","none")
	diapos.first().css("display","initial")

	// update page number
	$(".compteur .current").text(globalIndex+1)
	$(".compteur .total"  ).text(diapos.length)


	// ---------------------------------------------
	// if one vignette is clicked

	$('#vignettes').on('click', 'li', function(event){
		// and not already selected
		if (!$(this).hasClass('selected')) {
			let li = $(this)
			globalIndex = vignettes.index(li)

			fadeToDiapo(globalIndex)
		}
	})



	// ---------------------------------------------
	// if one next/previous button is clicked

	$('#Diaporama').on('click', '.bouton', function(event){

		// add or remove 1 to index
		if ($(this).hasClass('suivant'))   globalIndex += 1
		if ($(this).hasClass('precedent')) globalIndex -= 1

		// cap it between 0 and max
		let indexMax = diapos.length-1
		if (globalIndex > indexMax) globalIndex = 0
		if (globalIndex < 0       ) globalIndex = indexMax

		fadeToDiapo(globalIndex)
	})



	// ---------------------------------------------
	// if a keyboard left/right arrow is used

	let down = {} // to prevent keydown event repetition, we'll register all active keys
	$(document).keydown(function( event ) {
		// if leftArrow is keydown AND not registered
		if ( event.which == 37 && down['37'] == null) {
			// register it
			down['37'] = true
			// do as if clicked on previous button
			$('.bouton.precedent').trigger("click");
		}
		// if rightArrow AND not registered
		if ( event.which == 39 && down['39'] == null) {
			// register it
			down['39'] = true
			// do as if clicked on next button
			$('.bouton.suivant').trigger("click");
		}
		// if it's an arrow
		if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40) {
			// prevent pan (because there may be overflow content on purpose)
			event.preventDefault()
		}
	})

	// unregister each released key
	$(document).keyup(function(event) {
		down[event.which] = null
	})




	function fadeToDiapo(index) {
		let diapo    = diapos.eq(index)
		let vignette = vignettes.eq(index)

		// change selected class to this li
		vignettes.removeClass("selected")
		vignette.addClass("selected")

		// display corresponding diapo
		diapos.fadeOut(200)
		diapo.fadeIn(200)

		// update page number
		$(".compteur .current").text(index+1)
	}


})