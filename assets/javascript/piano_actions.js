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
// function playSound(key) {
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
//         playSound(clickedKey);
//     });

//     key.addEventListener('mouseup', (e) => {
//         const clickedKey = e.target.dataset.note;
//         if (!usePedal) stopSound(clickedKey);
//     });
// });

// document.addEventListener('keydown', (e) => {
//     const keyPressed = e.key.toLowerCase();
//     playSound(keyPressed);
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
//             playSound(note);
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


// Play the sound for a given key
function playSound(key) {
    if (keyMapping[key]) {
        if (usePedal) {
            for (const playingKey in activeSounds) {
                stopSound(playingKey);
            }
        }
        
        if (!activeSounds[key]) {
            console.log(key)
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

// Mouse on piano keys to play sound
keys.forEach((key) => {
    key.addEventListener('mousedown', (e) => {
        const clickedKey = e.target.dataset.note;
        playSound(clickedKey);
    });

    key.addEventListener('mouseup', (e) => {
        const clickedKey = e.target.dataset.note;
        if (!usePedal) stopSound(clickedKey);
    });
});


document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toLowerCase();
    const pianoKey = document.querySelector(`.piano-keys[data-note="${keyPressed}"]`);
    console.log(pianoKey)
    if (pianoKey) {
        pianoKey.classList.add('pressed');
        playSound(keyPressed);
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
    let totalDelay = 0;
    recordedSequence.forEach(({ note, delay }, index) => {
        if (index === 0) {
            setTimeout(() => {
                playSound(note);
                activeSounds[note].loop = false;
            }, 0); 
        } else {
            totalDelay += delay; 
            setTimeout(() => {  
                playSound(note);

                activeSounds[note].loop = false;
                setTimeout(() => {
                    stopSound(note);
                }, delay);

            }, totalDelay);
        }
    });
    setTimeout(() => {
        for (const key in activeSounds) {
            stopSound(key);
        }
    }, totalDelay + 1000); // Ensure extra time for the last note
});


function exportSequence() {
    console.log("Recorded Sequence:", recordedSequence);  // Debugging line

    if (recordedSequence.length === 0) {
        alert('No sequence recorded yet.');
        return; // Avoid downloading if there's no data
    }

    const data = JSON.stringify(recordedSequence, null, 2); 
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'recorded_sequence.json';
    link.click();

    URL.revokeObjectURL(url);

    // Show confirmation to the user
    const message = document.createElement('div');
    message.classList.add('download-message');
    message.textContent = 'Download started!';
    document.body.appendChild(message);

    // Remove the message after 2 seconds
    setTimeout(() => {
        message.remove();
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', exportSequence);
    }
});


const importFileInput = document.getElementById('import-file');
let importedSequence = [];  // Declare here to use within the scope

importFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                // Parse the JSON content from the file
                importedSequence = JSON.parse(e.target.result);
                console.log('Imported Sequence:', importedSequence);
                
                // Enable the play button now that we have the sequence
                const playImportedBtn = document.getElementById('play-imported-btn');
                playImportedBtn.disabled = false;  // Enable it after the sequence is loaded
            } catch (error) {
                console.error('Error parsing the file:', error);
            }
        };
        reader.readAsText(file);
    }
});

const playImportedBtn = document.getElementById('play-imported-btn');
playImportedBtn.addEventListener('click', () => {
    if (importedSequence && importedSequence.length > 0) {
        playImportedSequence(importedSequence);
    } else {
        console.log('No imported sequence to play.');
    }
});


// Function to play the imported sequence
function playImportedSequence(sequence) {
    let totalDelay = 0;
    sequence.forEach(({ note, delay }, index) => {
        if (index === 0) {
            setTimeout(() => {
                playSound(note);
                activeSounds[note].loop = false;
            }, 0);
        } else {
            totalDelay += delay;
            setTimeout(() => {
                playSound(note);
                activeSounds[note].loop = false;
                setTimeout(() => {
                    stopSound(note);
                }, delay);
            }, totalDelay);
        }
    });

    // Stop all sounds after the sequence is finished
    setTimeout(() => {
        for (const key in activeSounds) {
            stopSound(key);
        }
    }, totalDelay + 1000); // Ensure extra time for the last note
}

