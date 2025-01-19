const keys = document.querySelectorAll('.piano-keys');
const pianoSound = new Audio();

// Map the keyboard keys to sound file names (you can adjust the mappings as needed)
const keyMapping = {
    'a': 'c4',
    's': 'c_sharp',
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

// Function to play the sound for a given key
function playSound(key) {

    if (keyMapping[key]) {
        pianoSound.src = `./assets/music_sounds/${keyMapping[key]}.mp3`;
        pianoSound.play();
    }
}

// Add event listener for mouse clicks on piano keys
keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        const clickedKey = e.target.dataset.note;
        console.log(clickedKey)
        pianoSound.src = `./assets/music_sounds/${clickedKey}.mp3`;
        pianoSound.play();
    });
});

document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toLowerCase();  // Get the key that was pressed, convert to lowercase
    console.log(`Key pressed: ${keyPressed}`); // Debugging log for keyboard input
    playSound(keyPressed);  // Call the playSound function to play the corresponding sound
});