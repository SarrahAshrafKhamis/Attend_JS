import { getCurrentEmp, getMonthlyReport } from "./SystemFunctions.js"

$(function () {
    let now = new Date();
    getMonthlyReport(now, getCurrentEmp().id, $("#monthtbl"));
});