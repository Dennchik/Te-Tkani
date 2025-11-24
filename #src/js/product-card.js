import { newProductsSlide } from "./modules/new-products-slide.js";
newProductsSlide();
import { saleProductsSlide } from "./modules/sale-products-slide.js"; saleProductsSlide();
// -----------------------------------------------------------------------------
import { thumbCardSlide } from "./modules/slide-card-thumb.js";
thumbCardSlide();

import { counterProducy } from "./layouts/counter.js";
counterProducy();

import { adaptiveProductCard } from "./modules/product-card-adaptive.js";

document.addEventListener('DOMContentLoaded', () => {
    adaptiveProductCard();
    const zoom = 2.2; // Kattalashtirish miqyosi
    const images = document.querySelectorAll('.product-slide__card img');

    images.forEach(img => {
        const lens = document.createElement('div');
        lens.classList.add('magnifier-lens');
        img.parentElement.style.position = 'relative';
        img.parentElement.appendChild(lens);
        lens.style.display = 'none';

        // Rasmni lupa foni sifatida o‘rnatamiz
        lens.style.backgroundImage = `url(${img.src})`;

        img.addEventListener('mouseenter', () => lens.style.display = 'block');
        img.addEventListener('mouseleave', () => lens.style.display = 'none');
        img.addEventListener('mousemove', e => moveLens(e, img, lens, zoom));
    });

    function moveLens(e, img, lens, zoom) {
        const rect = img.getBoundingClientRect();
        const lensW = lens.offsetWidth;
        const lensH = lens.offsetHeight;
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Markazni o‘rtaga tushirish
        x = Math.max(lensW / 2, Math.min(x, rect.width - lensW / 2));
        y = Math.max(lensH / 2, Math.min(y, rect.height - lensH / 2));

        lens.style.left = `${x - lensW / 2}px`;
        lens.style.top = `${y - lensH / 2}px`;

        // Fon pozitsiyasini hisoblash
        const bgX = ((x / rect.width) * 100);
        const bgY = ((y / rect.height) * 100);

        lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
        lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
    }
} );
