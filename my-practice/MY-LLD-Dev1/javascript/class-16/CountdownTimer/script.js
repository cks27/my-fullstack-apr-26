const startBtn = document.getElementById('start-btn');
const hInp = document.getElementById('h-inp');
const mInp = document.getElementById('m-inp');
const sInp = document.getElementById('s-inp');

const format = (num) => String(num).padStart(2, '0');

function startTimer(hours, mins, secs) {

    const endTime = Date.now() + (hours * 60 * 60 + mins * 60 + secs) * 1000;

    let id = setInterval(() => {
        document.getElementById('timer-display').innerText = `${format(hours)}:${format(mins)}:${format(secs)}`;
        const timeLeft = Math.max((endTime - Date.now()) / 1000, 0);
        if (timeLeft === 0) {
            clearInterval(id);
        }
        const hoursLeft = Math.floor(timeLeft / 3600);
        const minsLeft = Math.floor((timeLeft % 3600) / 60);
        const secsLeft = Math.floor(timeLeft % 60);
        document.getElementById('timer-display').innerText = `${format(hoursLeft)}:${format(minsLeft)}:${format(secsLeft)}`;
    }, 100);
}

startBtn.addEventListener('click', function () {
    const h = parseInt(hInp.value) || 0;
    const m = parseInt(mInp.value) || 0;
    const s = parseInt(sInp.value) || 0;
    startTimer(h, m, s);
});
