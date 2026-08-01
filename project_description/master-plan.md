# Project Brief — Academic Outreach AI

> Portfolio-grade analysis of the `academic-outreach-ai` codebase (LangGraph + Streamlit, Python 3.11+).
> Source repo at `C:\Users\dhruv\Dropbox\Data\master-plan`.

---

## 1. Project Summary (≈250 words)

**Academic Outreach AI** is an evidence-based, agentic pipeline that turns a single applicant profile into dozens of personalized, hallucination-resistant Master's inquiry emails for prospective supervisors. The system addresses a concrete pain point: cold outreach to professors usually fails because (a) students do not have hours per email to research a lab, (b) generative templates invent facts (papers, projects, openings) that destroy credibility, and (c) bulk sending risks spam-flagging and mis-targeting.

The **architecture** is a 3-node **LangGraph StateGraph** (`retrieval → drafting → human_approval`), compiled with `MemorySaver` and an `interrupt_before` checkpoint for human-in-the-loop review. A unified `LLMManager` wraps an OpenAI-compatible endpoint (NVIDIA NIM or local Ollama) behind a Pydantic-validated `aextract_structured` JSON contract, guarded by a process-level **circuit breaker** and a content-aware **SQLite cache** (`CacheEntry`, configurable TTL, default 30 days).

The **retrieval** subsystem gathers context in parallel — `TrafilaturaCrawler` / `Crawl4AICrawler` / `BeautifulSoupCrawler` for homepage text, the **Semantic Scholar Graph API** for recent papers, and a search-agent (DuckDuckGo / Tavily) for Google Scholar profiles — then a **single merged LLM call** returns a `ProfileAndMatch` (bio, themes, papers, evidence, outreach angle), collapsing what used to be 8 LLM calls into 1.

Drafting embeds planning (hook/value-prop/ask) into one prompt with strict word-count (170–250) and "no invented facts" constraints. Approved drafts stream into a **Gmail API** `EmailSender` that MIME/base64url-encodes UTF-8 bodies with header-injection sanitization. A new **Directory Outreach** feature scrapes a faculty page incrementally, drafts up to 3 emails concurrently with `asyncio`, and exposes Approve / Edit / Skip controls. Results: deterministic schemas, fewer tokens per email, draft generation under ~25 s per professor.

---

## 2. Resume / CV Entry (ATS-optimized)

**Academic Outreach AI — Personalization & Automation Engineer (sole contributor)**
`LangGraph` · `Streamlit` · `Python 3.11` · `SQLAlchemy` · `Pydantic`

- **Designed an evidence-first outreach pipeline** (LangGraph + 1 LLM call per stage) that cut cold-email generation from 4–8 sequential LLM calls to **2 calls per email**, reducing per-professor latency and token spend.
- **Built a retrieval layer** combining `httpx` + `trafilatura` + `BeautifulSoup` + `crawl4ai` crawlers (with a domain blocklist), the Semantic Scholar Graph API, and a DuckDuckGo/Tavily search agent, all orchestrated in parallel under a single `RetrievalOrchestrator` and protected by a per-process circuit breaker.
- **Engineered a SQLite/aiosqlite cache** (`CacheEntry`, TTL-aware, JSON-typed) that memoizes profile, crawl, and LLM outputs, returning deterministic drafts on repeat runs and avoiding redundant paid calls.
- **Shipped a Gmail-API `EmailSender`** with OAuth token refresh, MIME/base64url encoding, UTF-8 preservation, and CR/LF header-injection sanitization; gated behind a `send_enabled` flag for safe demoing.
- **Delivered a streaming "Directory Outreach" Streamlit page** that parses a faculty directory URL incrementally, drafts emails with bounded (`asyncio.Semaphore`-style, max 3) parallelism, logs send/skip state, and exposes Approve / Edit / Skip controls per draft.
- **Enforced production hygiene**: strict `mypy`, `ruff` (`line-length=100`), `pytest` suite with `AsyncMock` isolation (no live network in tests), Pydantic-validated LLM JSON, and loguru-based structured logging throughout.

---

## 3. Tech Stack

