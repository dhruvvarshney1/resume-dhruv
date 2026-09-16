// Terminal sidebar. Self-injects a nav toggle + drawer, so any page that
// loads this script gets it. Content mirrors resume.txt.
(function () {
    const banner = `
 ____  _   _ ____  _   ___     __
|  _ \\| | | |  _ \\| | | \\ \\   / /
| | | | |_| | |_) | | | |\\ \\ / /
| |_| |  _  |  _ <| |_| | \\ V /
|____/|_| |_|_| \\_\\\\___/   \\_/
 __     ___    ____  ____  _   _ _   _ _______   __
 \\ \\   / / \\  |  _ \\/ ___|| | | | \\ | | ____\\ \\ / /
  \\ \\ / / _ \\ | |_) \\___ \\| |_| |  \\| |  _|  \\ V /
   \\ V / ___ \\|  _ < ___) |  _  | |\\  | |___  | |
    \\_/_/   \\_\\_| \\_\\____/|_| |_|_| \\_|_____| |_|

────────────────────────────────────────────────
B.S. Exploration Geophysics · CS&amp;E Minor
IIT Kharagpur · 2023—2027
────────────────────────────────────────────────

Type <span class="highlight">'help'</span> for available commands.`;

    const help = `Available commands:
  <span class="highlight">about</span>        - Who am I?
  <span class="highlight">education</span>    - Academic background
  <span class="highlight">experience</span>   - Work &amp; research internships
  <span class="highlight">projects</span>     - Things I have built
  <span class="highlight">skills</span>       - Languages, libraries, tools
  <span class="highlight">achievements</span> - Ranks and results
  <span class="highlight">contact</span>      - How to reach me
  <span class="highlight">open</span> &lt;page&gt;  - Jump to a project / experience page
  <span class="highlight">ask</span> &lt;query&gt;  - Chat with the AI agent (resume + anything else)
  <span class="highlight">clear</span>        - Clear the output
  <span class="highlight">close</span>        - Close this terminal (Esc)

<span class="dim">Tab completes commands and page names. ↑/↓ walks history.
Anything that isn't a command goes straight to the agent.</span>`;

    // slug -> page. `open` targets; also drives tab-completion.
    const pages = {
        skills: 'skills.html',
        polestar: 'workex/experience-polestar.html',
        xceedance: 'workex/experience-xceedance.html',
        vedvani: 'workex/experience-vedvani.html',
        'stock-market': 'projects/project-stock-market.html',
        pokerbots: 'projects/project-pokerbots.html',
        evacuation: 'projects/project-evacuation.html',
        'house-prices': 'projects/project-house-prices.html',
        'spaceship-titanic': 'projects/project-spaceship-titanic.html',
        titanic: 'projects/project-titanic.html',
        'cloud-kitchen': 'projects/project-cloud-kitchen.html',
        'image-filtering': 'projects/project-image-filtering.html',
        sudoku: 'projects/project-sudoku.html',
        'academic-outreach': 'projects/project-academic-outreach.html',
        'ml-pipeline': 'projects/project-ml-pipeline.html',
        'dunnhumby-uplift': 'projects/project-dunnhumby-uplift.html',
        'agentic-poc': 'projects/project-agentic-poc.html',
        dhruvgpt: 'projects/project-dhruvgpt.html'
    };
    const pageRoot = /\/(?:workex|projects)\//.test(window.location.pathname) ? '../' : '';

    const commands = {
        help, '?': help,

        about: `Hi, I am <span class="highlight">Dhruv Varshney</span>.
4-Year B.S. (Hons.) in Exploration Geophysics with a Minor in Computer
Science &amp; Engineering at <span class="accent">IIT Kharagpur</span>.
I work on applied machine learning, uplift &amp; demand modeling, LLM/agentic
systems, and quantitative ML — with a bias for noisy real-world signals.`,

        education: `<span class="highlight">[ 2023 - 2027 ] Indian Institute of Technology, Kharagpur</span>
- B.S. (Hons.) Exploration Geophysics, Minor in CS&amp;E
- CGPA: <span class="accent">8.41 / 10</span> (current)

<span class="highlight">[ 2023 ] Kendriya Vidyalaya IIT Kharagpur</span>
- CBSE Class XII — 91.2%

<span class="highlight">[ 2021 ] Kendriya Vidyalaya IIT Kharagpur</span>
- CBSE Class X — 97.6%`,

        experience: `<span class="highlight">Machine Learning Intern (May '26 - Present)</span>
@ Polestar Analytics, Noida
- Building leakage-safe retail demand and uplift modeling systems across
  baseline purchase probability, promotion effect, and uplift estimation.
- Engineering trend, Fourier seasonality, lag, rolling, household, basket,
  store, and product features with chronological validation.
- Working across <span class="accent">CatBoost, LightGBM, XGBoost, Optuna, PySpark, Databricks</span>
  and calibrated classification workflows.

<span class="highlight">Analyst Programmer Intern (May '25 - Oct '25)</span>
@ Xceedance Consulting Pvt Ltd
- Extracted structured information from insurance data using <span class="accent">LLM</span>
  workflows and domain-specific normalization.
- Generated synthetic datasets with GenAI to cover edge-case policies.
- Standardized entity fields, cutting downstream parse errors ~15%.
- Few-shot classification on <span class="accent">Azure OpenAI</span>: 94.2% peak accuracy,
  0.91 weighted F1.

<span class="highlight">Undergraduate Research Intern (May '24 - Nov '24)</span>
@ Dept. of CS, IIT Kharagpur (Vedvani, Prof. Pawan Goyal)
- Built a Sanskrit speech-to-text pipeline; scraped and aligned audio/text.
- Text normalization preserving svaras (tonal markers) for phoneme accuracy.
- Fine-tuned a <span class="accent">Wav2Vec2</span> / transformer acoustic model with augmentation.
- Tracked WER/CER: <span class="accent">12% relative WER reduction</span> vs baseline.`,

        projects: `<span class="highlight">1. Stock Market Prediction &amp; Trading Simulator</span>
- RF / XGBoost / CatBoost / LightGBM on NSE data with engineered features.
- Backtesting, trading simulation, microstructure and order-book analysis.

<span class="highlight">2. Jane Street Pokerbots</span>
- Monte Carlo estimation and EV-based auction bidding. Peak rank <span class="accent">#30</span>.

<span class="highlight">3. Real-Time AI Emergency Evacuation System</span>
- <span class="accent">YOLOv11</span> detection + HSV hazard simulation at 30 FPS.
- Homography 3D→2D floor plan mapping; A* reroute in under 50 ms.

<span class="highlight">4. Academic Outreach AI</span>
- Evidence-first <span class="accent">LangGraph</span> pipeline for grounded, reviewable drafts.

<span class="highlight">5. Classical ML Pipeline</span>
- Leakage-safe, config-driven flow from raw CSV to diagnostics and artifacts.

<span class="highlight">6. Dunnhumby Demand Forecasting</span>
- Time-series features, CatBoost, distributed inference on Databricks.

<span class="highlight">7. Inventory-Replenishment POC (Agentic)</span>
- Supplier-aware recommendations with demand sizing, eligibility, MOQ gating.

<span class="highlight">8. Kaggle: House Prices / Spaceship Titanic / Titanic</span>
- 200+ engineered features; 90% R², $25,450 RMSE with Bayesian-optimized XGBoost.

<span class="highlight">9. Home-coming Cloud Kitchen · Image-Filtering App · Sudoku Solver</span>
- Vanilla JS storefront with dynamic pricing; Flask + OpenCV filters;
  C++/SFML backtracking solver with step-by-step visualization.`,

        skills: `<span class="dim">/* Languages */</span>
C, C++, Python, SQL (MySQL), JavaScript, HTML/CSS, Bash

<span class="dim">/* Libraries &amp; Frameworks */</span>
Pandas, NumPy, scikit-learn, <span class="accent">CatBoost, LightGBM, XGBoost</span>, PyTorch,
TensorFlow, PySpark, OpenCV, spaCy, BeautifulSoup4, Matplotlib

<span class="dim">/* Tools &amp; Platforms */</span>
Databricks, Spark, MLflow, LangChain, LangGraph, Azure AI, Git, Jupyter

<span class="dim">/* Concepts */</span>
Uplift Modeling, Time-Series Validation, LLMs, Agentic Systems,
Speech Recognition, Quantitative Finance`,

        achievements: `- <span class="accent">4th Place</span> — Open IIT Data Analytics Competition 2024.
- Jane Street Pokerbots peak rank <span class="accent">#30</span>.
- JEE Advanced 2023: top 6.4% · JEE Main 2023: top 1.9%.
- WBJEE: top ~1% among 100K+ candidates.
- Codeforces peak 1200+; 150+ LeetCode problems solved.`,

        contact: `<span class="highlight">Email:</span>     dhruvvarshney2906@gmail.com
<span class="highlight">Alternate:</span> dhruvvarshney@kgpian.iitkgp.ac.in
<span class="highlight">Phone:</span>     +91 85979 86847
<span class="highlight">Location:</span>  Kharagpur, West Bengal, India`
    };

    const panel = document.createElement('aside');
    panel.id = 'terminal-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-label', 'Terminal resume');
    panel.innerHTML = `
      <div class="term-bar">
        <span class="term-dots"><i></i><i></i><i></i></span>
        <span class="term-title">guest@dhruv — resume</span>
        <button type="button" class="term-close" aria-label="Close terminal">&times;</button>
      </div>
      <div id="term-output"><div class="output-box"><div class="ascii-art">${banner}</div></div></div>
      <label id="term-input-line">
        <span class="prompt"><span class="user">guest@dhruv</span>:<span class="dir">~</span>$</span>
        <input type="text" id="term-input" autocomplete="off" spellcheck="false" aria-label="Terminal command">
      </label>`;

    const backdrop = document.createElement('div');
    backdrop.id = 'terminal-backdrop';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'terminal-toggle';
    toggle.textContent = 'Terminal';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'terminal-panel');

    document.addEventListener('DOMContentLoaded', () => {
        (document.querySelector('.nav-links') || document.body).appendChild(toggle);
        document.body.append(backdrop, panel);
    });

    const out = panel.querySelector('#term-output');
    const input = panel.querySelector('#term-input');
    const history = [];
    let histIndex = 0;

    function open() {
        document.body.classList.add('terminal-open');
        panel.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        input.focus();
    }
    function close() {
        document.body.classList.remove('terminal-open');
        panel.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
    }
    const isOpen = () => document.body.classList.contains('terminal-open');

    toggle.addEventListener('click', () => (isOpen() ? close() : open()));
    backdrop.addEventListener('click', close);
    panel.querySelector('.term-close').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) close(); });
    panel.addEventListener('click', () => {
        if (window.getSelection().toString() === '') input.focus();
    });

    function print(html, cls) {
        const div = document.createElement('div');
        div.className = cls;
        div.innerHTML = html.replace(/\n/g, '<br>');
        out.appendChild(div);
        out.scrollTop = out.scrollHeight;
    }

    function escapeHtml(s) {
        return s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }

    // Free text -> LLM agent (agent.js). Plain text back, escaped before render.
    function askAgent(question) {
        if (!question) {
            print(`Usage: <span class="highlight">ask &lt;question&gt;</span> — e.g. <span class="dim">ask what stack does he use for ML?</span>`, 'output-box');
            return;
        }
        if (!window.TerminalAgent) {
            print(`agent offline — <span class="dim">agent.js not loaded</span>. Type <span class="highlight">'help'</span> for built-in commands.`, 'output-box');
            return;
        }
        const typing = document.createElement('div');
        typing.className = 'output-box thinking';
        typing.innerHTML = '<span class="dim">agent: thinking…</span>';
        out.appendChild(typing);
        out.scrollTop = out.scrollHeight;
        window.TerminalAgent.ask(question)
            .then(reply => {
                typing.className = 'output-box agent-msg';
                typing.innerHTML = escapeHtml(reply).replace(/\n/g, '<br>');
            })
            .catch(() => { typing.innerHTML = 'agent: network error — check your connection and try again.'; })
            .finally(() => { out.scrollTop = out.scrollHeight; });
    }

    // Candidates for the word being typed: page slugs after `open `, else commands.
    function candidates(value) {
        const openArg = /^\s*open\s+(\S*)$/.exec(value);
        const word = openArg ? openArg[1] : value.trimStart();
        const pool = openArg ? Object.keys(pages) : Object.keys(commands).concat('open', 'ask', 'clear', 'close');
        return { word, prefix: value.slice(0, value.length - word.length), hits: pool.filter(c => c.startsWith(word)) };
    }

    function complete() {
        const { word, prefix, hits } = candidates(input.value);
        if (!hits.length) return;
        if (hits.length === 1) { input.value = prefix + hits[0] + ' '; return; }
        // Longest common prefix, then list the options.
        let lcp = hits[0];
        hits.forEach(h => { while (!h.startsWith(lcp)) lcp = lcp.slice(0, -1); });
        input.value = prefix + lcp;
        if (lcp === word) print(hits.join('  '), 'output-box');
    }

    input.addEventListener('keydown', e => {
        if (e.key === 'Tab') { e.preventDefault(); complete(); return; }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (!history.length) return;
            histIndex = Math.min(history.length, Math.max(0, histIndex + (e.key === 'ArrowUp' ? -1 : 1)));
            input.value = history[histIndex] || '';
            return;
        }
        if (e.key !== 'Enter') return;

        const raw = input.value.trim();
        const cmd = raw.toLowerCase();
        input.value = '';
        print(`<span class="prompt"><span class="user">guest@dhruv</span>:<span class="dir">~</span>$</span> ${escapeHtml(raw)}`, 'cmd-echo');
        if (!cmd) return;
        history.push(cmd);
        histIndex = history.length;

        if (cmd === 'clear') { out.innerHTML = ''; return; }
        if (cmd === 'close' || cmd === 'exit' || cmd === 'gui') { close(); return; }

        if (cmd === 'open' || cmd.startsWith('open ')) {
            const target = cmd.slice(4).trim();
            if (pages[target]) {
                print(`Opening <span class="accent">${pages[target]}</span>…`, 'output-box');
                setTimeout(() => { window.location.href = `${pageRoot}${pages[target]}`; }, 400);
            } else {
                print((target ? `open: ${target}: no such page\n\n` : '') +
                    `Available pages:\n  ${Object.keys(pages).join('\n  ')}`, 'output-box');
            }
            return;
        }

        if (commands[cmd]) { print(commands[cmd], 'output-box'); return; }

        // Unknown input: `ask <question>` or any plain text -> the agent.
        const question = cmd === 'ask' ? '' : (cmd.startsWith('ask ') ? raw.slice(4).trim() : raw);
        askAgent(question);
    });
})();
