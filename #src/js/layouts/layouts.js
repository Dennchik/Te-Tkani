import isMobile from "../assets/Js-devise.js";
// -----------------------------------------------------------------------------
const $ = {

	bttns: document.querySelectorAll('.burger-button'),
};
// -----------------------------------------------------------------------------
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