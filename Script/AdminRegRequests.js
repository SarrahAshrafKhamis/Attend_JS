import { users } from "./SystemArrays.js"
import { getEmpBy } from "./SystemFunctions.js"

$(function () {
    for (let i = 0; i < users.length; i++) {
        if (!(users[i].isConfirmed)) {
            let emp = getEmpBy("id", users[i].id);
            $("#regreqs").append(`<tr><td><h4 class='empid'>${emp.id}</h4></td><td><h4 class='empname'>${emp.fname} ${emp.lname}</h4></td><td class='checktd'><input type='checkbox' class='check'/></td></tr>`);
        }
    }
    $(".check").click(function () {
        if ($(this).is(":checked")) {
            let conf = confirm("Do you want to confirm this employee?");
            if (conf) {
                let confId = $(this).parent().parent().children(":first").children(":first").text();
                for (let i = 0; i < users.length; i++) {
                    if (confId == users[i].id) {
                        users[i].isConfirmed = true;
                        localStorage.setItem("users", JSON.stringify(users));
                        break;
                    }
                }
                $(this).parent().parent().hide(500);
            }
            else {
                $(this).prop('checked', false);
            }
        }
    });
});