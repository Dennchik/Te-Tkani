import isMobile from "../assets/Js-devise.js";
// -----------------------------------------------------------------------------
const $ = {
	header: document.querySelector('.page__header'),
	bttns: document.querySelectorAll('.burger-button'),
	bttnSearch: document.querySelector('.header__button-search'),
	sidebarSearch: document.querySelector('.page__sidebar-search'),
	bottomMenu: document.querySelector('.page__buttom-menu'),
	cancelButton: document.querySelector('.sidebar-search__icon-cancel')
};
// -----------------------------------------------------------------------------
// export function heightOffSet() {
// 	const headerHeight = $.header.offsetHeight;
// 	const bottomMenuHeight = $.bottomMenu.offsetHeight;
// 	addEventListener('DOMContentLoaded', () => {
// 		$.sidebarSearch.style.top = `${headerHeight}px`;
// 		$.sidebarSearch.style.height = `calc(100% - (${bottomMenuHeight}px + ${headerHeight}px))`;
// 	});
// }
// -----------------------------------------------------------------------------
export function cancelButton() {
	$.cancelButton.addEventListener('click', () => {
		$.sidebarSearch.classList.remove('_opened-menu');
		document.body.classList.remove('no-scroll');
	});

}
export function buttonSearch() {
	$.bttnSearch.addEventListener('click', () => {
		$.sidebarSearch.classList.add('_opened-menu');
		document.body.classList.add('no-scroll');
	});
}
// -----------------------------------------------------------------------------
export function burgerMenu() {
	if (isMobile.any()) {
		_loop($.bttns, 'burger-button', '_active');
	}
}
function _loop(els, elClosest, md) {
	for (let i = 0; i < els.length; i++) {
		let item = els[i];
		item.addEventListener('click', () => {
			switch (true) {
				case item.classList.contains(elClosest):
					item.classList.toggle(md);
					// $.openSide.classList.toggle('opened-menu');
					break;
				default:
					item.closest(elClosest).classList.toggle(md);
					break;
			}
		});
	}
}
// -----------------------------------------------------------------------------
export function showEMenu() {
	let prevScrollpos = window.scrollY;
	window.onscroll = function () {
		const scrollmenu = document.querySelector('.page__buttom-menu');
		let currentScrollPos = window.scrollY;
		if (prevScrollpos > currentScrollPos) {
			scrollmenu.style.bottom = "0px";
		} else {
			scrollmenu.style.bottom = "-65px";
		}
		prevScrollpos = currentScrollPos;
	};
}
// -----------------------------------------------------------------------------
