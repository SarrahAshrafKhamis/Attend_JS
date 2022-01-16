import { employees } from "./SystemArrays.js"
import { getCurrentEmp } from "./SystemFunctions.js"

$(function () {
    let emp = getCurrentEmp();

    let fname = $("#fname");
    let lname = $("#lname");
    let address = $("#address");
    let email = $("#email");
    let age = $("#age");
    fname.html(emp.fname);
    lname.html(emp.lname);
    address.html(emp.address);
    email.html(emp.email);
    age.html(emp.age);

    let editbtn = $("#editbtn");

    editbtn.click(function () {
        fname.html(`<input type='text' class='fname' value='${emp.fname}'/>`);
        lname.html(`<input type='text' class='lname' value='${emp.lname}'/>`);
        address.html(`<input type='text' class='address' value='${emp.address}'/>`);
        email.html(`<input type='email' class='email' value='${emp.email}'/>`);
        age.html(`<input type='number' min='20' max='65' class='age' value='${emp.age}'/>`);

        $(".fname").blur(validateFname);
        $(".lname").blur(validateLname);
        $(".address").blur(validateAddress);
        $(".email").blur(validateEmail);
        $(".age").blur(validateAge);

        editbtn.css("display", "none");
        editbtn.parent().append(`<button id='cancelbtn'>Cancel</button>`);
        editbtn.parent().append(`<button id='savebtn'>Save</button>`);
        $("#cancelbtn").click(cancelClick);
        $("#savebtn").click(saveClick);
    });

    function cancelClick() {
        let conf = confirm("Discard changes?")
        if (conf) {
            location.reload();
        }
    };
    function saveClick() {
        if (isValidRegister($(".fname").val(), $(".lname").val(), $(".address").val(), $(".email").val(), $(".age").val())) {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].id == emp.id) {
                    employees[i].fname = $(".fname").val();
                    employees[i].lname = $(".lname").val();
                    employees[i].address = $(".address").val();
                    employees[i].age = $(".age").val();
                    employees[i].email = $(".email").val();
                    localStorage.setItem("employees", JSON.stringify(employees));

                    alert("Saved!");
                    location.reload();
                    break;
                }
            }
        }
        else {
            alert("Enter valid data");
            validateFname();
            validateLname();
            validateAddress();
            validateEmail();
            validateAge();
        }
    }

    let nameReg = /^[A-Za-z]+$/;
    let emailReg = /^(([\w\.-])+)@([a-zA-Z0-9\-])+\.([a-zA-Z]){2,3}$/;

    function isValidName(n) {
        return nameReg.test(n);
    }

    function isValidAddress(ad) {
        return ad != "";
    }

    function isValidEmail(em) {
        return emailReg.test(em);
    }

    function isValidAge(age) {
        return !(age == "" || age < 20 || age > 65);
    }

    function isValidRegister(fname, lname, address, email, age) {
        return (isValidName(fname) && isValidName(lname) && isValidAddress(address) && isValidEmail(email) && isValidAge(age));
    }

    function validateFname() {
        if (isValidName($(".fname").val())) {
            $("#fnameerror").css("display", "none");
        }
        else {
            $("#fnameerror").css("display", "block");
            $("#fname").css("margin", "5px 0 5px 0")
        }
    }

    function validateLname() {
        if (isValidName($(".lname").val())) {
            $("#lnameerror").css("display", "none");
        }
        else {
            $("#lnameerror").css("display", "block");
            $("#lname").css("margin", "5px 0 5px 0")
        }
    }

    function validateAddress() {
        if (isValidAddress($(".address").val())) {
            $("#addresserror").css("display", "none");
        }
        else {
            $("#addresserror").css("display", "block");
            $("#address").css("margin", "5px 0 5px 0")
        }
    }

    function isDuplicateEmail() {
        for (let i = 0; i < employees.length; i++) {
            if ($(".email").val() == employees[i].email && emp.id != employees[i].id) {
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
        else if (isValidEmail($(".email").val())) {
            $("#emailerror").css("display", "none");
        }
        else {
            $("#emailerror").text("Enter valid email");
            $("#emailerror").css("display", "block");
            $("#email").css("margin", "5px 0 5px 0")
        }
    }

    function validateAge() {
        if (isValidAge($(".age").val())) {
            $("#ageerror").css("display", "none");
        }
        else {
            $("#ageerror").css("display", "block");
            $("#age").css("margin", "5px 0 5px 0")
        }
    }
});