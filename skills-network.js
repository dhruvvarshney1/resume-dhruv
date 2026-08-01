(() => {
  const records = Object.entries(window.portfolioDetails || {}).map(([id, value]) => ({
    id, title: value[2], type: value[0], text: value.join(' '),
    skills: value[5].split(' · ').map(skill => skill.trim()).filter(Boolean)
  }));
  const normalize = skill => skill.toLowerCase().replace(/[^a-z0-9+#.]+/g, ' ').trim();
  const nodesByName = new Map();
  const linksByKey = new Map();
  records.forEach(record => {
    const uniqueSkills = [...new Set(record.skills)];
    uniqueSkills.forEach(name => {
      const key = normalize(name);
      const node = nodesByName.get(key) || { id: key, name, count: 0, records: [], descriptions: [] };
      node.count += 1; node.records.push(record); node.descriptions.push(record.text); nodesByName.set(key, node);
    });
    for (let i = 0; i < uniqueSkills.length; i += 1) for (let j = i + 1; j < uniqueSkills.length; j += 1) {
      const source = normalize(uniqueSkills[i]); const target = normalize(uniqueSkills[j]);
      const key = [source, target].sort().join('|'); const link = linksByKey.get(key) || { source, target, weight: 0 };
      link.weight += 1; linksByKey.set(key, link);
    }
  });

  const nodes = [...nodesByName.values()];
  const links = [...linksByKey.values()];
  const adjacency = new Map(nodes.map(node => [node.id, new Set()]));
  links.forEach(link => { adjacency.get(link.source).add(link.target); adjacency.get(link.target).add(link.source); });
  let cluster = 0;
  nodes.forEach(start => {
    if (start.cluster !== undefined) return;
    const queue = [start]; start.cluster = cluster;
    while (queue.length) adjacency.get(queue.shift().id).forEach(id => { const node = nodesByName.get(id); if (node.cluster === undefined) { node.cluster = cluster; queue.push(node); } });
    cluster += 1;
  });

  const svg = d3.select('#skills-graph');
  const width = 900; const height = 640;
  svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
  const root = svg.append('g');
  const zoom = d3.zoom().scaleExtent([0.45, 3]).on('zoom', event => root.attr('transform', event.transform));
  svg.call(zoom);
  const color = d3.scaleOrdinal(d3.schemeTableau10);
  const radius = d3.scaleSqrt().domain([1, d3.max(nodes, node => node.count) || 1]).range([7, 24]);
  const link = root.append('g').attr('class', 'network-links').selectAll('line').data(links).join('line').attr('stroke-width', d => 0.8 + d.weight * 1.3);
  const node = root.append('g').attr('class', 'network-nodes').selectAll('g').data(nodes).join('g').attr('tabindex', 0).attr('role', 'button').attr('aria-label', d => `${d.name}, used in ${d.count} portfolio item${d.count === 1 ? '' : 's'}`).style('cursor', 'pointer');
  node.append('circle').attr('r', d => radius(d.count)).attr('fill', d => color(d.cluster)).attr('class', 'skill-node');
  node.append('text').text(d => d.name).attr('dy', d => radius(d.count) + 15).attr('text-anchor', 'middle');

  const simulation = d3.forceSimulation(nodes).force('link', d3.forceLink(links).id(d => d.id).distance(d => 105 - d.weight * 8).strength(d => Math.min(.8, .18 + d.weight * .12))).force('charge', d3.forceManyBody().strength(-125)).force('center', d3.forceCenter(width / 2, height / 2)).force('collision', d3.forceCollide().radius(d => radius(d.count) + 22)).on('tick', () => { link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y); node.attr('transform', d => `translate(${d.x},${d.y})`); });
  node.call(d3.drag().on('start', (event, d) => { if (!event.active) simulation.alphaTarget(.25).restart(); d.fx = d.x; d.fy = d.y; }).on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; }).on('end', (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

  const title = document.querySelector('#skill-title'); const description = document.querySelector('#skill-description'); const meta = document.querySelector('#skill-meta'); const related = document.querySelector('#skill-links');
  const show = selected => {
    const connected = new Set([selected.id]); links.forEach(linkItem => { if (linkItem.source.id === selected.id) connected.add(linkItem.target.id); if (linkItem.target.id === selected.id) connected.add(linkItem.source.id); });
    node.classed('is-dimmed', d => !connected.has(d.id)); link.classed('is-active', d => d.source.id === selected.id || d.target.id === selected.id).classed('is-dimmed', d => d.source.id !== selected.id && d.target.id !== selected.id);
    title.textContent = selected.name; description.textContent = `${selected.name} appears across ${selected.count} portfolio item${selected.count === 1 ? '' : 's'}. Connections are weighted by co-occurrence.`;
    meta.innerHTML = `<p class="skill-frequency">${selected.count} occurrence${selected.count === 1 ? '' : 's'} · ${adjacency.get(selected.id).size} connections</p>`;
    related.innerHTML = `<p class="eyebrow">Appears in</p><ul>${selected.records.map(record => `<li><a href="${record.type === 'Experience' ? `experience-${record.id}.html` : `project-${record.id}.html`}">${record.title}</a></li>`).join('')}</ul>`;
  };
  const clear = () => { node.classed('is-dimmed', false); link.classed('is-active is-dimmed', false); title.textContent = 'Select a node'; description.textContent = 'Hover or focus a node to see where it appears in the portfolio.'; meta.innerHTML = ''; related.innerHTML = ''; };
  node.on('mouseenter focus', (_, d) => show(d)).on('mouseleave', clear).on('click keydown', (event, d) => { if (event.type === 'click' || event.key === 'Enter' || event.key === ' ') { event.preventDefault(); show(d); node.filter(item => item.id === d.id).node().focus(); } });
  document.querySelector('#reset-network').addEventListener('click', () => { clear(); svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity); simulation.alpha(0.5).restart(); });
  document.querySelector('#network-status').textContent = `${nodes.length} skills · ${links.length} relationships · ${cluster} emergent clusters`;
  document.querySelector('#skill-list').innerHTML = [...nodes].sort((a, b) => b.count - a.count).map(d => `<li><button type="button" data-skill="${d.id}">${d.name}</button></li>`).join('');
  document.querySelectorAll('[data-skill]').forEach(button => button.addEventListener('click', () => show(nodesByName.get(button.dataset.skill))));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) simulation.alpha(0).stop();
})();
