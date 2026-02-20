// Этап 1: Hero секция готова. Ждем следующих указаний.
console.log("Текст уменьшен, фон белый, шрифт элегантный");
console.log("Секция 2 (приглашение) добавлена");

// ===== ФИКС ДЛЯ МОБИЛЬНОГО VIEWPORT =====
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Вызываем при загрузке и изменении размера/ориентации
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// Также вызываем при скролле с задержкой
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(setViewportHeight, 150);
});

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
    
    if (playBtn && pauseBtn && bgMusic) {
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
    }
});

// Отправка формы в Google Таблицу
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Собираем данные
            const formData = {
                name: document.querySelector('input[placeholder*= "Иванов "]')?.value || '',
                attendance: document.querySelector('input[name= "attendance "]:checked')?.value || '',
                companion: document.querySelector('input[name= "companion "]:checked')?.value || '',
                alcohol: Array.from(document.querySelectorAll('input[type= "checkbox "]:checked'))
                    .map(cb => {
                        const value = cb.value;
                        const labels = {
                            'vodka': 'Водка',
                            'cognac': 'Коньяк',
                            'red_wine': 'Красное вино',
                            'white_wine': 'Белое вино'
                        };
                        return labels[value] || value;
                    })
            };
            
            // Проверяем заполнение обязательных полей
            if (!formData.name) {
                showNotification('Пожалуйста, введите ФИО', 'error');
                return;
            }
            
            if (!formData.attendance) {
                showNotification('Пожалуйста, подтвердите присутствие', 'error');
                return;
            }
            
            // Меняем текст кнопки и блокируем её
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправление...';
            submitBtn.disabled = true;
            
            // URL вашего Google Apps Script
            const scriptURL = 'https://script.google.com/macros/s/AKfycbyzO8AubmWOQqVrUNNGOEsnQVp-GXXJPBanNYWoqeN0ch8D6CCWYTVsb0s2f0IkyJIC/exec';
            
            // Отправляем данные
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                showNotification('Спасибо! Ваш ответ отправлен.', 'success');
                
                // Очищаем форму
                document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
                document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked')
                    .forEach(input => input.checked = false);
                
                // Возвращаем кнопку в исходное состояние
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Ошибка:', error);
                showNotification('Произошла ошибка, но мы попробуем сохранить ответ', 'error');
                
                // Возвращаем кнопку в исходное состояние
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Функция для показа уведомлений
function showNotification(message, type) {
    // Удаляем предыдущее уведомление, если есть
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;

    // Добавляем в DOM
    document.body.appendChild(notification);

    // Показываем уведомление
    setTimeout(() => {
        notification.style.display = 'block';
    }, 10);

    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}
