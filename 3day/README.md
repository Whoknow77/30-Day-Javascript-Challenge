# Update CSS Variables


<br>

<img src="https://i.postimg.cc/W48Q1Fz3/image.png">

## 소개 

- Spacing, Blur, Color등의 바를 마우스로 조절하여 이미지의 여백공간, 흐림 정도, 배경색을 실시간으로 변경하는 웹페이지


## 배운 내용

- ### `document.documentelement`

    <img src="https://velog.velcdn.com/images%2Fgyrbs22%2Fpost%2F2aafa429-4b25-43ea-b499-fea4b3f2eaad%2Fimage.png">

    document는 크게 head와 body로 구성되어있다.

    `document.documentelement`는 head와 body를 둘러싼 최상위 HTML 요소를 반환한다.

    ```js
    console.log(document.documentElement);
    ``` 
    
    <img src="https://i.postimg.cc/Dz5w3zKQ/image.png">
    
    위와 같이 전체 html 태그를 반환한다.


    ```js
    document.documentElement.style.setProperty(`--${this.name}`, this.value+suffix);
    ```

    따라서 이렇게 head 영역에 선언된 css 스타일도 함수를 이용하여 적용할 수 있다.

<br>



## [링크](https://idyllic-cobbler-c35063.netlify.app)


<br/>

## 참고자료

https://velog.io/@gyrbs22/%EA%B0%9C%EB%B0%9C%EC%A7%80%EC%8B%9D-documentelement%EC%99%80-body