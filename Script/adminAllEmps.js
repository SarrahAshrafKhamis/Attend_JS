import {employees} from "./SystemArrays.js"
import {getUserBy} from "./SystemFunctions.js"
$(function(){
    for (let i = 0; i < employees.length; i++) {
        $("#allemp").append(`
        <tr>
            <td>${getUserBy("id",employees[i].id).username}</td>
            <td>${employees[i].fname}</td>
            <td>${employees[i].lname}</td>
            <td>${employees[i].address}</td>
            <td>${employees[i].email}</td>
            <td>${employees[i].age}</td>
        </tr>`);
    }
});