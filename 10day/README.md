# JS Checkbox Challenge!

<br>

<img src="https://i.postimg.cc/5N3qHRSS/image.png">

## 소개

### Gmail이나 네이버 메일 등에서 메일을 선택할 때와 같이 shift로 메일과 메일을 누르면 사이의 메일이 모두 선택되는 기능을 가진 웹페이지

<br/>

## 배운 내용

영상을 보기전에 기능을 혼자서 간단하게 구현할 수 있을 것 같아서 머릿속으로 정리를 해보고 시도해봤다.

영상과는 다르게 위에서 부터 체크박스들에 차례대로 id 번호를 부여하였고, shift 누른 상태에서 체크를 하게 되면 직전에 누른 박스와 방금 누른 박스 사이에 있는 박스들을 id로 찾아서 체크하려 했으나 잘 되지 않아 영상을 보았다.

생각했던 것 보다 더 어려웠고 코드가 처음에 아예 이해가 가지않아서 당황했다.

천천히 다시보니 이해가 되었지만 배열을 순회하면서 flag를 이용하는 방식이 익숙해졌나 싶었는데 그동안 했던 예제들보다 체감상 몇배는 어렵다고 느꼈다.

### 전체코드

```js
<script>
  const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

// 가장 최근에 선택한 item
let lastChecked;

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

function handleCheck(e){
  let inBetween = false;

  // 쉬프트를 누르고 체크 한 경우
  if(e.shiftKey && this.checked){

    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      // 지금 눌렀거나 직전에 누른거라면 isBetween이 true
      if(checkbox===this || checkbox===lastChecked){

        inBetween = !inBetween;
        console.log('Starting to check item inbetween!');
      }

      if(inBetween){
        console.log('g');
        checkbox.checked=true;
      }
    });
  }

  // 누르고 해제할때마다 lastIndex
  lastChecked = this;
}
</script>
```

우선 `lastChecked`로 가장 최근에 눌렀던 박스를 저장한다.

shift를 누른상태로 박스를 체크하면 배열 전체를 순회하면서 이전에 `lastChecked`로 저장된 박스일 때, 방금 누른 박스(`this`)일 때 각각 flag변수인 inBetween을 반대값으로 전환한다.

만약 item이 1 2 3 4 5 6 7 8 9 식으로 정렬 되어있다고 하자.

2를 누르고 shift를 눌러 7을 눌렀다면,

1 : false

2 : true

3 : true

4 : true

5 : true

6 : true

7 : true

8 : false

9 : false

true일때만 박스가 체크되므로 2~7 일 때만, 체크가 된다.

7은 클릭 당시에 이미 체크가 되므로, false가 된다.

<br/>

이런식의 어려운 로직을 짜는것도 중요하지만 강의를 듣기 전 코드를 짜면서 느낀것은 어떤 함수의 쓰임, 반환 값을 정확히 아는 것도 중요한 것 같다.

예를 들어, `input`태그에 접근해 `tag.checked`를 하면 박스가 체크가 된다거나, 함수안의 함수가 있는 상태에서 `this`가 정확히 어떤 것을 가리키는지를 정확히 알 수 있게 되었다.

## [링크](https://super-profiterole-d339d8.netlify.app)
