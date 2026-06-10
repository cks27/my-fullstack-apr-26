const hInp = document.getElementById('h-inp');
const mInp = document.getElementById('m-inp');
const sInp = document.getElementById('s-inp');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer-display');

let intervalId = null;

function secondsToHhMmSs(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function milliSecondsToHhMmSs(milliSeconds) {
    return new Date(milliSeconds).toISOString().slice(11, 19);
}

/*
    Below code has trust issues,
    and hence cannot be utilised to measure the time accurately.
    setInterval will expire after 1000 milliseconds, but that
    does not guarantee that each callback is executed after one seconds
    and update the timer.
    If callstack is busy then callback will keep on waiting for more than
    1 sec and hence will not be measuring the time accurately.

*/

// This is bad
function showCountdownTime(timeInSecs) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        timerDisplay.innerText = secondsToHhMmSs(timeInSecs);
        timeInSecs = timeInSecs - 1;
        if (timeInSecs <= 0) {
            clearInterval(intervalId);
            timerDisplay.innerText = 'Time Up!';
        }
    }, 1000);
}

// Good
function showCountdownTimeAccurate(timeInSecs) {
    clearInterval(intervalId);
    const totalTimeToMeasureInMilliSecs = Date.now() + timeInSecs * 1000;
    intervalId = setInterval(() => {
        const remainingTimeInMilliSecs = totalTimeToMeasureInMilliSecs - Date.now();
        timerDisplay.innerText = milliSecondsToHhMmSs(remainingTimeInMilliSecs);
        if (remainingTimeInMilliSecs <= 0) {
            clearInterval(intervalId);
            timerDisplay.innerText = 'Time Up!';
        }
    }, 400);
}

startBtn.addEventListener('click', function () {
    const hours = parseInt(hInp.value) || 0;
    const mins = parseInt(mInp.value) || 0;
    const seconds = parseInt(sInp.value) || 0;

    const totalTimeInSecs = hours * 3600 + mins * 60 + seconds;
    showCountdownTimeAccurate(totalTimeInSecs);
});
