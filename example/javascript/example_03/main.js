class User {
    constructor(name){
        this.name = name;
    }
    static profile(){
        return 'static 입니다.'
    }
}

myname = new User('서성식');


document.querySelector('#app').innerHTML = User.profile();