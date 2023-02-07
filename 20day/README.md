# JavaScript Speech Recognition

<img src="./speech.gif">

<br>

## 소개

- Web Speech API를 이용한 음성인식 구현

## 배운내용

전체코드

```js
    <script>
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.interimResults = true;
      recognition.lang = "ko-KR";

      let p = document.createElement("p");
      const words = document.querySelector(".words");
      words.appendChild(p);

      recognition.addEventListener("result", (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        p.textContent = transcript;
        if (e.results[0].isFinal) {
          // 음성이 끊기면 단락 전환
          p = document.createElement("p");
          words.appendChild(p);
        }
        if (transcript.includes("빨강")) {
          words.style.background = "Red";
        }
        if (transcript.includes("파랑")) {
          words.style.background = "blue";
        }
        if (transcript.includes("확장")) {
          words.style.maxWidth = "1000px";
        }
        if (transcript.includes("축소")) {
          words.style.maxWidth = "500px";
        }
      });

      recognition.addEventListener("end", recognition.start); // 끝나면 다시 인식하도록 함
      recognition.start();
    </script>
```

<img src="https://i.postimg.cc/65B8LgdZ/image.png">

Web Speech API를 통해 음성인식을 하여 말한 단어의 데이터를 페이지에 출력한 결과다.

단어를 말할때마다 여러번의 음성 이벤트가 호출되어 콘솔에 배열과 유사한 형태로 출력된다.

따라서 이 데이터들 중 transcript을 사용하여 p 태그에 넣어주면 화면에 실시간으로 말한 단어를 확인할 수 있다.

### 추가 구현 내용

간단하게 음성인식을 통해 단어의 배경색의 색변화, 확장, 축소기능 들을 넣어 봤다.

```js
if (transcript.includes("빨강")) {
  words.style.background = "Red";
}
if (transcript.includes("파랑")) {
  words.style.background = "blue";
}
if (transcript.includes("확장")) {
  words.style.maxWidth = "1000px";
}
if (transcript.includes("축소")) {
  words.style.maxWidth = "500px";
}
```

## [링크](https://storied-gingersnap-67e192.netlify.app)

`npm install` `npm start` 로 서버 연동 필요
