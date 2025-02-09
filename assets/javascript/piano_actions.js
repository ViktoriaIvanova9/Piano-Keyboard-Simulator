const keys = document.querySelectorAll('.piano-keys');
const recordBtn = document.getElementById('record-btn');
const playBtn = document.getElementById('play-btn');
const pedalBtn = document.getElementById('pedal-btn');
const showKeysBtn = document.getElementById('show-keys');

let isRecording = false;
let usePedal = false;
let recordedSequence = [];
let lastTimeStamp = null;
let showKeys = false;

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
//for a given key, we check if its in the map as a key value
//if using the pedal, it stops the currently playing sounds
//if the key is not present in the activeSounds, we create a new Audio instance
//play the sound with the respective key
//add the sound to the activeSounds, so sounds don't overlap when the pedal is pressed
//if isRecording get the delay(time between keys played)
//add the pair of {key, delay} for each key played in the 'recordedSequence', update the lastTimeStamp
function playSound(key) {
    if (keyMapping[key]) {
        if (usePedal) {
            for (const playingKey in activeSounds) {
                stopSound(playingKey);
            }
        }
        
        if (!activeSounds[key]) {
            const sound = new Audio(`./assets/music_sounds/${keyMapping[key]}.mp3`);
  
            sound.play();
            activeSounds[key] = sound;

            if (isRecording) {
                const currentTimestamp = Date.now();
                const delay = lastTimeStamp ? currentTimestamp - lastTimeStamp : 0;
                recordedSequence.push({ note: key, delay });
                lastTimeStamp = currentTimestamp;
            }
        }
    }
}

//pauses the given sound from activeSounds if active
//resets the playback to the start of the sound and then deletes it
function stopSound(key) {
    if (activeSounds[key]) {
        activeSounds[key].pause();
        activeSounds[key].currentTime = 0;
        delete activeSounds[key];
    }
}

// creates line div element
const createLineElement = () => {
    const line = document.createElement('div');
    line.classList.add('moving-line');
    document.querySelector('.container').appendChild(line);
    return line;
};

// calcs the position of the line
const positionLine = (line, keyElement) => {
    const rect = keyElement.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    line.style.left = `${rect.left - containerRect.left + rect.width / 2 - 15}px`;
    line.style.bottom = `400px`;  
};

// moves the line
const animateLine = (line) => {
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const animate = () => {
        const currentBottom = parseInt(line.style.bottom, 10);
        line.style.bottom = `${currentBottom + 2}px`;
        requestAnimationFrame(animate);
    };
    animate();
};

//given key, creates line, positions it, animates it
const createLine = (keyElement) => {
    const line = createLineElement();
    positionLine(line, keyElement);
    animateLine(line);
    return line;
};

showKeysBtn.addEventListener("click", () => {
    showKeys = !showKeys;

    const pianoKeys = document.querySelectorAll(".piano-keys");
    pianoKeys.forEach(key => {
        key.style.setProperty("--key-label-visibility", showKeys ? "visible" : "hidden");
    });
});

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

// convert the key pressed on the keyboard to a sound 
document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toLowerCase();
    const pianoKey = document.querySelector(`.piano-keys[data-note="${keyPressed}"]`);
    if (pianoKey) {
        pianoKey.classList.add('pressed');
        playSound(keyPressed);

        const line = createLine(pianoKey);
        activeLines[keyPressed] = line;
    }

});

//checks if key is not pressed anymore
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

//toggles between on/off pedal
pedalBtn.addEventListener('click', () => {
    usePedal = !usePedal;
});

//checks if isRecording and changes the button to the respectful state
//if isRecording clears the last saved 'recordedSequence' & turns the button "PLAY" to disabled
//when clicked again, it stops recording and enables the "PLAY" button
recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;
    if (isRecording) {
        recordedSequence = [];
        playBtn.disabled = true;
    } else {
        playBtn.disabled = false;
    }
});

//logic for button "PLAY", when pressed checks for a recordedSequence and plays it, if it's valid
playBtn.addEventListener('click', () => {
    if (recordedSequence && recordedSequence.length > 0) {
        playSequence(recordedSequence);
    }
});

//here we check if the "recordedSequence" is valid(if it has any notes recorded inside it)
//we convert the "recordedSequence" to a json string, creates blob and temp url for it to be downloaded
// create hyperlink from the url, 
// function exportSequence() {
//     if (recordedSequence.length === 0) {
//         alert('No sequence recorded yet.');
//         return;
//     }

