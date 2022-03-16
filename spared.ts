var ctx = new AudioContext();

type AudBuf = AudioBuffer | null
type SourceNode = AudioBufferSourceNode | AudioScheduledSourceNode | null;

var currentlyPlaying:SourceNode[] = [];

var buffer:AudBuf = null;
var source:SourceNode = null;

// lets do the classic swap buffers!
var playing:SourceNode = null;
var making:SourceNode = null;
var current:SourceNode = null;

// audio location, depends on the month and the date
var audLoc:string = "gotmilk.mp3";

if (Time.dateIs(3, 14)) {
    audLoc = "train.mp3";
}

if (Time.CURRENT_MONTH == 12) {
    audLoc = "snwo.mp3";
} else if (Time.CURRENT_MONTH == 3) {
    audLoc = "playtime.wav" || "train.mp3";
}

function load() {
    var req = new XMLHttpRequest();
    req.open("GET", window.location.origin + "/assets/" + audLoc);
    req.responseType = "arraybuffer";
    req.onload = function () {
        ctx.decodeAudioData(req.response, function(b) {
            buffer = b;
        });
    }
    req.send();
};

load();

function grabSource () {
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    if (random(1, 10) == 1) {
        src.loop = true;
    }
    src.connect(ctx.destination);
    return src;
};

function removeFromPlaying (aSourceNode:SourceNode) {
    currentlyPlaying.splice(currentlyPlaying.indexOf(aSourceNode), 1);
};

function stopAll () {
    currentlyPlaying.forEach((playing) => {
        playing?.stop();
        removeFromPlaying(playing);
    });
};

function swapBuffers () {
    //playing?.disconnect(ctx.destination); // Unhook it.
    playing = making; // The one buffer that WAS in the making is now finished.
    // @ts-ignore
    
    currentlyPlaying.push(playing);
    // Make a new buffer to be played later
    making = grabSource();
    making.onended = function () {
        removeFromPlaying(this);
    };
};

function play () {
    swapBuffers(); // Swap 'em
    playing?.start();
    if (currentlyPlaying[0] == null) {
        currentlyPlaying.splice(0, 1);
    }
};