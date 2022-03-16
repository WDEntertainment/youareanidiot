/*
    helper functions
*/

var floor = Math.floor;
var ceil = Math.ceil;
var sin = Math.sin;
var cos = Math.cos;

function random(min:number, max:number):number {
    return floor(Math.random() * (floor(max) - ceil(min) + 1) + ceil(min)); //The maximum is inclusive and the minimum is inclusive
}

type TimeString = number | string;

/****************
 * The Time Class
 * 
 * This class is ONLY FOR STATIC USE
 * 
 * If you create a new instance of this
 * you will not find any functions.
 * 
 * All of the class is FULLY static so
 * you can access it without having to make
 * a new instance of it.
 * 
 *****************/

class Time {

    static get now () {
        return Date.now();
    }

    static get hour () {
        return new Date().getHours();
    }

    static get minute () {
        return new Date().getMinutes();
    }

    static get second () {
        return new Date().getSeconds();
    }

    static keepNumberAlways2Digs(digit:number) {
        //this.checkIfANumber(digit);
        if (digit.toString().length == 1) {
            return '0' + digit.toString();
        } else {
            return digit;
        }
    }

    static get timeString () {
        var date = new Date();
        var hours = date.getHours();
        var minutes = "";
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = date.getMinutes() < 10 ? '0' + minutes : date.getMinutes().toString();
        var strTime = this.keepNumberAlways2Digs(hours) + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    static get CURRENT_DAY () {
        return new Date().getDay() + 1;
    }

    static get CURRENT_DATE () {
        return new Date().getDate();
    }

    static get CURRENT_MONTH () {
        return new Date().getMonth() + 1;
    }

    static get CURRENT_YEAR () {
        return new Date().getFullYear();
    }

    static dateIs(month:number, day:number) {
        return this.CURRENT_MONTH == month && this.CURRENT_DATE == day;
    }

    static milliToTimeString (duration:number) {
        this.checkIfANumber(duration);
        var seconds:TimeString = Math.floor((duration / 1000) % 60),
            minutes:TimeString = Math.floor((duration / (1000 * 60)) % 60),
            hours:TimeString = Math.floor((duration / (1000 * 60 * 60)) % 24);
        
        hours = hours - 11 - 6
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        return hours + ":" + minutes + ":" + seconds;
    }

    static milliToMinuteString (duration:number) {
        this.checkIfANumber(duration);
        var timeStr = this.milliToTimeString(duration);
        return timeStr.substring(timeStr.indexOf(":") + 1, timeStr.length);
    }

    static getTimeStamp (secs:number) {
        this.checkIfANumber(secs);
        return (this.now + (secs * 1000));
    }

    static checkIfANumber (n:number) {
        return true;
    }

    static convert24HrTo12Hr (hr:number) {
        this.checkIfANumber(hr);
        if (hr < 12) {
            return hr;
        } else {
            return hr - 12;
        }
    }

}