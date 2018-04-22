function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var e = randomChoice(['minor','major']);
var start_note = randomChoice(['C', 'E', 'F', 'D', 'G']);
console.log(e, start_note);
// Синтезаторы

var sineSynthLeft = new Tone.Synth({
    'oscillator': {
        'type': 'sine'
    },
    'envelope': {
        'attack': 1,
        'decay': 0.0,
        'sustain': 1,
        'release': 1
    }
});

var triangleSynthLeft = new Tone.Synth({
    'oscillator': {
        'type': 'triangle'
    },
    'envelope': {
        'attack': 1,
        'decay': 0.0,
        'sustain': 1,
        'release': 1
    }
});

var squareSynthLeft = new Tone.Synth({
    'oscillator': {
        'type': 'sawtooth'
    },
    'envelope': {
        'attack': 1,
        'decay': 0.0,
        'sustain': 1,
        'release': 1
    }
});

var sineSynthRight = new Tone.Synth({
    'oscillator': {
        'type': 'sine'
    },
    'envelope': {
        'attack': 1,
        'decay': 0.0,
        'sustain': 1,
        'release': 1
    }
});

var triangleSynthRight = new Tone.Synth({
    'oscillator': {
        'type': 'triangle'
    },
    'envelope': {
        'attack': 1,
        'decay': 0.0,
        'sustain': 1,
        'release': 1
    }
});

var squareSynthRight = new Tone.Synth({
    'oscillator': {
        'type': 'sawtooth'
    },
    'envelope': {
        'attack': 1,
        'decay': 0.0,
        'sustain': 1,
        'release': 1
    }
});

// Паттерны
var bass_notes = Tonal.scale(e).map(Tonal.transpose(start_note+'2'))
var middle_notes = Tonal.scale(e).map(Tonal.transpose(start_note+'3'))
var color_notes = Tonal.scale(e).map(Tonal.transpose(start_note+'4'))


var bassPattern1 = new Tone.Pattern(function (time, note) {
    sineSynthLeft.triggerAttackRelease(note, '1n', time);
}, bass_notes);

var bassPattern2 = new Tone.Pattern(function (time, note) {
    squareSynthRight.triggerAttackRelease(note, '1n', time);
}, bass_notes);

var middleChords1 = new Tone.Pattern(function (time, note) {
    triangleSynthLeft.triggerAttackRelease(note, '1n', time);
}, middle_notes);

var middleChords2 = new Tone.Pattern(function (time, note) {
    sineSynthRight.triggerAttackRelease(note, '1n', time);
}, middle_notes);

var color1 = new Tone.Pattern(function (time, note) {
    triangleSynthRight.triggerAttackRelease(note, '1n', time);
}, color_notes);

var color2 = new Tone.Pattern(function (time, note) {
    squareSynthLeft.triggerAttackRelease(note, '1n', time);
}, color_notes);

var color1 = new Tone.Pattern(function (time, note) {
    triangleSynthRight.triggerAttackRelease(note, '1n', time);
}, color_notes);

var color2 = new Tone.Pattern(function (time, note) {
    squareSynthLeft.triggerAttackRelease(note, '1n', time);
}, color_notes);

bassPattern1.pattern = 'random';
bassPattern1.humanize = true;
bassPattern1.start(0);

bassPattern2.pattern = 'random';
bassPattern2.humanize = true;
bassPattern2.start(0);

middleChords1.pattern = 'random';
middleChords1.humanize = true;
middleChords1.start(0);

middleChords2.pattern = 'random';
middleChords2.humanize = true;
middleChords2.start(0);

color1.pattern = 'random';
color1.humanize = true;
color1.start(0);

color2.pattern = 'random';
color2.humanize = true;
color2.start(0);

var leftPanner = new Tone.Panner(-0.5);
var rightPanner = new Tone.Panner(0.5);
var echo2 = new Tone.FeedbackDelay('8n', 0.7);
var reverb2 = new Tone.Freeverb();
reverb2.dampening.value = 200;
reverb2.roomSize.value = 0.4;
var comp = new Tone.Compressor(-2, 3);

sineSynthLeft.connect(leftPanner);
triangleSynthLeft.connect(leftPanner);
squareSynthLeft.connect(leftPanner);
sineSynthRight.connect(rightPanner);
triangleSynthRight.connect(rightPanner);
squareSynthRight.connect(rightPanner);

leftPanner.connect(echo2);
rightPanner.connect(echo2);

echo2.connect(reverb2);

reverb2.connect(comp);

var masterVolume = new Tone.Volume(-20);

comp.connect(masterVolume);
masterVolume.toMaster();

Tone.Transport.bpm.value = 10;
Tone.Transport.start();
