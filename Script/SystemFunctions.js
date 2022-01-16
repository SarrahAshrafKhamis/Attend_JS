import { employees, users, attends, missedTimes } from "./SystemArrays.js"

function getEmpBy(key, val) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i][key] == val) {
            return employees[i];
        }
    }
}

function getUserBy(key, val) {
    for (let i = 0; i < users.length; i++) {
        if (users[i][key] == val) {
            return users[i];
        }
    }
}

function timeToString(h, m) {
    let p = (h < 12) ? "AM" : "PM";
    let x = h - 12;
    if (x < 10) {
        x = `0${x}`;
    }
    let y = m;
    if (y < 10) {
        y = `0${y}`;
    }
    return `${x}:${y} ${p}`;
}

function getCurrentUser() {
    return getUserBy("id", localStorage.getItem("currentuserid"));
}

function getCurrentEmp() {
    return getEmpBy("id", localStorage.getItem("currentuserid"));
}

function isWeekend(d) {
    let settings = JSON.parse(localStorage.getItem("settings"));
    if ((settings.weekend).includes(new Date(d).toLocaleDateString('en-US', { weekday: "long" }))) {
        return true;
    }
    return false;
}

function getDailyReport(d, id) {
    let status = "Attended";
    let _in, _out, latein, exin, lateout, exout;
    _in = _out = latein = exin = lateout = exout = "0";
    if (isWeekend(d)) {
        _in = _out = latein = exin = lateout = exout = "-";
        status = "Weekend"
    }
    else {
        let attended = false;
        for (let i = 0; i < attends.length; i++) {
            if (attends[i].empid == id && attends[i].date == d) {
                _in = timeToString(attends[i].signinH, attends[i].signinM);
                _out = timeToString(attends[i].signoutH, attends[i].signoutM);
                attended = true;
                let late = false;
                let lateobjs = [];
                for (let k = 0; k < missedTimes.length; k++) {
                    if (missedTimes[k].empid == id && missedTimes[k].date == d) {
                        late = true;
                        lateobjs.push(missedTimes[k]);
                    }
                }
                if (late) {
                    if (lateobjs.length == 1) {
                        if (lateobjs[0].isLate) {
                            latein = lateobjs[0].minutes;
                            if (lateobjs[0].isExcuse) {
                                exin = lateobjs[0].minutes;
                            }
                        }
                        else {
                            lateout = lateobjs[0].minutes;
                            if (lateobjs[0].isExcuse) {
                                exout = lateobjs[0].minutes;
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < 2; i++) {
                            if (lateobjs[i].isLate) {
                                latein = lateobjs[i].minutes;
                                if (lateobjs[i].isExcuse) {
                                    exin = lateobjs[i].minutes;
                                }
                            }
                            else {
                                lateout = lateobjs[i].minutes;
                                if (lateobjs[i].isExcuse) {
                                    exout = lateobjs[i].minutes;
                                }
                            }
                        }
                    }

                }

            }
        }
        if (!attended) {
            _in = _out = latein = exin = lateout = exout = "-";
            status = "Absent"
        }
    }
    let result = {
        "status": status,
        "in": _in,
        "latein": latein,
        "exin": exin,
        "out": _out,
        "lateout": lateout,
        "exout": exout
    }
    return result;
}

function getMonthlyReport(now, id, tbl) {
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let abs, lates, excs;
    abs = lates = excs = 0;
    for (let j = 1; j < day; j++) {
        let d = `${month}/${j}/${year}`;
        let dayrep = getDailyReport(d, id);

        if (dayrep.status == 'Absent') {
            abs++;
        }
        else if (dayrep.status == 'Weekend') {
            continue;
        }
        else {
            excs += parseInt(dayrep.exin) + parseInt(dayrep.exout);
            lates += parseInt(dayrep.latein) + parseInt(dayrep.lateout);
        }

        if (tbl) {
            $(tbl).append(`
             <tr>
                 <td>${d}</td>
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
    if (abs == day - 1) {
        lates = excs = "-";
    }
    else {
        lates -= excs;
    }
    let res = {
        "Absences": abs,
        "Lates": lates,
        "Excuses": excs
    }
    return res;
}

export { timeToString, getCurrentUser, getCurrentEmp, isWeekend, getDailyReport, getMonthlyReport, getEmpBy, getUserBy };