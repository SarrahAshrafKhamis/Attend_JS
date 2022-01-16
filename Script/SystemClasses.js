class Employee
{
    constructor(fname, lname, address, email, age)
    {
        this.id=Math.random().toString(16).slice(2);
        this.fname=fname;
        this.lname=lname;
        this.address=address;
        this.email=email;
        this.age=age;
    }
}

class User
{
    constructor(id, username, password, isAdmin, isSecurity, isConfirmed)
    {
        this.id=id;
        this.username=username;
        this.password=password;
        this.isAdmin=isAdmin;
        this.isSecurity=isSecurity;
        this.isConfirmed=isConfirmed;
    }
}

class Attendance
{
    constructor(empid,date,signinH, signinM, signoutH, signoutM)
    {
        this.empid=empid;
        this.date=date;
        this.signinH=signinH;
        this.signinM=signinM;
        this.signoutH=signoutH;
        this.signoutM=signoutM;
    }
}

class MissedTime
{
    constructor(empid,date,minutes,isLate,isExcuse)
    {
        this.empid=empid;
        this.date=date;
        this.minutes=minutes;
        this.isLate=isLate;
        this.isExcuse=isExcuse;
    }
}

export {Employee,User, Attendance, MissedTime};