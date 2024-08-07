// import isMobile from "../assets/Js-devise.js";
import ItcCollapse from "../assets/collapse.js";
//! ---------------------------------- Root ------------------------------------
const $ = {
	header: document.querySelector('.page__header'),
	bttnSearch: document.querySelector('.header__button-sidebarcatalog'),
	burgerButton: document.querySelector('.burger-button'),
	sidebarCatalog: document.querySelector('.page__sidebar-catalog'),
	sidebarMenu: document.querySelector('.page__sidebar-menu'),
	bottomMenu: document.querySelector('.page__buttom-menu'),
	cancelButtonsCatalog: document.querySelector('.catalog-cansel'),
	cancelButtonsMenu: document.querySelector('.menu-cansel'),
	menuParents: document.querySelectorAll('.menu-catalog__parent-menu'),
	menuCatalog: document.querySelector('.menu-catalog'),
	catalogCategories: document.querySelector('.catalog__categories'),
	submenuParents: document.querySelectorAll('.submenu-parent'),
	userButtons: document.querySelectorAll('.login-container__user-button'),
	favouritItems: document.querySelectorAll('.slide-container__favourit')
};
//! -------------------------- Добавить в избранное ---------------------------
export function addFafouritItems() {
	$.favouritItems.forEach(favouritItem => {
		favouritItem.addEventListener('click', () => {
			favouritItem.classList.toggle('_add-product');
		});
	});
}
//! --------------------------------- Main.js ----------------------------------
//todo запрещаем скроллинг страницы при открытии "Menu-Catalog"
export function openMenuCatalog() {
	$.bttnSearch.addEventListener('click', () => {
		$.sidebarCatalog.classList.toggle('_opened-menu');
		$.sidebarMenu.classList.remove('_opened-menu');
		$.bttnSearch.classList.toggle('_active');
		$.burgerButton.classList.remove('_active');
		if ($.sidebarCatalog.classList.contains('_opened-menu')) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}

	});
}
//todo запрещаем скроллинг страницы при открытии "Main-Menu"
export function openMainMenu() {
	$.burgerButton.addEventListener('click', () => {
		$.sidebarMenu.classList.toggle('_opened-menu');
		$.sidebarCatalog.classList.remove('_opened-menu');
		$.burgerButton.classList.toggle('_active');
		$.bttnSearch.classList.remove('_active');
		if ($.sidebarMenu.classList.contains('_opened-menu')) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	});
}
// -----------------------------------------------------------------------------
export function showSubMenuCollapse() {
	const subMenuParents = document.querySelectorAll('.submenu-parent__menu');
	subMenuParents.forEach(subMenuParent => {
		const trigger = subMenuParent.querySelector('.submenu-parent__link');
		trigger.addEventListener('click', () => {
			if (trigger.classList.contains('_trigger')) {
				_toggleMenu(subMenuParent);
			}

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
	const menuParents = document.querySelectorAll('.menu-catalog__parent-menu');
	const menuList = document.querySelector('.sidebar-catalog__menu');
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
	let orderCollapse = document.querySelector('.send-order');
	const collapse = new ItcCollapse(orderCollapse.querySelector('._collapse'));
	const elcheckboxLabelement = document.querySelector('.order-place__checkbox');

	document.querySelector('.order-place__form-button').addEventListener('click', function () {
		let titleDocument = document.querySelector('.cart-page__title');
		let sendButton = document.querySelector('.order-place__send-button');
		let formButton = document.querySelector('.order-place__form-button');
		titleDocument.innerHTML = 'оформление заказа';
		collapse.toggle();
		sendButton.style.display = 'block';
		formButton.style.display = 'none';
		elcheckboxLabelement.style.display = 'block';


	});
}
//* -----------------------------Login-container--------------------------------
export function userMenu() {
	for (let i = 0; i < $.userButtons.length; i++) {
		const userButton = $.userButtons[i];

		userButton.addEventListener('click', (e) => {
			let target = e.target;

			// Открываем скрытое модальноеменю выбора;
			let loginContent = loginList(target, '.login-container__list');
			loginContent.classList.toggle('_visible');

			// Закрываем модальное окно "Login";
			let loginModal = loginList(target, '.login-modal');
			removeElement(loginModal, '_show');

			// Закрываем модальное окно "Регистрация";
			let registrationModal = loginList(target, '.registrations-modal');
			removeElement(registrationModal, '_show');

			// Закрываем модальное окно "востановление электронной почты";
			let recoveryModal = loginList(target, '.recovery-modal');
			removeElement(recoveryModal, '_show');

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

	// Добавляем обработчики событий для всех элементов с class="login";
	userLogins.forEach((userLogin) => {
		userLogin.addEventListener('click', (e) => {
			let target = e.target;

			//Закрываем ранее открытое модальное окно "User-Content";
			let loginContent = loginList(target, '.login-container__list');
			removeElement(loginContent, '_visible');

			let recoveryModal = loginList(target, '.recovery-modal');
			removeElement(recoveryModal, '_show');

			// Выбираем модальное окно и элементы внутри него;
			let loginModal = loginList(target, '.login-modal');

			// Закрываем модальное окно "Регистрация";
			let registrationModal = loginList(target, '.registrations-modal');
			removeElement(registrationModal, '_show');

			// Показываем модальное окно с плавным появлением;
			loginModal.classList.toggle('_show');

			// Закрываем модальное окно при нажатии на кнопку закрыть "X";
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


	// Добавляем обработчики событий для всех элементов востановить пароль;
	const loginRecoverys = document.querySelectorAll('.login-modal__recovery');

	loginRecoverys.forEach(loginRecovery => {
		loginRecovery.addEventListener('click', (e) => {
			let target = e.target;

			// Открываем модальное окно "востановление электронной почты";
			let recoveryModal = loginList(target, '.recovery-modal');
			recoveryModal.classList.toggle('_show');

			// Закрываем ранее открытое модальное;
			let loginModal = loginList(target, '.login-modal');
			removeElement(loginModal, '_show');

			// Закрываем модальное окно при нажатии на кнопку закрыть "X";
			let closeButton = recoveryModal.querySelector('.recovery-modal__close');
			closeModal(closeButton, recoveryModal);

			window.addEventListener('click', function (e) {
				let loginContainer = target.closest('.login-container');
				if (!loginContainer.contains(e.target)) {
					removeElement(recoveryModal, '_show');
				}
			});
		});
	});

	// Добавляем обработчики событий для всех элементов 'Регистрация';
	const registrations = document.querySelectorAll('.registrations');
	registrations.forEach(registration => {
		registration.addEventListener('click', (e) => {
			let target = e.target;

			// Закрываем модальное окно "User-Content";
			let loginContent = loginList(target, '.login-container__list');
			removeElement(loginContent, '_visible');

			// Закрываем ранее открытое модальное окно;
			let loginModal = loginList(target, '.login-modal');
			removeElement(loginModal, '_show');

			// Открываем модальное окно "Регистрация";
			let registrationModal = loginList(target, '.registrations-modal');
			registrationModal.classList.toggle('_show');

			let recoveryModal = loginList(target, '.recovery-modal');
			removeElement(recoveryModal, '_show');

			window.addEventListener('click', function (e) {
				let loginContainer = target.closest('.login-container');
				if (!loginContainer.contains(e.target)) {
					removeElement(registrationModal, '_show');
				}
			});
		});
	});

	const buttonPrivatePersons = document.querySelectorAll('.registrations-modal__button-private-person');
	const registrationsFiz = document.querySelector('.modal-registrations-fiz');
	buttonPrivatePersons.forEach(buttonPrivatePerson => {
		buttonPrivatePerson.addEventListener('click', (e) => {
			let target = e.target;

			// Закрываем ранее открытое модальное окно;
			let registrationModal = loginList(target, '.registrations-modal');
			removeElement(registrationModal, '_show');

			// Открываем модальное окно "Регистрация для физ-лиц";
			registrationsFiz.classList.add('_show');
			document.body.classList.add('no-scroll');

			let closeButton = registrationsFiz.querySelector('.modal-registrations-fiz__close-btn');
			closeButton.addEventListener('click', () => {
				registrationsFiz.classList.remove('_show');
				document.body.classList.remove('no-scroll');
			});
		});


		const buttonCorporatePersons = document.querySelectorAll('.registrations-modal__button-corporate-person');
		const registrationsUre = document.querySelector('.modal-registrations-ure');
		buttonCorporatePersons.forEach(buttonCorporatePerson => {
			buttonCorporatePerson.addEventListener('click', (e) => {
				let target = e.target;

				// Закрываем ранее открытое модальное окно;
				let registrationModal = loginList(target, '.registrations-modal');
				removeElement(registrationModal, '_show');

				// Открываем модальное окно "Регистрация для юр-лиц";
				registrationsUre.classList.add('_show');
				document.body.classList.add('no-scroll');

				let closeButton = registrationsUre.querySelector('.modal-registrations-ure__close-btn');
				closeButton.addEventListener('click', () => {
					registrationsUre.classList.remove('_show');
					document.body.classList.remove('no-scroll');
				});
			});
		});
	});

	//todo Функция закрытия модального окна;
	function closeModal(el, modal) {
		el.addEventListener('click', () => {
			// Скрываем модальное окно с плавным исчезновением;
			modal.classList.remove('_show');
		});
	}

	//todo Функция выбора элементов внутри контецнера "login-container";
	function loginList(target, el) {
		return target.closest('.login-container').querySelector(el);
	}
	//todo Функция удалениет классов;
	function removeElement(el, className) {
		el.classList.remove(className);
	}
}
