function getControl(id) {
    return $("#" + id)[0];
}

function playAudio(id) {
    stopOtherAudio();
    var audioUrl = "https://slokastorage.blob.core.windows.net/vishnuresources/" + id + ".mp3";
    audio = getControl(id + "-audio");
    audio.src = audioUrl;
    audio.play();
    playBtn = getControl(id + "-play");
    playBtn.disabled = true;
    stopBtn = getControl(id + "-stop");
    stopBtn.disabled = false;
}

function stopAudio(id) {
    audio = getControl(id + "-audio");
    audio.pause();
    audio.currentTime = 0;
    playBtn = getControl(id + "-play");
    playBtn.disabled = false;
    stopBtn = getControl(id + "-stop");
    stopBtn.disabled = true;
}

function stopOtherAudio() {
    $("audio").each(function (index) {
        audio = $(this)[0];
        audio.pause();
        audio.currentTime = 0;
    });
    enableOtherPlayBtn();
    disableOtherStopBtn();
}

function enableOtherPlayBtn() {
    $('button[id$="-play"]').each(function (index) {
        btn = $(this)[0];
        btn.disabled = false;
    });
}

function disableOtherStopBtn() {
    $('button[id$="-stop"]').each(function (index) {
        btn = $(this)[0];
        btn.disabled = true;
    });
}