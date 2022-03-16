declare var floor: (x: number) => number;
declare var ceil: (x: number) => number;
declare var sin: (x: number) => number;
declare var cos: (x: number) => number;
declare function random(min: number, max: number): number;
declare type TimeString = number | string;
declare class Time {
    static get now(): number;
    static get hour(): number;
    static get minute(): number;
    static get second(): number;
    static keepNumberAlways2Digs(digit: number): string | number;
    static get timeString(): string;
    static get CURRENT_DAY(): number;
    static get CURRENT_DATE(): number;
    static get CURRENT_MONTH(): number;
    static get CURRENT_YEAR(): number;
    static dateIs(month: number, day: number): boolean;
    static milliToTimeString(duration: number): string;
    static milliToMinuteString(duration: number): string;
    static getTimeStamp(secs: number): number;
    static checkIfANumber(n: number): boolean;
    static convert24HrTo12Hr(hr: number): number;
}
