
// force play on autoplay muted videos
// Because in Safari, autoplay muted videos don't work if they have multiple sources

(function(){

    var videos = document.querySelectorAll('video[autoplay][muted]')
    var promises = []

    for(var i = videos.length; i--;) {
        promises[i] = videos[i].play()
        if (promises[i] !== undefined) {
            promises[i].catch(function(error){})
            // handle promise rejection otherwise error is thrown
        }
    }
})()
