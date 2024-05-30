export function anchorsSmoothScrolling() {
	document.addEventListener('DOMContentLoaded', function () {
		// Добавляем плавную прокрутку с учетом отступа 150px сверху
		const anchorLinks = document.querySelectorAll('.anchor-link');
		console.log(anchorLinks);
		anchorLinks.forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				console.log(link);
				const targetId = this.getAttribute('href').substring(1);
				const targetElement = document.getElementById(targetId);
				const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
				const offsetPosition = targetPosition - 150; // 150px отступ сверху

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			});
		});
	});

}