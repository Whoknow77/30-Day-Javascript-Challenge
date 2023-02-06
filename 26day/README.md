# Stripe Follow Along Dropdown Navigation

<br>

<img src="https://im5.ezgif.com/tmp/ezgif-5-c9d204829c.gif">

## 소개

- 동적인 드롭다운 메뉴를 구현한 웹페이지

## 배운내용

전체코드

```js
const triggers = document.querySelectorAll(".cool > li"); // 모든 li태그들
const background = document.querySelector(".dropdownBackground"); // 흰색 바탕
const nav = document.querySelector(".top"); // 내비게이션 바 전체

function handleEnter() {
  this.classList.add("trigger-enter");
  setTimeout(
    () =>
      this.classList.contains("trigger-enter") &&
      this.classList.add("trigger-enter-active"),
    150
  );
  background.classList.add("open");

  const dropdown = this.querySelector(".dropdown");
  const dropdownCoords = dropdown.getBoundingClientRect(); // dropdown의 절대 좌표, 현재 브라우저 창에 따라 달라짐
  const navCoords = nav.getBoundingClientRect(); // 바의 좌표

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  background.style.setProperty("width", `${coords.width}px`); // 흰색바탕의 크기 조정
  background.style.setProperty("height", `${coords.height}px`);

  background.style.setProperty(
    "transform",
    `translate(${coords.left}px, ${coords.top}px)`
  ); // 흰색바탕의 위치 조정
}

function handleLeave() {
  this.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
}

triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseleave", handleLeave)
);
```

### 1. display && opacity

```css
.dropdown {
  opacity: 0;
  position: absolute;
  overflow: hidden;
  padding: 20px;
  top: -20px;
  border-radius: 2px;
  transition: all 0.5s;
  transform: translateY(100px);
  will-change: opacity;
  display: none;
}

.trigger-enter .dropdown {
  display: block;
}

.trigger-enter-active .dropdown {
  opacity: 1;
}
```

```js
setTimeout(() => this.classList.add("trigger-enter-active"), 150);
```

평상시에는 태그들이 안보이다가 마우스를 가져다대면 `trigger-enter`, `trigger-enter-active` 클래스를 추가시켜 보이게하는 효과를 css로 적용하였다.

그런데 왜 `display:blcok` 과 `display:opacity:1`를 따로 구분하였고, 심지어 시간 간격을 두었을까?

```css
.trigger-enter .dropdown {
  display: block;
  opacity: 1;
}
```

만약 이렇게 코드를 작성한다면, `opacity` **애니메이션이 동작하지 않기 때문**에 따로 구분하여 둔 것이다.

### 2. 화살표함수의 사용 이유

```js
function handleEnter() {
  this.classList.add("trigger-enter");
  setTimeout(() => this.classList.add("trigger-enter-active"), 150);
  background.classList.add("open");
}
```

마우스를 목록에 가져다 대면 drodown메뉴들과 흰 배경을 보이게 하는 코드이다.

하지만, 여기서 `setTimeout`의 함수를 화살표함수가 아닌 그냥 함수로 작성할 경우, `this`가 `window` 객체를 가리키므로 기능이 완성되지 않는다.

### 3. `getBoundingClientRect`

**위치와 크기**를 담은 배열을 반환하는 유용한 함수이다.

```js
const dropdownCoords = dropdown.getBoundingClientRect(); // dropdown의 절대 좌표, 현재 브라우저 창에 따라 달라짐
const navCoords = nav.getBoundingClientRect(); // 바의 좌표
```

이 함수를 통해 `dropdown`, 내비게이션 바의 위치, 크기를 알 수 있다.

```js
const coords = {
  height: dropdownCoords.height,
  width: dropdownCoords.width,
  top: dropdownCoords.top
  left: dropdownCoords.left
};

background.style.setProperty("width", `${coords.width}px`); // 흰색바탕의 크기 조정
background.style.setProperty("height", `${coords.height}px`);

background.style.setProperty(
  "transform",
  `translate(${coords.left}px, ${coords.top}px)`
); // 흰색바탕의 위치 조정
```

얻어온 크기, 좌표를 바탕으로 왼쪽위에 일정한 크기를 유지하던 흰색배경을 `dropdown` 크기에 맞게 너비, 폭, 위치를 모두 조정하였다.

<img src="https://im5.ezgif.com/tmp/ezgif-5-204bf3df2c.gif">

하지만 h2태그를 이용해 맨위에 요소를 추가하면 내비게이션 바도 아래로 내려가면서 흰색 배경의 위치가 벗어나는걸 볼 수 있다.

내비게이션 바 안에서 흰색바탕이 존재한다. 왼쪽 맨 위에서 흰 바탕이 항상 생기는 것이 아니다.

내비게이션 바만큼 내려온상태에서 좌표 이동을 하므로, `dropdown`의 좌표에서 `nav` 좌표를 빼줘야 한다.

### 4. 비동기 => 동기처리

```js
this.classList.add("trigger-enter");
setTimeout(() => this.classList.add("trigger-enter-active"), 150);
```

만약 마우스를 가져다대고 0.15초 후에 `active` 클래스를 만들기 전에 마우스를 떼버리면 뗀 상태에서도 비동기 함수가 호출되어서 메뉴가 사라지지 않는 문제가 발생한다.

```js
this.classList.add("trigger-enter");
setTimeout(
  () =>
    this.classList.contains("trigger-enter") &&
    this.classList.add("trigger-enter-active"),
  150
);
```

따라서 이렇게 **&&** 연산자를 이용하면 마우스를 대고 있을때에만 비동기 함수가 호출되도록 문제를 해결할 수 있다.

<br/>
<br/>
<br/>

3번 내용을 이해하는데 오래걸렸다.

당연히 흰색 배경화면이 맨 왼쪽 위에서 뜨는 줄 알고 이해가 가지 않았는데 좌표 이동을 하기전에 흰색 바탕이 어디 생기는지 확인한 후 이해할 수 있었다.

## [링크](https://hilarious-sunburst-062373.netlify.app)

## 참고자료
