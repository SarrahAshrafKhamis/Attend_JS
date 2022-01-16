import { users } from "./SystemArrays.js"
import { getEmpBy, getUserBy, getMonthlyReport } from "./SystemFunctions.js"

$(function () {
    let settings = JSON.parse(localStorage.getItem("settings"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].username != "skhamis") {
            $("#eid").append($("<option />").val(users[i].username).text(users[i].username));
        }
    }
    $("#eid").change(function () {
        let un = this.value;
        let emp = getEmpBy("id", getUserBy("username", un).id);
        let res = getMonthlyReport(new Date(), emp.id);
        let minusabs = parseInt(settings.absencepoint) * res.Absences;
        let points, percent;
        if (res.Lates == '-') {
            points = 0;
            percent = 0;
        }
        else {
            let latemints = Math.floor(res.Lates / parseInt(settings.latemins));
            let minuslate = parseInt(settings.latepoint) * latemints;
            points = parseInt(settings.totalpoints) - (minusabs + minuslate);
            if (points < 0) {
                points = 0;
            }
            percent = Math.ceil((points / parseInt(settings.totalpoints)) * 100);
        }
        $("#efname").html(emp.fname);
        $("#elname").html(emp.lname);
        $("#epoints").html(points);
        $("#total").html(settings.totalpoints);
        $("#percent").html(`${percent} %`);
    });
});