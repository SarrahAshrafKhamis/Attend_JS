import { employees, users } from "./SystemArrays.js"
import { Employee, User } from "./SystemClasses.js"

$(function () {
    emailjs.init("user_dgo3TTIQXi20QOS4Y7iwB");

    if ((window.location.href).includes("admin")) {
        $("#redirect").css("display", "none");
    }

    let fname = $("#fname");
    let lname = $("#lname");
    let address = $("#address");
    let email = $("#email");
    let age = $("#age");
    let registerBtn = $("#register");
    let cancelBtn = $("#cancelreg");
    let nameReg = /^[A-Za-z]+$/;
    let loginredirect = $("#loginredirect");
    let emailReg = /^(([\w\.-])+)@([a-zA-Z0-9\-])+\.([a-zA-Z]){2,3}$/;

    cancelBtn.click(function () {
        let conf = confirm("do you want to cancel?")
        if (conf) {
            location.reload();
        }
    });

    loginredirect.click(function () {
        $("#logintab").click();
    });

    function isValidName(n) {
        return nameReg.test(n);
    }

    function isValidAddress(ad) {
        return ad != "";
    }

    function isValidEmail(em) {
        return emailReg.test(em) && !isDuplicateEmail();
    }

    function isValidAge(age) {
        return !(age == "" || age < 20 || age > 65);
    }

    function isValidRegister(fname, lname, address, email, age) {
        return (isValidName(fname) && isValidName(lname) && isValidAddress(address) && isValidEmail(email) && isValidAge(age));
    }

    function validateFname() {
        if (isValidName(fname.val())) {
            $("#fnameerror").css("display", "none");
        }
        else {
            $("#fnameerror").css("display", "block");
            $("#fname").css("margin", "5px 0 5px 0")
        }
    }

    function validateLname() {
        if (isValidName(lname.val())) {
            $("#lnameerror").css("display", "none");
        }
        else {
            $("#lnameerror").css("display", "block");
            $("#lname").css("margin", "5px 0 5px 0")
        }
    }

    function validateAddress() {
        if (isValidAddress(address.val())) {
            $("#addresserror").css("display", "none");
        }
        else {
            $("#addresserror").css("display", "block");
            $("#address").css("margin", "5px 0 5px 0")
        }
    }

    function isDuplicateEmail() {
        for (let i = 0; i < employees.length; i++) {
            if (email.val() == employees[i].email) {
                return true;
            }
        }
        return false;
    }

    function validateEmail() {
        if (isDuplicateEmail()) {
            $("#emailerror").text("Duplicated email");
            $("#emailerror").css("display", "block");
            $("#email").css("margin", "5px 0 5px 0")
        }
        else if (isValidEmail(email.val())) {
            $("#emailerror").css("display", "none");
        }
        else {
            $("#emailerror").text("Enter valid email");
            $("#emailerror").css("display", "block");
            $("#email").css("margin", "5px 0 5px 0")
        }
    }

    function validateAge() {
        if (isValidAge(age.val())) {
            $("#ageerror").css("display", "none");
        }
        else {
            $("#ageerror").css("display", "block");
            $("#age").css("margin", "5px 0 5px 0")
        }
    }

    fname.blur(validateFname);
    lname.blur(validateLname);
    address.blur(validateAddress);
    email.blur(validateEmail);
    age.blur(validateAge);

    registerBtn.click(function () {
        let isSecurity;
        if ((window.location.href).includes("admin")) {
            isSecurity = true;
        }
        else {
            isSecurity = false;
        }
        if (isValidRegister(fname.val(), lname.val(), address.val(), email.val(), age.val())) {
            let emp = new Employee(fname.val(), lname.val(), address.val(), email.val(), age.val());
            let username=Math.random().toString(36).substring(2, 9);
            let password=Math.random().toString(36).substring(2, 9);
            let user = new User(emp.id,username,password, false, isSecurity, isSecurity);
            users.push(user);
            employees.push(emp);
            localStorage.setItem("employees", JSON.stringify(employees));
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registered successfully!");

            emailjs.send("service_wzbz90i", "template_49i44mg", {
                to_name: `${fname.val()} ${lname.val()}`,
                from_name: "Company team",
                message: `username: ${username} ///
                password: ${password}`,
                to_email: `${email.val()}`,
            }).then(function () {
                location.reload();
            });
        }
        else {
            alert("Enter valid data");
            validateFname();
            validateLname();
            validateAddress();
            validateEmail();
            validateAge();
        }
    });
});//end of load