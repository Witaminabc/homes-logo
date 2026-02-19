// import fortawesome from '@fortawesome/fontawesome-free';
// import Swiper from 'swiper';
import Swiper from 'swiper/bundle';

import $ from 'jquery';
import jQuery from 'jquery';

// $('.swiper').css('display','none')
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper
    const swiper2 = new Swiper('.catalog-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 15,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.catalog-next',
            prevEl: '.catalog-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        coverflowEffect: {
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        }
    });
    const swiper3 = new Swiper('.catalog-swiper-galery', {
        slidesPerView: 1,
        loop: true,
        // speed: 800,
        // autoplay: {
        //     delay: 6000,
        //     disableOnInteraction: false,
        // },
        navigation: {
            nextEl: '.catalog-galery-next',
            prevEl: '.catalog-galery-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            }
        },

    });
    const swiper4 = new Swiper('.moments-swiper-galery', {
        slidesPerView: 1.8,
        loop: true,
        speed: 800,
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.moments-next',
            prevEl: '.moments-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            }
        },

    });
    const swiper5 = new Swiper('.revierws-swiper-galery', {
        slidesPerView: 1.3,
        loop: true,
        speed: 800,
        spaceBetween: 20,
        centeredSlides: false,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination-rew',   // селектор контейнера
            type: 'bullets',           // тип: точки (bullets)
            clickable: true,           // кликабельны (можно переключаться по клику)
            // dynamicBullets: true,       // динамический размер точек (опционально)
            // dynamicMainBullets: 3,     // сколько точек показывать как «основные»
        },
        navigation: {
            nextEl: '.revierws-next',
            prevEl: '.revierws-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1.8,
                centeredSlides: false,
            },
            1200: {
                slidesPerView: 3,
                centeredSlides: true,
            }
        },

    });

    // Анимация кнопок
    document.querySelectorAll('.house-btn, .cta-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Плавный скролл
    document.querySelector('.cta-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.catalog').scrollIntoView({
            behavior: 'smooth'
        });
    });
});



$(document).ready(function() {
    const MAX_LENGTH = 80;

    // Функция обрезки текста
    function truncateText(text, limit) {
        if (text.length <= limit) return text;

        var truncated = text.substr(0, limit);
        var lastSpace = truncated.lastIndexOf(' ');

        if (lastSpace > 0) {
            truncated = truncated.substr(0, lastSpace);
        }

        return truncated + '...';
    }

    // Обработчик клика (делегирование)
    $(document).on('click', '.read-more', function(e) {
        e.preventDefault();

        var $link = $(this);
        var $shortText = $link.closest('.short-text');
        var $container = $shortText.closest('.text-container');
        var fullText = $container.data('full-text');

        if ($container.hasClass('expanded')) {
            // Сворачиваем
            $shortText.html(truncateText(fullText, MAX_LENGTH) + ' <a href="#" class="read-more">подробнее</a>');
            $container.removeClass('expanded');
        } else {
            // Разворачиваем
            $shortText.html(fullText + ' <a href="#" class="read-more">свернуть</a>');
            $container.addClass('expanded');
        }
    });

    // Инициализация
    $('.text-container').each(function() {
        var $container = $(this);
        var $shortText = $container.find('.short-text');

        // Получаем чистый текст без HTML
        var $clone = $shortText.clone();
        $clone.find('.read-more').remove();
        var fullText = $clone.text().trim();

        // Сохраняем полный текст
        $container.data('full-text', fullText);

        // Если текст длинный - обрезаем
        if (fullText.length > MAX_LENGTH) {
            $shortText.html(truncateText(fullText, MAX_LENGTH) + ' <a href="#" class="read-more">подробнее</a>');
        }
    });
});






