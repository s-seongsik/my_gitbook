# HTML Elements 찾기

*********************************

| type | Description |   
| :------ |:--- |  
| document.getElementById(ID) | ID로 HTML 요소를 찾을 때 사용한다.|
| document.getElementsByTagName(TagName) | 태그 이름으로 HTML 요소를 찾을 때 사용한다.|
| document.getElementsByClassName(ClassName) | 클래스 이름으로 HTML 요소를 찾을 때 사용한다.|
| document.getElementsByName(Name) | 지정된 이름을 가진 HTML 요소를 찾을 때 사용한다.|
| document.querySelectorAll(CSS Selectors) | CSS 선택자와 일치하는 모든 HTML 요소를 찾을 때 사용한다.|
| document.querySelector(CSS Selectors) | CSS 선택자와 일치하는 첫 번째 HTML 요소를 찾을 때 사용한다.|
| document.forms | form의 요소 컬렉션을 찾을 때 사용한다.|

## getElementById()
getElementById() 메서드는 지정된 값(Id)을 가진 요소를 반환한다. 만약 요소가 존재하지 않는 경우 getElementById()메서드가 반환 된다. null
getElementById() 메서드는 HTML DOM에서 가장 일반적인 메소드 중 하나이다. 거의 HTML 요소를 읽거나 편질할 때 사용한다.

```html
<div id="example"> ID로 DOM을 조작해보자. <div>
```

`id="example"`인 요소를 가져오고 색상을 변경한다.
```js
const elements = document.getElementById("example");
elements.style.color='red';
console.log(elements.style.color); // red
```

<br>

## getElementsByTagName()
* `getElementsByTagName()` 메서드는 지정된 태그 이름을 가진 모든 요소의 `HTMLCollection`을 반환한다.
* `getElementsByTagName("*")`는 문서의 모든 요소를 반환한다.
* `HTMLCollection`은 HTML 노드의 모음이며, 인덱스 번호로 접근할 수 있다. 인덱스는 0부터 시작하며 `length`속성은 컬렉션 수를 반환한다.


```html
<ul>
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

```js
const collection = document.getElementsByTagName("li");
console.log(collection.length); // 3
console.log(collection[0]); // <li>one</li>
console.log(collection[1]); // <li>two</li>
console.log(collection[2]); // <li>three</li>
```

<br>

## getElementsByClassName()
* `getElementsByClassName()` 메서드는 지정된 클래스 이름을 가진 요소 `HTMLCollection`을 반환한다.
* `HTMLCollection`은 HTML 노드의 모음이며, 인덱스 번호로 접근할 수 있다. 인덱스는 0부터 시작하며 `length`속성은 컬렉션 수를 반환한다.

```html
<div class="example">one</div>
<div class="example">two</div>
<div class="example">three</div>
```

```js
const collection = document.getElementsByClassName("example");
console.log(collection.length); // 3
console.log(collection[0]); // <div class="example">one</div>
console.log(collection[1]); // <div class="example">two</div>
console.log(collection[2]); // <div class="example">three</div>
```

<br>

## getElementsByName()
* `getElementsByName()` 메서드는 지정된 이름을 가진 요소 `HTMLCollection`을 반환한다.
* `HTMLCollection`은 HTML 노드의 모음이며, 인덱스 번호로 접근할 수 있다. 인덱스는 0부터 시작하며 `length`속성은 컬렉션 수를 반환한다.

```html
<input name="example" type="checkbox" value="one">
<input name="example" type="checkbox" value="two">
<input name="example" type="checkbox" value="three">
```

```js
const collection = document.getElementsByName("example");
console.log(collection.length); // 3
console.log(collection[0]); // <input name="example" type="checkbox" value="one">
console.log(collection[1]); // <input name="example" type="checkbox" value="two">
console.log(collection[2]); // <input name="example" type="checkbox" value="three">
```

<br>

## querySelectorAll()
* `querySelectorAll()` 메서드는 CSS 선택자와 일치하는 모든 요소를 ​​반환한다.
* `querySelectorAll()` 메서드는 `NodeList`를 반환한다.
* `NodeList` 와 `HTMLCollection`은 모두 문서에서 추출된 노드(요소)의 배열과 유사한 컬렉션(목록)이다.
* `NodeList`는 정적 컬렉션이다. 따라서 DOM에 요소를 추가해도 `NodeList` 목록은 변경되지 않는다.
* `HTMLCollection`는 라이브 컬렉션이다. 따라서 DOM에 요소를 추가하면 `HTMLCollection` 목록도 변경된다.

```html
<div id="root">
  <h2 class="example">A heading</h2>
  <p class="example">A paragraph.</p> 
  <p class="example">A paragraph.</p> 
