
let measures = [];
var base_measure = [];

class midiTimeSlice {
    t = 0; // What time the time slice belongs to for the measure
    notes = [];
    constructor(_t) {
        this.t = _t; // setting the id time for our time slice
        for(var i = 0; i < 25; i++) this.notes.push(new midiBox(i, this.t));
    }
}

class Measure {
    timeSlices = [];
    amtx = parseInt(document.getElementById("note_length").value);
    constructor() {
        this.timeSlices = [];
        for (var x = 0; x < this.amtx; x++)
            this.timeSlices.push(new midiTimeSlice(x));
    }
    getNotes() {
        var notes = [];
        for(var i in this.timeSlices)
            for(var j in this.timeSlices[i].notes)
                notes.push(this.timeSlices[i].notes[j]);
        return notes;
    }
}

var amtx = 8;

generate = function() {
    amtx = parseInt(document.getElementById("note_length").value);
    document.getElementById("genText").innerHTML = "<span style='border: 1px solid #000; background-color: #fff; padding-left: 5px; padding-right: 5px; padding-top: 2px; padding-bottom: 2px; color: red;'>Getting Ready...</span>";
    setupOut();
    document.getElementById("genText").innerHTML = "<span style='border: 1px solid #000; background-color: #fff; padding-left: 5px; padding-right: 5px; padding-top: 2px; padding-bottom: 2px; color: red;'>Try again...</span>";
    document.getElementById("genText").innerHTML = notTooRandom();
    document.getElementById("prev/downloadBtns").innerHTML = "<button id='preview_button' onclick='playGen(measures);'>Preview</button>";// <button>Download</button>"
}

setupOut = function() {
    measures = [];
    for(var i = 0; i < amtx; i++) 
        measures.push(new Measure());
    grabBaseMeasure();
}

grabBaseMeasure = function() {
    res = new Measure();
    for(var x in SKETCH.notes)
        res.timeSlices[SKETCH.notes[x].time].notes[SKETCH.notes[x].note].pressed = SKETCH.notes[x].pressed;
    base_measure = res;
    return res
}

playGen = async function(lst) {
    console.log(lst);
    if(document.getElementById("preview_button").innerHTML === "Preview") {
        document.getElementById("preview_button").innerHTML = "Wait";
        for(var i in lst) {
            await playMidi(lst[i].getNotes());
        }
    }
    document.getElementById("preview_button").innerHTML = "Preview";
}