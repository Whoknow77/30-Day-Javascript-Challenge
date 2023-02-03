# Unreal Webcam Fun with getUserMedia() and HTML5 Canvas

<br>

<img src="https://i.postimg.cc/HL3b7RkY/image.png" width="300">

## 소개

- 웹캠의 비디오를 캔버스에 실시간으로 그리고, 픽셀을 활용해 RGB 값을 변경하고 고스팅 효과를 적용할 수 있는 웹페이지

## 배운내용

전체코드

```js
const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error(`OH NO!!!`, err);
    });
}

// 비디오를 가져와 실제 캔버스에 그림

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with them
    // pixels = redEffect(pixels);

    //   pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // 소리재생
  snap.currentTime = 0;
  snap.play();

  // 캔버스로부터 데이터 꺼내기(사진의 텍스트 데이터)

  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome guy" />`;
  strip.insertBefore(link, strip.firstChild);
}

// 캔버스에서 픽셀 값을 받아와 rgb 값을 변경후 다시 넣음

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
```

### 픽셀

<img src="https://i.postimg.cc/YqqNtprX/image.png">

한 이미지가 위의 사진의 숫자와 같이 엄청난 숫자의 픽셀로 이루어져 있다는걸 눈으로 확인할 수 있었다.

또한 여러 이미지 효과나 색변화가

픽셀 데이터를 읽을 수 있는 데이터로 변환 => 데이터에 rgb값을 변경 => 다시 이미지에 픽셀 데이터를 업데이트

와 같은 순서로 이루어진다는게 신기하였다.

## [링크](https://storied-gingersnap-67e192.netlify.app)

`npm install` `npm start` 로 서버 연동 필요
