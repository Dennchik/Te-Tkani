const sideBarInfo = document.querySelector('.side-info__info');
const sideInfoButton = document.querySelector('.side-info__button');

sideInfoButton.addEventListener('click', () => {
	sideBarInfo.classList.toggle('_open');
});

