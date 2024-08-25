import{UserModel} from "../model/userModel.js";
import{UserApi} from "../api/userApi.js";

let name = $('#name');
let email =$('#email');
let password = $('#password1');
let confirm_password = $('#password2');

let userName = $('#userName');
let userPassword = $('#password');


let signUpBtn = $('#signUp');
let login = $('#loginBtn');

const userApi = new UserApi();

login.eq(0).on('click',function (){
    //event.preventDefault();
    let userNameValue = userName.val();
    let userPasswordValue = userPassword.val();
    console.log("login details : ",userNameValue,"   ",userPasswordValue)
   userApi.getUser(userNameValue,userPasswordValue);
});


signUpBtn.eq(0).on('click', function (){
    console.log("signup function");
    let nameValue = name.val();
    let emailValue = email.val();
    let passwordValue = password.val();
    let confirm_passwordValue = confirm_password.val();

    console.log(nameValue,"  ",emailValue, " ",passwordValue)

    if(passwordValue === confirm_passwordValue){
        let userModel = new UserModel(nameValue,emailValue,passwordValue);
        userApi.saveUser(userModel);
    }else {
        alert("Enter same password")
    }
});