# Let's build something fun with HTML5 Canvas

<br>

<img src="https://i.postimg.cc/6q1Md1qG/image.png">

## 소개

### 캔버스를 사용해 마우스 드래그 할때마다 동적으로 색, 색이 칠해지는 범위를 다르게 하는 웹페이지

<br/>

## 배운 내용

- ### Flag

  - **flag** : 플래그(flag)란 깃발이라는 뜻인데, 컴퓨터에서 무언가를 기억하거나 또는 다른 프로그램에게 약속된 신호를 남기기 위한 용도로 프로그램에 사용되는 미리 정의된 비트이다.

  - 그냥 true, false 값을 가지는 **boolean타입의 변수**라고 생각하면 된다.

    <br/>

  실제 자바스크립트 코드 에서

  ```js
  flag != flag;
  ```

  를 이용하여 `flag`를 다루는 경우가 매우 많다.

  ```js
  let isDrawing = false;

  function draw(e){

  if(!isDrawing){
    return;
  }

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  }
  ```

  위와 같이 `mousedown` 이벤트가 입력 되었을 때에만 캔버스에 그림을 그리기 위해서 `flag`값으로 `isDrawing`값을 전역변수로 두어 제어할 수 있다.

  ```js
  let direction = true;

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
  ```

  선의 너비가 100이상 일때는 선의 너비를 감소시키고, 1 이하 일때는 100이 될때까지 증가시키도록 `direction`을 `flag`값으로 두어 제어할 수 있다.

## [링크](https://aquamarine-macaron-ba93d5.netlify.app)

<br/>
