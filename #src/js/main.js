import loaded from './modules/preloader.js';
loaded('.preloader');
//* ----------------------------------------------------------------------------

//* ----------------------------------------------------------------------------
import { dinamicAdaptive } from './assets/move-elements.js';
dinamicAdaptive();
//* ----------------------------------------------------------------------------
import { cancelButton, openMenuCatalog, openMainMenu, showSubMenuCollapse, collapseElement, userMenu, addFafouritItems } from "./layouts/layouts.js";

openMenuCatalog();
openMainMenu();
cancelButton();
showSubMenuCollapse();
collapseElement();
userMenu();
addFafouritItems();
//* ----------------------------------------------------------------------------
import { showPopUpenuBottom, showPopUpMenuTop } from "./assets/pop-up-menu.js";
showPopUpenuBottom('.page__buttom-menu');
showPopUpMenuTop('.page__header');
// showPopUpMenuTop();
//* ----------------------------------------------------------------------------
const dromLinks = document.querySelectorAll('.menu-bottom__link');
dromLinks.forEach(dromLink => {
	dromLink.addEventListener('click', () => {
		const dropMenu = dromLink.nextElementSibling;
		console.log(dropMenu);
		dropMenu.classList.toggle('._active');
	});
});
//* ----------------------------------------------------------------------------
console.log("%c РОССИЯ ", "background: blue; color: yellow; font-size: x-large; border-left: 5px solid black; border-top: 30px solid white; border-right: 2px solid black; border-bottom: 30px solid red;");
//* ----------------------------------------------------------------------------
