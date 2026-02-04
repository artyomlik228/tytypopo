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

// ========== Content editor utilities ==========
window.DEFAULT_SITE_CONTENT = {
	"logo": 'TUNGTUNG<span class="highlight">SAH</span>',
	"nav_about": "О нас",
	"nav_services": "Услуги",
	"nav_trainers": "Команда",
	"nav_benefits": "Преимущества",
	"nav_contacts": "Контакты",
	"hero_h1": 'Создай свою <br><span class="highlight">лучшую версию</span>',
	"hero_p": 'Премиальный фитнес-клуб в центре города. Твое тело — твое дело.',
	"hero_btn": 'Записаться',
	"about_h2": 'О компании',
	"about_subtitle": 'Сила, воля, результат',
	"about_p1": '<strong>TungTungSah</strong> — это больше, чем просто тренажерный зал. Это сообщество людей, объединенных целью стать сильнее и здоровее. Мы предоставляем оборудование мирового класса, профессиональную поддержку и атмосферу, которая мотивирует на победы.',
	"about_p2": 'Наша миссия — сделать фитнес доступным, понятным и эффективным для каждого, независимо от уровня подготовки.',
	"services_h2": 'Наши услуги',
	"service1_title": 'Тренажерный зал',
	"service1_desc": 'Современное оборудование Technogym и Hammer Strength. Зоны свободных весов и кардио.',
	"service2_title": 'Кардио-зона',
	"service2_desc": 'Беговые дорожки, эллипсы и велотренажеры с мультимедийными системами.',
	"service3_title": 'Групповые программы',
	"service3_desc": 'Йога, пилатес, кроссфит, зумба. Более 20 направлений для групповых тренировок.',
	"trainers_h2": 'Наши Тренеры',
	"trainer1_name": 'Алексей Смирнов',
	"trainer1_specialization": 'Старший тренер / Бодибилдинг',
	"trainer1_bio": 'Опыт работы более 10 лет. Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и силовой подготовке.',
	"trainer2_name": 'Мария Иванова',
	"trainer2_specialization": 'Функциональный тренинг / Йога',
	"trainer2_bio": 'Сертифицированный инструктор по хатха-йоге. Поможет развить гибкость, восстановиться после травм и найти баланс.',
	"benefits_h2": 'Почему выбирают нас',
	"benefit1_title": 'Работаем 24/7',
	"benefit1_text": 'Тренируйтесь когда удобно вам, без ограничений по времени.',
	"benefit2_title": 'Первая тренировка бесплатно',
	"benefit2_text": 'Попробуйте зал и атмосферу перед покупкой абонемента.',
	"benefit3_title": 'SPA и Сауна',
	"benefit3_text": 'Просторная финская сауна и зона отдыха включены в клубную карту.',
	"contacts_h2": 'Контакты',
	"contact_phone": '+7 (999) 000-00-00',
	"contact_email": 'info@ironforge.fit',
	"contact_address": 'г. Москва, ул. Спортивная, д. 10',
	"contact_form_h3": 'Заказать звонок',
	"contact_form_name_placeholder": 'Ваше имя',
	"contact_form_phone_placeholder": 'Ваш телефон',
	"contact_form_email_placeholder": 'Ваш Email',
	"contact_form_button": 'Отправить',
	"footer_text": '&copy; 2026 TungTungSah Fitness. Все права защищены.'
};

window.getSiteContent = function() {
	try {
		const raw = localStorage.getItem('siteContent');
		const stored = raw ? JSON.parse(raw) : {};
		return Object.assign({}, window.DEFAULT_SITE_CONTENT, stored);
	} catch (e) {
		return Object.assign({}, window.DEFAULT_SITE_CONTENT);
	}
};

window.saveSiteContent = function(obj) {
	localStorage.setItem('siteContent', JSON.stringify(obj));
};

window.resetSiteContent = function() {
	localStorage.removeItem('siteContent');
};

// Применение содержимого на любой странице: заменяет innerHTML у элементов с data-edit-key.
// Для input/textarea устанавливает placeholder.
window.applySiteContentToPage = function() {
	const data = window.getSiteContent();
	document.querySelectorAll('[data-edit-key]').forEach(el => {
		const key = el.dataset.editKey;
		if (!key) return;
		const value = data[key];
		if (value === undefined) return;
		const tag = el.tagName.toLowerCase();
		if (tag === 'input' || tag === 'textarea') {
			el.placeholder = value;
		} else {
			el.innerHTML = value;
		}
	});
};

// Автозапуск на DOMContentLoaded (для index.html и других страниц)
document.addEventListener('DOMContentLoaded', () => {
	window.applySiteContentToPage && window.applySiteContentToPage();
});