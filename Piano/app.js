var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var volume = audioCtx.createGain();

const baseNote = 440.00;
const noteDegrees = {
    "C"     : 3,
    "C#/Db" : 4,
    "D"     : 5,
    "D#/Eb" : 6,
    "E"     : 7,
    "F"     : 8,
    "F#/Gb" : 9,
    "G"     : 10,
    "G#/Ab" : 11,
    "A"     : 12,
    "A#/Bb" : 13,
    "B"     : 14,
}

class Note {
    constructor(noteDegree, octave = 4) {
        this.frequency = getFrequency(noteDegree, octave);
        this.oscillator = audioCtx.createOscillator();
        this.oscillator.type = "square";
        this.oscillator.frequency.value = this.frequency;
        this.oscillator.start();
    }
}

volume.connect(audioCtx.destination);
volume.gain.value = 0.1;

var oscillators = {};

function getFrequency(note, octave) {
    var octaveScalar = 2 ** (octave - 4);
    var noteFrequency = baseNote * 2 ** (noteDegrees[note] / 12);
    return octaveScalar * noteFrequency;
}

function addNote(note, octave = 4) {
    var elem = document.getElementById("Synth");
    var tag = document.createElement("button");

    oscillators[note + octave] = new Note(note, octave);

    tag.textContent = note + octave;
    tag.setAttribute("onmousedown", `play("${note}", ${octave});`);
    tag.setAttribute("onmouseleave", `stop("${note}", ${octave});`);
    tag.setAttribute("onmouseup", `stop("${note}", ${octave});`);
    if (note.length > 1) {
        tag.classList.add("accidental");
    } else {
        tag.classList.add("natural");
    }
    elem.appendChild(tag);
}

function play(note, octave = 4) {
    audioCtx.resume();
    oscillators[note + octave].oscillator.connect(volume);
}

function stop(note, octave = 4) {
    oscillators[note + octave].oscillator.disconnect();
}

window.onload = () =>
{
    addNote("C", 4);
    addNote("C#/Db", 4);
    addNote("D", 4);
    addNote("D#/Eb", 4);
    addNote("E", 4);
    addNote("F", 4);
    addNote("F#/Gb", 4);
    addNote("G", 4);
    addNote("G#/Ab", 4);
    addNote("A", 4);
    addNote("A#/Bb", 4);
    addNote("B", 4);
}