//     const data = JSON.stringify(recordedSequence, null, 2); 
//     const blob = new Blob([data], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'recorded_sequence.json';
//     link.click();

//     URL.revokeObjectURL(url);

//     const message = document.createElement('div');
//     message.classList.add('download-message');
//     message.textContent = 'Download started!';
//     document.body.appendChild(message);

//     setTimeout(() => {
//         message.remove();
//     }, 2000);
// }

function exportSequence() {
    // Fetch the recorded sequence from localStorage
    const recordedSequence = JSON.parse(localStorage.getItem('recordedSequence')) || [];

    if (recordedSequence.length === 0) {
        alert('No sequence recorded yet.');
        return;
    }

    const data = JSON.stringify(recordedSequence, null, 2); 
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'recorded_sequence.json';
    link.click();

    URL.revokeObjectURL(url);

    const message = document.createElement('div');
    message.classList.add('download-message');
    message.textContent = 'Download started!';
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 2000);
}

//check if DOM is loaded and allows for download button
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', exportSequence);
    }
});


//triggers file input
function getFileInput() {
    document.getElementById('import-file').click();
}

//listens for a event change and imports file
let importedSequence = []
document.getElementById('import-file').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                importedSequence = JSON.parse(e.target.result);
                if (importedSequence && importedSequence.length > 0) {
                    playSequence(importedSequence);
                }
            } catch (error) {
                console.error('Error parsing the file:', error);
            }
        };
        reader.readAsText(file);
    }
});

//iterates through all activeSounds and stops them
function stopAllSounds() {
    for (const key in activeSounds) {
        stopSound(key);
    }
}

//function to play the sequence
//as input it takes a sequence
function playSequence(sequence) {
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
                if (!usePedal) {
                    stopAllSounds(); 
                }
                playSound(note);
                activeSounds[note].loop = false;
                setTimeout(() => {
                    stopSound(note);
                }, delay);
            }, totalDelay);
        }
    });

    setTimeout(() => {
        stopAllSounds()
    }, totalDelay + 1000);
}


//lights up the button
function toggle(button) {
    button.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    let recordedSequence = JSON.parse(localStorage.getItem('recordedSequence')) || [];

    const urlParams = new URLSearchParams(window.location.search);

    // Trigger record functionality
    if (urlParams.has('record')) {
        isRecording = true;
        recordedSequence = [];
        localStorage.setItem('recordedSequence', JSON.stringify(recordedSequence));
        playBtn.disabled = true;
        toggle(document.getElementById('record-btn'));
        console.log("Recording started via URL.");
    }

    // Trigger play functionality
    if (urlParams.has('play')) {
        recordedSequence = JSON.parse(localStorage.getItem('recordedSequence')) || [];
        if (recordedSequence.length > 0) {
            playSequence(recordedSequence);
        } else {
            console.log("No recorded sequence found.");
        }
        toggle(document.getElementById('play-btn'));
    }

    // Toggle pedal functionality
    if (urlParams.has('pedal')) {
        usePedal = !usePedal;
        toggle(document.getElementById('pedal-btn'));
        console.log("Pedal toggled via URL.");
    }

    // Show or hide keys
    if (urlParams.has('keys')) {
        showKeys = !showKeys;
        const pianoKeys = document.querySelectorAll(".piano-keys");
        pianoKeys.forEach(key => {
            key.style.setProperty("--key-label-visibility", showKeys ? "visible" : "hidden");
        });
        toggle(document.getElementById('show-keys'));
        console.log("Show keys toggled via URL.");
    }

    // Trigger file import functionality
    if (urlParams.has('song')) {
        console.log("File input triggered via URL.");
        getFileInput()
    }

    // Trigger download functionality
    if (urlParams.has('download')) {
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.click(); // Simulate click on download button
            console.log("Download triggered via URL.");
        }
    }
});


// Save recording before page unload
window.addEventListener('beforeunload', () => {
    if (recordedSequence.length > 0) {
        localStorage.setItem('recordedSequence', JSON.stringify(recordedSequence));
    }
});

// save the played song to the database based on the logged username
document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("dbsave-btn");

    saveButton.addEventListener("click", function () {
        saveSong();
    });

    function saveSong() {
        if (!recordedSequence || recordedSequence.length === 0) {
            alert('No sequence recorded yet.');
            return;
        }

        const songData = JSON.stringify(recordedSequence);

        fetch('./includes/handlers/save_song.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: songData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Song saved successfully');
            } else {
                alert('Failed to save song: ' + data.message);
            }
        })
    }
});