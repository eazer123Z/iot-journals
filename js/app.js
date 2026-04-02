// ============================================================
// Indonesian IoT Journals — App
// ============================================================
(function () {
  const grid = document.getElementById('journalsGrid');
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function createCard(j) {
    const tagsHTML = j.tags.map(t => {
      const cls = t.startsWith('sinta') ? `tag-${t}` : `tag-${t}`;
      const label = t === 'oa' ? 'Open Access' : t === 'iot' ? 'IoT' : t.toUpperCase().replace('-', ' ');
      return `<span class="tag ${cls}">${label}</span>`;
    }).join('');

    return `
      <article class="journal-card" data-tags="${j.tags.join(',')}" data-name="${j.name.toLowerCase()} ${j.fullName.toLowerCase()}">
        <div class="card-header">
          <span class="card-number">#${String(j.id).padStart(2, '0')}</span>
          <span style="font-size:0.78rem;color:var(--text-muted);white-space:nowrap;">${j.year}</span>
        </div>
        <h3 class="card-title"><a href="${j.url}" target="_blank" rel="noopener">${j.name}</a></h3>
        <p class="card-publisher">${j.publisher}</p>
        <p class="card-desc">${j.desc}</p>
        <div class="card-tags">${tagsHTML}</div>
        <a href="${j.url}" target="_blank" rel="noopener" class="card-link">
          Visit Journal <i class="fas fa-external-link-alt"></i>
        </a>
      </article>
    `;
  }

  function renderCards(data) {
    if (data.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          No journals match your search.
        </div>
      `;
      return;
    }
    grid.innerHTML = data.map(createCard).join('');
  }

  function getActiveFilter() {
    const active = document.querySelector('.filter-btn.active');
    return active ? active.dataset.filter : 'all';
  }

  function filterAndRender() {
    const filter = getActiveFilter();
    const query = searchInput.value.toLowerCase().trim();

    const filtered = journals.filter(j => {
      const matchFilter = filter === 'all' || j.tags.includes(filter);
      const matchSearch = !query ||
        j.name.toLowerCase().includes(query) ||
        j.fullName.toLowerCase().includes(query) ||
        j.publisher.toLowerCase().includes(query) ||
        j.desc.toLowerCase().includes(query);
      return matchFilter && matchSearch;
    });

    renderCards(filtered);
  }

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAndRender();
    });
  });

  // Search
  searchInput.addEventListener('input', filterAndRender);

  // Initial render
  renderCards(journals);
})();
