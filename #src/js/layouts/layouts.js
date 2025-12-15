/**
 * Универсальная система модальных окон - Минимальная версия
 * Простая интеграция в существующий код
 */

// Класс для управления модальными окнами
export default class ModalManager {
	constructor() {
		this.activeModals = new Set();
		this.init();
	}

	/**
	 * Инициализация всех модальных окон
	 */
	init() {
		this.initModalButtons();
		this.initModalCloseButtons();
		this.initOverlayClickClose();
		this.initEscapeKeyClose();
	}

	/**
	 * Инициализация кнопок открытия модальных окон
	 */
	initModalButtons() {
		const modalButtons = document.querySelectorAll('[data-modal-id]');

		modalButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				e.preventDefault();
				const modalId = button.getAttribute('data-modal-id');
				this.openModal(modalId);
			});
		});
	}

	/**
	 * Инициализация кнопок закрытия модальных окон
	 */
	initModalCloseButtons() {
		const closeButtons = document.querySelectorAll('[data-modal-close]');

		closeButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				e.preventDefault();
				const modal = button.closest('[data-modal]');
				if (modal) {
					this.closeModal(modal.id);
				}
			});
		});
	}

	/**
	 * Закрытие модального окна при клике по оверлею
	 */
	initOverlayClickClose() {
		document.addEventListener('click', (e) => {
			const modal = e.target.closest('[data-modal]');

			// Агар клик внутри модального окна — ничего не делаем
			if (modal) return;

			// Агар клик по кнопке открытия модального окна — ничего не делаем
			if (e.target.closest('[data-modal-id]')) return;

			// Иначе — закрываем все модальные окна
			this.closeAllModals();
		});
	}

	/**
	 * Закрытие модального окна при нажатии Escape
	 */
	initEscapeKeyClose() {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.activeModals.size > 0) {
				const lastModalId = Array.from(this.activeModals).pop();
				this.closeModal(lastModalId);
			}
		});
	}

	/**
	 * Открытие модального окна по ID
	 */
	openModal(modalId) {
		const modal = document.getElementById(modalId);
		if (!modal) {
			console.warn(`Модальное окно с ID "${modalId}" не найдено`);
			return;
		}

		// Если это модальное окно уже открыто — выходим
		if (this.activeModals.has(modalId)) {
			return;
		}

		// Закрываем все ранее открытые модальные окна
		this.closeAllModals();

		// Показываем модальное окно
		modal.classList.add('_show');
		modal.classList.add('_active');

		// Блокируем скроллинг страницы
		document.body.classList.add('no-scroll');

		// Добавляем в список активных модальных окон
		this.activeModals.add(modalId);

		// Вызываем колбэк открытия, если он есть
		const onOpen = modal.getAttribute('data-on-open');
		if (onOpen && typeof window[onOpen] === 'function') {
			window[onOpen](modal);
		}
	}

	/**
	 * Закрытие модального окна по ID
	 */
	closeModal(modalId) {
		const modal = document.getElementById(modalId);
		if (!modal) {
			console.warn(`Модальное окно с ID "${modalId}" не найдено`);
			return;
		}

		// Скрываем модальное окно
		modal.classList.remove('_show');
		modal.classList.remove('_active');

		// Удаляем из списка активных модальных окон
		this.activeModals.delete(modalId);

		// Разблокируем скроллинг, если нет других активных модальных окон
		if (this.activeModals.size === 0) {
			document.body.classList.remove('no-scroll');
		}

		// Вызываем колбэк закрытия, если он есть
		const onClose = modal.getAttribute('data-on-close');
		if (onClose && typeof window[onClose] === 'function') {
			window[onClose](modal);
		}
	}

	/**
	 * Переключение модального окна (открыть/закрыть)
	 */
	toggleModal(modalId) {
		const modal = document.getElementById(modalId);
		if (!modal) return;

		if (this.activeModals.has(modalId)) {
			this.closeModal(modalId);
		} else {
			this.openModal(modalId);
		}
	}

	/**
	 * Закрытие всех модальных окон
	 */
	closeAllModals() {
		const modalIds = Array.from(this.activeModals);
		modalIds.forEach(modalId => {
			this.closeModal(modalId);
		});
	}

	/**
	 * Проверка, открыто ли модальное окно
	 */
	isModalOpen(modalId) {
		return this.activeModals.has(modalId);
	}
}

// Один экземпляр на всё приложение
// const modalManager = new ModalManager();

// // Экспортируем функции для удобства использования
// const openModal = (modalId) => modalManager.openModal(modalId);
// const closeModal = (modalId) => modalManager.closeModal(modalId);
// const toggleModal = (modalId) => modalManager.toggleModal(modalId);
// const closeAllModals = () => modalManager.closeAllModals();
// const isModalOpen = (modalId) => modalManager.isModalOpen(modalId);
//
// // Для совместимости с ES6 модулями
// if (typeof module !== 'undefined' && module.exports) {
// 	module.exports = {
// 		ModalManager,
// 		modalManager,
// 		openModal,
// 		closeModal,
// 		toggleModal,
// 		closeAllModals,
// 		isModalOpen
// 	};
// }
//
// // Для глобального доступа
// window.ModalManager = ModalManager;
// window.modalManager = modalManager;
// window.openModal = openModal;
// window.closeModal = closeModal;
// window.toggleModal = toggleModal;
// window.closeAllModals = closeAllModals;
// window.isModalOpen = isModalOpen;