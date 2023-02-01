# JavaScript Practice: Sorting Band Names without articles

<br>

<img src="https://i.postimg.cc/mrBj7j8g/image.pngf">

## 소개

- 단어들을 알파벳순으로 정렬하되 접두어(A / The / An)을 가진 단어들은 제외하고 정렬하기

## 배운내용

### 정규표현식

전체코드

```js
function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, "").trim();
}

const sortedBands = bands.sort((a, b) => {
  return strip(a) > strip(b) ? 1 : -1;
});
document.querySelector("#bands").innerHTML = sortedBands
  .map((band) => `<li>${band}</li>`)
  .join("");
```

```js
bandName.replace(/^(a |the |an )/i, "").trim();
```

a the an으로 시작하되 뒤에 공백이 오는 경우 그 문자를 공백으로 바꾼다. => 접두어일때만 `replace`

`trim()`은 만약 A apple 일때 ' apple'이 되므로 공백 제거를 위해 사용

## [링크](https://aquamarine-lamington-7172e2.netlify.app)
