# Text-To-Speech

<br>

<img src="https://i.postimg.cc/rpXn8m3H/image.png">

## 소개

- 텍스트를 목소리로 바꾸는 브라우저 내장 객체를 이용한 웹페이지

## 배운내용

전체코드

```js
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]'); // select
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg.text = document.querySelector('[name="text"]').value;

// 언어 추가
function populateVoices() {
  voices = this.getVoices(); // voice 종류배열
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

// 언어 변경
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

// 음성 재생
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices); // 보이스들이 처음 설치될 때 발생
voicesDropdown.addEventListener("change", setVoice); // 옵션선택을 통해 voice가 변경된 경우
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);

// stopButton.addEventListener("click", toggle(false)); // 이 함수는 함수를 반환하지 않는다. 페이지 로드시 최초 1회만 발동
// stopButton.addEventListener("click", toggle.bind(null, false));
stopButton.addEventListener("click", () => toggle(false));
```

<img src="https://i.postimg.cc/765Y4wcf/image.png">

브라우저에 내장 되어있는 `SpeechSynthesisUtterance` 객체는 음성의 속도, 톤, 내용, 목소리 등의 정보를 담고 있다.

<img src="https://i.postimg.cc/KYgnYSCs/console-lo-voices.png">

브라우저에 내장되어있는 `voices` 객체는 선택 가능한 목소리들을 전부 담은 배열이다.

따라서 이러한 정보들과 사용자가 선택한 이벤트들과 연결하여 기능을 구현하였다.

### 함수 뒤에 괄호를 붙인 경우(즉시호출)

예전에 유투브 강의를 들으면서 혼자 이벤트 핸들러를 달다가 그 이벤트를 발동시키지 않아도 저절로 페이지가 로드되자마자 이벤트가 호출이 되는 경우가 있어서 곤란했던 적이 있다.

그 당시에 원인을 모르고 넘어갔는데 이번 기회에 다시 복습하고, 원인을 알 수 있게 되었다.

```js
stopButton.addEventListener("click", toggle(false));
```

이렇게 함수 뒤에 괄호를 붙이면 **즉시 호출**의 의미를 가지기 때문에 toggle함수가 페이지가 로드 되자마자 실행되고, 그 이후에는 호출되지 않는다. 따라서 `stop` 버튼을 통해 음성호출을 중지해야하는데 중지하지 못한다.

즉, 함수가 반환되지 않는 함수다.

즉시호출을 막기위해 세가지 해결책이 있다. 하지만 셋다 결국 같은 논리이다.

```
stopButton.addEventListener("click", toggle.bind(null, false));

stopButton.addEventListener('click', function() {
  toggle(false);
});

stopButton.addEventListener("click", () => toggle(false));
```

**첫 번째**는 `bind`를 이용해 `toggle` 함수의 `this`값을 null로 설정하고, false를 인자로 설정한다.

즉, `this` 값을 null로 하는 **새로운** `toggle` 함수를 만드는 것이다.

**두 세번째**는 `toggle(false)`를 호출하는 또 다른 함수를 하나 만들어서 이벤트 리스너 함수로 달아주는 방법이다.

즉, 함수를 함수로 감싸준것이다.

## [링크](https://stupendous-bavarois-c69c6b.netlify.app)

## 참고자료

https://iborymagic.tistory.com/48
