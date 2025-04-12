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
      rows.forEach(row => {
        const name = row.c[0]?.v || '';
        const desc = row.c[1]?.v || '';
        const price = row.c[2]?.v || '';
        const img = row.c[3]?.v || '';
  
        const item = document.createElement('div');
        item.classList.add('product'); // Додай для стилізації
        item.innerHTML = `
          <img src="${img}" alt="${name}" />
          <h3>${name}</h3>
          <p>${desc}</p>
          <strong>${price}</strong>
        `;
        container.appendChild(item);
      });
    } catch (err) {
      console.error('Помилка завантаження даних з Google Таблиці:', err);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadData);