import { users } from "./SystemArrays.js"

$(function () {
    let username = $("#username");
    let password = $("#password");
    let loginBtn = $("#login");
    let cancelBtn = $("#cancellog");
    let signupredirect = $("#signupredirect");

    cancelBtn.click(function () {
        let conf = confirm("do you want to cancel?")
        if (conf) {
            location.reload();
        }
    });

    signupredirect.click(function () {
        $("#registertab").click();
    });

    function isValidUsername(un) {
        return !(un == "");
    }

    function isValidPassword(pw) {
        return !(pw == "");
    }

    function validateUsername() {
        if (isValidUsername(username.val())) {
            $("#usernameerror").css("display", "none");
        }
        else {
            $("#usernameerror").css("display", "block");
        }
    }

    function validatePassword() {
        if (isValidPassword(password.val())) {
            $("#passworderror").css("display", "none");
        }
        else {
            $("#passworderror").css("display", "block");
        }
    }

    function isValidLogin(un, pw) {
        return (isValidUsername(un) && isValidPassword(pw));
    }

    username.blur(validateUsername);
    password.blur(validatePassword);

    loginBtn.click(function () {
        if (isValidLogin(username.val(), password.val())) {
            let isRegistered = false;
            let user;
            for (let i = 0; i < users.length; i++) {
                if (username.val() == users[i].username) {
                    isRegistered = true;
                    user = users[i];
                    break;
                }
            }
            if (isRegistered) {
                if (user.password == password.val()) {
                    if (user.isAdmin) {
                        window.location.href = `/adminHome.html`;
                    }
                    else {
                        if (user.isConfirmed) {
                            window.location.href = "/employeeHome.html";
                            localStorage.setItem("currentuserid", user.id);
                        }
                        else {
                            alert("your account is not confirmed yet");
                            window.location.reload();
                        }
                    }
                }
                else {
                    alert("Wrong password");
                }

            }
            else {
                alert("Username does not exist!");
            }
        }
        else {
            alert("Enter username and password");
            validateUsername();
            validatePassword();
        }
    });
});//end of load