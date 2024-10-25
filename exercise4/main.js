const video = document.querySelector('#video');
const playPauseBtn = document.querySelector('#playPause');
const muteToggle = document.querySelector('#muteToggle');
const fullscreenToggle = document.querySelector('#fullscreenToggle');
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const controls = document.querySelector('.controls');
const progressHandle = document.getElementById("progressHandle");
const nextBtn = document.querySelector('#next');
const previousBtn = document.querySelector('#previous');
const pauseButton = document.querySelector('#pauseButton');
const timeCount = document.querySelector('#timeCount');

let isDragging = false;
let hideControlsTimeout;
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimeDisplay() {
    const videoCurrentTime = video.currentTime;
    const videoDuration = video.duration;
    timeCount.innerHTML = `
        <span>${formatTime(videoCurrentTime)}</span> / <span>${formatTime(videoDuration)}</span>
    `;
}

function updateProgress() {
    if (!isDragging) {
        const { duration, currentTime } = video;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;
        updateTimeDisplay();
    }
}

function hideControls() {
    controls.style.opacity = 0;
    controls.style.transition = "opacity 0.5s";
}

function showControls() {
    controls.style.opacity = 1;
    controls.style.transition = "opacity 0.5s";
    if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout);
    }
    hideControlsTimeout = setTimeout(hideControls, 5000);
}

video.addEventListener('timeupdate', updateProgress);

function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.src = './images/pause.png';
        pauseButton.style.display = "none";
        showControls();
    } else {
        video.pause();
        pauseButton.style.display = "block";
        playPauseBtn.src = './images/play.png';
    }
}

playPauseBtn.addEventListener('click', togglePlayPause);
pauseButton.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', () => { video.currentTime += 15; });
previousBtn.addEventListener('click', () => { video.currentTime -= 15; });

progressContainer.addEventListener("click", setProgress);
function setProgress(e) {
    const width = progressContainer.clientWidth;
    const offsetX = e.offsetX || e.clientX - progressContainer.getBoundingClientRect().left;

    if (!isNaN(video.duration) && video.duration > 0) {
        video.currentTime = (offsetX / width) * video.duration;
        updateProgress();
    }
}

function onDrag(e) {
    if (isDragging) {
        const progressContainerRect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - progressContainerRect.left;
        let progressPercent = (offsetX / progressContainerRect.width) * 100;
        progressPercent = Math.max(0, Math.min(progressPercent, 100));

        progress.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;

        video.currentTime = (progressPercent / 100) * video.duration;
    }
}

progressHandle.addEventListener("mousedown", () => {
    isDragging = true;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
});

function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
}

muteToggle.addEventListener('click', () => {
    video.muted = !video.muted;
    muteToggle.src = video.muted ? './images/mute.png' : './images/volume.png';
});

const videoContainer = document.querySelector('#videoContainer');
fullscreenToggle.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowRight") {
        video.currentTime += 15;
    } else if (event.key === "ArrowLeft") {
        video.currentTime -= 15;
    } else if (event.key === " ") {
        togglePlayPause();
    }
});

let isMouseOver = false;

videoContainer.addEventListener('mouseenter', () => {
    isMouseOver = true;
    showControls();
});

videoContainer.addEventListener('mouseleave', () => {
    isMouseOver = false;
    if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout);
    }
    hideControlsTimeout = setTimeout(() => {
        if (!isMouseOver) {
            hideControls();
        }
    }, 5000);
});

videoContainer.addEventListener('mousemove', () => {
    showControls();
});
