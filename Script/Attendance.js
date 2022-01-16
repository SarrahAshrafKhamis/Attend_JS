import { Attendance, MissedTime } from "./SystemClasses.js"
import { users, attends, missedTimes } from "./SystemArrays.js"
import { getCurrentUser, isWeekend } from "./SystemFunctions.js"

$(function () {
    let currentuser = getCurrentUser();
    if (!currentuser.isSecurity) {
        $(".security").css("display", "none");
    }
    else {
        let settings = JSON.parse(localStorage.getItem("settings"));
        let intime = settings.intime;
        let outtime = settings.outtime;
        let inH = parseInt(intime.substring(0, 2));
        let inM = parseInt(intime.substring(3));
        let outH = parseInt(outtime.substring(0, 2));
        let outM = parseInt(outtime.substring(3));

        function SignIn(time, id) {
            let nowdate = time.toLocaleDateString();
            let nowH = time.getHours();
            let nowM = time.getMinutes();
            let attend;
            if (nowH > outH || (nowH==outH && nowM > outM)) {
                alert("Work day has ended!")
            }
            else {
                if (nowH < inH || (nowH == inH && nowM < inM)) {
                    attend = new Attendance(id, nowdate, inH, inM, -1, -1);
                }
                else {
                    attend = new Attendance(id, nowdate, nowH, nowM, -1, -1);
                    if (nowH > inH || (nowH == inH && nowM > inM)) {
                        let lateM = Math.floor((time - new Date(time.getFullYear(), time.getMonth(), time.getDate(), inH, inM)) / 60000);

                        let confExcuse = confirm("Late attendance: Does this employee have an excuse?")

                        let late = new MissedTime(id, nowdate, lateM, true, confExcuse);
                        missedTimes.push(late);
                        localStorage.setItem("missedtimes", JSON.stringify(missedTimes));
                    }
                }
                attends.push(attend);
                localStorage.setItem("attends", JSON.stringify(attends));
                alert("Signed in!");
            }
        }

        function SignOut(time, id, i) {
            let nowdate = time.toLocaleDateString();
            let nowH = time.getHours();
            let nowM = time.getMinutes();
            if (nowH < outH || (nowH == outH && nowM < outM)) {
                let confEarlyOut = confirm("Early signout for this employee? -before 3:30-");
                if (confEarlyOut) {
                    attends[i].signoutH = nowH;
                    attends[i].signoutM = nowM;

                    let earlyM = Math.floor((new Date(time.getFullYear(), time.getMonth(), time.getDate(), outH, outM) - time) / 60000);

                    let confExcuse = confirm("Does this employee has an excuse?");

                    let earlyout = new MissedTime(id, nowdate, earlyM, false, confExcuse);

                    missedTimes.push(earlyout);
                    localStorage.setItem("missedtimes", JSON.stringify(missedTimes));
                    localStorage.setItem("attends", JSON.stringify(attends));
                }
            }
        }

        function autoSignOut() {
            let now = new Date();
            let timeToAutoOut = new Date(now.getFullYear(), now.getMonth(), now.getDate(), outH, outM) - now;
            if (timeToAutoOut < 0) {
                timeToAutoOut == 0;
            }
            setTimeout(function () {
                for (let i = 0; i < attends.length; i++) {
                    if (attends[i].signoutH == -1) {
                        attends[i].signoutH = outH;
                        attends[i].signoutM = outM;
                        localStorage.setItem("attends", JSON.stringify(attends))
                    }
                }
            }, timeToAutoOut);
        }
        autoSignOut();

        let attendBtn = $("#attend");
        let username = $("#username");

        function isValidUsername(un) {
            return !(un == "");
        }

        function validateUsername() {
            if (isValidUsername(username.val())) {
                $("#usernameerror").css("display", "none");
            }
            else {
                $("#usernameerror").css("display", "block");
            }
        }

        username.blur(validateUsername);

        attendBtn.click(function () {
            if (isWeekend(new Date())) {
                alert("it's the weekend!");
            }
            else {
                let isRegistered = false;
                let user;
                for (let i = 0; i < users.length; i++) {
                    if (username.val() == users[i].username) {
                        isRegistered = true;
                        user = users[i];
                        break;
                    }
                }
                if (isRegistered) {
                    let now = new Date();
                    let nowdate = now.toLocaleDateString();
                    if (attends.length == 0) {
                        SignIn(now, user.id);
                    }
                    else {
                        let signedin = false;
                        for (let i = 0; i < attends.length; i++) {
                            if (attends[i].date == nowdate && attends[i].empid == user.id) {
                                signedin = true;
                                if (attends[i].signoutH == -1) {
                                    SignOut(now, user.id, i);
                                }
                                else {
                                    alert("already signed out!");
                                }
                            }
                        }
                        if (!signedin) {
                            SignIn(now, user.id);
                        }
                    }
                }
                else {
                    alert("Username does not exist!");
                }
                username.val("");
            }

        });
    }
});