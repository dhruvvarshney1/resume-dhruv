document.querySelectorAll('[data-count]').forEach(counter => {
  const target = Number(counter.dataset.count); const decimals = Number(counter.dataset.decimals || 0);
  const render = value => { counter.textContent = value.toFixed(decimals); };
  const animate = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { render(target); return; }
    const start = performance.now(); const duration = 900;
    const tick = now => { const progress = Math.min(1, (now - start) / duration); render(target * (1 - Math.pow(1 - progress, 3))); if (progress < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting && !entry.target._seen) { entry.target._seen = true; animate(); observer.unobserve(entry.target); } }), { threshold: .5 });
  observer.observe(counter);
});
