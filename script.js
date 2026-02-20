// Таймер обратного отсчета до свадьбы
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

updateTimer();
setInterval(updateTimer, 1000);

// Музыкальный плеер
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    if (playBtn && pauseBtn && bgMusic) {
        playBtn.addEventListener('click', function() {
            bgMusic.play().catch(e => console.log('Автовоспроизведение заблокировано'));
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        });

        pauseBtn.addEventListener('click', function() {
            bgMusic.pause();
            playBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        });
    }
});

// Отправка формы
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.querySelector('input[placeholder*="Иванов"]')?.value || '',
                attendance: document.querySelector('input[name="attendance"]:checked')?.value || '',
                companion: document.querySelector('input[name="companion"]:checked')?.value || '',
                alcohol: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(cb => {
                        const labels = {
                            'vodka': 'Водка',
                            'cognac': 'Коньяк',
                            'red_wine': 'Красное вино',
                            'white_wine': 'Белое вино'
                        };
                        return labels[cb.value] || cb.value;
                    })
            };
            
            if (!formData.name) {
                showNotification('Пожалуйста, введите ФИО', 'error');
                return;
            }
            
            if (!formData.attendance) {
                showNotification('Пожалуйста, подтвердите присутствие', 'error');
                return;
            }
            
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            const scriptURL = 'https://script.google.com/macros/s/AKfycbyzO8AubmWOQqVrUNNGOEsnQVp-GXXJPBanNYWoqeN0ch8D6CCWYTVsb0s2f0IkyJIC/exec';
            
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(() => {
                showNotification('Спасибо! Ваш ответ отправлен.', 'success');
                document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
                document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked')
                    .forEach(input => input.checked = false);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Ошибка:', error);
                showNotification('Произошла ошибка', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Функция для показа уведомлений
function showNotification(message, type) {
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => { notification.style.display = 'block'; }, 10);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
