import { select } from './modules/itsSelect.js';
select();
// -----------------------------------------------------------------------------
import { newProductsSlide } from "./modules/new-products-slide.js";
newProductsSlide();
// -----------------------------------------------------------------------------
import * as wNumb from "./assets/wNumb.js";
import noUiSlider from 'nouislider';
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
	const priceSlider = document.querySelector('.price-filter__slider');
	if (!priceSlider) return;

	const PriceBlocks = document.querySelectorAll('.values-price__column');
	if (PriceBlocks.length < 2) return;

	const minPrice = Number(PriceBlocks[0].textContent.trim());
	const maxPrice = Number(PriceBlocks[1].textContent.trim());
	if (isNaN(minPrice) || isNaN(maxPrice)) return;

	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	if (!priceStart || !priceEnd) return;

	const inputs = [priceStart, priceEnd];
	const filterKey = "price";

	// -----------------------
	// 🔹 Загружаем фильтры из localStorage
	const savedFilters = loadFiltersFromLocal();
	let startValue = minPrice;
	let endValue = maxPrice;

	if (savedFilters[filterKey] && savedFilters[filterKey].length === 2) {
		const savedMin = Number(savedFilters[filterKey][0].replace(/\s/g, ''));
		const savedMax = Number(savedFilters[filterKey][1].replace(/\s/g, ''));
		if (!isNaN(savedMin)) startValue = savedMin;
		if (!isNaN(savedMax)) endValue = savedMax;
	}

	// -----------------------
	// 🔹 Создаём ползунок
	noUiSlider.create(priceSlider, {
		start: [startValue, endValue],
		behaviour: 'drag',
		connect: true,
		tooltips: [
			wNumb({decimals: 0, thousand: ' ', suffix: ' (R)'}),
			wNumb({decimals: 0, thousand: ' ', suffix: ' (R)'})
		],
		range: { min: minPrice, max: maxPrice },
		format: wNumb({decimals: 0, thousand: ' ', to: value => parseInt(value), from: value => parseInt(value)})
	});

	inputs[0].value = startValue;
	inputs[1].value = endValue;

	// -----------------------
	// 🔹 Обновление localStorage при движении слайдера
	priceSlider.noUiSlider.on('update', function(values) {
		inputs[0].value = values[0];
		inputs[1].value = values[1];
		let filters = loadFiltersFromLocal();
		filters[filterKey] = [values[0], values[1]];
		saveFiltersToLocal(filters);
	});

	// -----------------------
	// 🔹 Обновление слайдера при ручном вводе
	inputs.forEach((input, handle) => {
		input.addEventListener('change', () => {
			const val = Number(input.value.replace(/\s/g, ''));
			if (!isNaN(val)) priceSlider.noUiSlider.setHandle(handle, val);
		});
	});

	function saveFiltersToLocal(filters) {
		localStorage.setItem('filters', JSON.stringify(filters));
	}

	function loadFiltersFromLocal() {
		const saved = localStorage.getItem('filters');
		return saved ? JSON.parse(saved) : {};
	}
});



