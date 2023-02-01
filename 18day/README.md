# How JavaScript's Array Reduce Works

<br>

## 소개

- `reduce` 함수를 이용해 `분:초`으로 시간 목록들을 합쳐서 `시간:분:초`로 나타내기

## 배운내용

전체코드

```js
    <script>
      const timeNodes = Array.from(document.querySelectorAll("[data-time"));

      const seconds = timeNodes
        .map((node) => node.dataset.time)
        .map((timeCode) => {
          const [mins, secs] = timeCode.split(":").map(parseFloat);
          return mins * 60 + secs;
        })
        .reduce((total, vidSeconds) => total + vidSeconds);

      let secondsLeft = seconds;
      const hours = Math.floor(secondsLeft / 3600);
      secondsLeft = secondsLeft % 3600;

      const mins = Math.floor(secondsLeft % 60);
      secondsLeft = secondsLeft % 60;

      console.log(hours, mins, secondsLeft);
    </script>
```

`map`을 사용하지만 콜백함수안에서 **구조분해**를 활용해 분을 초로 나타낸 결과를 return 할 수 있다.
