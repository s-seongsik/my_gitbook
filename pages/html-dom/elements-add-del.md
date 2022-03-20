# HTML Elements 추가 및 삭제하기

*********************************

| Method | Description |   
| :------ |:--- |  
| document.createElement(element) | HTML 요소를 생성 |
| document.remove() | document에서 요소를 제거 |
| document.removeChild(element) | HTML 요소의 자식을 제거 |
| document.appendChild(element) | HTML 요소의 자식을 추가 |
| document.replaceChild(new, old) | HTML 요소 바꾸기 |
| document.write(text) | HTML 출력 스트림에 쓰기 |

## createElement(element)
`createElement()` 메서드는 요소 노드를 만드는데 사용한다.

```js
// Create element:
const para = document.createElement("p");
para.innerText = "p요소 생성";

const btn = document.createElement("button");
btn.innerHTML = "button 요소 생성"

// Append to body:
document.body.appendChild(para);
document.body.appendChild(btn);

console.log(para); // <p>p요소 생성</p>
console.log(btn);  // <button>button 요소 생성</button>
```

<br>

## remove()
`remove()` 메서드는 `document`에서 요소(or 노드)를 제거하는데 사용한다.

```html
<p id="demo">"제거"를 클릭하면 이 단락이 DOM에서 제거됩니다.</p>
<button onclick="myFunction()">제거</button>
```

```js
function myFunction() {
  const element = document.getElementById("demo");
  element.remove();
}
```

<br>

## removeChild(element)
* `removeChild()` 메서드는 요소의 자식을 제거하는데 사용한다.

```html
<p>제거를 클릭하면 list의 첫 번째 요소가 삭제됩니다.</p>
<button onclick="myFunction()">제거</button>

<ul id="myList">
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

```js
function myFunction() {
  const list = document.getElementById("myList");
  list.removeChild(list.firstElementChild);
}
```

<br>

## appendChild(element)
`appendChild()`메서드는 노드(요소)를 요소의 마지막 자식으로 추가하는데 사용한다.

```html
<ul id="myList">
  <li>1</li>
  <li>2</li>
</ul>

<button onclick="myFunction()">추가</button>
```

```js
function myFunction() {

const node = document.createElement("li");
const value = document.getElementById("myList").children.length+1
const textnode = document.createTextNode(value);

node.appendChild(textnode);

document.getElementById("myList").appendChild(node);
}
```

<br>

## replaceChild(new, old)
`replaceChild()` 메서드는 자식 노드를 새 노드로 바꾸는데 사용한다.

```html
<ul id="myList">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>

<button onclick="myFunction()">"Replace"</button>
```

```js
function myFunction() {
// 첫 번째 자식 요소를 선택
const element = document.getElementById("myList").children[0]; // <li>1</li>

// 새로운 text 노드 생성
const newNode = document.createTextNode("New Replace");

// text 노드를 바꾼다.:
element.replaceChild(newNode, element.childNodes[0]); // 1 -> New Replace로 바꿈
}
```

<br>

## write(text)
* `write()` 메서드는 HTML 문서 스트림에 직접 쓸 때 사용한다.
* `write()` 메서드는 로드된 문서에서 사용될 때 기존의 모든 `HTML`을 삭제한다.

* 예제 1 : HTML 출력에 직접 일부 텍스트를 작성한다.

```html
<h1>안녕하세요.</h1>

<script>
document.write("추가 1");
document.write("<h2>Hello World!</h2>");
</script>
```


* 예제 2 : 문서가 로드된 후 `document.write()`를 사용하면 기존 HTML이 모두 삭제된다.

```html
<h1>안녕하세요</h1>
<h2>The write() Method</h2>

<h2>The Lorem Ipsum Passage</h2>

<button type="button" onclick="myFunction()">클릭</button>
```

```js
function myFunction() {
  document.write("Hello World");
}
```