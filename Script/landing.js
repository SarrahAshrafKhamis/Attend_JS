$(function () {
    $(".vtablinks").click(function (e) {
        $(".vtabcontent").css("display", "none");
        $(".vtablinks").removeClass("active");
        $(`#${e.target.innerText.replace(/\s/g, '')}`).css("display", "block");
        $(e.target).addClass("active");
    })
    $("#vtdefaultOpen").click();

    $(".htablinks").click(function (e) {
        $(".htabcontent").css("display", "none");
        $(".htablinks").removeClass("active");
        $(`#${e.target.innerText.replace(/\s/g, '')}`).css("display", "flex");
        $(e.target).addClass("active");
    })
    $("#htdefaultOpen").click();

    $(".Register").load("regForm.html")
    $("#Login").load("loginForm.html")
    $("#Attendance").load("attendForm.html")

    $("#mainbtn").click(function () {
        $("#myDropdown").toggleClass("show");
    });
    $(".dropdown-content").click(function (e) {
        $("#mainbtn").html($(e.target).html());
    })

    $(window).click(function (e) {
        if (!e.target.matches('.dropbtn')) {
            $(".dropdown-content").removeClass("show")
        }
    });
})