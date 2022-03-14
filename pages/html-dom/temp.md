

# 자주 사용하는 HTML DOM Elements 모음

*********************************

## Element 객체란?
> HTML DOM에서 `Element` 객체는 p, div, a, button, table 등 기타 HTML 요소와 같은 HTML 요소를 말한다.

<br>

## querySelector()
querySelector() 메서드는 CSS 선택기(`class`, `id`, `태그`)와 일치하는 첫 번째 요소를 반환한다.

```html
<p class="one example"> one </p>
<p class="two example"> two </p>
<p class="three example"> three </p>
```

* `<p>` 태그중에 가장 첫 번째 요소 `one`을 반환한다.
```js
var first = document.querySelector("p");
console.log(first); // <p class="one"> one </p>
```

* class="example"인 가장 첫 번째 요소를 반환한다.
```js
var first = document.querySelector(".example");
console.log(first); // <p class="one"> one </p>
```

<br>

## querySelectorAll()
querySelectorAll() 메서드는 CSS 선택기(`class`, `id`, `태그`)와 일치하는 모든 요소를 반환한다.

```html
<p class="one example"> one </p>
<p class="two example"> two </p>
<p class="three example"> three </p>
```

* 모든 `<p>`태그 요소를 반환한다.
```js
var nodeList = document.querySelectorAll("p");
console.log(nodeList); // [object NodeList] (3)
                       // ["<p/>","<p/>","<p/>"]
```
* class="example"인 모든 요소를 반환한다.
```js
var nodeList = document.querySelectorAll(".example");
console.log(nodeList); // [object NodeList] (3)
                       // ["<p/>","<p/>","<p/>"]
```

<br>

## createElement()
createElement() 메서드는 요소 노드를 만든다.

```js
const p_elements = document.createElement("p");
p_elements.innerText = "새로 생성한 텍스트.";

document.body.appendChild(p_elements);
```

<iframe src="/example/html-dom/elements/example_01/index.html" width="100%" height="150px" class="example-frame"></iframe>


<br>

## getElementById()
getElementById() 메서드는 지정된 값(Id)을 가진 요소를 반환한다. 만약 요소가 존재하지 않는 경우 getElementById()메서드가 반환 된다. null
getElementById() 메서드는 HTML DOM에서 가장 일반적인 메소드 중 하나이다. 거의 HTML 요소를 읽거나 편질할 때 사용한다.

```html
<div id="example"> ID로 DOM을 조작해보자. <div>
```

* id=example인 요소를 가져오고 색상을 변경한다.
```js
const elements = document.getElementById("example");
elements.style.color='red';
```

<iframe src="/example/html-dom/elements/example_02/index.html" width="100%" height="150px" class="example-frame"></iframe>

<br>

## getElementsByClassName()
getElementsByClassName() 메서드는 지정된 클래스 이름을 가진  HTML컬렉션을 반환한다.
여기서, `HTML 컬렉션`이란 HTML 노드의 모음으로 컬렉션의 노드는 인덱스 번호로 접근할 수 있다.
인덱스는 0부터 시작하며 length 속성은 컬렉션의 요소 수를 반환한다.

```html
<div class="example">돔을 조작해보자1.</div>
<div class="example">돔을 조작해보자2.</div>
<div class="example">돔을 조작해보자3.</div>
```

* 요소 수를 반환한다.
```js
const elements = document.getElementsByClassName("example");
console.log(elements.length); // 3
```

* 인덱스로 접근하여 HTML을 변경
```js
const elements = document.getElementsByClassName("example");
elements[0].innerHTML = "첫 번째 인덱스 요소 변경";
elements[1].innerHTML = "두 번째 인덱스 요소 변경";
elements[2].innerHTML = "세 번째 인덱스 요소 변경";
```
