import { dinamicAdaptive } from './assets/move-elements.js';
dinamicAdaptive();
import { newProductsSlide, saleProductsSlide } from "./modules/new-products-slide.js";
newProductsSlide(); saleProductsSlide();
import ItcCollapse from "./assets/collapse.js";
// -----------------------------------------------------------------------------
const menuParents = document.querySelectorAll('.menu-catalog__parent-menu');
const menuList = document.querySelector('.menu-catalog__list');
menuParents.forEach((menuParent) => {
	const trigger = menuParent.querySelector('._trigger-menu');
	trigger.addEventListener('click', () => {
		const opened_menu = menuList.querySelector('._open');
		_toggleMenu(menuParent);
		if (opened_menu && opened_menu !== menuParent) {
			_toggleMenu(opened_menu);
		}
	});
});
const _toggleMenu = (menuParent) => {
	const collapse = new ItcCollapse(menuParent.querySelector('._collapse'));
	if (menuParent.classList.contains('_open')) {
		menuParent.classList.remove('_open');
		collapse.toggle();
	} else {
		menuParent.classList.add('_open');
		collapse.toggle();
	}
};