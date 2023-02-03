# JavaScript Geolocation based Speedometer and Compass

<br>

<img src="https://i.postimg.cc/htLGDSxJ/image.png" height="500">

## 소개

- 현재 위치 정보를 표시하는 웹페이지

## 배운내용

전체코드

```js
const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");

navigator.geolocation.watchPosition(
  (data) => {
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  },
  (err) => {
    console.err(err);
    alert("HEY!");
  }
);
```

data속의 위치 정보와 속도 정보를 각각 arrow.style.transform, speed.textContent를 통해 지정하였다.

## [링크](https://storied-gingersnap-67e192.netlify.app)

`npm install` `npm start` 로 서버 연동 필요

Geolocation API는 보안 및 프라이버시 이슈가 있으므로 보안 컨텍스트5인 HTTPS, file:///, localhost를 사용한 연결에서만 작동하며, 위치 정보에 대한 접근 권한을 사용자가 설정해야 활성화된다.ㄹ

안드로이드와는 호환이 되지 않는다.
