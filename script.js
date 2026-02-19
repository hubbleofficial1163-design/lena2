// Этап 1: Hero секция готова. Ждем следующих указаний.
console.log("Текст уменьшен, фон белый, шрифт элегантный");

console.log("Секция 2 (приглашение) добавлена");

// Таймер обратного отсчета до свадьбы (15 ноября 2026)
function updateTimer() {
    const weddingDate = new Date('November 15, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Обновляем таймер каждую секунду
updateTimer();
setInterval(updateTimer, 1000);

console.log("Футер с таймером добавлен, фон 2.jpeg");




// Музыкальный плеер
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    playBtn.addEventListener('click', function() {
        bgMusic.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    });
    
    pauseBtn.addEventListener('click', function() {
        bgMusic.pause();
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    });
});
