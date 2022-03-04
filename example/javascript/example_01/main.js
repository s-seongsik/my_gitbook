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
