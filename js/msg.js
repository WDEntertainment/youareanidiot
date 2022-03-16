"use strict";
addFunctionToLoop(function () {
    window.resizeTo(220, 120);
});
var isInverted = false;
function invert() {
    var message = document.getElementById("message");
    try {
        if (isInverted) {
            message.style.color = "black";
            document.querySelector("body").style.backgroundColor = "white";
        }
        else {
            message.style.color = "white";
            document.querySelector("body").style.backgroundColor = "black";
        }
    }
    catch (e) { }
    ;
    isInverted = !isInverted;
}
setInterval(invert, 200);
