/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Підключення базових стилів
import './slider.scss';
// Повний набір стилів з node_modules
// import 'swiper/css/bundle';

// Ініціалізація слайдерів
function initSliders() {
	if (document.querySelector('.destination__slider')) {
		new Swiper('.destination__slider', {
			modules: [Navigation, Keyboard],
			slidesPerView: 4,
			spaceBetween: 30,
			speed: 800,
			lazyPreloadPrevNext: 1,

			navigation: {
				prevEl: '.destination__slider-button-prev',
				nextEl: '.destination__slider-button-next',
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: true,
			},

			breakpoints: {
				260: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				560: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				680: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1030: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1400: {
					spaceBetween: 30,
				},
			},

			// Події
			on: {},
		});
	}
	if (document.querySelector('.comments-block__slider')) {
		new Swiper('.comments-block__slider', {
			modules: [Navigation, Keyboard],
			slidesPerView: 2,
			// slidesPerGroup: 1,
			spaceBetween: 20,
			//autoHeight: true,
			speed: 800,
			lazyPreloadPrevNext: 1,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.comments-block__slider-button-prev',
				nextEl: '.comments-block__slider-button-next',
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
				pageUpDown: true,
			},

			// Брейкпоінти
			breakpoints: {
				260: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			},

			// Події
			on: {},
		});
	}
	if (document.querySelector('.tour-packages__slider')) {
		let tourPackagesSlider = null;

		function initTourPackagesSlider() {
			const screenWidth = window.innerWidth;
			const slideCount = document.querySelectorAll('.tour-packages__slide').length;

			// Destroy existing slider if it exists
			if (tourPackagesSlider) {
				tourPackagesSlider.destroy(true, true);
				tourPackagesSlider = null;
			}

			if (screenWidth <= 1200 && slideCount > 6) {
				tourPackagesSlider = new Swiper('.tour-packages__slider', {
					modules: [Navigation, Keyboard],
					slidesPerView: 4,
					spaceBetween: 33,
					speed: 800,
					lazyPreloadPrevNext: 1,
					navigation: {
						prevEl: '.tour-packages__slider-button-prev',
						nextEl: '.tour-packages__slider-button-next',
					},
					keyboard: {
						enabled: true,
						onlyInViewport: true,
						pageUpDown: true,
					},
					breakpoints: {
						260: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						480: {
							slidesPerView: 2,
							spaceBetween: 25,
						},
						992: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						1200: {
							slidesPerView: 4,
							spaceBetween: 33,
						},
					},

					on: {},
				});
			}
		}

		initTourPackagesSlider();
		window.addEventListener('resize', initTourPackagesSlider);
	}
}

document.querySelector('[data-fls-slider]') ? window.addEventListener('load', initSliders) : null;
