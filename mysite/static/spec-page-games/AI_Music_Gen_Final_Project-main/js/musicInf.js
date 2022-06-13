var synth = new Tone.PolySynth().toMaster();

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

class midiBox {
    note = 0;
    time = 0;
    pressed = false;

    noteText = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    nDiff = 0;
    noffest = parseInt(document.getElementById("octave").value);
    ct = parseInt(document.getElementById('chord_type').value);

    constructor(_note, _time) {
        this.note = _note;
        this.time = _time;
        this.setMusicInfo(parseInt(document.getElementById('key').value));
        this.ct = parseInt(document.getElementById('chord_type').value);
    }

    setMusicInfo(_nDiff) {
        this.noteText = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.nDiff = _nDiff;
        for (var i = 0; i < this.nDiff; i++) this.noteText.push(this.noteText.shift());
        this.noffset = (parseInt(document.getElementById("octave").value));
    }
    
    getNote() {
        var oct = this.noffset + Math.floor((this.note + this.nDiff) / 12);
        return this.noteText[this.note % 12] + oct.toString();
    }
}

/*
 * Chord Types is a reference to the type of chord the song is using at the time, either major minor, or the diminished variations... 
 * The first part of each chord type is all the non-accidental keys within the chord except for the roots and fifths.
 * The second part is the fifth. I include this information only for the input section so that when you are entering midi, it
 * Feels more like one of those online midi editors. Otherwise, I can just put the two lists together and choose notes or I could
 * Use the 5th notes to let the generator know what a good note to land on would be.
 */
const chordTypes = [
    [
        // major
        [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24],
        [7, 19]
    ],
    [
        // minor
        [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24],
        [7, 19]
    ],
    [
        // Diminished Whole-Half
        [0, 1, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24],
        [6, 18]
    ],
    [   
        // Diminished Half-Whole
        [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 21, 23, 24],
        [6, 18]
    ],
];

val2steps = function(val, ct) {
    return chordTypes[ct][0][val - 1];
}

step2val = function(step, ct) {
    return chordTypes[ct][0].indexOf(step) + 1; 
}

/*
    Major
    Minor
    Diminished
    Major 7th
    Minor 7th
    Dominant 7th
    suspended 2nd
    suspended 4th
    augmented
*/

const chords_check = [
    "",
    "0 4 7",
    "0 3 7",
    "0 3 6",
    "0 4 7 11",
    "0 3 7 10",
    "0 4 7 10",
    "0 2 7",
    "0 5 7",
    "0 4 8"
];

/*

    MAJOR: 0, 3, 5, 7, 8
    MINOR: 1, 2, 4, 6

*/



const maj_min = [
    [0, 0, 0, 3, 3, 5, 7, 8],
    [1, 1, 1, 2, 4, 4, 6]
];

const chords = [
    [0, 4, 7],      // major             0
    [0, 3, 7],      // minor             1
    [0, 3, 6],      // diminished        2
    [0, 4, 7, 11],  // major7th          3
    [0, 3, 7, 10],  // minor7th          4
    [0, 4, 7, 10],  // dominant7th       5
    [0, 2, 7],      // suspended2nd      6
    [0, 5, 7],      // suspended4th      7
    [0, 4, 8]       // augmented         8
];

list2ct = function(KEY, notes) {
    var res = "";
    var rootDiff = notes[0];
    for(var i in notes) res += (notes[i] - rootDiff) + " ";
    var i = chords_check.indexOf(res.trim()) - 1;

    // returning [whether we want a major or minor type chord, the root note]
    if(maj_min[1].includes(i))
        return [1, rootDiff];
    return [0, (rootDiff + KEY % 12)];
}

prog2keys = function(KEY, prg) {
    var res = [];
    for(var p in prg) {
        var notes = [];
        var maj = prg[p] < 0 ? 1 : 0;
        notes = chords[choice(maj_min[maj])];
        for(var n in notes) notes[n] += KEY + val2steps(Math.abs(prg[p]), maj);
        res.push(notes);
    }
    return res;
}

const chordProgressions = [
    [ // major chord progressions
        [1, 4, 5],
        [1, -6, 4, 5],
        [1, -6, -2, 5],
        [1, 5, -6, 4],
        [1, 5, -6, 5],
        [1, -3, 4, 5],
        [1, 4, 1, 5],
        [1, 4, -2, 5]
    ],
    [ // minor chord progressions
        [-1, 6, 7],
        [-1, -4, 7],
        [-1, -4, -5],
        [-1, 6, 3, 7],
        [-2, -5, -1],
        [-1, -4, -5, -1],
        [-1, 7, 6, 7],
        [-1, -4, -1]
    ]
];

choice = function(arry) {
    return arry[Math.floor(Math.random() * arry.length)];
}

function setSoundType(type) {
    synth.set({
        volume: -5,
        oscillator : {
            type: type
        },
        envelope : {
            attack : 0.1,
            decay : 0.2,
            sustain : 0.5,
            release : 0.8
        }
    });
}
setSoundType("triangle");
/*
 * Plays audio from a source of midiBoxes using Tone.js... This is my weird way out and my version of
 * a midi player for the time being. Maybe not the best thing, but it does work.
 */
AUDIO_PLAYING = false;
playMidi = async function(notes, BPM = 120) {
    if(!AUDIO_PLAYING) {
        AUDIO_PLAYING = true;
        var amt = document.getElementById('note_length').value;
        for (var b = 0; b < parseInt(amt); b++) {
            var N = [];
            for (var box in notes)
                if (notes[box].time === b && notes[box].pressed)
                    N.push(notes[box].getNote());
            for (var n in N)
                synth.triggerAttackRelease(N[n], amt.toString() + "n");
            await sleep((60000 / BPM) / (parseInt(amt) / 4));
        }
    }
    AUDIO_PLAYING = false;
}