let lis = $("#menuAnims").find('li')
let videos = $("#videosAnimsDeJeu").find('video')

// put "selected" class to first li
lis.first().addClass("selected")

// hide all videos but the first
videos.css("display", "none")
videos.first().css("display","initial")
videos.first()[0].play()

// if one li is clicked
$('#menuAnims').on('click', 'li', function(event){
	// and not already selected
	if (!$(this).hasClass('selected')) {
		let li  = $(this)
		let index = lis.index(li)
		let vid = videos.eq(index)

		// change selected class to this li
		lis.removeClass("selected")
		li.addClass("selected")

		// play video from begining
		vid[0].currentTime = 0
		vid[0].play()

		// display corresponding video
		videos.css("display", "none")
		vid.css("display", "initial")
		
	}
})