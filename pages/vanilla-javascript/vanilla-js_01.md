# 컴포넌트 예제 

밑에 모든 코드는 [황준일님의 블로그를 따라하며 구현하였습니다.](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_1-%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%AA-%E1%84%89%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A2%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5)

## state - setState - render

컴포넌트 설계의 기반이 되는 코드를 작성해보자.

## 1. 기능 구현
* `setState`라는 메소드를 통해 `state`를 기반으로 `render`를 해주는 코드를 작성
* 버튼 클릭 -> setState() -> state.items.push -> render()

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

```js
// main.js
const $app = document.querySelector('#app');

let state = {
    items : ['item1', 'item2', 'item3', 'item4']
}

const render = () => {
    const {items} = state;
    $app.innerHTML = `
        <ul>
            ${items.map(item=> `<li> ${item} </li>`).join('')}
        </ul>
        <button id="append">추가</button>
    `;
    
    document.querySelector('#append').addEventListener('click', () => {
        setState({items: [...items, `item${items.length + 1}` ] });  
    })
}

const setState = (newState) => {
    state = {...state, ...newState};
    render();
}

render();
```

<iframe src="/example/vanilla-js/example_01/index.html" width="100%" height="250px" class="example-frame"></iframe>

위 코드의 핵심은
* `state`가 변경되면 `render`를 실행
* `state`는 `setState`로만 변경해야 한다.

위의 규칙을 지키면 브라우저에 출력되는 내용은 무조건 `state`에 종속되는 것이다. 즉 DOM을 직접 다룰 필요가 없다.

<br>

## 2. 추상화  
* 위의 코드를 `class`문법으로 추상화하여 작성해보자.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>

<script src="./main.js"></script>

</html>
```
```js
//main.js
class component {
    $target;
    $state;
    constructor($target){
        this.$target = $target;
        this.setup();
        this.render();
    }
    setup() {};
    template() {return '';}
    render() {
        this.$target.innerHTML = this.template();
        this.setEvent();
    }
    setEvent() {}
    setState (newState) {
        this.$state = {...this.$state, ...newState};
        this.render();
    }
}

class App extends component {
    setup() {
        this.$state = {items: ['item1', 'item2'] };
    }
    template () {
        const { items } = this.$state;
        return `
            <ul>
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <button id="append">추가</button>
        `
    }


    setEvent () {
        this.$target.querySelector('#append').addEventListener('click', () => {
            const { items } = this.$state;
            this.setState({ items: [ ...items,`item${items.length + 1}` ] });
        });
    }
}

new App(document.querySelector('#app'));
```

<iframe src="/example/vanilla-js/example_02/index.html" width="100%" height="250px" class="example-frame"></iframe>

컴포넌트를 클래스로 바꿔 유연하게 만들어봤다. 무엇보다 컴포넌트 코드의 사용 방법을 강제할 수 있기 대문에 코드를 유지보수하고 관리할 때 매우 이롭다.

<br>

## 3. 모듈화 
* ES6 모듈시스템을 사용하여 프로젝트 구조를 모듈화 해보자.

```
.
├── index.html
└── src
    ├── app.js              # ES Module의 entry file
    ├── components          # Component 역할을하는 것들
    │   └── Items.js
    └── core                # 구현에 필요한 코어들
        └── Component.js
```

* index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./src/app.js" type="module"></script>
</body>
</html>
```

* src/app.js  

```js
import Items from './components/Items.js';

class App {
    constructor() {
        const app = document.querySelector("#app");
        new Items(app);
    }
}

new App();
```

* src/components/Items.js 

```js
import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
    `
  }

  setEvent () {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
  }
}
```

* src/core/Component.js 

```js
export default class Components {
    $target;
    $state;
    constructor($target) {
        this.$target = $target;
        this.setup();
        this.render();
    }
    setup() {};
    template () { return ''; }
    render() {
        this.$target.innerHTML = this.template();
        this.setEvent();
    }
    setEvent () {}
    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
      }
}
```

* `lite-server`로 html, css, js 실습 서버 실행
```console
npm install lite-server --save-dev
```

* package.json에 main이 되는 엔드리 `js("./src/app.js")`와 실행 스크립트를 등록하자

```json
{
  "name": "web-component",
  "version": "1.0.0",
  "description": "",
  "main": "./src/app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "lite-server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "lite-server": "^2.6.1"
  }
}
```

* `npm run dev`로 서버를 실행하여 확인
```console.log
$ npm run dev
```

<iframe src="/example/vanilla-js/example_03/index.html" width="100%" height="250px" class="example-frame"></iframe>


<br>

## 4. 이벤트 버블링 
> * 위의 모듈화 예제는 `addBtn`버튼을 누를때마다 render()가 실행된다. 이는 추가할 때 마다 이벤트가 새로 등록하게 된다.
* 이벤트 버블링을 이용하면, 좀 더 직관적으로 코드를 작성할 수 있다.
* 기존의 render()가 실행될 때마다 setEvent()를 실행하게 되는데 라이프 사이클을 component가 생성될 때 한번 실행하게 변경한다. 그렇게 되면 추가로 등록할 필요가 없어진다.
* 이벤트를 각각의 하위 요소에 등록하는게 아니라 component의 target 자체에 등록하는 것이다.

```js
import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map((item, key) => `
          <li>${item}</li>
          <button class="deleteBtn" data-index="${key}">삭제</button>
        `).join('')}
      </ul>
      <button class="addBtn">추가</button>
    `
  }

  setEvent () {
    this.$target.addEventListener('click', ({target}) => {
      const items = [ ...this.$state.items ];


      if (target.classList.contains('addBtn')) {
        this.setState({ items: [ ...items, `item${items.length + 1}` ] });
      }

      if (target.classList.contains('deleteBtn')) {
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }
    })

  }
}
```

