export function anchorsSmoothScrolling() {
	document.addEventListener('DOMContentLoaded', function () {
		const sideBarInfo = document.querySelector('.side-info__info');
		// Добавляем плавную прокрутку с учетом отступа 150px сверху
		const anchorLinks = document.querySelectorAll('.anchor-link');
		anchorLinks.forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				const targetId = this.getAttribute('href').substring(1);
				const targetElement = document.getElementById(targetId);
				const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
				const offsetPosition = targetPosition - 150; // 150px отступ сверху
				sideBarInfo.classList.remove('_open');
				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			});
		});
	});

}