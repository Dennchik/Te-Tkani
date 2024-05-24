import { swiperLayout } from "../layouts/swiper-layout";
swiperLayout('._swiper');
//* import Swiper bundle with all modules installed 
import Swiper from 'swiper/bundle';
export function newProductsSlide(
	mainslide = '.new-products__content',
	scrollbar = '',
	nextEl = '.new-products__button-next',
	prevEl = '.new-products__button-prev',

) {
	if (mainslide) {
		new Swiper(mainslide, {
			speed: 800,
			spaceBetween: 50,
			loop: true,
			grabCursor: true,
			// autoHeight: true,
			// mousewheel: true,
			// centeredSlides: true,
			slidesPerView: 5,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			breakpoints: {
				200: {
					spaceBetween: 10,
					slidesPerView: 1,
				},
				376: {
					spaceBetween: 20,
					slidesPerView: 2,
				},
				490: {
					spaceBetween: 30,
					slidesPerView: 3,
				},
				768: {

					spaceBetween: 40,
					slidesPerView: 4,
				},
				1025: {
					slidesPerView: 5,
				}
			}
		});
	}
}
// -----------------------------------------------------------------------------




