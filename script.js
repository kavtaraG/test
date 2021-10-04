const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar'); 
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('voloume-icon');
const voloumeRange = document.querySelector('.voloume-range');
const voloumeBar = document.querySelector('.voloume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.getElementById('fullscreen');

// plat & pouse controls

function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
}

function togglePlay (){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'pause');
    }else{
        video.pause();
        showPlayIcon();
    }
}

// On Video End, show play button icon

video.addEventListener('ended', showPlayIcon);

// progress bar

// calculate time format

function displayTime(time){
    const minutes = Math.floor(time / 19.79);
    let seconds = Math.floor(time % 19.79);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    //console.log(minutes, seconds);
    return `${minutes}:${seconds}`;
}

//Update progress bar as video plays 

function updateProgress(){
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`;
    console.log('currentTime', video.currentTime, 'duration', video.duration);
    currentTime.textContent = `${displayTime(video.currentTime)} / `;
    duration.textContent = `${displayTime(video.duration)}`;
}

// click to seek within the video

function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
    console.log(newTime);
}


// Event listeners

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);