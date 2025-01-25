// const keys = document.querySelectorAll('.piano-keys');
// const recordBtn = document.getElementById('record-btn');
// const playBtn = document.getElementById('play-btn');
// const pedalBtn = document.getElementById('pedal-btn');
// let isRecording = false;
// let usePedal = false; // Determines whether to use the "pedal" mode
// let recordedSequence = [];
// let lastTimestamp = null;

// // Map {key : sound}
// const keyMapping = {
//     'q': 'C2',
//     '2': 'Csharp2',
//     'w': 'D2',
//     '3': 'Dsharp2',
//     'e': 'E2',
//     'r': 'F2',
//     '5': 'Fsharp2',
//     't': 'G2',
//     '6': 'Gsharp2',
//     'y': 'A2',
//     '7': 'Asharp2',
//     'u': 'B2',

//     'i': 'C3',
//     '9': 'Csharp3',
//     'o': 'D3',
//     '0': 'Dsharp3',
//     'p': 'E3',
//     '[': 'F3',
//     'a': 'Fsharp3',
//     'z': 'G3',
//     's': 'Gsharp3',
//     'x': 'A3',
//     'd': 'Asharp3',
//     'c': 'B3',
    
//     'v': 'C4',
//     'g': 'Csharp4',
//     'b': 'D4',
//     'h': 'Dsharp4',
//     'n': 'E4',
//     'm': 'F4',
//     'k': 'Fsharp4',
//     ',': 'G4',
//     'l': 'Gsharp4',
//     '.': 'A4',
//     ';': 'Asharp4',
//     '/': 'B4',
// };


// // Store currently playing sounds to stop them on keyup
// const activeSounds = {};

// // Play the sound for a given key
// function startSound(key) {
//     if (keyMapping[key] && !activeSounds[key]) {
//         const sound = new Audio(`./assets/music_sounds/${keyMapping[key]}.mp3`);
//         if (!usePedal) sound.loop = true; // Loop only if not using pedal
//         sound.play();
//         activeSounds[key] = sound;

//         if (isRecording) {
//             const currentTimestamp = Date.now();
//             const delay = lastTimestamp ? currentTimestamp - lastTimestamp : 0;
//             recordedSequence.push({ note: key, delay });
//             lastTimestamp = currentTimestamp;
//         }
//     }
// }

// // Stop the sound for a given key
// function stopSound(key) {
//     if (activeSounds[key]) {
//         activeSounds[key].pause();
//         activeSounds[key].currentTime = 0; // Reset sound to the beginning
//         delete activeSounds[key];
//     }
// }

// // Mouse on piano keys to play sound
// keys.forEach((key) => {
//     key.addEventListener('mousedown', (e) => {
//         const clickedKey = e.target.dataset.note;
//         startSound(clickedKey);
//     });

//     key.addEventListener('mouseup', (e) => {
//         const clickedKey = e.target.dataset.note;
//         if (!usePedal) stopSound(clickedKey);
//     });
// });

// document.addEventListener('keydown', (e) => {
//     const keyPressed = e.key.toLowerCase();
//     startSound(keyPressed);
// });

// document.addEventListener('keyup', (e) => {
//     const keyReleased = e.key.toLowerCase();
//     if (!usePedal) stopSound(keyReleased);
// });

// // Toggle pedal functionality
// pedalBtn.addEventListener('click', () => {
//     usePedal = !usePedal;
//     pedalBtn.textContent = usePedal ? 'Pedal On' : 'Pedal Off';
//     console.log(`Pedal is now ${usePedal ? 'On' : 'Off'}`);
// });

// // Toggle recording state
// recordBtn.addEventListener('click', () => {
//     isRecording = !isRecording;
//     if (isRecording) {
//         recordedSequence = [];
//         recordBtn.textContent = 'End Recording';
//         playBtn.disabled = true;
//         console.log('Recording started...');
//     } else {
//         recordBtn.textContent = 'Start Recording';
//         playBtn.disabled = false;
//         console.log('Recording stopped. Sequence:', recordedSequence);
//     }
// });

// // Play the recorded sequence
// playBtn.addEventListener('click', () => {
//     let totalDelay = 0;
//     recordedSequence.forEach(({ note, delay }, index) => {
//         totalDelay += delay;
//         setTimeout(() => {
//             startSound(note);
//             setTimeout(() => stopSound(note), 500); // Stop sound after 500ms for each note
//         }, totalDelay);
//     });
// });

