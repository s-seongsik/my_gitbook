# 자바스크립트 클래스와 기본 문법

*********************************

> class 표현식은 ECMAScript 2015 (ES6)에서 클래스를 정의하는 한 방법이다. class 식은 기명(named) 또는 익명(unnamed)일 수 있다. 기명인 경우, 클래스명은 클래스 본체(body)에서만 지역(local)이다. Javascript 클래스는 프로토타입(원형) 기반 상속을 사용한다.

## 클래스 Methods
| Method | Description |   
| :------ |:--- |  
| constructor() |  A special method for creating and initializing objects created within a class|  

## 클래스 Keywords
| Method | Description |   
| :------ |:--- |  
| extends |  Extends a class (inherit)|  
| static | Defines a static method for a class |  
| super |  Refers to the parent class |  

## 구문
```js
class className [extends] {
    // class body
}
```

## 주의사항
* 클래스는 표현식과 달리 선언문으로는 같은 클래스를 중복 선언하면 오류가 발생한다.
* 클래스 선언은 함수 선언과 달리 호이스팅의 대상이 아니다.

<br>

## constructor()
> * constructor() 메서드 클래스 내에서 생성된 객체를 생성 및 초기화하기 위한 메서드이다.
* constructor() 메서드는 클래스가 시작될 때 자동으로 호출되며 이름은 정확하게 `constructor`여야 한다.
* 만약, constructor() 메서드가 없으면 Javascirpt는 빈 constructor() 메서드를 추가한다.
* 클래스에는 두 개 이상의 constructor() 메서드가 있을 수 없다. 만약 있다면 `SyntaxError`를 발생시킨다.
* `super()` 메서드를 사용하여 부모 클래스의 constructor()를 호출할 수 있다.

### 브라우저 호환  
![image](https://user-images.githubusercontent.com/52439201/156698076-7abf8c98-a23c-46c9-8f23-b6b540c9a332.png)

### 예제

```js
class User {
    constructor(payload){
        this.name = payload.name;
        this.age = payload.age;
        this.address = payload.address;
    }
}

user = new User({name:'서성식', age:31, address:'서울특별시'})

document.querySelector('#name').innerHTML = '이름 ' + user.name;
document.querySelector('#age').innerHTML = '나이 ' + user.name;
document.querySelector('#address').innerHTML = '주소 ' + user.address;
```
### 실행결과:  
<iframe src="/example/javascript/example_01/index.html" width="100%"class="example-frame"></iframe>

<br>

## extends 키워드
> * `extends` 키워드는 다른 클래스(부모)의 자식 클래스를 만드는 데 사용한다.
* 자식 클래스는 다른 클래스의 모든 메서드를 상속한다.
* 상속은 코드 재사용성에 유리하다. 즉, 새 클래스를 만들 때 기존 클래스의 속성과 메서드를 재사용한다.

### 예제

다음 예제는 `User` 클래스를 정의하고, `addUser`라는 새로운 클래스가 `User`를 상속한다.

```js
class User {
    constructor(payload){
        this.name = payload.name;
        this.age = payload.age;
        this.address = payload.address;
    }
    profile(){
        return '이름은 ' + this.name + ' 나이는 ' + this.age + ' 주소는 ' + this.address
    }
}

class addUser extends User{
    constructor(payload, sex) {
        super(payload);
        this.sex = sex;
    }
    show() {
        return this.profile() + ' 성별은 ' + this.sex;
    }
}

profile = new addUser({name:'서성식', age:31, address:'서울특별시'}, '남자');


document.querySelector('#app').innerHTML = profile.show();
```

### 실행결과:  
<iframe src="/example/javascript/example_02/index.html" width="100%"class="example-frame"></iframe>

<br>

## static 키워드
> * `static` 키워드는 클래스에 대한 정적 메서드를 정의한다.
* 정적 메서드는 클래스의 인스턴트 객체를 생성하지 않고 클래스에서 직접 호출하여 사용할 수 있다.


### 예제

```js
class User {
    constructor(name){
        this.name = name;
    }
    static profile(){
        return 'static 입니다.'
    }
}

myname = new User('서성식');

// 클래스에서 profile() 메서드를 직접호출 한다.
document.querySelector('#app').innerHTML = User.profile();

// 만약 생성된 myname 인스턴스로 myname.profile() 호출하게 되면 에러가 발생한다.
// Uncaught TypeError: myname.profile is not a function
```

### 실행결과:  
<iframe src="/example/javascript/example_03/index.html" width="100%"class="example-frame"></iframe>

<br>

## super 키워드
> * `super` 키워드는 부모 클래스의 생성자를 호출하여 부모의 속성 및 메서드를 엑세스하는 데 사용한다.

```js
class User {
    constructor(name){
        this.name = name;
    }
    profile(){
        return '이름 ' + this.name;
    }
}

class Child extends User {
    constructor(name){
        super(name);
    } 
    show(){
        return this.profile();
    }
}

user = new Child('서성식');


document.querySelector('#app').innerHTML = user.show();
```

### 실행결과:  
<iframe src="/example/javascript/example_04/index.html" width="100%"class="example-frame"></iframe>
