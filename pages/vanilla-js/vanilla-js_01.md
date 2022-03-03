# 컴포넌트 예제 

밑에 모든 코드는 [황준일님의 블로그를 참고하였습니다.](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_1-%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%AA-%E1%84%89%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A2%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5)

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

