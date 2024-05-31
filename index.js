const myPlay = document.querySelector("#play");
const audioFile = document.querySelector('audio');

let audioisPlaying = false;
function audioPlay(){
    audioFile.play();
    myPlay.classList.replace("fa-play", "fa-pause");
    audioisPlaying = true;
}
function audioPause(){
    audioFile.pause();
    myPlay.classList.replace("fa-pause", "fa-play");
    audioisPlaying = false;
}
myPlay.addEventListener("click", function () {
    if (audioisPlaying) {
        audioPause();
    } else {
        audioPlay();
    }
});

const songData = [
    {
        imageName: "images/music2.jpg",
        audioName: "Audios/audio2.mp3",
        songName: "GunturKaram",
        singerName: "Thaman"
    },
    {
        imageName: "images/music3.jpg",
        audioName: "Audios/audioB.mp3",
        songName: "Love",
        singerName: "Ram"
    },
    {
        imageName: "images/music4.jpg",
        audioName: "Audios/audioc.mp3",
        songName: "loveByte",
        singerName: "sailu"
    },
    {
        imageName: "images/music1.jpg",
        audioName: "Audios/DJ.mp3",
        songName: "LOVER",
        singerName: "hero"
    }
];

const myImage = document.querySelector("img");
const mySongName = document.querySelector("h2");
const mySingerName = document.querySelector("h3");
const forwardIcon = document.querySelector("#forward");
const backWard = document.querySelector("#backward");

function loadSongs(info) {
    myImage.src = info.imageName;
    audioFile.src = info.audioName;
    mySingerName.textContent = info.singerName;
    mySongName.textContent = info.songName;
    audioFile.addEventListener('loadedmetadata', () => {
        const durationTime = document.querySelector(".totaltime");
        durationTime.textContent = formatTime(audioFile.duration);
    });
}

let songIndex = 0;
forwardIcon.addEventListener("click", function() {
    songIndex++;
    if (songIndex >= songData.length) {
        songIndex = 0;
    }
    loadSongs(songData[songIndex]);
    if (audioisPlaying) {
        audioPlay();
    }
});
backWard.addEventListener("click", function() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songData.length - 1;
    }
    loadSongs(songData[songIndex]);
    if (audioisPlaying) {
        audioPlay();
    }
});
loadSongs(songData[songIndex]);

const currentTimeElem = document.querySelector(".currenttime");
const totalTimeElem = document.querySelector(".totaltime");

audioFile.addEventListener("timeupdate", function(event) {
    const currentTime = event.srcElement.currentTime;
    currentTimeElem.textContent = formatTime(currentTime);
    updateProgressBar();
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateProgressBar() {
    const progressInner = document.querySelector(".progressinner");
    const duration = audioFile.duration;
    const currentTime = audioFile.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    progressInner.style.width = `${progressPercent}%`;
}

