import loaded from './modules/preloader.js';
loaded('.preloader');
//* ----------------------------------------------------------------------------

//* ----------------------------------------------------------------------------
import { dinamicAdaptive } from './assets/move-elements.js';
dinamicAdaptive();
//* ----------------------------------------------------------------------------
import { cancelButton, openMenuCatalog, openMainMenu, showBottomMenu, showSubMenuCollapse, collapseElement, userMenu, addFafouritItems } from "./layouts/layouts.js";
showBottomMenu();
openMenuCatalog();
openMainMenu();
cancelButton();
showSubMenuCollapse();
collapseElement();
userMenu();
addFafouritItems();
//* ----------------------------------------------------------------------------

//* ----------------------------------------------------------------------------

//* ----------------------------------------------------------------------------
console.log("%c РОССИЯ ", "background: blue; color: yellow; font-size: x-large; border-left: 5px solid black; border-top: 30px solid white; border-right: 2px solid black; border-bottom: 30px solid red;");
//* ----------------------------------------------------------------------------
