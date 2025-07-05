async function loadData() {
    const sheetID = '1gV-fUioKBhFGYrAdx-3VS70SioanYbb2dImmtlGDsmo';
    const sheetName = 'optim';
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const container = document.getElementById('products');
        if (!container) return;

        const fragment = document.createDocumentFragment();
        rows.forEach(row => {
            const name = row.c[0]?.v?.trim() || 'Без назви';
            const desc = row.c[1]?.v || '';
            const price = row.c[2]?.v || '';
            const img = row.c[3]?.v || '';

            const item = document.createElement('div');
            item.classList.add('product');
            item.innerHTML = `
                <img src="${img}" alt="${name}" />
                <h3>${name}</h3>
                <p>${desc}</p>
                <strong>${price}</strong>
            `;
            fragment.appendChild(item);
        });
        container.appendChild(fragment);
    } catch (err) {
        console.error('Помилка завантаження даних з Google Таблиці:', err);
    }
}

// Функція для завантаження майбутніх цін
async function loadFuturePrices() {
    const sheetID = '1gV-fUioKBhFGYrAdx-3VS70SioanYbb2dImmtlGDsmo';
    const sheetName = 'future';
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    const container = document.getElementById('future-prices');
    if (!container) return;

    container.innerHTML = 'Завантаження...';
    try {
        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const rows = json.table.rows;

        let html = '<ul style="text-align:left">';
        rows.forEach(row => {
            const name = row.c[0]?.v?.trim() || 'Без назви';
            const price = row.c[1]?.v || '';
            html += `<li><strong>${name}</strong>: ${price}</li>`;
        });
        html += '</ul>';
        container.innerHTML = html;
    } catch (err) {
        container.innerHTML = 'Не вдалося завантажити майбутні ціни.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();

    const toggle = document.getElementById('menu-toggle');
    const modal = document.getElementById('future-modal');
    const closeModal = document.getElementById('close-modal');
    const openPrice = document.getElementById('open-price');    const futurePrices = document.getElementById('future-prices');

    // Мобільне меню-модалка
    const mobileMenuModal = document.getElementById('mobile-menu-modal');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileMenuPrice = document.getElementById('mobile-menu-price');
    const mobileMenuLocation = document.getElementById('mobile-menu-location');

    // Три риски: на мобільному відкриває мобільне меню-модалку
    toggle?.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            mobileMenuModal.classList.add('show');
        }
    });

    // Закрити мобільне меню-модалку
    closeMobileMenu?.addEventListener('click', () => {
        mobileMenuModal.classList.remove('show');
    });
    mobileMenuModal?.addEventListener('click', (e) => {
        if (e.target === mobileMenuModal) mobileMenuModal.classList.remove('show');
    });

    // Пункт "Прайс" у мобільному меню: відкриває модалку з цінами
    mobileMenuPrice?.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenuModal.classList.remove('show');
        modal.classList.add('show');
        loadFuturePrices();
    });

    // Пункт "Де ми знаходимося" — поки нічого не робить
    mobileMenuLocation?.addEventListener('click', (e) => {
        e.preventDefault();
        // Можна додати функціонал пізніше
    });

    // Прайс на десктопі: відкриває модалку з цінами
    openPrice?.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        loadFuturePrices();
    });

    // Закриття модалки з цінами
    closeModal?.addEventListener('click', () => {
        modal?.classList.remove('show');
    });
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });
});

window.testModal = function() {
    const modal = document.getElementById('future-modal');
    if (modal) {
        modal.classList.add('show');
        document.getElementById('future-prices').innerHTML = '<div style="color:blue;font-size:2rem;">Тест вручну!</div>';
    } else {
        alert('Модалка не знайдена!');
    }
};

