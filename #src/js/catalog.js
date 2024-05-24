import { select } from './modules/itsSelect.js';
select();
import { collapseCatalogFilter, loadedCatalog, showSubMenuCollapse } from './layouts/layouts.js';
collapseCatalogFilter(); loadedCatalog(); showSubMenuCollapse();
import * as wNumb from "./assets/wNumb.js";
// -----------------------------------------------------------------------------
import noUiSlider from 'nouislider';
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
const priceSlider = document.querySelector(
	'.price-filter__slider');
noUiSlider.create(priceSlider, {
	start: [0, 25000],
	behaviour: 'drag',
	connect: true,
	tooltips: [
		wNumb({ decimals: 0, thousand: ' ', suffix: ' (R)' }),
		wNumb({ decimals: 0, thousand: ' ', suffix: ' (R)' })
	],
	range: {
		'min': [0],
		'max': [50000]
	},
	format: wNumb({
		decimals: 0, thousand: ' ',
		to: function (value) {
			return parseInt(value);
		},
		from: function (value) {
			return parseInt(value);
		}
	})
});
const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');
const inputs = [priceStart, priceEnd];
priceSlider.noUiSlider.on('update', function (values, handle) {
	inputs[handle].value = values[handle];
});
inputs.forEach(function (input, handle) {
	input.addEventListener('change', function () {
		priceSlider.noUiSlider.setHandle(handle, this.value);
	});
});
