# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal portfolio site for Dhruv Varshney (IIT Kharagpur, B.S. Exploration Geophysics + CS Minor), published as a static GitHub Pages site at `https://github.com/dhruvvarshney1/resume-dhruv` (the `origin` remote). There is no build step, no framework, no package manager.

## Entry points

- `index.html` — **default landing page**: the GUI portfolio (Debbie Chen minimalist aesthetic). Loads `gui.css`. Sections: hero, work, projects, about, contact. Nav anchors to those sections; smooth-scroll handled by an inline script at the bottom of the page.
- `_archive/` — preserved-but-archived assets: previous terminal experience (`terminal.html`, `terminal.css`, `terminal.js`) and three tabular CV variants (`sde_cv.html`, `core.html`, `data.html`) plus their shared stylesheet (`style.css`). Not linked from `index.html`; reachable directly by URL. Treat them as read-only history.

Auxiliary files:
- `resume.txt` — plain-text narrative (source-of-truth for the long-form bio).
- `Internships/` — PDF versions of CVs/offers (binary, not edited by Claude).

There is **no package.json, no build, no test runner, no linter**. Lint/format with whatever you prefer locally; nothing is enforced in CI.

## Local preview

- VS Code Live Server is pinned to port 5501 (see `.vscode/settings.json` → `"liveServer.settings.port": 5501`). Use the "Live Server" extension on `index.html`.
- Or from a shell: `python -m http.server 5501` (or any static server) and open `http://localhost:5501/`.

## Architecture in one paragraph

`index.html` is static markup styled by `gui.css`. There is no JS framework — just a small inline script at the bottom for nav-scroll state and smooth-scroll anchors. There is no shared data layer; the GUI lives entirely in `index.html` and `gui.css`. If you change a project description, edit it in `index.html` (the project card) and propagate to `resume.txt` manually if you want it reflected in the plain-text version.

## Conventions worth knowing before editing

- **GUI styling is the Debbie Chen style** — light background, Inter + Playfair Display, large serif headings, zinc palette, hover-italic on titles, generous whitespace. Match it; don't drift toward something denser.
- **ASCII banner / terminal colors** in `_archive/terminal.js` (`highlight` orange, `accent` yellow, `dim` gray) only apply if you ever revive the archived terminal — leave them alone otherwise.
- **Tabular CV styling** (`_archive/style.css`) is reserved for the archived CV pages. Don't pull it back into `index.html`.

## Things to NOT do

- Do not add a build system, bundler, framework, or package.json. The whole point is zero-dependency static hosting on GitHub Pages.
- Do not resurrect `_archive/` files into the live site without asking — they were moved out for a reason.
- Do not commit to `main` without asking — the recent history shows topic-style commit messages (`23-Dec-25_01`, `22-Dec-25`) suggesting personal cadence; follow the user's lead on commit frequency.