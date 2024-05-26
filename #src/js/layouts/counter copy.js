export function counterProducy() {
	const counters = document.querySelectorAll('[data-quantity]');
	const productPrices = document.querySelectorAll('.product-prices>p');

	if (counters) {
		counters.forEach(counter => {
			let dotInserted = false;

			counter.addEventListener('click', (e) => {
				let target = e.target;

				if (target.closest('.quantity__button')) {
					let input = target.closest('.quantity').querySelector('input');
					let value = parseFloat(input.value) || 0;

					if (target.classList.contains('quantity-add')) {
						value += 0.1;
					} else if (target.classList.contains('quantity-remove')) {
						value -= 0.1;
					}

					value = Math.max(0.1, parseFloat(value.toFixed(2)));
					input.value = value.toFixed(2);

					if (value <= 0.1) {
						_opacityAdd(input);
					} else {
						_opacityRemove(input);
					}

					_totalSum();
					dotInserted = false;
				}
			});

			let input = counter.querySelector('input');

			input.addEventListener('input', function (e) {
				let cursorPos = input.selectionStart;
				this.value = this.value.replace(/[^0-9.]/g, '');

				if ((this.value.match(/\./g) || []).length > 1) {
					let dotIndex = this.value.lastIndexOf('.');
					let endPos = Math.max(cursorPos, dotIndex);
					let startPos = Math.min(cursorPos, dotIndex);
					this.value = this.value.slice(0, startPos) + this.value.slice(startPos + 1, endPos) + this.value.slice(endPos + 1);
					cursorPos--;
				} else if (this.value.includes('.') && !dotInserted) {
					cursorPos++;
					dotInserted = true;
				}

				input.setSelectionRange(cursorPos, cursorPos);
			});

			input.addEventListener('keydown', function (e) {
				if (e.key === 'Enter') {
					e.preventDefault();
					_totalSum();
				}
			});

			const unitLabel = document.createElement('span');
			unitLabel.textContent = ' м';
			unitLabel.style.marginLeft = '5px';
			input.parentNode.appendChild(unitLabel);
		});
	}

	function _opacityAdd(input) {
		input.closest('.quantity').querySelector('.quantity-remove').classList.add('_disabled');
	}

	function _opacityRemove(input) {
		input.closest('.quantity').querySelector('.quantity-remove').classList.remove('_disabled');
	}

	function _totalSum() {
		let totalSum = 0;
		productPrices.forEach(productPrice => {
			const inputTotal = document.querySelector('.input-total');
			let valuePrice = parseFloat(productPrice.textContent.replace(/ /g, '').replace(',', '.')) || 0;
			let quantity = parseFloat(productPrice.closest('.shopping-cart__item').querySelector('input').value) || 1;

			let totalSumProduct = valuePrice * quantity;
			totalSum += totalSumProduct;

			productPrice.closest('.shopping-cart__item').querySelector('.card-name__quantity-price').textContent = totalSumProduct.toLocaleString('ru-RU', {
				style: 'currency',
				currency: 'RUB',
				minimumFractionDigits: 0,
			});
			inputTotal.innerHTML = totalSum.toLocaleString() + `<i class="icon-ruble"></i>`;
		});
	}

	_totalSum();
}
