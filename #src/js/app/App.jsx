import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// -----------------------------------------------------------------------------
import { Layout } from '../layouts/Layout.jsx';
import { Homepage } from '../pages/Homepage.jsx';
import { Aboutpage } from '../pages/Aboutpage.jsx';
// -----------------------------------------------------------------------------
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import isMobile from "../assets/Js-devise.js";
// -----------------------------------------------------------------------------
export default function App() {
	const location = useLocation();
	const [initialPositions, setInitialPositions] = useState(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		ScrollTrigger.normalizeScroll(true);
		ScrollTrigger.config({ ignoreMobileResize: true });

		let smoother = ScrollSmoother.create({
			wrapper: "#wrapper",
			content: "#content",
			smooth: 1,
			effects: true,
			normalizeScroll: true
		});
		if (isMobile.any()) {
			console.log('mobyle');

		} else {
			console.log('no mobyle');

			smoother.effects(".content-box__column", {
				speed: (i) => {
					if (initialPositions) {
						const position = initialPositions[i];
						return position ? position.speed : 1.5;
					}
					return 1.5;
				}
			});
			// applyParallaxEffects(smoother, '.parallax');
			smoother.effects('.parallax', {
				speed: (i) => {
					return i % 1 === 0 ? 0.5 : 1.15;
				}
			});
			return () => {
				smoother.kill();
			};
		}
	}, [initialPositions, location.pathname]);
	useEffect(() => {
		// Сохраняем начальные позиции элементов при первой загрузке страницы
		if (!initialPositions) {
			const columns = document.querySelectorAll('.content-box__column');
			const positions = Array.from(columns).map((_, i) => ({
				speed: i % 2 === 0 ? 0.9 : 1.15 // Укажите здесь правильное позиционирование элементов
			}));
			setInitialPositions(positions);
		}
	}, [initialPositions, location.pathname]);


	return (

		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<Aboutpage />} />
			</Route>
		</Routes>

	);
}
