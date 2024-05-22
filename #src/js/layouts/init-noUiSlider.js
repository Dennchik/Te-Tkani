// import "../assets/nouislider.js";
import noUiSlider from 'nouislider';
//* ------------------------------[noUiSlider]----------------------------------

const priceSlider = document.querySelector('.price-filter__slider');
console.log(priceSlider);
noUiSlider.create(priceSlider, {
	start: [0, 100000],
	behaviour: 'drag',
	connect: true,
	tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
	range: {
		'min': [0],
		'max': [200000]
	},
	format: {
		to: function (value) {
			return parseInt(value);
		},
		from: function (value) {
			return parseInt(value);
		}
	}
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