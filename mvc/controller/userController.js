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