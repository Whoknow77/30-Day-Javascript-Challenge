// Get our Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullButton = player.querySelector("[data-full]");
// Build out functions

// Play
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

// 재생 버튼 업데이트
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

// 스킵 구현
const value = [];
skipButtons.forEach((button) => value.push(Number(button.dataset.skip)));

function skip(e) {
  if (e.keyCode !== 37 && e.keyCode !== 39) {
    if (e.keyCode === undefined) {
      video.currentTime += parseFloat(this.dataset.skip);
      return;
    }
    return;
  } else if (e.keyCode === 37) {
    video.currentTime += parseFloat(value[0]);
  } else if (e.keyCode === 39) {
    video.currentTime += parseFloat(value[1]);
  }
}

// 볼륨, 속도 조절
function handleRangeUpdate(e) {
  video[e.target.name] = e.target.value;
}

// 클릭으로 이동
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// 재생 바 업데이트
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 전체화면
function toggleFullScreen() {
  video.requestFullscreen();
}

// Hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

let mousedown = false;

// Click & Drag로 재생바 이동하기
// 기존의 change 이벤트는 마우스를 떼야 작동하므로 제거하고 mousemove로 실시간으로 변화시킴1
// ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousedown", () => (mousedown = true))
);
ranges.forEach((range) =>
  range.addEventListener("mouseup", () => (mousedown = false))
);
ranges.forEach((range) =>
  range.addEventListener("mousemove", (e) => mousedown && handleRangeUpdate(e))
);

// Click & Drag로 재생바 이동하기
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// 전체화면
fullButton.addEventListener("click", toggleFullScreen);

// 방향키로 Skip 조절하기

window.addEventListener("keydown", (e) => skip(e));
