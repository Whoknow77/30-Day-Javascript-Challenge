# Custom HTML5 Video Player

<br>

<img src="https://i.postimg.cc/NMTNtn2K/image.png">

## **소개**

### 다음의 기능을 가지고 있는 비디오 플레이어이다.

1. ### 재생 / 일시정지 버튼을 통해 영상을 재생 / 일시정지
2. ### 음량조절 / 속도 조절 가능
3. ### 앞 뒤로 스킵 가능

<br/>

## **배운 내용**

### 전체코드

```js
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
```

Click & Drag 를 이용해 바를 움직일 때마다 실시간으로 비디오에 적용시키는 것이 가장 핵심적인 내용이었던 것 같다.

기존의 range버튼의 `change` 이벤트는 게이지를 뗐을때 또는 클릭했을때 반응을 한다.

이때 `this` 값으로 접근해서 값을 받아오는데

실시간으로 반영하기 위해서는 `mousemove`, `mousedown`을 사용해야 하고, 마우스를 누르고 있는 동안에는 `this`가 `Window` 객체를 반환하므로 `this` 대신 `event` 키워드를 사용해야 하는 점이 어려웠다.

<br/>

## **추가 기능**

### 영상에서 따로 해보라고 한 것과 일반적인 플레이어에 있는 기능을 추가로 구현해 봤다.

<br>

### 1) 전체화면 기능 추가

```js
const fullButton = player.querySelector("[data-full]");

function toggleFullScreen() {
  video.requestFullscreen();
}

fullButton.addEventListener("click", toggleFullScreen);
```

Skip 버튼 옆에 전체화면 버튼을 추가하였고, 클릭시 style 속성에 미리 부여되어있는 API를 이용하였다.

<br/>

### 2) _실시간으로 볼륨, 속도 조절 기능 추가_

```js
function handleRangeUpdate(e) {
  video[e.target.name] = e.target.value;
}

ranges.forEach((range) =>
  range.addEventListener("mousedown", () => (mousedown = true))
);
ranges.forEach((range) =>
  range.addEventListener("mouseup", () => (mousedown = false))
);
ranges.forEach((range) =>
  range.addEventListener("mousemove", (e) => mousedown && handleRangeUpdate(e))
);
```

클릭 & 드래그로 재생바를 이동할 때 구현한 함수와 동일한 로직이다.

기존의 change 이벤트는 마우스를 떼야 작동하므로 제거하고 mousemove로 통일하되, `mousedown` 상태 일때만 볼륨 / 속도 조절을 할 수 있도록 하였다.

따라서 실시간으로 마우스를 떼지 않고도 실시간으로 반영된 볼륨 / 속도 조절 기능을 가지게 되었다.

<br/>

### 3) 키보드 방향키로 스킵 기능 추가

```js
let value = [];
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
```

value 배열에 skip 데이터를 각각 넣었고, 키보드에 입력한 값이 왼쪽 방향키 / 오른쪽 방향키일때 각각 value의 값들을 인덱스로 접근해서 차례로 받아와 시간을 계산하여 Skip하게 하였다.

생각대로 깔끔하게 되지 않게 코드를 작성한 것 같아서 좀 아쉽다.

## [링크](https://tubular-pavlova-f885a7.netlify.app)
