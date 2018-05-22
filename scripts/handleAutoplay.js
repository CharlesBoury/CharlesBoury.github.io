// In safari autoplay videos don't work if they have multiple source.
// https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
var videos = document.getElementsByTagName('video')
for (var i=0; i<videos.length; i++) {
    var v = videos[i]
    if (v.autoplay && v.paused) {
        v.play()
        // if still paused, show controls
        if (v.paused) v.controls = true
    }
}