(() => {
  const details = window.portfolioDetails || {};
  const projectThumbs = {
    'stock-market': 'images/stock-price-prediction.png',
    pokerbots: 'poker.jpg',
    evacuation: 'images/emergency-evacuation.png',
    'house-prices': 'images/house-price-prediction.png',
    titanic: 'images/Stöwer_Titanic.jpg',
    'image-filtering': 'images/image-processing.png',
    sudoku: 'images/sudoku.jpg',
    'ml-pipeline': 'images/machine-learning-pipeline.png',
    'dunnhumby-uplift': 'images/dunnhumby.png',
    dhruvgpt: 'images/dhruvgpt.png'
  };
  document.querySelectorAll('.project-item').forEach(card => {
    const href = card.getAttribute('href') || '';
    const key = href.split('/').pop().replace(/^project-/, '').replace(/\.html$/, '');
    const record = details[key];
    const title = card.querySelector('h3')?.textContent.trim() || record?.[2] || 'Project';
    const type = card.querySelector('.project-type')?.textContent.trim() || record?.[1] || 'Project';
    const description = card.querySelector('.project-desc')?.textContent.trim() || record?.[4] || '';
    const technologies = record?.[5]?.split(' · ').slice(0, 4) || [];
    const initials = title.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
    const thumb = projectThumbs[key];
    const thumbVisual = thumb
      ? `<img class="project-thumb-image" src="${thumb}" alt="${title} preview" loading="lazy" decoding="async">`
      : `<strong>${initials}</strong>`;
    card.classList.add('lift-card');
    card.innerHTML = `<span class="project-thumb${thumb ? ' has-media' : ''}" aria-hidden="true"><span class="project-thumb-grid"></span>${thumbVisual}<small>${type}</small></span><span class="project-card-body"><span class="project-header"><span><span class="project-type">${type}</span><span class="project-card-title">${title}</span></span><span class="project-icon" aria-hidden="true">↗</span></span><span class="project-desc">${description}</span><span class="project-card-techs">${technologies.map(skill => `<span>${skill}</span>`).join('')}</span><span class="project-action">View project <span aria-hidden="true">↗</span></span></span>`;
    card.addEventListener('click', event => {
      if (event.pointerType === 'touch' && !card.classList.contains('is-expanded')) { event.preventDefault(); document.querySelectorAll('.lift-card.is-expanded').forEach(item => item.classList.remove('is-expanded')); card.classList.add('is-expanded'); }
    });
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') card.classList.add('is-expanded'); });
  });
})();
