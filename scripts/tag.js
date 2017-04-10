$(document).ready(function(){

	var tag = $(".tag")
	var projets = $(".icone")

	tag.mouseenter(function(){
		// highlight Videogames
		if (this.id == "Videogames") projets.filter(":not(.videogame)").addClass("dim")
		// highlight Toys
		if (this.id == "Toys") projets.filter(":not(.toy)").addClass("dim")
		// highlight Illustrations
		if (this.id == "Illustrations") projets.filter(":not(.illu)").addClass("dim")
	})
	tag.mouseleave(function() {
		$(".icone").removeClass("dim")
	})
})