const keys = document.querySelectorAll('.piano-keys');
const recordBtn = document.getElementById('record-btn');
const playBtn = document.getElementById('play-btn');
const pedalBtn = document.getElementById('pedal-btn');
let isRecording = false;
let usePedal = false;
let recordedSequence = [];
let lastTimestamp = null;

// Map {key : sound}
const keyMapping = {
    'q': 'C2',
    '2': 'Csharp2',
    'w': 'D2',
    '3': 'Dsharp2',
    'e': 'E2',
    'r': 'F2',
    '5': 'Fsharp2',
    't': 'G2',
    '6': 'Gsharp2',
    'y': 'A2',
    '7': 'Asharp2',
    'u': 'B2',

    'i': 'C3',
    '9': 'Csharp3',
    'o': 'D3',
    '0': 'Dsharp3',
    'p': 'E3',
    '[': 'F3',
    'a': 'Fsharp3',
    'z': 'G3',
    's': 'Gsharp3',
    'x': 'A3',
    'd': 'Asharp3',
    'c': 'B3',
    
    'v': 'C4',
    'g': 'Csharp4',
    'b': 'D4',
    'h': 'Dsharp4',
    'n': 'E4',
    'm': 'F4',
    'k': 'Fsharp4',
    ',': 'G4',
    'l': 'Gsharp4',
    '.': 'A4',
    ';': 'Asharp4',
    '/': 'B4',
};

const activeSounds = {};
const activeLines = {};

function startSound(key) {
    if (keyMapping[key]) {
        if (usePedal) {
            for (const playingKey in activeSounds) {
                stopSound(playingKey);
            }
        }

        if (!activeSounds[key]) {
            const sound = new Audio(`./assets/music_sounds/${keyMapping[key]}.mp3`);
            sound.loop = !usePedal;
            sound.play();
            activeSounds[key] = sound;

            if (isRecording) {
                const currentTimestamp = Date.now();
                const delay = lastTimestamp ? currentTimestamp - lastTimestamp : 0;
                recordedSequence.push({ note: key, delay });
                lastTimestamp = currentTimestamp;
            }
        }
    }
}

function stopSound(key) {
    if (activeSounds[key]) {
        activeSounds[key].pause();
        activeSounds[key].currentTime = 0;
        delete activeSounds[key];
    }
}

const createLine = (keyElement) => {
    const line = document.createElement('div');
    line.classList.add('moving-line');
    document.querySelector('.container').appendChild(line);

    const rect = keyElement.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    line.style.left = `${rect.left - containerRect.left + rect.width / 2 - 20}px`;
    line.style.bottom = '600px';

    const animateLine = () => {
        const currentBottom = parseInt(line.style.bottom, 10);
        if (currentBottom < containerRect.height) {
            line.style.bottom = `${currentBottom + 1}px`;
            requestAnimationFrame(animateLine);
        }
    };

    animateLine();
    return line;
};


keys.forEach((key) => {
    key.addEventListener('mousedown', (e) => {
        const clickedKey = e.target.dataset.note;
        startSound(clickedKey);
    });

    key.addEventListener('mouseup', (e) => {
        const clickedKey = e.target.dataset.note;
        if (!usePedal) stopSound(clickedKey);
    });
});


document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toLowerCase();
    const pianoKey = document.querySelector(`.piano-keys[data-note="${keyPressed}"]`);
    if (pianoKey) {
        pianoKey.classList.add('pressed');
        startSound(keyPressed);
    }

    const line = createLine(pianoKey);
    activeLines[keyPressed] = line;
});

document.addEventListener('keyup', (e) => {
    const keyReleased = e.key.toLowerCase();
    const pianoKey = document.querySelector(`.piano-keys[data-note="${keyReleased}"]`);
    if (pianoKey) {
        pianoKey.classList.remove('pressed');
        if (!usePedal) stopSound(keyReleased);
    }

    if (activeLines[keyReleased]) {
        activeLines[keyReleased].remove();
        delete activeLines[keyReleased];
    }
});


pedalBtn.addEventListener('click', () => {
    usePedal = !usePedal;
    pedalBtn.textContent = usePedal ? 'Stop pedal' : 'Start pedal';
});

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

playBtn.addEventListener('click', () => {
    let totalDelay = 0;
    recordedSequence.forEach(({ note, delay }, index) => {
        totalDelay += delay;
        setTimeout(() => {
            startSound(note);
            setTimeout(() => stopSound(note), 500);
        }, totalDelay);
    });
});

