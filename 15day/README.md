# How LocalStorage and Event Delegation work

<br>

<img src="https://im.ezgif.com/tmp/ezgif-1-4650830f84.gif">

## **소개**

### Localstorage에 데이터를 쓰고 받아오면서 여러 메뉴들을 추가 / 삭제가 가능한 웹페이지다.

<br/>

## **배운 내용**

### 전체코드

```js
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];
const removeItems = document.querySelector(".remove-items");
const selectAllItems = document.querySelector(".selectAll");

function addItem(e) {
  e.preventDefault(); // 페이지 자동 리로딩 막음
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset(); // form 새로고침
}

// 화면 업데이트
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type = "checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
      `;
    })
    .join("");
}

// Click
function toggleDone(e) {
  if (!e.target.matches("input")) return; // input태그만 감지
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

// 전체 삭제
function removeItem() {
  items.splice(0);
  localStorage.clear();
  populateList(items, itemsList);
}

// 전체 선택
function toggleselectAllItems(e) {
  items.map((item) => {
    item.done = !item.done;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
removeItems.addEventListener("click", removeItem);
selectAllItems.addEventListener("click", toggleselectAllItems);
populateList(items, itemsList);
```

### JSON

1. Client => LocalStorage

   ```js
   localStorage.setItem("items", JSON.stringify(items));
   ```

   **Object**를 **JSON 문자열**로 반환한다.

2. LocalStorage => Client

   ```js
   const items = JSON.parse(localStorage.getItem("items")) || [];
   ```

   **JSON 문자열**을 **자바스크립트 객체**로 반환한다.

### 이벤트 위임

```js
addItems.addEventListener("submit", addItem);
populateList(items, itemsList); // 최초에 로컬에서 데이터 받아오는 부분
const checkBoxes = document.querySelectorAll("input");
console.log(checkBoxes);
checkBoxes.forEach((input) =>
  input.addEventListener("click", () => alert("hi"))
);
```

기존 코드로 input태그를 클릭할때마다 'hi'창을 띄우도록 하였다.

하지만 초기에는 이벤트가 실행되지만, item을 하나 추가한 후에는 어떠한 input태그도 이벤트가 말을 듣지 않는다.

최초에만 item들에 event가 달리고, item을 추가하게 되면 `populateList`에서 html태그를 전체적으로 렌더링하기 때문에 새로 덮어쓰기 때문이다.

이런 상황에서 **이벤트 위임**을 사용하면 문제를 간단하게 해결할 수 있다.

이벤트 위임을 자세하고 알고 싶다면 ==> [이벤트 버블링과 이벤트 위임](../../StudyNote/js/Subject.md/delegate.md)

```js
function toggleDone(e) {
  if (!e.target.matches("input")) return; // input태그만 감지
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
```

`itemsList`는 `ul`태그(부모)를 가리키고, 자식 요소에서 이벤트가 일어나면 이벤트 버블링으로 인해 부모도 일어나므로 자식 각각에 대해서가 아닌 부모쪽에서 처리할 수 있다.

<br/>

## **추가 기능**

### 영상 마지막에 언급한 삭제버튼, 전체선택 체크박스 추가 기능을 구현해봤다.

<br>

### 1) 삭제 버튼 추가

```js
const removeItems = document.querySelector(".remove-items");

function removeItem() {
  items.splice(0);
  localStorage.clear();
  populateList(items, itemsList);
}

removeItems.addEventListener("click", removeItem);
```

`removeItem` 버튼 클릭 시 `splice(0)`로 배열을 초기화하였다.

### 2) 전체 선택 체크박스 추가

```js
const selectAllItems = document.querySelector(".selectAll");

function toggleselectAllItems(e) {
  items.map((item) => {
    item.done = !item.done;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

selectAllItems.addEventListener("click", toggleselectAllItems);
```

`toggleselectAllItems` 버튼 클릭 시 `map`을 이용해 배열 전체를 순회해 done값을 전환시켰다.

<br/>

난이도가 점점 올라가는 것 같다.

이벤트 위임, 이벤트 버블링은 한번 정리를 한적이 있는데도 확실히 이해를 못했다는 것을 이번 기회에 알게 되었고, 직접 많이 써봐야 익숙해질 것 같다.

## [링크](https://glittering-creponne-146075.netlify.app)
