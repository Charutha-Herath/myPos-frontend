

export class UserApi{

    getUser(userName,userPassword){
        if (userName) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/pos/user',
                data: {
                    action: 'checkUser',
                    userName: userName

                },
                success: function (responseText) {
                    let user = responseText;
                    console.log("responseText :",user , " userName ",user.userName)
                    if (typeof responseText === 'string') {
                        // If it's a string, parse it as JSON
                        user = JSON.parse(responseText);
                        console.log("check responseText")
                    }
                    console.log("parameters ",userName,"  ",userPassword)
                    console.log("before if ",user.userName,"  ",user.password)
                    if (userName === user.userName && userPassword === user.password) {
                        const loadingScreen = $('#login_page');
                        loadingScreen.hide();

                        const loadingScreen5 = $('#sign_up_page');
                        loadingScreen5.hide();
                        console.log("loading screen nav and home")
                        const loadingScreen1 = $('#header-nav');
                        loadingScreen1.show();

                        const loadingScreen2 = $('#sec-main-home');
                        loadingScreen2.show();

                        const loadingScreen3 = $('#sec-main-store');
                        loadingScreen3.hide();

                        const loadingScreen4 = $('#sec-main-customer');
                        loadingScreen4.hide();

                        const loadingScreen6 = $('#sec-main-orderDetails');
                        loadingScreen6.hide();

                        const loadingScreen7 = $('#sec-main-place-order');
                        loadingScreen7.hide();
                    }else {
                        alert("Incorrect Username Or Password");

                    }

                },
                error: function (xhr, status, error) {
                    console.log(error,"userApi..");
                }
            });
        }
    }

    saveUser(user){
        console.log('Save user call');
        console.log(user)
        const userJson = JSON.stringify(user);
        console.log("userJson : ",userJson)
        console.log("Save user before ajax")
        const sendAjax = (userJSON) =>{
            $.ajax({
                url:"http://localhost:8080/pos/user",
                type: "POST",
                data: userJSON,
                contentType: "application/json",
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'User Saved Successful',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }


        sendAjax(userJson);
    }
}
