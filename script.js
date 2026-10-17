let playarea = document.getElementById('playarea');
let waitsign = document.getElementById('waitsign');
let bait = document.getElementById('bait');
let best = document.getElementById('best');
let delay;
let timer;

let greentime;
let reactiontime;
let GameStarted = false;
let isGreen = false;



 function game(){

if (!GameStarted){
    GameStarted = true;
    isGreen = false;

playarea.style.backgroundColor = '#5a5959';
waitsign.innerHTML = 'Wait For Green...';
bait.style.display = 'block';
let delay = Math.random()* 3000;

timer = setTimeout(() => {
    isGreen = true;
    playarea.style.backgroundColor = 'green';
    waitsign.innerHTML = 'Click';
    greentime = performance.now();
}, delay);

return;
}

if (!isGreen) {
        waitsign.innerHTML = 'Too early! Click to try again.';
        bait.style.display = 'none';
        clearTimeout(timer);
        GameStarted = false;
        return;
    }

    reactiontime = performance.now() - greentime;
    waitsign.innerHTML = reactiontime.toFixed(0) + ' ms';
    bait.style.display = 'none';
    saveScore(reactiontime);
    GameStarted = false;
    isGreen = false;
    playarea.style.backgroundColor = '#5a5959';

};


let scores = JSON.parse(localStorage.getItem('reactionScores')) || [];

function updateBestScore() {
    if (scores.length === 0) {
        best.textContent = 'Best Score: --';
        return;
    }

    let bestScore = Math.min(...scores);
    best.textContent = `Best Score: ${bestScore.toFixed(0)} ms`;
}

updateBestScore();
function saveScore(reactiontime) {
    scores.push(reactiontime);

    localStorage.setItem('reactionScores', JSON.stringify(scores));

    updateBestScore();
}



