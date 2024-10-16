let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
    }
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsContainer.innerHTML = '';
}

function lapTimer() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        const lapDisplay = formatTime(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap: ${lapDisplay}`;
        lapsContainer.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const formattedTime = formatTime(difference);
    display.innerHTML = formattedTime;
}

function formatTime(time) {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds
    );
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', lapTimer);