document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            if (!isActive) {
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').hidden = true;
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });
            }

            item.classList.toggle('active');
            answer.hidden = isActive;
            question.setAttribute('aria-expanded', !isActive);
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Flatpickr (календари)
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    // Общие настройки для календарей
    const calendarConfig = {
        locale: 'ru',
        dateFormat: 'd.m.Y',
        minDate: 'today',
        allowInput: true,
        disableMobile: true
    };

    // Календарь заезда
    const checkinPicker = flatpickr(checkinInput, {
        ...calendarConfig,
        onChange: function(selectedDates, dateStr) {
            // Устанавливаем минимальную дату для отъезда
            if (selectedDates.length > 0) {
                checkoutPicker.set('minDate', selectedDates[0]);

                // Если дата отъезда меньше даты заезда, сбрасываем
                if (checkoutInput.value && new Date(checkoutInput.value) < selectedDates[0]) {
                    checkoutPicker.clear();
                }
            }
        }
    });

    // Календарь отъезда
    const checkoutPicker = flatpickr(checkoutInput, {
        ...calendarConfig,
        minDate: checkinInput.value || 'today'
    });

    // Dropdown functionality (из первого макета)
    const dropdownToggle = document.getElementById('houseDropdown');
    const dropdownMenu = document.getElementById('houseMenu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        dropdownMenu.classList.toggle('show');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            dropdownItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            dropdownToggle.querySelector('span').textContent = this.textContent;
            dropdownToggle.classList.remove('active');
            dropdownMenu.classList.remove('show');
        });
    });

    // Guests panel functionality
    const guestSummaryToggle = document.getElementById('guestSummaryToggle');
    const guestDetailPanel = document.getElementById('guestDetailPanel');
    const applyGuestsBtn = document.getElementById('applyGuests');
    const adultCounter = document.querySelector('#adultCount').parentElement;
    const childrenCounter = document.querySelector('#childrenCount').parentElement;

    // Toggle guests panel
    guestSummaryToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        guestDetailPanel.classList.toggle('show');
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!guestSummaryToggle.contains(e.target) && !guestDetailPanel.contains(e.target)) {
            guestSummaryToggle.classList.remove('active');
            guestDetailPanel.classList.remove('show');
        }

        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownToggle.classList.remove('active');
            dropdownMenu.classList.remove('show');
        }
    });

    // Counter functionality
    const setupCounter = (counterElement, valueElement) => {
        const minusBtn = counterElement.querySelector('.minus');
        const plusBtn = counterElement.querySelector('.plus');

        minusBtn.addEventListener('click', function() {
            let value = parseInt(valueElement.textContent);
            if (value > 0) {
                value--;
                valueElement.textContent = value;
                minusBtn.disabled = value === 0;
            }
        });

        plusBtn.addEventListener('click', function() {
            let value = parseInt(valueElement.textContent);
            value++;
            valueElement.textContent = value;
            minusBtn.disabled = false;
        });
    };

    setupCounter(adultCounter, document.getElementById('adultCount'));
    setupCounter(childrenCounter, document.getElementById('childrenCount'));

    // Apply guests selection
    applyGuestsBtn.addEventListener('click', function() {
        const adults = document.getElementById('adultCount').textContent;
        const children = document.getElementById('childrenCount').textContent;
        const pets = document.getElementById('petsCheckbox').checked;

        let summary = `${adults} взрослый`;
        if (parseInt(adults) > 1 || parseInt(adults) === 0) {
            summary = `${adults} взрослых`;
        }

        if (parseInt(children) > 0) {
            summary += `, ${children} детей`;
        } else {
            summary += `, без детей`;
        }

        document.getElementById('guestSummary').textContent = summary;

        // Close panel
        guestSummaryToggle.classList.remove('active');
        guestDetailPanel.classList.remove('show');
    });

    // AJAX отправка формы
    const bookingSubmit = document.getElementById('bookingSubmit');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const notification = document.getElementById('notification');

    bookingSubmit.addEventListener('click', async function() {
        // Проверка согласия
        if (!consentCheckbox.checked) {
            showNotification('Необходимо дать согласие на обработку персональных данных', 'error');
            return;
        }

        // Сбор данных формы
        const formData = {
            house: dropdownToggle.querySelector('span').textContent,
            checkin: checkinInput.value,
            checkout: checkoutInput.value,
            guests: {
                adults: parseInt(document.getElementById('adultCount').textContent),
                children: parseInt(document.getElementById('childrenCount').textContent),
                pets: document.getElementById('petsCheckbox').checked
            },
            consent: true,
            timestamp: new Date().toISOString()
        };

        // Валидация
        if (!formData.checkin || !formData.checkout) {
            showNotification('Выберите даты заезда и отъезда', 'error');
            return;
        }

        // Блокируем кнопку
        bookingSubmit.disabled = true;
        bookingSubmit.textContent = 'Отправка...';

        try {
            // Имитация AJAX запроса
            const response = await mockAjaxRequest(formData);

            if (response.success) {
                showNotification('Бронирование успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                // Очистка формы (опционально)
                // resetForm();
            } else {
                showNotification('Ошибка при отправке. Пожалуйста, попробуйте снова.', 'error');
            }
        } catch (error) {
            showNotification('Ошибка сети. Проверьте подключение к интернету.', 'error');
        } finally {
            // Разблокируем кнопку
            bookingSubmit.disabled = false;
            bookingSubmit.textContent = 'Забронировать';
        }
    });

    // Функция для показа уведомлений
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;

        // Автоматически скрыть через 5 секунд
        setTimeout(() => {
            notification.className = 'notification';
        }, 5000);
    }

    // Имитация AJAX запроса
    function mockAjaxRequest(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Имитация успешного ответа (90%成功率)
                if (Math.random() > 0.1) {
                    resolve({
                        success: true,
                        message: 'Booking created',
                        bookingId: 'BK-' + Date.now()
                    });
                } else {
                    reject(new Error('Server error'));
                }
            }, 1500); // Имитация задержки сети
        });
    }

    // Опционально: функция сброса формы
    function resetForm() {
        // Сброс дат
        checkinPicker.clear();
        checkoutPicker.clear();

        // Сброс гостей
        document.getElementById('adultCount').textContent = '1';
        document.getElementById('childrenCount').textContent = '0';
        document.getElementById('petsCheckbox').checked = false;
        document.getElementById('guestSummary').textContent = '1 взрослый, без детей';

        // Активация минусов
        document.querySelectorAll('.minus').forEach(btn => {
            if (btn.closest('.guest-category').querySelector('.counter-value').textContent === '0') {
                btn.disabled = true;
            }
        });

        // Сброс согласия
        consentCheckbox.checked = true;
    }
});




const burger = document.querySelector('.burger');
const menu = document.querySelector('.bottom-header');
const menuclose = document.querySelector('.cross-menu');



burger.addEventListener('click', () => {
    burger.classList.toggle('_active');
    menu.classList.toggle('_active');
    document.body.classList.toggle('lock');
});
menuclose.addEventListener('click', () => {
    burger.classList.toggle('_active');
    menu.classList.toggle('_active');
    document.body.classList.toggle('lock');
});















