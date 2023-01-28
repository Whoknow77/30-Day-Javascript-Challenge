# Custom HTML5 Video Player

<br>

<img src="https://im2.ezgif.com/tmp/ezgif-2-de5232f822.gif">

## **소개** 

### 스크롤을 통해 이미지 절반을 지나면 이미지가 튀어나오는 효과를 보이는 웹페이지


<br/>

## **배운 내용**



### 전체코드

```js
    const sliderImages = document.querySelectorAll('.slide-in');

    function checkSlide(e){ 

      sliderImages.forEach(slideImage => {
        const viewportBottom = (window.innerHeight + window.scrollY);
        const imagehalfBottom = slideImage.offsetTop + slideImage.height/2;
        const isHalfShown = viewportBottom > imagehalfBottom;
        const isNotScrolledPast = window.scrollY < slideImage.offsetTop + slideImage.height;

        if(isHalfShown && isNotScrolledPast){
          slideImage.classList.add('active');
        }
        else{
          slideImage.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', debounce(checkSlide));
```

1) **debounce**

    `window` 인터페이스의 `scroll` 이벤트는 아주 미세한 스크롤에도 반응하기 때문에 이것을 방지하기 위해 `debounce`를 통해 과부하를 방지할 수 있다.

    `debounce`를 적용하면 여러번의 스크롤 이벤트 요청에도 마지막 이벤트 요청 단 한번만 이벤트 처리를 수행할 수 있게 된다.

    ```js
    window.addEventListener("scroll", debounce(checkslide));
    ```

2) **viewport의 밑바닥 절대좌표**

    <img src="https://velog.velcdn.com/images%2Fsa02045%2Fpost%2Fd7132d1e-7eac-4598-aca8-f23d139b0ec8%2Fver2.png" width="500">

    - `window.innerHeight` : 브라우저의 현재 높이. 화면을 확대하거나 축소하면 변하는 값이다.
    - `window.scrollY` : document가 수직으로 얼마나 스크롤됐는지 픽셀 단위로 반환한다.

    <br/>

    ```js
    const viewportBottom = (window.innerHeight + window.scrollY);
    ```

3) **이미지 절반의 절대좌표**

    <img src="https://velog.velcdn.com/images%2Fsa02045%2Fpost%2F586b99d8-d5e6-4f37-807c-508027acce5e%2Fimage%20halfk.png" width="500">

    <br/>


    -  `image.offsetTop` : `document.body` 즉, 맨 위부터 떨어진 image 위치

    <br/>

    ```js
    const imagehalfBottom = slideImage.offsetTop + slideImage.height/2;
    ```

4) **동작**

    - `isHalfShown` : 이미지가 반이상이 지나갔는지에 대한 flag 변수

        ```js
        const isHalfShown = viewportBottom > imagehalfBottom;
        ```

    - `isNotScrolledPast` : image가 viewport를 지나갔는지 판단하는 flag 변수

        ```js
        const isNotScrolledPast = window.scrollY < slideImage.offsetTop + slideImage.height;
        ```
    두 변수가 모두 참일때만 이미지를 보이게 한다.


브라우저 내에서 내비게이션바와 내용을 담은 객체가 따로 있는지 몰랐고, 그래서 이해하는데 시간이 좀 걸렸다.

특히 `window.innerHeight`를 이해하는데 좀 어려웠는데 이미지를 확대 축소할때마다 변경되는 점을 통해 이해할 수 있었다.

살짝 까다로운 계산이 들어가긴 하지만 동적인 웹페이지를 구현할 때 유용한 기능으로 보인다.

    



## [링크](https://zesty-horse-9c6fa6.netlify.app)

## 참고자료

 https://velog.io/@sa02045/Scroll-%EC%A0%95%EB%A6%AC