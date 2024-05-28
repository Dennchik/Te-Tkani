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
	userButtons: document.querySelectorAll('.login-container__user-button')
};
// -----------------------------------------------------------------------------


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
			// const opened_menu = $.menuCatalog.querySelector('._active');
			_toggleMenu(subMenuParent);
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
//* --------------При загрузки "Catalog.html" открывает "Блэкаут"---------------
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
//* -----------------------------Login-container--------------------------------
export function userMenu() {
	for (let i = 0; i < $.userButtons.length; i++) {
		const userButton = $.userButtons[i];

		userButton.addEventListener('click', (e) => {
			let target = e.target;

			let loginContent = loginList(target, '.login-container__fade-in');
			loginContent.classList.toggle('_visible');

			let loginModal = loginList(target, '.login-modal');
			removeElement(loginModal, '_show');

			window.addEventListener('click', function (e) {
				let loginContainer = target.closest('.login-container');
				if (!loginContainer.contains(e.target)) {
					removeElement(loginContent, '_visible');
				}
			});
		});
	}

	// Выбираем все элементы с calss="login"
	const userLogins = document.querySelectorAll('.login');

	// Добавляем обработчики событий для всех элементов с class="login"
	userLogins.forEach((userLogin) => {
		userLogin.addEventListener('click', (e) => {
			let target = e.target;

			//Выбираем контейнер ранее открытый соответствующий нажатой кнопки
			let loginContent = loginList(target, '.login-container__fade-in');
			removeElement(loginContent, '_visible');

			// Выбираем модальное окно и элементы внутри него;
			let loginModal = loginList(target, '.login-modal');
			// Показываем модальное окно с плавным появлением 
			loginModal.classList.toggle('_show');

			// Закрываем модальное окно
			let closeButton = loginModal.querySelector('.login-modal__close');
			closeModal(closeButton, loginModal);

			window.addEventListener('click', function (e) {
				let loginContainer = target.closest('.login-container');
				if (!loginContainer.contains(e.target)) {
					removeElement(loginModal, '_show');
				}
			});
		});
	});


	// Добавляем обработчики событий для всех элементов востановить пароль.
	const loginRecoverys = document.querySelectorAll('.login-modal__recovery');

	loginRecoverys.forEach(loginRecovery => {
		loginRecovery.addEventListener('click', (e) => {
			let target = e.target;
			let loginContent = loginList(target, '.recovery-modal');
			// Закрываем модальное окно
			let closeButton = loginModal.querySelector('.recovery-modal__close');
			console.log(closeButton);

			closeModal(closeButton, loginModal);
			console.log(loginContent);
		});
	});

	// Добавляем обработчик события для кнопки закрытия модального окна
	function closeModal(el, modal) {
		el.addEventListener('click', () => {
			// Скрываем модальное окно с плавным исчезновением
			modal.classList.remove('_show');
		});
	}

	function loginList(target, el) {
		return target.closest('.login-container').querySelector(el);
	}

	function removeElement(el, className) {
		el.classList.remove(className);
	}
}
