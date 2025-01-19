const keys = document.querySelectorAll('.piano-keys');
const pianoSound = new Audio();
const recordBtn = document.getElementById('record-btn');
const playBtn = document.getElementById('play-btn');
let isRecording = false;
let recordedSequence = [];

// Map {key : sound}
const keyMapping = {
    'a': 'c4',
    's': 'c4',
    'd': 'd',
    'f': 'd#',
    'g': 'e',
    'h': 'f',
    'j': 'f#',
    'k': 'g',
    'l': 'g#',
    ';': 'a',
    '4': 'a#',
    '5': 'b',
    '6': 'c5',
};

// Play the sound for a given key
function playSound(key) {

    if (keyMapping[key]) {
        pianoSound.src = `./assets/music_sounds/${keyMapping[key]}.mp3`;
        pianoSound.play();
    }

    if (isRecording) {
        console.log(key)
        recordedSequence.push(key);
    }
}

// Mouse on piano keys to play sound
keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        const clickedKey = e.target.dataset.note;
        console.log(clickedKey)
        playSound(clickedKey);
    });
});

document.addEventListener('keydown', (e) => { 
    const keyPressed = e.key.toLowerCase(); 
    //console.log(`Key pressed: ${keyPressed}`);
    playSound(keyPressed);  
});

//checks if isRecording and changes the button to the respectful state
recordBtn.addEventListener('click', () => {
    isRecording = !isRecording; 
    if (isRecording) {
        recordedSequence = []; 
        recordBtn.textContent = 'End Recording'; 
        playBtn.disabled = true; 
        console.log('Recording started...');
    } else {
        recordBtn.textContent = 'Start Recording';
        playBtn.disabled = false;
        console.log('Recording stopped. Sequence:', recordedSequence);
    }
});

//plays the just played sequence 
playBtn.addEventListener('click', () => {
    console.log('Playing back sequence:', recordedSequence);
    let delay = 0;

    recordedSequence.forEach((note) => {
        setTimeout(() => {
            playSound(note);
        }, delay);
        delay += 500;
    });
});
