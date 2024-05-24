import loaded from './modules/preloader.js';
loaded('.preloader');
//* ----------------------------------------------------------------------------
import { dinamicAdaptive } from './assets/move-elements.js';
dinamicAdaptive();
//* ----------------------------------------------------------------------------
import { cancelButton, buttonSearch, burgerMenu, showEMenu } from "./layouts/layouts.js";
burgerMenu(); showEMenu(); buttonSearch(); cancelButton();
//* ----------------------------------------------------------------------------
import { collapseElement } from "./layouts/layouts.js";
collapseElement();
//* ----------------------------------------------------------------------------
import { newProductsSlide } from "./modules/new-products-slide.js";
newProductsSlide();

//* ----------------------------------------------------------------------------
console.log("%c РОССИЯ ", "background: blue; color: yellow; font-size: x-large; border-left: 5px solid black; border-top: 30px solid white; border-right: 2px solid black; border-bottom: 30px solid red;");
//* ----------------------------------------------------------------------------
// import { wordWrap } from './modules/word-wrap.js';
// wordWrap();

// import dinamicAdaptive from './libraries/move-elements.js';
// dinamicAdaptive();

// import returnToSavedPosition from './modules/return-position.js';
// returnToSavedPosition();