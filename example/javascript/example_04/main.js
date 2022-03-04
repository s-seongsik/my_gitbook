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