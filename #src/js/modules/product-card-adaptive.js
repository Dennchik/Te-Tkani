export function adaptiveProductCard() {
    const desc = document.querySelector('.description-product__column');
    const specs = document.querySelector('.specifications');
    const textBlock = desc.querySelector('.description-product__text');
    if (!desc || !specs) {
        console.warn('adaptiveProductCard: отсутствует .description-product__text или .specifications');
        return;
    }

    // Добавляем кнопку, если её нет
    let showBtn = desc.querySelector('.show-more-btn');
    if (!showBtn) {
        showBtn = document.createElement('a');
        showBtn.href = '#';
        showBtn.className = 'show-more-btn assortment__title';
        showBtn.textContent = 'Показать полностью';
        desc.appendChild(showBtn);
    }

    // По умолчанию описание ограничено по строкам
    desc.classList.add('clamped');

    let expanded = false;

    // --- Функция синхронизации высот ---
    const syncHeights = () => {
        if (!desc || !specs) return;

        if (expanded) {
            // Раскрыт — убираем ограничения

            textBlock.style.minHeight = 'unset';
            textBlock.style.webkitLineClamp = 'unset'; // полностью показываем текст
            textBlock.style.display = 'block'; // чтобы убрать -webkit-box ограничения
            return;
        }

        // Скрытый режим — возвращаем обрезку
        textBlock.style.display = '-webkit-box';
        textBlock.style.webkitBoxOrient = 'vertical';
        textBlock.style.webkitLineClamp = '15';

        // Берём высоту всего блока спецификаций
        const specsRect = specs.getBoundingClientRect();
        let specsHeight = specsRect.height;

        // Ищем блок счетчика
        const counter = specs.querySelector('.specifications__counter');
        if (counter) {
            const counterRect = counter.getBoundingClientRect();
            let counterHeight = counterRect.height;

            // Добавляем внешние отступы (margin)
            const counterStyle = window.getComputedStyle(counter);
            const marginTop = parseFloat(counterStyle.marginTop) || 0;
            const marginBottom = parseFloat(counterStyle.marginBottom) || 0;
            counterHeight += marginTop + marginBottom;

            // Вычитаем высоту счётчика
            specsHeight = Math.max(0, specsHeight - counterHeight);
        }

        // Применяем min-height к описанию
        desc.style.minHeight = Math.ceil(specsHeight) + 'px';
    };


    // --- Кнопка раскрытия ---
    showBtn.addEventListener('click', (e) => {
        e.preventDefault();
        expanded = !expanded;

        if (expanded) {
            desc.classList.remove('clamped');
            desc.classList.add('expanded');
            desc.style.minHeight = '';
            showBtn.textContent = 'Скрыть';
        } else {
            desc.classList.remove('expanded');
            desc.classList.add('clamped');
            showBtn.textContent = 'Показать полностью';
            requestAnimationFrame(syncHeights);
        }
    });

    // --- Наблюдатели за изменениями ---
    if (typeof ResizeObserver !== 'undefined') {
        const roSpecs = new ResizeObserver(() => requestAnimationFrame(syncHeights));
        roSpecs.observe(specs);
        const roDesc = new ResizeObserver(() => requestAnimationFrame(syncHeights));
        roDesc.observe(desc);
    } else {
        window.addEventListener('resize', () => setTimeout(syncHeights, 120));
    }

    if (typeof MutationObserver !== 'undefined') {
        const mo = new MutationObserver(() => requestAnimationFrame(syncHeights));
        mo.observe(specs, { childList: true, subtree: true, characterData: true });
        mo.observe(desc, { childList: true, subtree: true, characterData: true });
    }

    // Первичная синхронизация
    setTimeout(syncHeights, 60);

    // При изменении размера окна (дополнительная страховка)
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncHeights, 120);
    });
}
