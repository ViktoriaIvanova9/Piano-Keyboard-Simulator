const keys = document.querySelectorAll('.piano-keys');

const pianoSound = new Audio('./assets/music_sounds/c4.mp3');

keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        const clickedKey = e.target.dataset.list;
        pianoSound.src = './assets/music_sounds/c4.mp3';
        pianoSound.play();
    });
});