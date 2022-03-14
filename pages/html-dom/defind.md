# HTML DOM의 개념

*********************************

## 문서 객체 모델(Document Object Model)이란?

문서 객체 모델(Document Object Model)은 HTML, XML 문서에 접근하기 위한 `인터페이스`이다.
DOM은 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 그들의 문서 구조, 스타일, 내용 등을 변경할 수 있도록 돕는다.
DOM은 nodes와 objects로 문서를 표현한다. 이들은 웹 페이지를 스크립트 또는 프로그래밍 언어들에게 사용될 수 있게 연결해주는 역할을 한다.

간단히 말해 웹 페이지의 콘텐츠, 구조, 스타일을 읽고 조작할 수 있는 API를 제공한다.

![image](https://user-images.githubusercontent.com/52439201/157377268-88b361a3-838d-40aa-821a-dac8f1197b07.png)

객체 모델을 통해 자바스크립트는 동적 HTML을 생성하는 데 필요한 모든 기능을 얻을 수 있다.
* JavaScript는 페이지의 모든 HTML 요소를 변경할 수 있다.
* JavaScript는 페이지의 모든 HTML 속성을 변경할 수 있다.
* JavaScript는 페이지의 모든 CSS 스타일을 변경할 수 있다.
* JavaScript는 기존 HTML 요소 및 속성을 제거할 수 있다.
* JavaScript는 새로운 HTML 요소와 속성을 추가할 수 있다.
* JavaScript는 페이지의 모든 기존 HTML 이벤트에 반응할 수 있다.
* JavaScript는 페이지에서 새로운 HTML 이벤트를 생성할 수 있다.

<br>

## 웹 페이지 생성

웹 브라우저는 원본 HTML 문서를 읽어 스타일을 입히고 대화형 페이지로 만들어 뷰 포트에 표시한다. 이 과정을 `“Critical Rendering Path”`라고 한다.
`“Critical Rendering Path”`은 여러 단계로 나누어져 있지만 대략 두 단계로 나눌 수 있다.  
1. 브라우저는 읽어들인 문서를 파싱하여 최종적으로 어떤 컨텐츠를 페이지에 렌더링할 것인지 결정한다.
2. 브라우저는 해당 렌더링을 수행한다.

![image](https://user-images.githubusercontent.com/52439201/157378033-43583d80-b730-4b85-8ae4-4a3a637ee3ad.png)

첫 번째 과정을 수행하면 `Render Tree`가 생성된다. 
`Render Tree`는 웹 페이지에 표시될 HTML 요소들과 이와 관련된 스타일 요소들로 구성된다. 이를 구성하기 위한 2가지 모델은 다음과 같다.
1. DOM(Document Object Model), HTML 요소들의 구조화된 표현
2. CSSOM(Cascading Style Sheets Object Model)- 요소들과 관련된 스타일 정보의 구조화된 표현

<br>

## DOM의 생성
DOM은 원본 HTML 문서의 객체 기반 표현 방식이다. DOM은 단순 텍스트로 구성된 HTML 문서의 내용과 구조가 객체 모델로 변환되어 다양한 프로그램에서 사용될 수 있다.  
DOM의 개체 구조는 `노드 트리`로 표현된다. 하나의 부모 줄기가 여러 개의 자식 나뭇가지를 갖고 있고, 또 각각의 나뭇가지는 잎들을 가질 수 있는 나무와 같은 구조로 이루어져 있다.  

* 밑의 HTML 문서를 보면 <html> 은 `“부모 줄기”` 루트 요소에 내포된 태그들은 `“자식 나뭇가지”` 그리고 요소 안의 내용은 `"잎"`에 해당한다.

```HTML
<html lang="en">
    <head>
        <title>DOM 이란?</title>
    </head>
    <body>
        <h1>안녕하세요.</h1>
        <P>나이가 어떻게 되시나요?<p>
    </body>
</html>
```

```
html
 ├── head
 │    └── title
 │         └── DOM 이란?
 └── body
      ├── h1
      │   └── 안녕하세요 서성식입니다.
      └── p
          └── 나이가 어떻게 되시나요?
```

<br>

## DOM에 대한 오해

### 1.DOM은 HTML이 아니다
DOM은 HTML 문서로부터 생성되지만 항상 동일하지 않다.  
DOM이 원본 HTML 소스와 다를 수 있는 두 가지 `케이스`가 있다.

#### 작성된 HTML 문서가 유효하지 않을 때
DOM은 유효한 HTML 문서의 인터페이스 이다. DOM을 생성하는 동안 브라우저는 유효하지 않는 HTML 코드를 올바르게 교정한다.

```HTML
<head>
    DOM 이란?
</head>
```
HTML 규칙의 필수 사항인 `head`와 `body` 요소가 빠져있다. 하지만 DOM 트리에는 올바르게 교정되어 생성된다.
```
html
 ├── head
 └── body
      └── DOM 이란?
```

#### 자바스크립트에 의해 DOM이 수정될 때
DOM은 HTML 문서의 내용을 볼 수 있는 인터페이스 역할을 하는 동시에 동적 자원이 되어 수정될 수 있다.

자바스크립트로 DOM에 새로운 노드를 추가해보자.
```js
var newNode = document.createElement("p");
var newContent = document.createTextNode("new content!!");
newNode.appendChild(newContent);
document.body.appendChild(newNode);
```
해당 코드를 실행하면 DOM을 업데이트하지만, 원본 HTML 내용은 변경되지 않는다.

### 2.DOM은 브라우저에 보이지 않는다.

브라우저에 보이는 것은 렌더 트리로 `DOM`과 `CSSOM`의 조합이다.
렌더 트리는 오직 스크린에 그려지는 것으로 구성되어 있기 때문에 DOM과는 다르다.

달리 말하면, 렌더링 되는 요소만 관련 있기 때문에 시각적으로 보이지 않는 요소는 제외된다.

밑의 예제를 보자. 

```HTML
<html lang="en">
    <head>
        <title>DOM 이란?</title>
    </head>
    <body>
    <style></style>
        <div>안녕하세요.</div>
        <P style="display: none;">나이가 어떻게 되시나요?</P>
    </body>
</html>
```

* DOM에서는 `P태그`를 포함시키지만
```
html
 ├── head
 │    └── title
 │         └── DOM 이란?
 └── body
      ├── h1
      │   └── 안녕하세요 서성식입니다.
      └── p
          └── 나이가 어떻게 되시나요?
```

* 렌더 트리에서는 `P태그`가 시각적으로 보이지 않기 때문에 제외시킨다.
```
html
 ├── head
 │    └── title
 │         └── DOM 이란?
 └── body
      └── h1
          └── 안녕하세요 서성식입니다.
```

### 3.DOM은 개발자 도구에 보이는 것이 아니다.
개발도구의 요소 검사기를 보면 DOM과 가장 가까운 근사치를 제공한다. 하지만 개발도구의 요소 검사기에는 DOM에 없는 정보까지 제공한다.
가장 좋은 예는 CSS의 가상 요소이다. 아래의 예제를 보자.

```html
<html lang="en">
    <head>
        <title>DOM 이란?</title>
    </head>
    <body>
    <style>
        div::after {
            content: "안녕하세요.";
        }
    </style>
    <div></div>
    </body>
</html>
```

::before 과 ::after 선택자를 사용하여 생성된 `가상 요소`는 `CSSOM`와 렌더 트리의 일부를 구성한다.
이는 기술적으로 DOM의 일부는 아니다. DOM은 오직 원본 HTML 문서로부터 빌드한다. 따라서 요소에 적용되는 스타일을 포함하지 않는다.
따라서 `가상 요소`는 DOM의 일부가 아님에도 불구하고, 개발자도구 요소 검사기에는 나타난다.

![image](https://user-images.githubusercontent.com/52439201/157382682-e7bb9e91-8b90-4338-9bb6-980a3e59d0df.png)

> 여기서 중요한 건, 가상요소는 DOM이 아니기 때문에 자바스크립트로 수정할 수 없다.

<br>

## 요약

* DOM은 HTML문서에 대한 인터페이스이며, 뷰 포트에 무엇을 렌더링 할지 결정하기 위해 사용된다.
* 내용, 구조, 스타일을 자바스크립트로 수정될 수 있다.
* DOM은 원본 HTML 문서와 비슷하지만 몇 가지 차이점이 있다.
    * 항상 유효한 HTML 형식이다.
    * 자바스크립트에 수정될 수 있는 동적 모델이어야 한다.
    * 가상 요소를 포함하지 않는다.
    * 보이지 않는 요소를 포함한다.