# HTML Elements 내용 및 속성 변경

*********************************

| property | Description |   
| :------ |:--- |  
| element.innerHTML | 요소의 HTML 콘텐츠(내부 HTML)를 설정하거나 반환 |
| element.innerText | 요소의 텍스트 콘텐츠를 설정하거나 반환 |
| element.textContent | 지정된 노드의 텍스트 내용과 모든 하위 항목을 설정하거나 반환 |
| element.style.property| CSS 속성을 사용하여 요소의 특정 스타일을 가져오거나 설정하는 데 사용 |
| element.setAttribute(attribute, value)| 요소의 속성 값을 설정 |

## innerHTML
`innerHTML` 속성은 요소의 HTML 콘텐츠(내부 HTML)를 설정하거나 반환한다.

* 특정 요소의 HTML 콘텐츠를 가져와서 다른 요소의 HTML을 변경

```html
<p id="one">"one" 요소의 컨텐츠입니다.</p>
<p id="two"></p>
```
```js
let html = document.getElementById("one").innerHTML; 
document.getElementById("two").innerHTML = html;
```

* 특정 요소의 HTML 콘텐츠를 직접 변경

```HTML
<p id="demo">버튼을 누르면 HTML 컨텐츠가 변경됩니다.</p>
<button onclick="myFunction()">Try it</button>
```
```js
function myFunction() {
  document.getElementById("demo").innerHTML = "변경되었습니다.";
}
```

<br>

## innerText
* `innerText` 요소의 텍스트 콘텐츠를 설정하거나 반환합니다.
* `innerText` 속성을 설정하면 모든 자식 노드가 제거되고 하나의 새 텍스트 노드로만 바뀐다.

```html
<p id="text">id=text의 컨텐츠입니다.</p>
<div id="demo">
  <p>자식1</p>
  <p>자식2</p>
  <p>자식3</p>
</div>
```
```js
let text = document.getElementById("text").innerText;
document.getElementById("demo").innerText = text
```

<br>

## textContent
* textContent 속성은 지정된 노드의 텍스트 내용과 모든 하위 항목을 설정하거나 반환
* textContent 속성을 설정하면 모든 자식 노드가 제거되고 하나의 새 텍스트 노드로만 바뀐다.


```html
<p id="demo" onclick="myFunction()">여기를 클릭하면 컨텐츠가 변경됩니다.</p>
```
```js
function myFunction() {
  document.getElementById("demo").textContent = "변경되었습니다.";
}
```

<br>

## innerHTML, innerText 및 textContent 차이점

| property | Description |   
| :------ |:--- |  
| innerHTML | 모든 공백 및 내부 HTML 태그를 포함한 요소의 텍스트 내용을 반환|
| innerText | sciprt 및 style 요소를 제외하고 CSS 숨겨진 텍스트 간격 및 태그 없이 요소의 모든 하위 요소의 텍스트 내용만 반환|
| textContent | 요소 및 모든 하위 항목의 텍스트 콘텐츠, 공백 및 CSS 숨겨진 텍스트가 있지만 태그는 없다 |


```html
<p id="myP">   This element has extra spacing   and contains <span style="color:red;">a span element</span>.</p>

<button onclick="getinnerHTML()">innerHTML</button>
<button onclick="getinnerText()">innerText</button>
<button onclick="gettextContent()">textContent</button>

<pre id="demo"></pre>

<p>innerText 속성은 IE 9 및 이전 버전에서 지원되지 않습니다.</p>
<p>textContent 속성은 IE 8 및 이전 버전에서 지원되지 않습니다.</p>
```

```js
function getinnerText() {
  let text = document.getElementById("myP").innerText;
  document.getElementById("demo").innerText = text;
  console.log(text); // "   This element has extra spacing   and contains <span style='color:red;'>a span element</span>."
}

function getinnerHTML() {
  let text = document.getElementById("myP").innerHTML;
  document.getElementById("demo").innerText = text;
  console.log(text); // "This element has extra spacing and contains a span element."
}

function gettextContent() {
  let text = document.getElementById("myP").textContent;
  document.getElementById("demo").innerText = text;
  console.log(text); // "   This element has extra spacing   and contains a span element."
}
```

위의 차이점은
* `innerHTML` 속성은 공백, `span` 요소(style, 태그)를 포함하고 있다. // 요소안의 컨텐츠를 전부 반환한다.
* `innerText` 속성은 공백 포함하지 않으며 `span` 요소의 내용만 포함
* `textContent` 속성은 공백, `span` 요소의 내용만 포함

<br>

## style
* `style` 속성은 요소의 스타일 속성을 나타내는 CSSStyleDeclaration 개체를 반환.
* `style` 속성은 다른 CSS 속성을 사용하여 요소의 특정 스타일을 가져오거나 설정하는 데 사용.
* `style` 속성에 문자열을 할당하여 스타일을 설정할 수 없다.(예: element.style = "color: red;")

```html
<p id="myP"> style 속성을 적용하면 <span id="style">해당 부분이 변경</span></p>
<p id="myP" style="background-color:red">해당 속성은?</p> 
<button onclick="change()">변경하기</button>
```

```js
function change() {
  let style = document.getElementById("style").style.color = "red";;
  console.log(style); // red
  console.log(document.getElementById("myP").style[0]) // "background-color"
}
```

<br>

## setAttribute
* `setAttribute` 메서드는 새 값을 속성으로 설정한다.
* 스타일 속성을 요소에 추가할 수 있지만, 권장하지않는다. 스타일을 추가하고 싶다면 `element.style.property`을 사용하는 것을 권장

<br>

* `class` 속성을 추가

```html
<style>
.democlass {
  color: red;
}
</style>

<p> style 속성을 적용하면 <span id="mySpan">해당 부분이 변경</span></p>
<button onclick="change()">변경하기</button>
```
```js
function change() {
  let style = document.getElementById("mySpan").setAttribute('class', 'democlass')
}
```

* `type` 속성을 `button`으로 변경

```html
<input id="myInput" value="OK">

<button onclick="myFunction()">Change</button>
```

```js
function myFunction() {
  document.getElementById("myInput").setAttribute("type", "button"); 
}
```

* `href` 속성을 추가

```html
<a id="myAnchor">서성식의 깃헙주소로 이동하기</a>
<button onclick="myFunction()">Try it</button>
```
```js
function myFunction() {
  document.getElementById("myAnchor").setAttribute("href", "https://github.com/s-seongsik"); 
}
```