import {Employee,User,Attendance,MissedTime} from "./SystemClasses.js"

let fnames=["sara","ahmad","yusuf","sama","mona"]
let lnames=["ashraf","magdy","hesham","ali","khamis"]
let adds=["tanta","mansoura","alex","cairo","giza"]
let emails=["sarashraf@ecallen.com","ahmadmagdy@ecallen.com", "yusufhesham@ecallen.com", "samaali@ecallen.com", "monakhamis@ecallen.com"]
let ages=[22,30,25,33,40]
let flags=[true,false,false,true,false]
let dates=["1/13/2022","1/12/2022","1/11/2022","1/10/2022","1/9/2022"]
let inh=[8,8,9,9,8]
let inm=[30,45,0,10,50]
let outh=[15,14,15,15,15]
let outm=[10,50,30,20,0]
let diff=[20,55,30,50,50]
let f=[true,true,false,true,true]

let EMPLOYEES=[];
let USERS=[];
let ATTENDS=[];
let MISSEDTIMES=[];

USERS.push({id: "1",
    isAdmin: true,
    isConfirmed: true,
    isSecurity: false,
    password: "123",
    username: "skhamis"})
for (let i = 0; i < 5; i++) {
    let emp=new Employee(fnames[i],lnames[i],adds[i],emails[i],ages[i]);
    let user=new User(emp.id,false,flags[i],flags[i]);
    let att=new Attendance(emp.id,dates[i],inh[i],inm[i],outh[i],outm[i]);
    let mst=new MissedTime(emp.id,dates[i],diff[i],flags[i],f[i]);
    EMPLOYEES.push(emp);
    USERS.push(user);
    ATTENDS.push(att);
    MISSEDTIMES.push(mst);
}

export {EMPLOYEES,USERS,ATTENDS,MISSEDTIMES}
