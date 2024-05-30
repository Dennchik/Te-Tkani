//todo Показываем/скрываем всплывающее меню при скроллинге страницы
export function showPopUpenuBottom(selector) {
	let prevScrollpos = window.scrollY;
	window.addEventListener('scroll', function () {
		const scrollmenu = document.querySelector(selector);
		let currentScrollPos = window.scrollY;
		if (prevScrollpos > currentScrollPos) {
			scrollmenu.style.bottom = "0px";
		} else {
			scrollmenu.style.bottom = "-65px";
		}
		prevScrollpos = currentScrollPos;
	});
}

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