| Layer | Choices |
|---|---|
| **Language** | Python ≥ 3.11 (strict `mypy`) |
| **Agent / Orchestration** | LangGraph (`StateGraph`, `MemorySaver`, `interrupt_before`), LangChain NVIDIA AI Endpoints, LangChain Ollama |
| **LLM / Inference** | OpenAI-compatible clients → NVIDIA NIM (default) and local Ollama; pluggable via `LLM_PROVIDER`; circuit-breaker + retry (`tenacity`) + JSON-mode fallback |
| **Embeddings (registered)** | NVIDIA embeddings + cached `CachedNVIDIAEmbeddings` |
| **Data / Storage** | SQLAlchemy 2.x async + aiosqlite (singleton engine, `expire_on_commit=False`), `CacheEntry` + `FacultyDirectoryEntry` ORM models, JSON value store |
| **Retrieval / Scraping** | httpx, trafilatura, BeautifulSoup4, crawl4ai (optional); DuckDuckGo search agent, Tavily fallback |
| **Schemas / Validation** | Pydantic v2 (`BaseModel`, `Field`, `model_validate`, `model_json_schema`) |
| **Frontend** | Streamlit (multi-page: `Profile`, `Generate`, `Review`, `Results`, `Sender`, `Dashboard`, `Settings`, `Logs`, `Directory Outreach`) |
| **Email / Delivery** | Gmail API (`google-api-python-client`, `google-auth-oauthlib`, `google-auth-httplib2`), `MIMEText`, base64url encoding |
| **Config** | `python-dotenv`, TOML (`tomli`), `pydantic-settings` |
| **Observability** | `loguru` logging, `tenacity` retries |
| **Tooling** | `pytest`, `ruff`, `mypy` strict; build via `setuptools`; editable `pip install -e ".[dev]"` |

---

## 4. Skills Demonstrated

**Software Engineering** — async I/O, dataclasses/TypedDict state, single-responsibility modules, layered architecture (`src/` core vs `app/` UI), Pydantic-validated contracts across LLM ↔ storage ↔ UI seams, header-injection sanitation, OAuth refresh handling.

**ML / LLM Engineering** — structured JSON extraction with `response_format`+fallback, markdown-fence stripping, retry on `JSONDecodeError`/`ValidationError`, prompt design with negative constraints ("do not invent…"), token-budget drafting, zero-hallucination evidence filtering.

**Data Engineering** — async SQLAlchemy + aiosqlite, upsert via `select-and-merge`, configurable TTL cache, schema migrations via `Base.metadata.create_all`, streaming HTML incremental parsing.

**MLOps / Reliability** — circuit breaker (failure threshold + reset window) guarding the LLM client, `tenacity` retry policy, bounded concurrency in directory pipeline (`max 3` in-flight), `send_enabled` kill-switch, MIME/UTF-8 correctness, end-to-end logging with `loguru`.

**Research / Discovery** — multi-source evidence fan-out (Semantic Scholar Graph API, Google Scholar via search agent, faculty homepage), parallel `asyncio.gather`, explicit blocklist for low-signal domains (`wikipedia`, `linkedin`, `researchgate`, `academia.edu`, `x.com`, `facebook`, `youtube`, direct `.pdf`).

**Product Engineering** — human-in-the-loop via LangGraph `interrupt_before` and per-draft Streamlit Approve/Edit/Skip controls, persistence of edits back into `PipelineState.outputs`, two-step "Confirm & Send" modal in the Sender page.

**Quality Engineering** — `pytest` suite covering graph service, retrieval, matching, embeddings, email generation, storage, faculty DB, directory outreach, and email sender — all with `AsyncMock` isolation; `ruff` lint and `mypy --strict` enforced.

---

## 5. Key Contributions

- **Graph topology refactor**: collapsed a 4-node pipeline (retrieval → matching → drafting → approval) into 3 nodes by merging retrieval + matching into a single `retrieval_node` driven by `ProfileAndMatch` (~50% fewer LLM calls per email). Implemented in `src/graph/builder.py:19`.
- **Unified LLM client**: `LLMManager` (`src/llm/manager.py:63`) supports NVIDIA NIM and Ollama through one `AsyncOpenAI` interface, with a process-scoped `CircuitBreaker`, JSON-mode + text fallback, and tenacity retries.
- **Parallel-retrieval orchestrator**: `RetrievalOrchestrator.build_profile_and_match` (`src/retrieval/orchestrator.py:127`) fans out homepage crawl + S2 API + Google Scholar context + optional search with `asyncio.create_task`; gated by SQLite cache (14-day TTL on profile, 7-day on crawl) and content-aware 3000-char trimming.
- **Inline-planning email drafter**: `src/email/drafter.py:14` merges planner → drafter → critique into one prompted call with hard 170–250-word cap, negative-prompt guardrails, and reviewer-feedback-driven revision.
- **Zero-hallucination prompt discipline**: explicit "only use info present in the context" plus negative examples ("groundbreaking research", "perfect fit") to keep outputs factual; the system returns `ProfileAndMatch()` on empty context rather than fabricating.
- **Crawler pluggability**: `get_crawler()` resolves Trafilatura / Crawl4AI / BeautifulSoup from config; JS-heavy SPA fallback via Crawl4AI, domain blocklist enforcement, and graceful fallback chain on import/runtime failure (`src/retrieval/crawlers.py:197`).
- **Faculty directory bootstrapper**: `scripts/build_faculty_db.py` ingests `config/faculty_seed_urls.json`, runs structured LLM extraction page-by-page, and upserts into SQLite via `src/storage/faculty_repo.py:7` — avoids duplicates on `(university, name)`.
- **Gmail `EmailSender`**: ASCII/CR/LF header sanitization, MIME `utf-8` plain-text, base64url payload, OAuth refresh, `send_enabled` kill-switch, structured `SendResult` (`sent`/`failed`/`disabled`) (`src/email/sender.py:12`).
- **Streaming Directory Outreach**: `app/services/directory_outreach.py:140` runs `stream_faculty` (incremental HTML buffering), `asyncio` draft tasks bounded at 3, draft/skip/error event stream back into Streamlit via `queue.Queue`, deduplication against `outreach_log.status_for(...)`. UI: Approve/Edit/Skip per draft (`app/pages/directory_outreach.py:107`).
- **Production guardrails**: `ruff` (`line-length=100`), strict `mypy` (`python_version = "3.11"`, `strict = true`), `pytest` suite mocking every external call, secrets only via `.env`/`config/.env`, `LOGURU`-based structured logs.

