# Array Cardio Practce - Day 2


<br>

`
## 소개 

- Array의 다양한 Function 학습(2) : `some, every, [...spreads]`


## 배운내용

- ### Spread Operator(전개 구문)

    자세한 내용은 [ES6문법](./../../StudyNote/js/Subject.md/es6.md)에서 확인 가능하다.

    이 예제에서는 전개구문 사용의 여러가지 이점 중 하나인 1차원 배열의 **깊은 복사**를 이용하는데에 의미를 두고 있다.

    - `splice` vs `slice`
        - `splice` : 기존 배열의 상태가 바뀐다.
        - `slice` : 기존 배열의 상태가 유지된다.

    따라서

    ```js
    comments.splice(index, 1);
    ```

    <img src="https://i.postimg.cc/HLG1mx8L/image.png">

    ```js
    const newComments = [
    ...comments.slice(0,index),
    ...comments.slice(index+1)
    ]
    ```

    <img src="https://i.postimg.cc/C1qNghDw/image.png">

        
    `Spread` 연산자를 사용한 경우에는 기존의 comments 배열이 바뀌지 않음을 알 수 있다.




    