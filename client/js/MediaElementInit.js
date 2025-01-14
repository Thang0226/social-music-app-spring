// MediaElement
function initializeMediaPlayers() {
    let mediaElements = document.querySelectorAll('video, audio'), total = mediaElements.length;

    for (let i = 0; i < total; i++) {
        new MediaElementPlayer(mediaElements[i], {
            features: ['playpause', 'current', 'progress', 'duration', 'volume'],
            pluginPath: 'https://cdn.jsdelivr.net/npm/mediaelement@7.0.7/build/',
            shimScriptAccess: 'always',
            success: function (mediaElement) {
                let target = document.body.querySelectorAll('.player'), targetTotal = target.length;
                for (let j = 0; j < targetTotal; j++) {
                    target[j].style.visibility = 'visible';
                }
                // Increase view count after 30 seconds
                mediaElement.addEventListener('timeupdate', function () {
                    if (mediaElement.currentTime >= 30) {
                        // Call your function to increase the view count
                        increaseViewCount(songId);
                        // Remove the event listener after it triggers once
                        mediaElement.removeEventListener('timeupdate', arguments.callee);
                    }
                });
                // Play next track when current audio ended
                mediaElement.addEventListener('ended', function() {
                    song_ind = (song_ind + 1) % songs.length;
                    $("#song_name").html(`Song playing: ${songs[song_ind].name}`);
                    mediaElement.setSrc(`${API_BASE_URL}/audios/${songs[song_ind].musicFile}`);
                    mediaElement.load();
                    mediaElement.play();
                });
            }
        });
    }
}

// Initialize players on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    initializeMediaPlayers();
});