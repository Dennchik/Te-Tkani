import isMobile from "../assets/Js-devise.js";
// -----------------------------------------------------------------------------
const $ = {

	bttns: document.querySelectorAll('.burger-button'),
};
// -----------------------------------------------------------------------------
export function burgermenu() {
	if (isMobile.any()) {
		_loop($.bttns, 'burger-button', '_active');
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