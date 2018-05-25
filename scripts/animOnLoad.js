(function(){
    // if slow network, wait untill elem is loaded to play its css anim
    var elems = document.querySelectorAll(".animOnLoad")

    for(var i = elems.length; i--;) {
        elems[i].className = "waitingLoad"
        elems[i].onload = function(e) {e.target.className = "animOnLoad"}
    }

})()