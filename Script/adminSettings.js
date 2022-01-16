$(function () {
    let settings = {};
    if (localStorage.getItem("settings")) {
        settings = JSON.parse(localStorage.getItem("settings"));
    }
    else {
        settings = {
            "intime": $("#intime").val(),
            "outtime": $("#outtime").val(),
            "weekend": Array.from(document.getElementById("weekend").selectedOptions).map(option => option.value),
            "totalpoints": $("#totalpoints").val(),
            "absencepoint": $("#abspoint").val(),
            "latemins": $("#latemins").val(),
            "latepoint": $("#latepoint").val()
        }
        localStorage.setItem("settings", JSON.stringify(settings));
    }
    $("#intime").val(settings.intime);
    $("#outtime").val(settings.outtime);
    (Array.from(document.getElementById("weekend").children)).forEach(function (e) {
        if ((settings.weekend).includes(e.value)) {
            e.selected = "selected";
        }
    })
    $("#totalpoints").val(settings.totalpoints);
    $("#abspoint").val(settings.absencepoint);
    $("#latemins").val(settings.latemins);
    $("#latepoint").val(settings.latepoint);
    $(".set").change(function () {
        if ($("#outtime").val() < $("#intime").val()) {
            alert("Work hours end must be after work hours start");
            $("#intime").val(settings.intime);
            $("#outtime").val(settings.outtime);
        }
        else if ((parseInt($("#totalpoints").val()) <= parseInt($("#latepoint").val())) || (parseInt($("#totalpoints").val()) <= parseInt($("#abspoint").val()))) {
            alert("total points must be greater than late minus points and absence minus points");
            $("#totalpoints").val(settings.totalpoints);
            $("#abspoint").val(settings.absencepoint);
            $("#latepoint").val(settings.latepoint);
        }
        else if (parseInt($(this).val()) < 0) {
            alert("number must be greater than 0");
            $("#totalpoints").val(settings.totalpoints);
            $("#abspoint").val(settings.absencepoint);
            $("#latemins").val(settings.latemins);
            $("#latepoint").val(settings.latepoint);
        }
        else {
            settings = {
                "intime": $("#intime").val(),
                "outtime": $("#outtime").val(),
                "weekend": Array.from(document.getElementById("weekend").selectedOptions).map(option => option.value),
                "totalpoints": $("#totalpoints").val(),
                "absencepoint": $("#abspoint").val(),
                "latemins": $("#latemins").val(),
                "latepoint": $("#latepoint").val()
            }
            localStorage.setItem("settings", JSON.stringify(settings));
        }
    });
});