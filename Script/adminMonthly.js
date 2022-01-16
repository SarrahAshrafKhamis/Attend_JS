import { employees } from "./SystemArrays.js"
import { getMonthlyReport, getUserBy } from "./SystemFunctions.js"

$(function () {
    for (let i = 0; i < employees.length; i++) {
        let emp = employees[i];
        let monthly = getMonthlyReport(new Date(), emp.id);
        $("#monthtbl").append(`
             <tr>
                 <td>${getUserBy("id", emp.id).username}</td>
                 <td>${emp.fname}</td>
                 <td>${emp.lname}</td>
                 <td>${monthly.Absences}</td>
                 <td>${monthly.Lates}</td>
                 <td>${monthly.Excuses}</td>
             </tr>`)
        $("#latetbl").append(`
             <tr>
                 <td>${getUserBy("id", emp.id).username}</td>
                 <td>${emp.fname}</td>
                 <td>${emp.lname}</td>
                 <td>${monthly.Lates}</td>
             </tr>`)
        $("#exctbl").append(`
             <tr>
                 <td>${getUserBy("id", emp.id).username}</td>
                 <td>${emp.fname}</td>
                 <td>${emp.lname}</td>
                 <td>${monthly.Excuses}</td>
             </tr>`)
    }
});