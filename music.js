function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var e = randomChoice(['minor','major']);
var start_note = randomChoice(['C', 'E', 'F', 'D', 'G']);
console.log(e, start_note);

var samples = {
	"A#4": "chorus-female-a%234.wav",
	"A#5": "chorus-female-a%235.wav",
	"A4": "chorus-female-a4.wav",
	"A5": "chorus-female-a5.wav",
	"B4": "chorus-female-b4.wav",
	"B5": "chorus-female-b5.wav",
	"C#5": "chorus-female-c%235.wav",
	"C5": "chorus-female-c5.wav",
	"C6": "chorus-female-c6.wav",
	"D#5": "chorus-female-d%235.wav",
	"D5": "chorus-female-d5.wav",
	"E5": "chorus-female-e5.wav",
	"F#5": "chorus-female-f%235.wav",
	"F5": "chorus-female-f5.wav",
	"G#4": "chorus-female-g%234.wav",
	"G#5": "chorus-female-g%235.wav",
	"G4": "chorus-female-g4.wav",
	"G5": "chorus-female-g5.wav",
	"A#2": "chorus-male-a%232.wav",
	"A#3": "chorus-male-a%233.wav",
	"A2": "chorus-male-a2.wav",
	"A3": "chorus-male-a3.wav",
	"B2": "chorus-male-b2.wav",
	"B3": "chorus-male-b3.wav",
	"C#3": "chorus-male-c%233.wav",
	"C#4": "chorus-male-c%234.wav",
	"C3": "chorus-male-c3.wav",
	"C4": "chorus-male-c4.wav",
	"D#3": "chorus-male-d%233.wav",
	"D#4": "chorus-male-d%234.wav",
	"D3": "chorus-male-d3.wav",
	"D4": "chorus-male-d4.wav",
	"E3": "chorus-male-e3.wav",
	"E4": "chorus-male-e4.wav",
	"F#3": "chorus-male-f%233.wav",
	"F#4": "chorus-male-f%234.wav",
	"F3": "chorus-male-f3.wav",
	"F4": "chorus-male-f4.wav",
	"G#2": "chorus-male-g%232.wav",
	"G#3": "chorus-male-g%233.wav",
	"G2": "chorus-male-g2.wav",
	"G3": "chorus-male-g3.wav",
}

var bass_notes = Tonal.scale(e).map(Tonal.transpose(start_note+'3'));
var middle_notes = Tonal.scale(e).map(Tonal.transpose(start_note+'3'));
var color_notes = Tonal.scale(e).map(Tonal.transpose(start_note+'4'));

// Синтезаторы
var sampler_right = new Tone.Sampler(samples, {'baseUrl': '/Chorus/'});
var sampler_left = new Tone.Sampler(samples, {'baseUrl': '/Chorus/'});


var bassPattern1 = new Tone.Pattern(function (time, note) {
    sampler_left.triggerAttackRelease(note, '1n', time);
}, bass_notes);

var bassPattern2 = new Tone.Pattern(function (time, note) {
    sampler_right.triggerAttackRelease(note, '1n', time);
}, bass_notes);

var middleChords1 = new Tone.Pattern(function (time, note) {
    sampler_left.triggerAttackRelease(note, '1n', time);
}, middle_notes);

var middleChords2 = new Tone.Pattern(function (time, note) {
    sampler_right.triggerAttackRelease(note, '1n', time);
}, middle_notes);

var color1 = new Tone.Pattern(function (time, note) {
    sampler_right.triggerAttackRelease(note, '1n', time);
}, color_notes);

var color2 = new Tone.Pattern(function (time, note) {
    sampler_left.triggerAttackRelease(note, '1n', time);
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

sampler_left.connect(leftPanner);
sampler_right.connect(rightPanner);

leftPanner.connect(echo2);
rightPanner.connect(echo2);

echo2.connect(reverb2);

reverb2.connect(comp);

var masterVolume = new Tone.Volume(-20);

comp.connect(masterVolume);
masterVolume.toMaster();

Tone.Transport.bpm.value = 20;
Tone.Transport.start();
