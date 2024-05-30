//todo Показываем/скрываем всплывающее меню при скроллинге страницы
export function showPopUpenuBottom(el) {
	let prevScrollpos = window.scrollY;
	window.onscroll = function () {
		const scrollmenu = document.querySelector(el);
		let currentScrollPos = window.scrollY;
		if (prevScrollpos > currentScrollPos) {
			scrollmenu.style.bottom = "0px";
		} else {
			scrollmenu.style.bottom = "-65px";
		}
		prevScrollpos = currentScrollPos;
	};
}
// export function showPopUpenuTop(el) {
// 	let prevScrollpos = window.scrollY;
// 	window.onscroll = function () {
// 		const scrollmenu = document.querySelector(el);
// 		let currentScrollPos = window.scrollY;
// 		if (prevScrollpos > currentScrollPos) {
// 			scrollmenu.style.top = "0px";
// 		} else {
// 			scrollmenu.style.top = "-145px";
// 		}
// 		prevScrollpos = currentScrollPos;
// 	};
// }

// export function showPopUpMenuTop() {
// 	let prevScrollpos = window.scrollY;

// 	window.addEventListener('scroll', function () {
// 		const scrollMenu = document.querySelector('.page__header');
// 		let currentScrollPos = window.scrollY;

// 		if (prevScrollpos - currentScrollPos > 150) {
// 			// Прокрутка вверх на более чем 150px
// 			scrollMenu.style.top = "0px";
// 		} else if (currentScrollPos - prevScrollpos > 150) {
// 			// Прокрутка вниз на более чем 150px
// 			scrollMenu.style.top = "-145px";
// 		}

// 		prevScrollpos = currentScrollPos;
// 	});
// }
export function showPopUpMenuTop(selector) {
	let prevScrollpos = window.scrollY;

	window.addEventListener('scroll', function () {
		const scrollMenu = document.querySelector(selector);
		let currentScrollPos = window.scrollY;

		if (prevScrollpos > currentScrollPos) {
			// Прокрутка вверх на более чем 150px
			scrollMenu.style.top = "0";
		} else if (prevScrollpos > 150) {
			// Прокрутка вниз на более чем 150px
			scrollMenu.style.top = "-145px";
		}

		prevScrollpos = currentScrollPos;
	});
}