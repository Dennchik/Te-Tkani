import loaded from './modules/preloader.js';
loaded('.preloader');

//* ----------------------------------------------------------------------------
import { dinamicAdaptive } from './assets/move-elements.js';
dinamicAdaptive();
//* ----------------------------------------------------------------------------
import ModalManager from "./layouts/layouts.js";
const modalManager = new ModalManager();
modalManager.init();
//* ----------------------------------------------------------------------------
import { showPopUpenuBottom, showPopUpMenuTop } from "./assets/pop-up-menu.js";
showPopUpenuBottom('.page__buttom-menu');
showPopUpMenuTop('.page__header');
//* ----------------------------------------------------------------------------
const dromLinks = document.querySelectorAll('.menu-bottom__link');
dromLinks.forEach(dromLink => {
	dromLink.addEventListener('click', () => {
		const dropMenu = dromLink.nextElementSibling;
		dropMenu.classList.toggle('_active');
	});
});

//* ----------------------------------------------------------------------------
import { anchorsSmoothScrolling } from "./modules/anchors-smooth-scrolling.js";
anchorsSmoothScrolling();
//* ----------------------------------------------------------------------------
console.log("%c РОССИЯ ", "background: blue; color: yellow; font-size: x-large; border-left: 5px solid black; border-top: 30px solid white; border-right: 2px solid black; border-bottom: 30px solid red;");
//* ----------------------------------------------------------------------------