```js
export default class Components {
    $target;
    $state;
    constructor($target) {
        this.$target = $target;
        this.setup();
        this.render();
        this.setEvent();
    }
    setup() {};
    template () { return ''; }
    render() {
        this.$target.innerHTML = this.template();
    }
    setEvent () {}
    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
      }
}
```

<br>

## 5. 이벤트 버블링 추상화하기
* 위의 이벤트 버블링 등록 과정을 메소드로 만들어서 사용한다.

```js
export default class Components {
    $target;
    $state;
    constructor($target) {
        this.$target = $target;
        this.setup();
        this.render();
        this.setEvent();
    }
    setup() {};
    template () { return ''; }
    render() {
        this.$target.innerHTML = this.template();
    }
    setEvent () {}
    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
    addEvent (eventType, selector, callback) {
        const children = [ ...this.$target.querySelectorAll(selector) ]; 
        const isTarget = (target) => children.includes(target)
                                     || target.closest(selector);
        this.$target.addEventListener(eventType, event => {
          if (!isTarget(event.target)) return false;
          callback(event);
        })
      }
}
```

* 작성된 메소드를 아래와 같이 사용한다.

```js
import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map((item, key) => `
          <li>${item}</li>
          <button class="deleteBtn" data-index="${key}">삭제</button>
        `).join('')}
      </ul>
      <button class="addBtn">추가</button>
    `
  }

  setEvent () {
    this.addEvent('click', '.addBtn', ({ target }) => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const items = [ ...this.$state.items ];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });

  }
}
```

<iframe src="/example/vanilla-js/example_04/index.html" width="100%" height="250px" class="example-frame"></iframe>

<br>

## 6. 컴포넌트 분할하기
* 이제까지는 단순히 Item을 추가하는 기능밖에 없었다. 하지만, 여러 기능들을 추가 했을 때 `Items` 컴포넌트에 어떤 문제가 발생하는지 알아보자.
* `toggle`, `filter` 기능을 Items 컴포넌트에 추가


```js
import Component from "../core/Component.js";

export default class Items extends Component {
  get filteredItems () {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
                                        (isFilter === 2 && !active) ||
                                        isFilter === 0);
  }
  
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }
  template() {
    return `
      <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력" />
      </header>
      <main>
        <ul>
          ${this.filteredItems.map(({contents, active, seq}) => `
            <li data-seq="${seq}">
              ${contents}
              <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
                ${active ? '활성' : '비활성'}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `).join('')}
        </ul>
      </main>
      <footer>
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      </footer>
    `
  }

  setEvent () {
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      const {items} = this.$state;
      const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
      const contents = target.value;
      const active = false;
      this.setState({
        items: [
          ...items,
          {seq, contents, active}
        ]
      });
    });

    this.addEvent('click', '.toggleBtn', ({target}) => {
      const items = [ ...this.$state.items ];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      const index = items.findIndex(v => v.seq === seq);
      items[index].active = !items[index].active;
      this.setState({items});
    });

    this.addEvent('click', '.filterBtn', ({ target }) => {
      this.setState({ isFilter: Number(target.dataset.isFilter) });
    });

    this.addEvent('click', '.addBtn', ({ target }) => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const items = [ ...this.$state.items ];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });

  }
}
```

Items 컴포넌트에 여러 기능들을 넣다보니 코드가 복잡해졌다. 이럴 경우 관리하기도 힘들 뿐더러 `컴포넌트`라는 기능에 맞지 않게 되버렸다. 컴포넌트는 기본적으로 `재사용성`이 목적이다. 따라서, 하나의 컴포넌트에서는 최대한 작은 단위의 일을 하도록 해야한다.

<iframe src="/example/vanilla-js/example_05/index.html" width="100%" height="250px" class="example-frame"></iframe>

<br>

### 폴더 구조

```console
.
├── index.html
└── src
    ├── App.js               # main에서 App 컴포넌트를 마운트한다.
    ├── main.js              # js의 entry 포인트
    ├── components
    │   ├── ItemAppender.js
    │   ├── ItemFilter.js
    │   └── Items.js
    └── core
        └── Component.js
