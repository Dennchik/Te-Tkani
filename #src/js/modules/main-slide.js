import { swiperLayout } from "../layouts/swiper-layout";
swiperLayout();
//* import Swiper bundle with all modules installed 
import Swiper from 'swiper/bundle';
export function mainSlide(
	mainslide = '.mainslide__body',
	// nextEl = '.new-products__button-next',
	// prevEl = '.new-products__button-prev',

) {
	if (mainslide) {
		new Swiper(mainslide, {
			autoplay: {
				delay: 3500,
				disableOnInteraction: true,
			},
			speed: 800,
			spaceBetween: 10,
			loop: true,
			grabCursor: true,
			autoHeight: true,
			// mousewheel: true, 
			slidesPerView: 1,
			navigation: {
				// nextEl: nextEl,
				// prevEl: prevEl,
			},
			pagination: {
				el: ".mainslide__dots",
				clickable: true,
			},
		});
	}
}
// -----------------------------------------------------------------------------




