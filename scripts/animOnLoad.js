
// if slow network, wait until elem is loaded to play its css anim

(function(){
	var elems = document.querySelectorAll(".animOnLoad")

	for(var i = elems.length; i--;) {
		if (!elems[i].complete) {
			elems[i].className = "waitingLoad"
			elems[i].onload = function(e) {e.target.className = "animOnLoad"}
		}
	}

})()
