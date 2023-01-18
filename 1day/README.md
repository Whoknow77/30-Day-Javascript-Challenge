# Make a Javascript Drum Kit

<img src="https://i.postimg.cc/MTHRSx6L/image.png">

<br>

## 소개 

- 마치 드럼연주를 하는 것과 같이 단축키를 눌러서 여러가지 소리를 낼 수 있는 Drum Kit를 구현하였다.


## 배운 내용

```js
      function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        key.classList.add("playing");
      }

      function removeTransition(e) {
        if (e.propertyName !== "transform") return;
        this.classList.remove("playing");
      }

      const keys = document.querySelectorAll(".key");
      keys.forEach((key) =>
        key.addEventListener("transitionend", removeTransition)
      );
      window.addEventListener("keydown", playSound);
```

- 특정한 태그의 dataset안의 data를 비교하여 태그에 접근이 가능하다.

    ```js
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    ```

- `querySelectorAll`로 모든 태그를 배열에 담아 `forEach`문으로 배열 전체를 순회해 핸들러를 등록할 수 있다.

    ```js
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) =>
        key.addEventListener("transitionend", removeTransition)
    );
    ```



## [링크](https://tubular-nougat-64ec32.netlify.app)

