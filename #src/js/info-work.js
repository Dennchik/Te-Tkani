import { anchorsSmoothScrolling } from "./modules/anchors-smooth-scrolling.js";
anchorsSmoothScrolling();
const sideBarButton = document.querySelector('.side-bar__menu');
sideBarButton; addEventListener('click', () => {
	sideBarButton.classList.toggle('_open');
});