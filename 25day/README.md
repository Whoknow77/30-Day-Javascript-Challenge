# Event Capture, Propagation and Bubbling

<br>

<img src="https://i.postimg.cc/SK0wLSsp/image.png">

## 소개

- 이벤트 버블링, 캡쳐링, 중단 이해하기

## 배운내용

기존에 버블링은 알고 있었던 내용이라 복습차원에서 다시 내용을 상기할 수 있었다.

캡쳐링은 스쳐지나가듯이 들어서 잘 몰랐었기 때문에 캡쳐링과 옵션에 집중해서 글을 작성하였다.

### Event Capturing

우선 div태그가 안쪽에서부터 바깥쪽으로 차례대로 three, two, one이 지정되어있다.

버블링은 안쪽을 클릭하면 아래에서 위로 이벤트가 전달되는데, **캡쳐링은 반대**로 일어난다.

발생전에 브라우저는 우선 이벤트를 **감지**(capture)를 위에서부터 아래로 한다.

즉, one => two => three 순으로 감지를 한다. 과정중에 각 div는 클릭이 발생했다는 정보를 저장한다.

따라서 버블링은 발생, 캡쳐링은 감지, 방향은 반대로 알아두면 된다.

### Option

- **Capture**

  ```js
  divs.forEach((div) =>
    div.addEventListener("click", logText, {
      capture: true,
    })
  );
  ```

  addEventListener의 세번째 인자로 위치하고, default 값은 `false`이다. 이때는 **버블링**을 의미한다.

  값이 `true`일때는 이벤트 발생 방식이 **버블링**이 아닌 **캡쳐링** 방식으로 바뀐다.

  따라서 위에서 아래로 이벤트가 발생한다.

  three를 누를 경우 one => two => three 순으로 출력된다.

- **once**

  ```js
  button.addEventListener(
    "click",
    () => {
      console.log("click!");
    },
    {
      once: true,
    }
  );
  ```

  최근에 추가된 옵션으로 **단 한번만 이벤트를 감지**하고 스스로 **unbind**하는 역할을 한다.

  즉, 이벤트 리스너가 한 번만 동작하고 removeEventListener를 하는 것과 동일하다.

  실제로 `logText` 함수는 최초 클릭 1회시에만 호출되고, 그 이후에는 호출되지 않는다.

## [링크](https://marvelous-scone-c5e7ef.netlify.app)