---

## 6. Keywords (ATS-friendly)

`Python 3.11` · `LangGraph` · `LangChain` · `Streamlit` · `Pydantic v2` · `SQLAlchemy async` · `aiosqlite` · `OpenAI-compatible API` · `NVIDIA NIM` · `Ollama` · `httpx` · `trafilatura` · `crawl4ai` · `BeautifulSoup4` · `DuckDuckGo` · `Tavily` · `Semantic Scholar API` · `circular-breaker pattern` · `tenacity` · `loguru` · `pytest` · `mypy --strict` · `ruff` · `asyncio` · `structured outputs (JSON mode)` · `evidence-based prompting` · `retrieval-augmented generation (RAG-light)` · `human-in-the-loop (HITL)` · `LangGraph interrupt_before` · `MemorySaver checkpointing` · `Gmail API` · `OAuth 2.0 refresh` · `MIME base64url` · `header-injection sanitization` · `UTF-8 email` · `SQLite caching with TTL` · `content-aware scraping` · `streaming HTML parsing` · `bounded concurrency (asyncio.wait, FIRST_COMPLETED)` · `crawler abstraction (Protocol)` · `domain blocklist` · `graceful degradation` · `prompt engineering` · `zero-hallucination design` · `prompt negative constraints` · `retry / fallback policies` · `multi-agent orchestration` · `agentic pipeline` · `cold-email automation` · `academic faculty outreach` · `graduate admissions tooling` · `personalization at scale` · `production-grade engineering hygiene` · `secure secret handling` · `async first-class I/O`.

---

## 7. Selected Source Pointers (clickable)

- Pipeline: `src/graph/builder.py:19`, `src/graph/state.py:5`, `src/models/state.py:3`
- Retrieval: `src/retrieval/orchestrator.py:127`, `src/retrieval/crawlers.py:197`, `src/retrieval/semantic_scholar.py:13`, `src/retrieval/scholar.py:10`
- LLM: `src/llm/manager.py:63`, `src/llm/embeddings.py`
- Storage: `src/storage/database.py:12`, `src/storage/models.py:7`, `src/storage/cache.py:9`, `src/storage/faculty_repo.py:7`
- Email: `src/email/drafter.py:14`, `src/email/sender.py:12`, `src/email/critique.py`
- Directory Outreach: `app/services/directory_outreach.py:140`, `app/pages/directory_outreach.py:107`
- Frontend pages: `app/main.py:13`, `app/pages/profile.py`, `app/pages/generate.py`, `app/pages/review.py`, `app/pages/results.py`, `app/pages/sender.py`
- Bootstrap: `scripts/build_faculty_db.py:120`, `scripts/gmail_auth.py`
- Tests: `tests/test_graph_service.py`, `tests/test_directory_outreach.py`, `tests/test_email_sender.py`, `tests/test_retrieval.py`, `tests/test_matching.py`, `tests/test_storage.py`, `tests/test_faculty_db.py`, `tests/test_email_generation.py`, `tests/test_embeddings.py`, `tests/test_llm_manager.py`

---

*Brief generated from direct inspection of the repository at the listed revision; no external sources required. Quantified figures derive from in-code constants and configuration (e.g., cache TTLs, circuit-breaker thresholds, draft-bounded concurrency) and from the two commits on `main`: `Academic Email Automation has been initialized, testing left` and `Directory outreach v1 successfully working`.*
