# JavaScript Exercise: Follow Along Links

<br>

<img src="https://im4.ezgif.com/tmp/ezgif-4-4b8dd45e14.gif">

## 소개

- 마우스 커서 하이라이트 효과를 이어지듯이 구현한 웹페이지

## 배운내용

전체코드

```js
const triggers = document.querySelectorAll("a");

// 하이라이트 효과 HTML 요소
const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.append(highlight);

function highlightLink() {
  const linkCoords = this.getBoundingClientRect(); // 화면에서 엘리먼트의 위치

  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX,
  };
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px`;
}

triggers.forEach((a) => a.addEventListener("mouseenter", highlightLink));
```

**`span`태그의 하이라이트를 `a` 태그의 이벤트가 발생하면 효과를 적용시킨다.**

대상이 되는 `a` 태그에 마우스를 올리면 `a` 태그의 정보( 폭, 너비, 위치(x,y) )가 linkCoords에 저장이 되고, 하이라이트 효과의 크기에 대입한다.

근데 `top`과 `left` 속성에 왜 `window.scroll` 값을 더해야 할까?

<img src="https://i.postimg.cc/sgJRkgQw/image.png" height="400">

위와같이 스크롤을 하게 되면 대상 요소와 하이라이트 효과의 위치가 달라지는 문제가 발생한다.

`top` 요소와 `left`요소는 현재 브라우저의 위치에서 계산한 좌표이기 때문이다. 따라서 스크롤을 내릴수록 값이 작아진다.

이런 경우를 위해 `window.scroll` 값을 더해 스크롤한 만큼을 반영해준다.

## [링크](https://precious-meringue-857eb3.netlify.app)

## 참고자료

https://til-devsong.tistory.com/m/81
