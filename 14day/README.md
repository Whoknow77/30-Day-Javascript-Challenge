# JavaScript Fundamentals: Reference VS Copy

<br>


## 소개 

- Array와 Object의 참조(Shallow Copy) vs 복사(Deep Copy)

## 배운내용

Deep Copy의 여러가지 방법을 알아보자.

### Array

```js
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

    const team2 = players.slice();

    const team3 = [].concat(players);

    const team4 = [...players];

    const team5 = Array.from(players);
```

개인적으로 여기서는 최신 문법이면서 간단한 Spread operator을 자주 이용한다.

### Object

```js
    const person = {
      name: 'Wes Bos',
      age: 80
    };
    
    const dev = Object.assing({}, wes);
```
위의 나온 함수들은 모두 1차원 값들만 복사를 한다.

그러면 2차원 값은?

```js
    const person2 = {
      name: 'Wes Bos',
      age: 80,
      email:{
        name : 'whoknow'
      }
    };

    const dev2 = JSON.parse(JSON.stringify(wes));
```

`JSON`을 이용한다. 하지만 이것도 성능 문제가 있어서 실제로 잘 사용하지 않아 lodash의 Clonedeep을 이용하는 것이 좋다.

하지만 애초에 이렇게 2차원 이상의 데이터를 복사하는 경우가 거의 없다고 한다.


### 자세한 내용은 [여기](./../../StudyNote/js/Subject.md/copy.md)서 확인할 수 있다.



