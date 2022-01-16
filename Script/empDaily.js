import { getCurrentEmp, getDailyReport, isWeekend } from "./SystemFunctions.js"

$(function () {
    let d = new Date().toLocaleDateString();
    if (isWeekend(d)) {
        $("#empdaily").css("display", "none");
        $("#empdaily").parent().append(`<h2 style='text-align:center;'>It's the <i>Weekend!</i></h2>`);
    }
    else {
        let dayrep = getDailyReport(d, getCurrentEmp().id);
        $("#ddate").html(d);
        $("#dstatus").html(dayrep.status);
        if (dayrep.status == "Absent") {
            $(".dop").css("display", "none");
        }
        else {
            $("#dsignin").html(dayrep.in);
            $("#dlatesignin").html(dayrep.latein);
            $("#dexcusesiginin").html(dayrep.exin);
            if (dayrep.out.indexOf("-") != -1) {
                $(".opout").css("display", "none");
            }
            else {
                $("#dsignout").html(dayrep.out);
                $("#dearlysignout").html(dayrep.lateout);
                $("#dearlysignout").html(dayrep.exout);
            }
        }
    }

});