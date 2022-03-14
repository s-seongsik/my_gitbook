# DOM의 데이터 타입과 핵심 인터페이스

*********************************


## DOM의 중요한 데이터 타입

DOM에서 제공하는 API에서 수많은 data types가 존재한다. 

아래의 표는 이러한 data types에 대해 정리한 설명이다.

| type | Description |   
| :------ |:--- |  
| Document | Document 인터페이스는 브라우저가 불러온 웹 페이지를 나타내며, HTML 페이지의 요소에 접근하려면 항상 Document Object에 엑세스하는 것으로 시작한다.|
| Element | Element는 DOM API의 멤버에 의해 리턴된 Element 또는 Element type의 node를 의미한다. HTML 페이지에서 HTML 요소를 찾고 엑세스할 때 사용한다. |
| Attribute | HTML DOM에서 attr 객체는 HTML 속성을 나타낸다. HTML 속성은 항상 HTML 요소에 포함된다.|
| NamedNodeMap | 배열과 같은 요소 속성을 가진 정렬되지 않은 컬렉션이다. 즉, NamedNodeMap은 Attr 객체의 목록이다. 노드 수를 반환하는 length 속성이 있으며, 노드는 name 또는 index(0부터 시작) 번호로 접근할 수 있다.|  
| NodeList | NodeList는 elements 의 배열이다. NodeList의 Items 은 index 를 통해 접근 가능하며, index는 0부터 시작한다. length 속성은 NodeList의 노드 수를 반환하며 NodeList는 HTMLCollection 과 거의 동일 하다.|
| Collection | Collection은 HTML 노드의 모음이다. 배열과 유사한 HTML 요소 목록이며 Collection 요소는 인덱스(0시작)로 접근할 수 있다. length 속성은 Collection 요소의 수를 반환한다.|
| Style | Style 객체는 개별 스타일 문을 나타낸다. ex). background|

<br>

## DOM의 핵심 Interfaces

다양한 data types에 다양한 Interfaces이 있지만 그 중에서 가장 많이 사용되는 Interfaces를 정리하였다.


| type | Description |   
| :------ |:--- |  
| document.getElementById(id) | ID로 HTML 요소를 찾을 때 사용한다.|
| document.getElementsByTagName(TagName) | 태그 이름으로 HTML 요소를 찾을 때 사용한다.|
| document.getElementsByClassName(className)) | class 이름으로 HTML 요소를 찾을 때 사용한다.|
| document.createElement(element) | HTML 요소를 생성할 때 사용한다.|
| document.appendChild(element) | 부모 요소에 자식 요소를 추가할 때 사용한다.|
| element.innerHTML = new html content | HTML 요소의 내부 HTML 변경할 때 사용한다.|
| element.attribute = new value | HTML 요소의 속성 값을 추가할 때 사용한다.|
| element.setAttribute(attribute, value) | HTML 요소의 속성 값을 변경할 때 사용한다.|
| element.getAttribute | HTML 요소의 속성 값을 반환할 때 사용한다.|
| element.style.property | HTML 요소의 스타일을 변경할 때 사용한다.|
| element.addEventListener | 이벤트 핸들러를 HTML 요소에 연결|

이 밖에도 많은 Interfaces가 있지만 가장 많이 사용하는 것만 정리해봤다.
