import { employees } from "./SystemArrays.js"
import { getDailyReport, getUserBy, isWeekend } from "./SystemFunctions.js"

$(function () {
    let d = new Date().toLocaleDateString();
    if (isWeekend(d)) {
        $("#daytbl").css("display", "none");
        $("#daytbl").parent().append(`<h2 style='text-align:center;'>It's the <i>Weekend!</i></h2>`);
    }
    else {
        for (let i = 0; i < employees.length; i++) {
            let id = employees[i].id;
            let dayrep = getDailyReport(d, id);
            $("#daytbl").append(`
                 <tr>
                    <td>${getUserBy("id", employees[i].id).username}</td>
                    <td>${employees[i].fname}</td>
                    <td>${employees[i].lname}</td>
                     <td>${dayrep.status}</td>
                     <td>${dayrep.in}</td>
                     <td>${dayrep.latein}</td>
                     <td>${dayrep.exin}</td>
                     <td>${dayrep.out}</td>
                     <td>${dayrep.lateout}</td>
                     <td>${dayrep.exout}</td>
                 </tr>`)
        }
    }
});