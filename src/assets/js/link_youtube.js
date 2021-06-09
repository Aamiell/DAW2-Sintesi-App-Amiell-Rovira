var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

//Desactivem tots el botons y amagem la part del video
document.getElementById('linkvideo').disabled = true;
document.getElementById('volumen').disabled = true;
document.getElementById('btstart').disabled = true;
document.getElementById('bstop').disabled = true;
document.getElementById('altrevideo').disabled = true;
document.getElementById('player').style.display = "none"

function onYouTubeIframeAPIReady() {
    //Agafem el que hem introduit al input
    var linkvideo = value = "<?php echo $recursos['link']; ?>";
    //Retallem del caracter 32 al 43 es a dir la id del video
    var linkvideoid = linkvideo.substring(32, 43);
    player = new YT.Player('player', {
        playerVars: {
            'controls': 0
        },
        height: '360',
        width: '100%',
        videoId: linkvideoid,
        events: {
            'onReady': stop,
            'onStateChange': onPlayerStateChange
        }
    });

}

function veureVideo() {
    //Fem visible la part on esta el video
    document.getElementById('player').style.display = "block"
        //Agafem el que hem introduit al input
    var linkvideo = value = "<?php echo $recursos['link']; ?>";
    //Retallem del caracter 32 al 43 es a dir la id del video
    var videoid = linkvideo.substring(32, 43);
    //Carregem el video que li hem pasat
    player.loadVideoById(videoid);
    //Desactivem el input y el boto
    document.getElementById('linkvideo').disabled = true;
    document.getElementById('veure').disabled = true;
    document.getElementById('volumen').disabled = false;
    document.getElementById('btstart').disabled = false;
    document.getElementById('bstop').disabled = false;
    document.getElementById('altrevideo').disabled = false;
    //Una vegda carregat el video fem el stop per a que no començi
    player.stopVideo();
    player.setVolume((document.getElementById("volumen").value));
    //Afagem el valor dels segons del localstorage
    var localtemps = localStorage.getItem(videoid);
    if (localtemps != null) {
        //alert(localtemps);
        //Li diem que carregem en el segons que hi havia al localstorage
        player.loadVideoById(videoid,
            localtemps)
        player.pauseVideo();
    }
}

var done = false;

function onPlayerStateChange(event) {
    //Si el video esta funcionan cambiarem el boto a pause
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
        document.getElementById('btstart').innerHTML = '<i class="fas fa-pause-circle"></i>&nbsp;PAUSE';
        //Si el video no esta funcionan cambiarem el boto a play
    } else {
        done = false;
        document.getElementById('btstart').innerHTML = '<i class="fas fa-play-circle"></i>&nbsp;PLAY';
    }
}

function play() {
    //Si el boto te el valor PLAY farem playVideo
    if (document.getElementById('btstart').innerHTML == '<i class="fas fa-play-circle"></i>&nbsp;PLAY') {
        player.playVideo();
        //Canviem el valor del boto a PAUSE
        document.getElementById('btstart').innerHTML = '<i class="fas fa-pause-circle"></i>&nbsp;PAUSE';
        //Si el boto te el valor PAUSE farem pauseVideo
    } else if (document.getElementById('btstart').innerHTML = '<i class="fas fa-pause-circle"></i>&nbsp;PAUSE') {
        player.pauseVideo();
        //Canviem el valor del boto a PLAY
        document.getElementById('btstart').innerHTML = '<i class="fas fa-play-circle"></i>&nbsp;PLAY';
    }
}

function stop() {
    //Pausem el video
    player.stopVideo();
}

function volumen() {
    //Ajustem el volumen que vulgem
    player.setVolume((document.getElementById("volumen").value));
}

function veurealtrevideo() {
    //Agafem el que hem introduit al input
    var linkvideo = document.getElementById('linkvideo').value;
    //Retallem del caracter 32 al 43 es a dir la id del video
    var videoid = linkvideo.substring(32, 43);
    //Guardem el valor del temps on hem parat en la variable
    var tempsparat = player.getCurrentTime();
    //FIquem al localstorege la id del video y el temps cuan hem parat
    localStorage.setItem(videoid, tempsparat);
    //Tornem a activar el input y el boto
    player.pauseVideo();
    //Tornem a activar el input y el boto
    document.getElementById('linkvideo').disabled = false;
    document.getElementById('veure').disabled = false;
}