```

###  Component Core 변경

* src/core/Component.js에 다음과 같이 $props와 mounted를 추가해야 한다.
* mounted를 추가한 이유는 render 이후에 추가적인 기능을 수행하기 위해서이다.
* $props는 부모 컴포넌트가 자식 컴포넌트에게 상태 혹은 메소드를 넘겨주기 위해서이다.

```js
export default class Component {
  $target;
  $props;
  $state;
  constructor ($target, $props) {
    this.$target = $target;
    this.$props = $props; // $props 할당
    this.setup();
    this.setEvent();
    this.render();
  }
  setup () {};
  mounted () {};
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 후에 mounted가 실행 된다.
  }
  setEvent () {}
  setState (newState) { /* 생략 */ }
  addEvent (eventType, selector, callback) { /* 생략 */ }
}
```

###  엔트리 포인트 변경
* `index.html` : 기존에 app.js가 아닌 main.js를 가져온다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./src/main.js" type="module"></script>
</body>
</html>
```

### 컴포넌트 분할
> * 기존의 Items에 존재하던 로직을 `App.js`에 넘겨주고, `Items`, `ItemAppender`, `ItemFilter` 등은 `App.js`에서 넘겨주는 로직을 사용하도록 만들어야 한다.

* src/App.js

```js
import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {

  setup () {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }

  template () {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
  mounted () {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

    // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { addItem: contents => addItem(contents) }
    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this)
    });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this)
    });
  }

  get filteredItems () {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
      (isFilter === 2 && !active) ||
      isFilter === 0);
  }

  addItem (contents) {
    const {items} = this.$state;
    const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [
        ...items,
        {seq, contents, active}
      ]
    });
  }

  deleteItem (seq) {
    const items = [ ...this.$state.items ];;
    items.splice(items.findIndex(v => v.seq === seq), 1);
    this.setState({items});
  }

  toggleItem (seq) {
    const items = [ ...this.$state.items ];
    const index = items.findIndex(v => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({items});
  }

  filterItem (isFilter) {
    this.setState({ isFilter });
  }

}
```

* src/components/ItemAppender.js

```js
import Component from "../core/Component.js";

export default class ItemAppender extends Component {

  template() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    });
  }
}
```

* src/components/Items.js

```js
import Component from "../core/Component.js";

export default class Items extends Component {

  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${filteredItems.map(({contents, active, seq}) => `
          <li data-seq="${seq}">
            ${contents}
            <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
              ${active ? '활성' : '비활성'}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `).join('')}
      </ul>
    `
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent('click', '.deleteBtn', ({target}) => {
      deleteItem(Number(target.closest('[data-seq]').dataset.seq));
    });

    this.addEvent('click', '.toggleBtn', ({target}) => {
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });

  }

}
```

* src/components/ItemFilter.js

```js
import Component from "../core/Component.js";

export default class ItemFilter extends Component {

  template() {
    return `
      <button class="filterBtn" data-is-filter="0">전체 보기</button>
      <button class="filterBtn" data-is-filter="1">활성 보기</button>
      <button class="filterBtn" data-is-filter="2">비활성 보기</button>
    `
  }

  setEvent() {
    const { filterItem } = this.$props;
    this.addEvent('click', '.filterBtn', ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  }
}
```

<iframe src="/example/vanilla-js/example_06/index.html" width="100%" height="250px" class="example-frame"></iframe>

<br>

## 끝으로

`Vanilla Javascirpt`로 컴포넌트를 하나하나 구현해보면서 많은 것을 느꼈다.
이제까지 `Vue.js`로 컴포넌트 생성하고 부모/자식 컴포넌트간 상태, 메소드를 주고 받는 등 프레임워크에서 제공해주는 가이드 라인대로 개발을 해왔기 때문에 내부적으로는 어떻게 돌아가는지 자세히 알지는 못했다.

이번 계기가 `Vanilla Javascirpt`를 집중적으로 공부하게 된 계기가 된 것임은 틀림없다. 

앞으로는, 간단한 SPA 예제들을 `Vanilla Javascirpt`로 구현해보면서 공부해 볼 생각이다.
(나중에는..복잡한 웹 앱을 `Vanilla Javascirpt`로 구현해보고 싶다!)