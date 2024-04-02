function createCircleTimer(duration, selector) {
    const container = document.querySelector(selector);
    container.innerHTML = `
        <svg class="timer-svg" style="transform: rotate(-90deg); width: 100px; height: 100px;">
            <circle class="timer-circle-bg" cx="50" cy="50" r="45" style="fill: none; stroke: #eee; stroke-width: 4;"></circle>
            <circle class="timer-circle" cx="50" cy="50" r="45" style="fill: none; stroke: purple; stroke-width: 4; stroke-dasharray: 283; stroke-dashoffset: 283;"></circle>
            <text class="timer-text" x="50" y="55" text-anchor="middle" style="fill: black; font-size: 20px; font-family: Arial; transform: rotate(90deg); transform-origin: 50px 50px;">60</text>
        </svg>
    `;

    const timerText = container.querySelector('.timer-text');
    const timerCircle = container.querySelector('.timer-circle');
    let timeLeft = duration;

    const updateTimer = () => {
        const circumference = 2 * Math.PI * 45; // Circle's circumference
        const offset = circumference - (timeLeft / duration) * circumference;
        timerCircle.style.strokeDashoffset = offset;
        timerText.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(intervalId);
            timerText.textContent = "0";
        }

        timeLeft--;
    };

    let intervalId = setInterval(updateTimer, 1000);
}
