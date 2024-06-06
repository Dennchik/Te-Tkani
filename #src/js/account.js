import ItcCollapse from "./assets/collapse.js";
function placeOrder() {
	let orderCollapse = document.querySelector('.send-order');
	const collapse = new ItcCollapse(orderCollapse.querySelector('._collapse'));
	const elcheckboxLabelement = document.querySelector('.order-place__checkbox');

	document.querySelector('.order-place__form-button').addEventListener('click', function () {
		let sendButton = document.querySelector('.order-place__send-button');
		let formButton = document.querySelector('.order-place__form-button');
		collapse.toggle();
		sendButton.style.display = 'block';
		formButton.style.display = 'none';
		elcheckboxLabelement.style.display = 'block';
	});
}
// -----------------------------------------------------------------------------
const toggleWrap = document.querySelector('.toggle-wrap');
const sudebarMenu = document.querySelector('.personal-account__column');
toggleWrap.addEventListener('click', addClassOpen);
function addClassOpen() {
	const menuPageSide = document.querySelector('.toggle-menu');
	menuPageSide.classList.toggle('_open');
	sudebarMenu.classList.toggle('_opened-menu');;
}
// -----------------------------------------------------------------------------
import { select } from './modules/itsSelect.js';
import { counterProducy } from "./layouts/counter.js";

document.addEventListener('DOMContentLoaded', function () {
	const content = document.querySelector('.personal-account__personal-data');

	function bindEvents() {
		const links = document.querySelectorAll('.link');
		links.forEach(link => {
			link.addEventListener('click', function () {
				const page = this.getAttribute('data-page');
				loadPage(page);
			});
		});
	}

	function loadPage(page) {
		fetch(`user-data/${page}.html`)
			.then(response => response.text())
			.then(data => {
				content.innerHTML = data;
				bindEvents(); // Повторно привязываем события после загрузки контента
				if (page === 'user-order') {
					restartScripts(); // Перезапускаем скрипты только при загрузке страницы user-order
				}
			})
			.catch(error => {
				console.error('Error loading page:', error);
				content.innerHTML = 'Error loading content';
			});
	}

	function restartScripts() {
		select();
		counterProducy();
		placeOrder();
		// Ваш код для перезапуска скриптов только при загрузке страницы user-order
		console.log('Scripts restarted for user-order');
	}

	bindEvents(); // Вызываем в начале, чтобы привязать события к уже существующим ссылкам
});