</div>
```

```js
const nodeList = document.querySelectorAll(".example");
console.log(nodeList.length); // 3
console.log(nodeList[0]); // <h2 class="example">A heading</h2>
console.log(nodeList[1]); // <p class="example">A paragraph.</p> 
console.log(nodeList[2]); // <p class="example">A paragraph.</p> 
```

### NodeList와 HTMLCollection 비교

```html
<div id="root">
  <h2 class="example">A heading</h2>
  <p class="example">A paragraph.</p> 
  <p class="example">A paragraph.</p> 
</div>
```

* `NodeList`는 정적 컬렉션이므로, DOM목록에 요소를 추가해도 `NodeList` 목록이 변경되지 않는다.  

```js
const nodeList = document.querySelectorAll(".example");
console.log(nodeList.length); // 3
console.log(nodeList[0]); // <h2 class="example">A heading</h2>
console.log(nodeList[1]); // <p class="example">A paragraph.</p> 
console.log(nodeList[2]); // <p class="example">A paragraph.</p> 

/* 새로운 요소 추가*/
const root = document.querySelector("#root");
const newElement = document.createElement('p');
const newContent = document.createTextNode("new content!!");
newElement.appendChild(newContent);
newElement.setAttribute("class", "example");
root.appendChild(newElement);

/* nodeList 변경확인 */
console.log(nodeList[3]);  // undefined
```

* `HTMLCollection`은 라이브 컬렉션이므로, DOM목록에 요소를 추가하면 `HTMLCollection` 목록이 변경된다.  

```js
const HTMLCollection = document.getElementsByClassName("example");
console.log(HTMLCollection.length); // 3
console.log(HTMLCollection[0]); // <h2 class="example">A heading</h2>
console.log(HTMLCollection[1]); // <p class="example">A paragraph.</p> 
console.log(HTMLCollection[2]); // <p class="example">A paragraph.</p> 

/* 새로운 요소 추가*/
const root = document.querySelector("#root");
const newElement = document.createElement('p');
const newContent = document.createTextNode("new content!!");
newElement.appendChild(newContent);
newElement.setAttribute("class", "example");
root.appendChild(newElement);

console.log(HTMLCollection[3]);  // <p class="example">new content!!</p> 
```

<br>

## querySelector()
* `querySelector()` 메서드는 CSS 선택자와 일치하는 첫 번째 요소를 반환한다.
* `querySelector()` 메서드는 `NodeList`를 반환한다.

```html
<div id="root">
  <h2 class="example">A heading</h2>
  <p class="target">A paragraph.</p> 
  <p class="example">A paragraph.</p> 
</div>
```

```js
const Node = document.querySelector(".target");
console.log(Node); // <p class="target">A paragraph.</p> 

Node.style.color='red'
console.log(Node.style.color); // "red"
``` 

<br>

## forms
* `forms` 속성은 문서의 모든 `form` 요소 컬렉션을 반환한다.
* `forms` 속성은 `HTMLCollection` 을 반환한다.
* `forms` 속성은  읽기 전용이다.
* length 속성은 HTMLCollection 요수 수를 반환한다.
* 컬렉션의 노드는 인덱스 번호로 접근할 수 있으며, 인덱스는 0에서 시작

```html
<p>
  <form id="one">
    <input type="text" name="one_name" value="one_value">
  </form>
</p>

<p>
  <form id="two">
    <input type="text" name="two_name" value="two_value">
  </form>
</p>
```

* 인덱스 번호로 `HTMLCollection`을 반환

```js
const forms = document.forms;

console.log(forms[0]); // <form id="one"><input type="text" name="one_name" value="one_value"></form>
console.log(forms[1]); // <form id="two"><input type="text" name="two_name" value="two_value"></form>
```

* id/name 값으로 `HTMLCollection`을 반환

```js
const forms = document.forms;

console.log(forms["one"]); // <form id="one"><input type="text" name="one_name" value="one_value"></form>
console.log(forms["two"]); // <form id="two"><input type="text" name="two_name" value="two_value"></form>

console.log(forms["one"]["one_name"]); // <input type="text" name="one_name" value="one_value">
console.log(forms["two"]["two_name"]); // <input type="text" name="two_name" value="two_value">
```

* 요소의 속성값 반환

```js
const forms = document.forms;

console.log(forms["one"].id); // "one"
console.log(forms["one"]["one_name"].type); // "text"
console.log(forms["one"]["one_name"].name); // "one_name"
console.log(forms["one"]["one_name"].value); // "one_value"

console.log(forms["two"].id); // "two"
console.log(forms["two"]["two_name"].type); // "text"
console.log(forms["two"]["two_name"].name); // "two_name"
console.log(forms["two"]["two_name"].value); // "two_value"
```
