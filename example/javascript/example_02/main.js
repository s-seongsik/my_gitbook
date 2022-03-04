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