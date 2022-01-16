import { getEmpBy } from "./SystemFunctions.js"

let currentemp = getEmpBy("id", localStorage.getItem("currentuserid"));

$(function () {
    if(currentemp)
    {
        $("header p").html("Welcome again, " + currentemp.fname + "!");
    }
    
});