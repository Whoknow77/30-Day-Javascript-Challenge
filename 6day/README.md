# Ajax Type Ahead with fetch()

<br>

<img src="https://i.postimg.cc/BQ2yLzJQ/image.png">

## 소개

### json형식의 데이터를 받아와 엔터를 치지않고 입력창에 문자를 입력해 나갈 때 마다 실시간으로 검색이 가능한 검색 웹페이지입니다.

<br/>

## 배운 내용

- ### 전체코드

  ```js
  // url
  const url =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

  const cities = [];

  fetch(url)
    .then((blob) => blob.json())
    .then((data) => cities.push(...data));

  function findMatches(word, cities) {
    return cities.filter((place) => {
      // match()안에 정규식을 작성할때 변수가 들어가지 못하므로 따로 객체를 만들어서 넣어야함

      const regex = new RegExp(word, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
  }

  function numberWithCommas(x) {
    // 뒤에서부터 세자리씩 삽입
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray
      .map((place) => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(
          regex,
          `<span class='hl'>${this.value}</span>`
        );
        const stateName = place.state.replace(
          regex,
          `<span class='hl'>${this.value}</span>`
        );
        return `
      <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
      </li>
      `;
      })
      .join("");
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector(".search");
  const suggestions = document.querySelector(".suggestions");

  // Input에 change 이벤트는 keyup할때마다가 아닌, 입력창을 벗어났을때 value가 할당이 됨
  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", displayMatches);
  ```

<br>

- ### 정규식 작성시 `Template String`이 사용 불가능하다.

  ```js
  function findMatches(word, cities) {
    return cities.filter((place) => {
      return place.city.match("`${word}`", "gi");
    });
  }
  ```

  다음과 같은 함수에서 정규식 안에서 `$`를 사용이 불가능하다.

  아마도 `Template String`의 의미가 아닌 정규식에서 `$`는 다른 의미로 사용되기 때문이 아닌가 추측해볼 수 있다.

  따라서

  ```js
  function findMatches(word, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(word, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
  }
  ```

  다음과 같이 따로 **정규식 객체**를 만들어서 비교를 해야한다.

- ### `keyup`

  - 입력창에 달린 `change` 속성은 기본적으로 입력창을 벗어났을때 실행된다.

    ```js
    function displayMatches() {
      console.log(this.value);
    }
    searchInput.addEventListener("change", displayMatches);
    ```

      <img src="https://i.postimg.cc/Rhx0dYyV/change.png">

    'whoknow'를 입력하고 창을 벗어나야만 콘솔창에 입력이 된다.

    동적으로 검색창에 입력과 동시에 값을 받아오려면 `keyup` 속성을 사용하면 된다.

    ```js
    function displayMatches() {
      console.log(this.value);
    }
    searchInput.addEventListener("change", displayMatches);
    searchInput.addEventListener("keyup", displayMatches);
    ```

      <img src="https://i.postimg.cc/wTHvsSDw/keyup.png">

- ### 정규식에서의 \b, \B, Lookaround

      - **\b**

          - **단어 경계**로 문자와 공백 사이와 같이 단어 문자 뒤에 다른 단어 문자가 오지 않는 위치이다.

          - 일치하는 단어 경계는 일치에 포함되지 않는다. 즉, 일치하는 단어 경계의 길이는 0이다.


      - **\B**

          - **비단어 경계**로 이전 문자와 다음 문자가 동일한 유형인 위치이다.


          - 예를 들어 두 글자 사이 또는 두 공백 사이와 같이 둘 다 단어이거나 둘 다 단어가 아니어야 한다. **문자열의 시작과 끝은 단어가 아닌 것으로 간주**되고 일치하는 단어 경계와 동일하게 일치하는 비단어 경계도 일치에 포함되지 않는다.


      - *Lookaround**

          |패턴|타입|matches|
          |------|---------------|---------|
          |fX(?=Y)|Positive lookahead|X if followed by Y
          |X(?!Y)|Negative lookahead|X if not followed by Y
          |(?<=Y)X|Positive lookbehind|X if after Y
          |(?<!Y)X|Negative lookbehind|X if not after Y

          - lookahead : 꼬리말(suffix)을 확인하는 용도
          - lookbehind : 머리말(prefix)을 확인하는 용도

              `<` : 앞쪽

              으로 기억하는 것이 편하다.

          - **의미**

           1) 본래 패턴에 맞는 곳을 우선 찾고, 그 다음 추가적으로 해당 Lookaround 의 조건이 맞는지 아닌지를 체크한다.

          1)  그 다음 Positive 이냐, Negative 이냐에 따라서 결과를 포함시키거나 제외시킵니다.

              - Positive 는 조건 Y 가 만족한다면 매칭 결과에 그대로 포함시킨다는 것이다.

              - Negative 는 조건 Y 가 만족한다면 매칭 결과에서 제외시킨다.

          - 소수점 없는 정수에 천 단위 콤마 표시하는법

              ```js
              return '1234567'.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              ```

              정규식을 간단하게 나타내면

              **(앞 = 문자 존재),(뒤 = 문자열 3글자)** 이다.

              1) `\B` : 앞 = 문자존재, 예를들어 1234에서 1의 앞, 4의 뒤를 가리킨다.

              2) `(\d{3})+` : 뒤 = 문자열 3글자, 1회 이상 반복되는 부분에 대응


              3) `+(?!\d)` : 뒤 = 숫자가 없는 경우에만 일치

              4) `\B(?=(\d{3})+(?!\d))` : 앞 + 뒤 조건을 합친다.

                  <img src="https://i.postimg.cc/4d4zQB7c/image.png">

  <br/>
  <br/>
  <br/>
  <br/>

### 지금까지 했던 예제들 중에 가장 만족스러웠다. `json`활용, 정규식까지 복습할 수 있어서 좋았다.

### 하지만 정규식은 아직 까지 어려워서 몇번이고 더 봐야 겠다는 생각이 든다.

## [링크](https://rainbow-narwhal-ca2a78.netlify.app)

<br/>

## 참고자료

https://mizzo-dev.tistory.com/entry/JavaScript%EC%A0%95%EA%B7%9C%EC%8B%9D-%EC%88%AB%EC%9E%90%EC%97%90-1000%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%BD%A4%EB%A7%88%EC%89%BC%ED%91%9C-%EA%B5%AC%EB%B6%84%EC%9E%90-%EB%84%A3%EA%B8%B0

https://elvanov.com/2388

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions
