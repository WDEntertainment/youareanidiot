// @ts-ignore
addFunctionToLoop(function(){
    window.resizeTo(220, 120)
});

var isInverted = false;

function invert () {
    var message = document.getElementById("message");
    try {
        if (isInverted) {
            // @ts-ignore
            message.style.color = "black";
            // @ts-ignore
            document.querySelector("body").style.backgroundColor = "white";
        } else {
            // @ts-ignore
            message.style.color = "white";
            // @ts-ignore
            document.querySelector("body").style.backgroundColor = "black";
        }
    } catch (e) {};
    isInverted = !isInverted
}

setInterval(invert, 200);