"use strict";
var ctx = new AudioContext();
var currentlyPlaying = [];
var buffer = null;
var source = null;
var playing = null;
var making = null;
var current = null;
var audLoc = "gotmilk.mp3";
if (Time.dateIs(3, 14)) {
    audLoc = "train.mp3";
}
if (Time.CURRENT_MONTH == 12) {
    audLoc = "snwo.mp3";
}
else if (Time.CURRENT_MONTH == 3) {
    audLoc = "playtime.wav" || "train.mp3";
}
function load() {
    var req = new XMLHttpRequest();
    req.open("GET", window.location.origin + "/assets/" + audLoc);
    req.responseType = "arraybuffer";
    req.onload = function () {
        ctx.decodeAudioData(req.response, function (b) {
            buffer = b;
        });
    };
    req.send();
}
;
load();
function grabSource() {
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    if (random(1, 10) == 1) {
        src.loop = true;
    }
    src.connect(ctx.destination);
    return src;
}
;
function removeFromPlaying(aSourceNode) {
    currentlyPlaying.splice(currentlyPlaying.indexOf(aSourceNode), 1);
}
;
function stopAll() {
    currentlyPlaying.forEach((playing) => {
        playing?.stop();
        removeFromPlaying(playing);
    });
}
;
function swapBuffers() {
    playing = making;
    currentlyPlaying.push(playing);
    making = grabSource();
    making.onended = function () {
        removeFromPlaying(this);
    };
}
;
function play() {
    swapBuffers();
    playing?.start();
    if (currentlyPlaying[0] == null) {
        currentlyPlaying.splice(0, 1);
    }
}
;
