"use strict";
var floor = Math.floor;
var ceil = Math.ceil;
var sin = Math.sin;
var cos = Math.cos;
function random(min, max) {
    return floor(Math.random() * (floor(max) - ceil(min) + 1) + ceil(min));
}
class Time {
    static get now() {
        return Date.now();
    }
    static get hour() {
        return new Date().getHours();
    }
    static get minute() {
        return new Date().getMinutes();
    }
    static get second() {
        return new Date().getSeconds();
    }
    static keepNumberAlways2Digs(digit) {
        if (digit.toString().length == 1) {
            return '0' + digit.toString();
        }
        else {
            return digit;
        }
    }
    static get timeString() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = "";
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = date.getMinutes() < 10 ? '0' + minutes : date.getMinutes().toString();
        var strTime = this.keepNumberAlways2Digs(hours) + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    static get CURRENT_DAY() {
        return new Date().getDay() + 1;
    }
    static get CURRENT_DATE() {
        return new Date().getDate();
    }
    static get CURRENT_MONTH() {
        return new Date().getMonth() + 1;
    }
    static get CURRENT_YEAR() {
        return new Date().getFullYear();
    }
    static dateIs(month, day) {
        return this.CURRENT_MONTH == month && this.CURRENT_DATE == day;
    }
    static milliToTimeString(duration) {
        this.checkIfANumber(duration);
        var seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours = hours - 11 - 6;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds;
    }
    static milliToMinuteString(duration) {
        this.checkIfANumber(duration);
        var timeStr = this.milliToTimeString(duration);
        return timeStr.substring(timeStr.indexOf(":") + 1, timeStr.length);
    }
    static getTimeStamp(secs) {
        this.checkIfANumber(secs);
        return (this.now + (secs * 1000));
    }
    static checkIfANumber(n) {
        return true;
    }
    static convert24HrTo12Hr(hr) {
        this.checkIfANumber(hr);
        if (hr < 12) {
            return hr;
        }
        else {
            return hr - 12;
        }
    }
}
