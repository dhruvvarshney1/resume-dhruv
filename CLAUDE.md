# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal portfolio site for Dhruv Varshney (IIT Kharagpur, B.S. Exploration Geophysics + CS Minor), published as a static GitHub Pages site at `https://github.com/dhruvvarshney1/resume-dhruv` (the `origin` remote). There is no build step, no framework, no package manager.

## Entry points

- `index.html` — **default landing page**: the GUI portfolio (Debbie Chen minimalist aesthetic). Loads `gui.css`. Sections: hero, work, projects, about, contact. Nav anchors to those sections; smooth-scroll handled by an inline script at the bottom of the page.
- `terminal.js` — **live terminal drawer**: self-injects a nav toggle + slide-in panel on every page that loads it (all pages do). Canned commands (`about`, `experience`, `projects`, …), `open <page>` navigation, Tab completion, history. Styles live in `gui.css` (search "Terminal sidebar").
- `agent.js` — **LLM chat agent for the terminal**, loaded right before `terminal.js` on every page. Exposes `window.TerminalAgent.ask(q)`; grounds resume answers in `resume.json` (fetched once) and answers general questions too. Talks to the NVIDIA NIM API with a key stored in the `NVIDIA_API_KEY` constant (visible in source by design — use a free-tier, rate-limited key). `terminal.js` routes `ask <q>` and any unknown input to it.
- `detail.js` / `project-*.html` / `experience-*.html` / `skills.html` — detail pages: minified single-line shells whose content is rendered by `detail.js` (and `skills-network.js` for the skills graph) based on `data-detail`. If you change the script tag list in one of these shells, change it in all of them.
- `_archive/` — preserved-but-archived assets (`terminal.html`, tabular CV variants, `style.css`). Not linked from `index.html`; reachable directly by URL. Treat them as read-only history.

Auxiliary files:
- `resume.json` — structured source-of-truth; also the agent's knowledge base. Keep it in sync when facts change.
- `resume.txt` — plain-text narrative (source-of-truth for the long-form bio).
- `Internships/` — PDF versions of CVs/offers (binary, not edited by Claude).

There is **no package.json, no build, no test runner, no linter**. Lint/format with whatever you prefer locally; nothing is enforced in CI.

## Local preview

- VS Code Live Server is pinned to port 5501 (see `.vscode/settings.json` → `"liveServer.settings.port": 5501`). Use the "Live Server" extension on `index.html`.
- Or from a shell: `python -m http.server 5501` (or any static server) and open `http://localhost:5501/`.

## Architecture in one paragraph

`index.html` is static markup styled by `gui.css`. There is no JS framework — an inline script handles nav-scroll/smooth-scroll, and `project-cards.js`/`profile.js` handle small GUI behaviors. `terminal.js` + `agent.js` add the site-wide chat drawer. There is no shared data layer; if you change a project description, edit it in `index.html` (the project card) and propagate to `resume.json`/`resume.txt` manually.

## Conventions worth knowing before editing

- **GUI styling is the Debbie Chen style** — light background, Inter + Playfair Display, large serif headings, zinc palette, hover-italic on titles, generous whitespace. Match it; don't drift toward something denser.
- **Terminal colors** in `terminal.js` (`highlight` orange, `accent` yellow, `dim` gray, Monokai-palette ASCII banner) are the live terminal's palette — reuse them for anything new inside the drawer.
- **Tabular CV styling** (`_archive/style.css`) is reserved for the archived CV pages. Don't pull it back into `index.html`.

## Things to NOT do

- Do not add a build system, bundler, framework, or package.json. The whole point is zero-dependency static hosting on GitHub Pages.
- Do not resurrect `_archive/` files into the live site without asking — they were moved out for a reason.
- Do not commit to `main` without asking — the recent history shows topic-style commit messages (`23-Dec-25_01`, `22-Dec-25`) suggesting personal cadence; follow the user's lead on commit frequency.