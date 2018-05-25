
// show controls if autoplay isn't working
// Because in Safari, autoplay muted videos don't work if they have multiple sources

(function(){

    var videos = document.querySelectorAll('video[autoplay]')

    for(var i = videos.length; i--;) {
        videos[i].play()
        if (videos[i].paused) videos[i].controls = true
    }

})()

