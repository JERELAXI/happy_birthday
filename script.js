// Масив кольорів для конфеті
const confettiColors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];

// Масив смішних звуків/повідомлень
const funnyMessages = [
    "🎉 ПОЗДОРОВЛЕННЯ АКТИВОВАНО! 🎉",
    "💫 ОФІЦІЙНО КРУТІ 14 РОКІВ! 💫",
    "🦄 МАГІЯ ДНЯ НАРОДЖЕННЯ ПРАЦЮЄ! 🦄",
    "🎈 ТИ НАЙКРАЩА СЕСТРА В ВСЕСВІТІ! 🎈",
    "🌟 РІВЕНЬ КРУТОСТІ: 9000+! 🌟",
    "🎁 ВІДКРИЙ ПОДАРУНОК ДЛЯ СЮРПРИЗУ! 🎁",
    "👍 ГОРИЛА СХВАЛЮЄ ЦЕ ПРИВІТАННЯ! 🦍",
    "⚔️ БОРОМІР: One does not simply... пропустити твій ДН! 🏰"
];

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    // Автоматичне створення початкового конфеті
    setTimeout(createConfetti, 1000);
    
    // Анімація появи елементів при скролі
    observeElements();
    
    // Додавання слухачів для кнопок
    setupEventListeners();
});

// Функція створення конфеті
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    
    // Очищаємо попереднє конфеті
    confettiContainer.innerHTML = '';
    
    // Створюємо 50 частинок конфеті
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Випадковий колір
            const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.background = randomColor;
            
            // Випадкова позиція
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            // Випадкова форма
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confetti);
            
            // Видаляємо конфеті після анімації
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
    
    // Показуємо повідомлення
    showRandomMessage();
}

// Функція відтворення музики дня народження
function playBirthdaySong() {
    // Створюємо аудіо контекст для звукових ефектів
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Повна мелодія "Happy Birthday" (2 куплети)
        const notes = [
            // Happy Birthday to you
            261.63, 261.63, 293.66, 261.63, 349.23, 329.63,
            // Happy Birthday to you  
            261.63, 261.63, 293.66, 261.63, 392.00, 349.23,
            // Happy Birthday dear [name]
            261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66,
            // Happy Birthday to you!
            466.16, 466.16, 440.00, 349.23, 392.00, 349.23
        ];
        
        const durations = [
            // Тривалість кожної ноти (в секундах)
            0.5, 0.3, 0.8, 0.8, 0.8, 1.2,
            0.5, 0.3, 0.8, 0.8, 0.8, 1.2,
            0.5, 0.3, 0.8, 0.8, 0.8, 0.8, 1.2,
            0.5, 0.3, 0.8, 0.8, 0.8, 1.5
        ];
        
        let currentTime = 0;
        notes.forEach((note, index) => {
            setTimeout(() => {
                playNote(audioCtx, note, durations[index] || 0.5);
            }, currentTime * 1000);
            currentTime += (durations[index] || 0.5) + 0.1; // Невелика пауза між нотами
        });
    }
    
    // Додаємо візуальний ефект
    const musicButton = document.querySelector('.magic-btn:nth-child(2)');
    if (musicButton) {
        musicButton.style.animation = 'bounce 0.5s ease infinite';
        
        setTimeout(() => {
            musicButton.style.animation = '';
        }, 15000); // 15 секунд для повної мелодії
    }
    
    showRandomMessage();
}

// Функція відтворення ноти
function playNote(audioCtx, frequency, duration) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'triangle'; // Більш приємний звук
    
    // Плавне наростання і затухання
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + duration - 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
}

// Функція показу сюрпризу
function showSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'block';
    
    // Додаємо конфеті в модальне вікно
    createConfetti();
    
    // Додаємо анімацію тексту
    const surpriseText = modal.querySelector('h2');
    surpriseText.style.animation = 'bounce 1s ease infinite';
}

// Функція закриття сюрпризу
function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'none';
}

// Функція показу випадкового повідомлення
function showRandomMessage() {
    const message = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    
    // Створюємо тимчасове повідомлення
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1.2rem;
        z-index: 1002;
        animation: messageSlideIn 0.5s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Видаляємо повідомлення через 3 секунди
    setTimeout(() => {
        messageDiv.style.animation = 'messageSlideOut 0.5s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 500);
    }, 3000);
}

