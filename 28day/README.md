# Build a Experimental Video Speed Controller UI

<br>

<img src="./drag.gif">

## 소개

- 0~4 배속까지 조절가능한 비디오 스피드 컨트롤러를 가진 웹페이지

## 배운내용

전체코드

```js
const speed = document.querySelector(".speed");
const bar = document.querySelector(".speed-bar");
const video = document.querySelector(".flex");

let mousedown = false;

function handleMove(e) {
  if (mousedown || e.type === "click") {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + "%";
    const playbackRate = percent * (max - min) + min; // 0.4 ~ 4
    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(1) + "x";
    video.playbackRate = playbackRate;
  }
}
speed.addEventListener("click", handleMove);
speed.addEventListener("mousemove", handleMove);
speed.addEventListener("mousedown", () => (mousedown = true));
speed.addEventListener("mouseup", () => (mousedown = false));
speed.addEventListener("mouseleave", () => (mousedown = false));
```

핵심은 스피드바의 y좌표를 어떻게 구하냐인데 이전 예제와 같이 `pageY`를 이용하였다.

바 안에서 상대적인 y의 좌표는 `this.offsetTop` - `e.pageY` 이고, 여기서 `this`는 마우스 위치를 가리키고, 이 값에서 스피드바의 y좌표를 빼면 된다.

또한 상대적으로 상자 안에서 바의 높이를 구하기 위해 y 좌표를 스피드바의 전체 높이로 나눠서 `percent`를 구하였고, 이것을 이용해 바의 높이, 속도 조절등을 하였다.

최소/최대 스피드는 `percent`값이 0~1사이의 숫자이므로 0.4 ~ 4 사이의 숫자를 만들기 위해 (max-min)을 곱하고 min을 더하였다.

이것은 `Random` 함수를 이용하여 랜덤한 숫자를 추출할때 방법과 똑같다.

### 추가구현기능

1. 클릭상태에서 드래그할때만 볼륨 조절 가능

   ```js
   let mousedown = false;

   if (mousedown || e.type === "click") {
     const y = e.pageY - this.offsetTop;
     const percent = y / this.offsetHeight;
     const min = 0.4;
     const max = 4;
     const height = Math.round(percent * 100) + "%";
     const playbackRate = percent * (max - min) + min; // 0.4 ~ 4
     bar.style.height = height;
     bar.textContent = playbackRate.toFixed(1) + "x";
     video.playbackRate = playbackRate;

     speed.addEventListener("click", handleMove);
     speed.addEventListener("mousemove", handleMove);
     speed.addEventListener("mousedown", () => (mousedown = true));
     speed.addEventListener("mouseup", () => (mousedown = false));
     speed.addEventListener("mouseleave", () => (mousedown = false));
   }
   ```

   `mousedown`이라는 flag 변수를 전역에 둬서 `mousedown` 상태일때(flag 번수가 true)만 볼륨 조절이 가능하게 하였다.

   하지만 이렇게하면 클릭 한번으로는 볼륨 조절이 되지 않아 따로 `click` 이벤트를 달아주었고, 이것을 구분하기위하여 `e.type==='click'`을 이용하였다..

<br/>
<br/>
<br/>

---

추가구현기능을 달 때, 어려움을 겪었다.

11day때 했었던 방식으로 하려했는데 그때는 비디오 플레이어에 내장된 API를 써서 그런지는 모르겠지만 이번 예제와 상황이 좀 다른것 같다.

그래서 원래 알던 방식으로 하려했는데 도저히 되지 않고 콘솔에 찍히는것도 이해가 가지 않아 `click` 이벤트를 따로 이벤트 객체를 통해 if문으로 구별을 하였다.

## [링크](https://cool-blini-4db3da.netlify.app)
