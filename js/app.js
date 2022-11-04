const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header__menu');
const headerBurger = document.querySelector('.burger-menu');
const body = document.body;
const contact = document.querySelector('.contact');
//===================================================================================================================================================================
document.addEventListener("click", (e) => {
	//BURGER
	const target = e.target;
	if (target.closest('.burger-menu')) {
		headerMenu.classList.toggle("active");
		headerBurger.classList.toggle("active");
		if (headerBurger.classList.contains('active')) {
			bodyLock();
		}
		else {
			bodyUnlock();
		}
	}
	//<<BURGER

	//POPUP
	if (target.closest('[data-contact]')) {
		showPopUp(contact, 'active', e);
	}
	if (target.classList.contains('contact')) {
		hidePopUp(contact, "active");
	}
	if (target.classList.contains('contact__close')) {
		hidePopUp(contact, "active");
	}
	//<<POPUP

	//OPEN IMG BY CLICK>>==add to img data-open="true"===========
	if (target.closest('img[data-open="true"]')) {
		let img = target.closest('img[data-open="true"]');
		let sourceImg = img.getAttribute('src');
		let altImg = img.getAttribute('alt');
		body.insertAdjacentHTML('afterbegin',
			`<div class="open-img"><span class="open-img__close"></span><img src="${sourceImg}" alt="${altImg}"></div>`);
		bodyLock();
	}
	//close by click closeSpan
	if (target.closest('.open-img__close')) {
		CloseImg();
	}
	//close by click to background
	if (target == target.closest('.open-img')) {
		CloseImg();
	}
	//<<open imbg ny click==

	if (window.innerWidth <= 767) {
		if (target.classList.contains('menu-header__link') && !target.hasAttribute('data-contact')) {
			if (headerMenu.classList.contains('active')) {
				headerMenu.classList.remove("active");
				headerBurger.classList.remove("active");
				bodyUnlock();
			}
		}
	}
});
document.addEventListener("keydown", (e) => {
	if (window.innerWidth >= 998) {
		if (e.code == "Escape") // Escape
		{
			hidePopUp(contact, "active");
			//close by click to "Escape"
			if (e.code == "Escape") {
				CloseImg();
			}
			//<<open imbg by click==
		}
	}
});

document.addEventListener("scroll", (e) => {
	const target = e.target;
	if (window.scrollY >= 40) {
		header.style.backgroundColor = "#2a2a2a";
	} else {
		header.style.backgroundColor = null;
	}
});
//===================================================================================================================================================================
if (window.innerWidth <= 767) {
	//replace slide's tittle when viewport <=767
	const portfolioSlides = document.querySelectorAll('.portfolio__slide');
	if (portfolioSlides.length > 0) {
		portfolioSlides.forEach(slide => {
			const slideTittle = slide.querySelector('.slide-portfolio__tittle');
			if (slideTittle) {
				slide.insertAdjacentHTML('afterbegin', `${slideTittle.outerHTML}`);
				slideTittle.remove();
			}
		});
		//<<replace slide's tittle when viewport <=767
	}
}
//===================================================================================================================================================================
function bodyLock() {
	if (!body.style.overflow) {
		const paddingRight = window.innerWidth - body.offsetWidth + "px";
		body.style.paddingRight = paddingRight;
		header.style.paddingRight = paddingRight;
		body.style.overflow = "hidden";
	}
}
function bodyUnlock() {
	if (body.style.overflow == "hidden" && !headerBurger.classList.contains('active') && !contact.classList.contains('active')) {
		body.style.paddingRight = "0px";
		body.style.overflow = null;
	}
}
function showPopUp(popUp, className, e) {
	e.preventDefault();
	const wndScrollY = window.scrollY;
	popUp.style.top = wndScrollY + "px";
	popUp.classList.add(className);
	bodyLock();
}
function hidePopUp(popUp, className) {
	if (popUp.classList.contains(className)) {
		popUp.classList.remove(className);
	}
	bodyUnlock();
}
function CloseImg() {
	let img = document.querySelector('.open-img');
	if (img) {
		img.remove();
	}
	bodyUnlock();
}
//===================================================================================================================================================================
import * as swiperJs from './swiper-bundle.min.js';

new Swiper('.portfolio__slider', {
	// Optional parameters
	loop: true,
	spaceBetween: 30,
	autoHeight: true,
	// If we need pagination
	pagination: {
		el: '.portfolio__pagination',
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.portfolio__arrow-next',
		prevEl: '.portfolio__arrow-prev',
		enabled: false,
	},

	breakpoints: {
		// when window width is >= 320px
		768: {
			navigation: {
				enabled: true,
			},
		},
	},
	// And if we need scrollbar
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// },
});