import loaded from './modules/preloader.js';
loaded('.preloader');
//* ----------------------------------------------------------------------------
import { dinamicAdaptive } from './assets/move-elements.js';
dinamicAdaptive();
//* ----------------------------------------------------------------------------
import { cancelButton, buttonSearch, burgerMenu, showEMenu, showSubMenuCollapse, collapseElement, userMenu } from "./layouts/layouts.js";
burgerMenu();
showEMenu();
// buttonSearch();
cancelButton();
showSubMenuCollapse();
collapseElement();
userMenu();
//* ----------------------------------------------------------------------------

//* ----------------------------------------------------------------------------
import { newProductsSlide } from "./modules/new-products-slide.js";
newProductsSlide();

//* ----------------------------------------------------------------------------
console.log("%c РОССИЯ ", "background: blue; color: yellow; font-size: x-large; border-left: 5px solid black; border-top: 30px solid white; border-right: 2px solid black; border-bottom: 30px solid red;");
//* ----------------------------------------------------------------------------