// Функція для показу мемів
function showMeme(memeNumber) {
    const memeResponses = [
        "⚔️ Боромір схвалює твій новий статус підлітка! 🏰",
        "💯 Drake знає толк у хороших віках! 😎",
        "🤣 POV: коли ти найкраща сестра в світі! 💅"
    ];
    
    const response = memeResponses[memeNumber - 1];
    
    // Показуємо реакцію на мем
    const messageDiv = document.createElement('div');
    messageDiv.textContent = response;
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 1rem;
        border-radius: 15px;
        font-size: 1rem;
        z-index: 1002;
        animation: fadeInUp 0.5s ease;
        max-width: 250px;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Функція спостереження за елементами для анімації при скролі
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease';
                entry.target.style.opacity = '1';
            }
        });
    });

    // Спостерігаємо за секціями
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// Налаштування слухачів подій
function setupEventListeners() {
    // Закриття модального вікна при кліку поза ним
    window.onclick = function(event) {
        const modal = document.getElementById('surpriseModal');
        if (event.target === modal) {
            closeSurprise();
        }
    };
    
    // Клавіатурні скорочення
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'c':
            case 'C':
                createConfetti();
                break;
            case 'm':
            case 'M':
                playBirthdaySong();
                break;
            case 's':
            case 'S':
                showSurprise();
                break;
            case 'g':
            case 'G':
                openGift();
                break;
            case 'Escape':
                closeSurprise();
                break;
        }
    });
    
    // Автоматичне конфеті кожні 30 секунд
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% шанс
            createConfetti();
        }
    }, 30000);
}

// Додаємо CSS анімації динамічно
const style = document.createElement('style');
style.textContent = `
    @keyframes messageSlideIn {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes messageSlideOut {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Ефект паралакса для емодзі
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-emojis .emoji');
    
    parallax.forEach((emoji, index) => {
        const speed = (index + 1) * 0.1;
        emoji.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Додаємо більше інтерактивності до карток
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.meme-card, .wish-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Додаємо ефект печатання для заголовків
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Функція для створення випадкових емодзі
function createRandomEmoji() {
    const emojis = ['🎉', '🎂', '🎈', '🎁', '✨', '🎊', '🌟', '💖', '🦄', '🌈'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 999;
        animation: randomFloat 4s ease-out forwards;
    `;
    
    emoji.style.left = Math.random() * window.innerWidth + 'px';
    emoji.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(emoji);
    
    setTimeout(() => {
        if (emoji.parentNode) {
            emoji.parentNode.removeChild(emoji);
        }
    }, 4000);
}

// Додаємо CSS для випадкових емодзі
const emojiStyle = document.createElement('style');
emojiStyle.textContent = `
    @keyframes randomFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-${window.innerHeight + 200}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(emojiStyle);

// Створюємо випадкові емодзі кожні 10 секунд
setInterval(createRandomEmoji, 10000);

// Функція відкриття подарунка
function openGift() {
    const giftBox = document.querySelector('.gift-box');
    const giftSurprise = document.getElementById('giftSurprise');
    
    // Додаємо клас відкритого подарунка
    giftBox.classList.add('opened');
    
    // Створюємо мега конфеті
    createConfetti();
    setTimeout(createConfetti, 500);
    setTimeout(createConfetti, 1000);
    
    // Показуємо сюрприз з затримкою
    setTimeout(() => {
        giftSurprise.classList.add('show');
        showRandomMessage();
        
        // Додаємо звуковий ефект
        playBirthdaySong();
    }, 1000);
    
    // Додаємо кнопку закриття
    if (!giftSurprise.querySelector('.close-surprise')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-surprise';
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            z-index: 101;
        `;
        closeBtn.onclick = closeGiftSurprise;
        giftSurprise.appendChild(closeBtn);
    }
}

// Функція закриття сюрпризу
function closeGiftSurprise() {
    const giftSurprise = document.getElementById('giftSurprise');
    const giftBox = document.querySelector('.gift-box');
    
    giftSurprise.classList.remove('show');
    giftBox.classList.remove('opened');
}

// Додаємо обробник клавіш для подарунка
document.addEventListener('keydown', function(event) {
    const giftSurprise = document.getElementById('giftSurprise');
    
    if (event.key === 'Escape' && giftSurprise.classList.contains('show')) {
        closeGiftSurprise();
    }
    
    if (event.key === 'g' || event.key === 'G') {
        openGift();
    }
});

// Додаємо закриття при кліку поза сюрпризом
document.addEventListener('click', function(event) {
    const giftSurprise = document.getElementById('giftSurprise');
    const surpriseContent = giftSurprise.querySelector('.surprise-content');
    
    if (giftSurprise.classList.contains('show') && 
        !surpriseContent.contains(event.target) && 
        event.target !== giftSurprise) {
        closeGiftSurprise();
    }
}); 