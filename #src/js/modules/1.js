if (document.querySelector('.product-slide')) {
	let swiper = new Swiper(".thumb-slide", {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
	});
	var swiper2 = new Swiper(".product-slide__slide", {
		spaceBetween: 10,
		speed: 800,
		loop: true,
		// navigation: {
		// 	prevEl: ".product-slide__prew",
		// 	nextEl: ".product-slide__next",
		// },
		thumbs: {
			swiper: swiper,
		},
	});
}