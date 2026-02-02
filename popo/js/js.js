document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобильное меню (Бургер)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Открытие/закрытие меню
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });

    // 2. Обработка формы (без отправки)
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Запрещаем стандартную отправку
        
        // Визуальная имитация успешной отправки
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Отправлено!';
        btn.style.backgroundColor = '#fff';
        
        // Сброс формы
        form.reset();

        // Возврат кнопки через 3 секунды
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = ''; // Возврат к CSS стилю
        }, 3000);
        
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    });
});