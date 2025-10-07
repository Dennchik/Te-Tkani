import ItcCollapse from "../assets/collapse.js";

//* ------------------------------ [Select]-------------------------------------
export function select() {
	// Загружаем фильтры один раз в начале
	let filters = loadFiltersFromLocal();

	// Глобальные обработчики — добавляем ОДИН раз (не внутри каждой select)
	document.addEventListener('click', function (e) {
		// Если клик вне любого .select — закрываем все выпадающие
		if (!e.target.closest('.select')) {
			closeAll();
		}
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			closeAll();
		}
	});

	document.querySelectorAll('[data-select]').forEach(function (selectGroup) {
		const itsSelects = Array.from(selectGroup.querySelectorAll('.select'));

		itsSelects.forEach(itsSelect => {
			const listItems = Array.from(itsSelect.querySelectorAll('.select__list-item'));
			const SelectInput = itsSelect.querySelector('.select__button');

			// Получаем ключ; проверяем его — если нет, выводим предупреждение и НЕ сохраняем в localStorage
			const filterKey = SelectInput ? SelectInput.getAttribute('data-select-key') : null;
			if (!filterKey) {
				console.warn('[select] data-select-key отсутствует для', itsSelect);
			}

			let start = listItems.length > 0 ? listItems[0] : null;

			// Обновляем UI из загруженных фильтров (если ключ есть)
			if (filterKey) {
				if (!Array.isArray(filters[filterKey])) filters[filterKey] = [];
				restoreUIFromLocal(filters[filterKey], listItems, SelectInput);
			} else {
				restoreUIFromLocal([], listItems, SelectInput);
			}

			// Обработчик клика по селекту (локальный)
			itsSelect.addEventListener('click', function (ev) {
				const target = ev.target;

				if (target.closest('.select__button')) {
					const opened_select = document.querySelector('._active-collapse');
					_toggleOpen(itsSelect);

					if (target.closest('.select__box-button')) {
						const next = target.closest('.select__box-button').nextElementSibling;
						if (next) {
							const sel = next.querySelector('._selected');
							if (sel) start = sel;
						}
					}

					if (!itsSelect.classList.contains('_active-collapse')) {
						if (SelectInput) SelectInput.blur();
					}

					if (opened_select && opened_select !== itsSelect) {
						_toggleOpen(opened_select);
					}
				}

				// Делегируем клик по элементам списка — если клик внутри .select и это .select__list-item
				const listItem = target.closest('.select__list-item');
				if (listItem && itsSelect.contains(listItem)) {
					// Обработка выбора
					const value = listItem.textContent.trim();

					if (filterKey) {
						// Работаем с in-memory filters, не грузим заново с localStorage
						if (!Array.isArray(filters[filterKey])) filters[filterKey] = [];

						if (filters[filterKey].includes(value)) {
							filters[filterKey] = filters[filterKey].filter(item => item !== value);
							listItem.classList.remove('_selected');
							console.log(`[select] Removed value "${value}" from key "${filterKey}"`);
						} else {
							filters[filterKey].push(value);
							listItem.classList.add('_selected');
							console.log(`[select] Added value "${value}" to key "${filterKey}"`);
						}

						// Сохраняем весь объект filters один раз
						saveFiltersToLocal(filters);
						updateInputValue(filters[filterKey], SelectInput);
					} else {
						// Если ключа нет — просто визуально переключаем
						listItem.classList.toggle('_selected');
						updateInputValue(
							Array.from(itsSelect.querySelectorAll('._selected')).map(i => i.textContent.trim()),
							SelectInput
						);
					}
				}
			}); // itsSelect click end

			// Навигация клавишами — локально для группы
			itsSelect.addEventListener('keydown', function (e) {
				if (!['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) return;
				e.preventDefault();

				if (e.key === 'ArrowUp') {
					const prev = start ? start.previousElementSibling : null;
					selectNext(prev);
				} else if (e.key === 'ArrowDown') {
					const next = start ? start.nextElementSibling : null;
					selectNext(next);
				} else if (e.key === 'Enter') {
					selectValue();
					closeAll();
				}
			});

			function selectNext(sibling) {
				if (sibling !== null) {
					if (start) start.classList.remove('_selected');
					sibling.focus();
					sibling.classList.add('_selected');
					start = sibling;
				}
			}

			const _toggleOpen = (el) => {
				const collapseEl = el.querySelector('._collapse');
				if (!collapseEl) return;
				const collapse = new ItcCollapse(collapseEl);
				if (el.classList.contains('_active-collapse')) {
					el.classList.remove('_active-collapse');
					collapse.toggle();
				} else {
					el.classList.add('_active-collapse');
					collapse.toggle();
				}
			};

			function selectValue() {
				if (!start) return;
				if (SelectInput) {
					SelectInput.value = start.textContent.trim();
					SelectInput.blur();
				}
			}
		}); // itsSelects.forEach end
	}); // selectGroup.forEach end

	// Закрыть все селекты — используем при внешнем клике или Esc/Tab
	function closeAll() {
		document.querySelectorAll('.select._active-collapse').forEach(el => {
			const collapseEl = el.querySelector('._collapse');
			if (collapseEl) {
				const c = new ItcCollapse(collapseEl);
				try { c.toggle(); } catch (e) { /* ignore */ }
			}
			el.classList.remove('_active-collapse');
		});
	}
}

/* ====================== [Помощники] ====================== */
function saveFiltersToLocal(filters) {
	try {
		localStorage.setItem('filters', JSON.stringify(filters));
	} catch (e) {
		console.error('[select] saveFiltersToLocal failed:', e);
	}
}

function loadFiltersFromLocal() {
	try {
		const saved = localStorage.getItem('filters');
		return saved ? JSON.parse(saved) : {};
	} catch (e) {
		console.warn('[select] loadFiltersFromLocal: JSON parse error, returning {}', e);
		return {};
	}
}

function restoreUIFromLocal(savedValues, listItems, SelectInput) {
	if (!Array.isArray(savedValues)) savedValues = [];
	listItems.forEach(item => {
		if (savedValues.includes(item.textContent.trim())) {
			item.classList.add('_selected');
		} else {
			item.classList.remove('_selected');
		}
	});
	updateInputValue(savedValues, SelectInput);
}

function updateInputValue(selectedArray, SelectInput) {
	if (!SelectInput) return;
	if (!selectedArray || selectedArray.length === 0) {
		SelectInput.value = "Не выбрано";
		return;
	}

	if (selectedArray.length === 1) {
		SelectInput.value = selectedArray[0];
	} else {
		const firstValue = selectedArray[0];
		const othersCount = selectedArray.length - 1;
		SelectInput.value = `${firstValue} + ещё ${othersCount}`;
	}
}
