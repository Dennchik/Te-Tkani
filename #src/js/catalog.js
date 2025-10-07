import { select } from './modules/itsSelect.js';
select();
// -----------------------------------------------------------------------------
import { newProductsSlide } from "./modules/new-products-slide.js";
newProductsSlide();
// -----------------------------------------------------------------------------
import { collapseCatalogFilter, loadedCatalog } from './layouts/layouts.js';
collapseCatalogFilter(); loadedCatalog();
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

	noUiSlider.create(priceSlider, {
		start: [minPrice, maxPrice],
		behaviour: 'drag',
		connect: true,
		tooltips: [
			wNumb({decimals: 0, thousand: ' ', suffix: ' (R)'}),
			wNumb({decimals: 0, thousand: ' ', suffix: ' (R)'})
		],
		range: {
			min: minPrice,
			max: maxPrice
		},
		format: wNumb({
			decimals: 0,
			thousand: ' ',
			to: value => parseInt(value),
			from: value => parseInt(value)
		})
	});

	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	if (!priceStart || !priceEnd) return;

	const inputs = [priceStart, priceEnd];
	const filterKey = "price";

	priceSlider.noUiSlider.on('update', function(values) {
		inputs[0].value = values[0];
		inputs[1].value = values[1];

		let filters = loadFiltersFromLocal();
		if (!filters[filterKey]) filters[filterKey] = [];
		filters[filterKey] = [values[0], values[1]];
		saveFiltersToLocal(filters);
	});

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


