# Flexbox + JavaScript Image Gallery


<br>

<img src="https://i.postimg.cc/y88VWDf6/image.png">

## 소개 

### flexbox를 활용해 동적인 만든 동적인 웹페이지입니다.

<br/>

## 배운 내용

- ### **flex**

    - flex 속성은

        1) **컨테이너에 적용하는 속성**
        2) **아이템에 적용하는 속성**

            으로 나뉘지만 여기서는 **아이템에 적용하는 속성**에 대해서만 설명하려한다.

    
    - 하나의 플렉스 아이템이 자신의 컨테이너가 차지하는 공간에 맞추기 위해 크기를 키우거나 줄이는 방법을 설정하는 속성이다.

    - flex는 `flex-grow`, `flex-shrink`, `flex-basis`의 단축 속성이다.

    - flex의 값에는 `auto`, `initial`, `none`이나 단위 없는 양의 수를 사용해야 한다.

    - 속성
        - `flex-grow`

            - `flex-item`이 `flex-basis`의 값보다 작아질 수 있는지를 결정하는 속성이다.
            - 기본값은 1이다.
            - 속성값이 0이면 `flex-container`의 크기가 커져도 `flex-item`의 크기가 커지지 않고 원래 크기로 유지됩니다.

            - 속성값이 1 이상이면 `flex-item`의 원래 크기에 상관없이 `flex-container`을 채우도록 `flex-item`의 크기가 커진다.

                <img src="https://i.postimg.cc/59gTynDv/image.png">

        - `flex-shrink`

            - 아이템이 `flex-basis`의 값보다 작아질 수 있는지를 결정하는 속성이다.
            -  기본값은 1이다.
            - `flex-container`의 크기가 `flex-item`의 크기보다 작아져도 `flex-item`의 크기가 작아지지 않고 원래 크기로 유지된다.

                속성값이 1 이상이면 `flex-item`의 원래 크기에 상관없이 `flex-container`의 크기에 맞춰 `flex-item`의 크기가 줄어든다.
                
                <img src="https://i.postimg.cc/VLSxhXHC/image.png">

        - `flex-basis`

            - flex 아이템의 기본 크기를 설정한다.
            - 기본값은 auto이다.
            - width 속성에서 사용하는 모든 단위(px, %, em, rem 등)를 속성값에 사용할 수 있다.
                 
            - flex-basis 속성의 값을 30px이나 30%와 같이 설정하면 flex item의 크기가 고정된다.

            - 값

                <img src="https://blog.kakaocdn.net/dn/coSzKa/btrbpPVScLV/cPpCJ7omR042ZMhSxqB4MK/img.png">

                - 0 :  `flex item`은 **절대적** flex item이 되어 `flex-container`를 기준으로 크기가 결정된다.
                - auto :  `flex item`은 **상대적** flex item이 되어 **콘텐츠의 크기**를 기준으로 크기가 결정된다.

                    ==>    **가변 Item과 같은 너비**

        - 주의할 점

            - flex: 1 1 0 ( = flex: 1) 입니다.
            - 부모가 flex container가 아닌 경우에는 flex: 1 을 해도 아무 소용이 없다.

- ### **toggle & transitionend**

    - **toggle**

        - on/off switch의 개념으로 **스위치**를 켰다, 껐다 하는 기능을 가지고 있다.

    
        - **add()**와 **remove()** 메서드를 한번에 쓸 수 있는 합쳐진 개념이다.

        - 토글은 존재하면 제거하고 존재하지 않으면 추가한다.

    -  **transitionend**

        - **CSS transition 이 완료되면 발생**한다. transition 속성이 제거되거나 display가 none으로 설정된 경우와 같이 완료 전에 transition이 제거된 경우에는 이벤트가 생성되지 않는다.



    사실 transitionend는 day3에도 나와 있던 개념이라서 숙지하고 있었다 생각하였다.

    ```js
     const panels = document.querySelectorAll('.panel');

    function toggleOpen(e){
        this.classList.toggle('open');
    }

    function toggleActive(e){
        if(e.propertyName.includes('flex')){
        this.classList.toggle('open-active');    
        }
    }
    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
  ```

    그러나 코드에서 `toggleActive`에서 왜 if문을 썼을까 생각하였다. 순서는 클릭시 `toggleOpen` 실행 => open 클래스 추가 => `toggleActive` => open-active 클래스 추가라고 생각하여서 if문을 빼고 그냥 작성해봤다.

    ```js
        function toggleActive(e){
        this.classList.toggle('open-active');    
    }
    ```

    결과는 클릭해도 open-active 클래스가 생성되지 않는다.

    열심히 고민해보고 console을 찍어본 결과..

    **`transitionend` 이벤트는 각 css의 transition마다 발생하는 것을 알게 되었다.**

    ```js
    function toggleActive(e){
    console.log(e.propertyName);
    }
    ```
    
    따라서 이렇게 console을 찍어본 결과..

    <img src="https://i.postimg.cc/s2xcwCc9/image.png">

    총 함수가 네번 실행되어서 토글이 4번 일어나므로 클래스가 추가가 되지 않았던 것이다..

<br/>
<br/>
<br/>
<br/>

### 역시 console을 찍어가면서 결과를 확인해나가는 습관이 매우 중요함을 다시 한번 느낀다. 
    

<br>



## [링크](https://rainbow-chimera-069383.netlify.app)

<br/>

## 참고자료

https://developer.mozilla.org/ko/docs/Web/CSS/flex

https://studiomeal.com/archives/197