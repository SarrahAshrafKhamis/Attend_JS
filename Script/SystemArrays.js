import {User} from "./SystemClasses.js"
let employees;
if(JSON.parse(localStorage.getItem("employees")))
{
    employees = JSON.parse(localStorage.getItem("employees"));
}
else
{
    employees=[];
}

let users;
if(JSON.parse(localStorage.getItem("users")))
{
    users = JSON.parse(localStorage.getItem("users"));
}
else
{
    users=[];
    let adminUser=new User(1,"skhamis",123,true,false,true);
    users.push(adminUser);
    localStorage.setItem("users",JSON.stringify(users))
}


let attends;
if(JSON.parse(localStorage.getItem("attends")))
{
    attends = JSON.parse(localStorage.getItem("attends"));
}
else
{
    attends=[];
}

let missedTimes;
if(JSON.parse(localStorage.getItem("missedtimes")))
{
    missedTimes = JSON.parse(localStorage.getItem("missedtimes"));
}
else
{
    missedTimes=[];
}

export {employees, users, attends, missedTimes}