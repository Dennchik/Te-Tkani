import isMobile from "../assets/Js-devise.js";
import ItcCollapse from "../assets/collapse.js";
//! ---------------------------------- Root ------------------------------------
const $ = {
	header: document.querySelector('.page__header'),
	bttns: document.querySelectorAll('.burger-button'),
	bttnSearch: document.querySelector('.header__button-search'),
	sidebarCatalog: document.querySelector('.page__sidebar-catalog'),
	bottomMenu: document.querySelector('.page__buttom-menu'),
	cancelButton: document.querySelector('.sidebar-search__icon-cancel'),
	menuParents: document.querySelectorAll('.menu-catalog__parent-menu'),
	menuCatalog: document.querySelector('.menu-catalog'),
	catalogCategories: document.querySelector('.catalog__categories'),
	submenuParents: document.querySelectorAll('.submenu-parent'),
};
//! --------------------------------- Main.js ----------------------------------
//todo закрываем "Menu-Catalog" 
export function cancelButton() {
	$.cancelButton.addEventListener('click', () => {
		$.sidebarCatalog.classList.remove('_opened-menu');
		document.body.classList.remove('no-scroll');
	});
}

//todo запрещаем скроллинг страницы при открытии "Menu-Catalog"
export function buttonSearch() {
	$.bttnSearch.addEventListener('click', () => {
		$.sidebarCatalog.classList.add('_opened-menu');
		document.body.classList.add('no-scroll');
	});
}
//todo Показываем/скрываем всплывающее меню при скроллинге страницы
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

export function showSubMenuCollapse() {
	const subMenuParents = document.querySelectorAll('.submenu-parent__menu');
	subMenuParents.forEach(subMenuParent => {
		const trigger = subMenuParent.querySelector('.submenu-parent__link');
		trigger.addEventListener('click', () => {
			const opened_menu = $.menuCatalog.querySelector('._active');
			console.log(opened_menu);
			_toggleMenu(subMenuParent);
			// if (opened_menu && opened_menu !== subMenuParent) {
			// 	_toggleMenu(opened_menu);
			// }
			// if (opened_menu && opened_menu === opened_menu) {
			// 	_toggleMenu(opened_menu);
			// }
		});
	});
	const _toggleMenu = (el) => {
		if (el.classList.contains('_active')) {
			el.classList.remove('_active');
		} else {
			el.classList.add('_active');
		}
	};
}

// -----------------------------------------------------------------------------
export function collapseElement() {
	$.menuParents.forEach((menuParent) => {
		const trigger = menuParent.querySelector('._trigger-menu');

		trigger.addEventListener('click', () => {
			const opened_menu = $.menuCatalog.querySelector('._open');
			console.log(opened_menu);
			_toggleMenu(menuParent);
			if (opened_menu && opened_menu !== menuParent) {
				_toggleMenu(opened_menu);
			}
		});
	});

	const _toggleMenu = (el) => {
		const collapse = new ItcCollapse(el.querySelector('._collapse'));
		if (el.classList.contains('_open')) {
			el.classList.remove('_open');
			collapse.toggle();
		} else {
			el.classList.add('_open');
			collapse.toggle();
		}
	};
}
// -----------------------------------------------------------------------------
export function burgerMenu() {
	if (isMobile.any()) {
		_loop($.bttns, 'burger-button', '_active');
	}
}
// -----------------------------------------------------------------------------
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
//! -------------------------------- Index.js ----------------------------------

//! ------------------------------- Catalog.js ---------------------------------
//todo Плавное открытие/закрытие блока при нажатии на кнопку "Фильтр:"
export function collapseCatalogFilter() {
	const trigger = $.catalogCategories.querySelector('._trigger');
	trigger.addEventListener('click', () => {
		_toggleMenu($.catalogCategories);
	});

	const _toggleMenu = (el) => {
		const collapse = new ItcCollapse($.catalogCategories.querySelector('._collapse'));
		if ($.catalogCategories.classList.contains('_open')) {
			el.classList.remove('_open');
			collapse.toggle();
		} else {
			el.classList.add('_open');
			collapse.toggle();
		}
	};
}
// -----------------------------------------------------------------------------
export function LoadCatalog() {
	const loadedMenuParent = document.querySelector('menu-catalog__parent-menu');
	document.addEventListener("DOMContentLoaded", function () {

		$.parentMenu.classList.add('_active');
		console.log($.parentMenu);
		// _toggleMenu($.catalogCategories);
		const collapse = new ItcCollapse(loadedMenuParent.querySelector('._collapse'));
		if (loaded.classList.contains('_open')) {
			collapse.toggle();
		}
	});
	// const _toggleMenu = (el) => {
	// 	const collapse = new ItcCollapse(loadedMenuParent.querySelector('._collapse'));
	// 	if ($.catalogCategories.classList.contains('_open')) {
	// 		el.classList.remove('_open');
	// 		collapse.toggle();
	// 	} else {
	// 		el.classList.add('_open');
	// 		collapse.toggle();
	// 	}
	// };
}

// -----------------------------------------------------------------------------
export function loadedCatalog() {
	document.addEventListener("DOMContentLoaded", function () {
		const active_menu = $.menuCatalog.querySelector('._active');
		_loadedMenu(active_menu);
	});
	const _loadedMenu = (el) => {
		const collapse = new ItcCollapse(el.querySelector('._collapse'));
		if (el.classList.contains('_active')) {
			el.classList.add('_open');
			collapse.toggle();
		}
	};
}
//todo -----------Событие при нажатии на кнопку "Оформить заказ"----------------
export function placeOrder() {
	document.querySelector('.order-place__form-button').addEventListener('click', function () {
		const element = document.querySelector('.send-order');
		// Находим элемент, который нужно скопировать
		const sourceBlock = document.querySelector('.order-place');

		// Копируем содержимое блока
		const clonedContent = sourceBlock.cloneNode(true);

		// Находим целевой блок
		const targetBlock = document.querySelector('.send-order__order-place');

		// Очищаем целевой блок
		targetBlock.innerHTML = '';

		// Вставляем скопированное содержимое
		targetBlock.appendChild(clonedContent);

		// Добавляем семантический класс
		targetBlock.classList.add('place-order');
	});
}
