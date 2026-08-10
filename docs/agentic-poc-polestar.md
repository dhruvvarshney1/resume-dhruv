# Agentic Inventory-Replenishment POC — Project Analysis

> Portfolio-grade brief of `Agentic_POC_Retail`: a deterministic, human-in-the-loop
> agentic pipeline for an automotive-parts distributor, with an LLM used **only** at
> the two human-facing text edges.

---

## 1. Project Summary (~280 words)

**Agentic Inventory-Replenishment POC** is a demoable, deterministic agentic pipeline
that turns a stock breach into the right purchasing action for an automotive-parts
distributor. It addresses a concrete operational pain point: every morning a Demand
Planner must scan hundreds of SKUs, decide who to buy from, what to order, and which
orders a human must approve — work that is high-volume, audit-bound, and policy-driven
but rarely automated end to end.

The **architecture** is a six-agent **LangGraph** state graph
(`stock_monitor → demand_forecast → vendor_checker → approval → {po_generator | human_approval | notification}`)
with a three-way autonomy fork (`AUTO-ISSUE` / `DRAFT-FOR-APPROVAL` / `SUPPRESS`) and
a real `interrupt` pause for the draft path. Each agent is a typed Python function
that fills one slot of a `ReplenishmentState` and appends to an **append-only
`audit_log`** (DB triggers reject `UPDATE`/`DELETE`). The client's Palantir /
Snowflake / AS400 / Blue Yonder stack is mocked with a single local SQLite database
(`poc.db`, 11 tables) and a `write_po()` stub. The LLM is restricted to two
human-facing edges — the draft-PO justification narrative and the notification body
phrasing — behind a `Gemini → Ollama → deterministic template` fallback chain that
never raises.

**Key features** include supplier eligibility + MOQ gating, demand sizing that
applies promo and seasonal uplifts multiplicatively, vendor-consolidated batch POs
(one PO per vendor, many SKUs), and a Streamlit Demand-Planner dashboard for
"Run 6 AM scan", draft approve/reject, and a live Blue Yonder panel.

**Results**: four canonical scenarios (S1 auto-issue, S2 draft-pause, S3 batch
consolidation, S4 suppress) reproduce byte-stable from a fixed seed + reference date;
a 17-check Phase-4 acceptance gate and 18 pytest cases (guardrails, audit, HITL,
graph) all pass; the dashboard demo runs offline with `USE_LLM=false` and the
LLM is structurally off the detection/forecasting/routing path.

---

## 2. Resume / CV Entry (ATS-optimized)

**Agentic Inventory-Replenishment POC — Agentic AI / Software Engineer (sole contributor)**
`LangGraph` · `Python 3.11` · `SQLAlchemy 2.0` · `Pydantic v2` · `Streamlit` · `Gemini`

- **Designed and shipped a six-agent LangGraph pipeline** (`stock_monitor → demand_forecast → vendor_checker → approval → po_generator → notification`) with a three-way autonomy fork (`AUTO-ISSUE` / `DRAFT-FOR-APPROVAL` / `SUPPRESS`) and a real `interrupt`-based human-in-the-loop gate on the draft path.
- **Engineered a structurally enforced PO-write guardrail**: a draft cannot reach the PO node without an explicit human resume; the single `_write_allowed()` check rejects suppression outright and required-field validation prevents writes missing vendor, quantity, or approver — verified by an 18-case pytest suite.
- **Built a deterministic, audit-bound data layer** (11 SQLAlchemy 2.0 tables + 2 append-only `audit_log` SQLite triggers that abort `UPDATE`/`DELETE`), with one `append_audit()` chokepoint and a 17-check `validate_phase4.py` acceptance gate.
- **Implemented vendor-consolidated batch POs** (the Scenario-3 path) that collapse N per-SKU orders into one PO per shared approved vendor, while a suspended-vendor SKU falls out to the human-draft path.
- **Built a provider-agnostic LLM wrapper** (`Gemini 2.5 Flash → local Ollama → deterministic template`) that never raises; `USE_LLM=false` forces a fully offline, byte-stable demo and the LLM is restricted to two human-facing text edges — narrative drafting and notification phrasing.
- **Delivered a Streamlit Demand-Planner dashboard** with one-click "Run 6 AM scan", colour-coded worklist cards, draft approve/reject buttons that resume the graph, a live Blue Yonder panel, and Notifications + Audit tabs.

---

## 3. Tech Stack

| Layer | Choices |
|---|---|
| **Language** | Python 3.11+ (type-checked with `from __future__ import annotations`) |
| **Agent / Orchestration** | LangGraph (`StateGraph`, `MemorySaver` checkpointer, `interrupt`, `Command(resume=...)`, `add_conditional_edges`) |
| **Agents** | Six deterministic, Pydantic-typed agent modules: `stock_monitor`, `demand_forecast`, `vendor_checker`, `approval`, `po_generator`, `notification` |
| **LLM / Inference** | `google-generativeai` (Gemini 2.5 Flash default) + `requests` to local Ollama; pluggable via `LLM_PROVIDER` env; deterministic template fallback; short Ollama connect timeout for fail-fast offline |
| **Schemas / Validation** | Pydantic v2 (`BaseModel`, `Field`, `model_dump(mode="json")`, `model_validate`); `Enum(str, Enum)` for `StockSignal`, `AutonomyTier`, `DraftReason`, `Urgency`, `Channel` |
| **Data / Storage** | SQLAlchemy 2.0 ORM + `sqlite3` (`data/poc.db`, 11 tables), `sessionmaker(expire_on_commit=False)`, FK-enabling `PRAGMA`, SQLite triggers for append-only audit |
| **Forecasting / Numerics** | `pandas`, `numpy`, `statsmodels` (registered for future replacement of the weekly-mean baseline), `math.ceil` pack rounding |
| **Deterministic Seed** | `faker` + `random.seed(42)` for `scripts/seed_data.py`; fixed reference date `2026-06-09` |
| **Frontend** | Streamlit multi-page DP dashboard (`ui/app.py`, `ui/service.py`, `ui/data_access.py`, `ui/scenarios.py`) — server-side `st.session_state`, presentation-only |
| **Config** | `python-dotenv`, central `config.py` with env-overridable policy knobs (`CRITICAL_LOW_RATIO`, `DEFAULT_LEAD_MULTIPLIER`, `PEAK_LEAD_MULTIPLIER`, `SAFETY_BUFFER_FACTOR`, `CRITICAL_DRAFT_SLA_HOURS`, `PO_NUMBER_SEQ_BASE`) |
| **Testing** | `pytest` (18 tests across 4 suites: `test_guardrails`, `test_audit`, `test_hitl`, `test_graph`); `conftest.py` autouse `no_llm` + `fresh_db` fixtures |
| **Acceptance Gates** | `scripts/validate_phase1.py` … `validate_phase4.py` (deterministic non-zero-exit gates), `smoke_agents.py`, `show_db.py`, `export_csv.py` |
| **Tooling** | `.venv`, `requirements.txt`, `.env.example`, `.gitignore`, `.vscode/`, `pytest.ini` |

---

## 4. Skills Demonstrated

**Software Engineering** — clean layered architecture (`config.py` → `data/` → `agents/` → `orchestration/` → `ui/`); one `ReplenishmentState` Pydantic model that flows through the pipeline; the `TYPE_CHECKING` import guard that prevents the `agents/state.py` import cycle; a single `db.append_audit()` writer; a single `_write_allowed()` PO-guard.

**Agentic AI / LLM Engineering** — explicit separation of detection/forecasting/routing (deterministic Python) from text phrasing (LLM); a `Gemini → Ollama → template` provider chain that **never raises**; strict system prompts ("use ONLY these facts", "no invented SKUs / quantities / dates / vendors"); narrative `body_source` recorded on every notification (`gemini` / `ollama` / `template`); `USE_LLM` master switch for fully offline byte-stable demos.

**Orchestration / State Machines** — LangGraph `StateGraph` with a conditional three-way fork, `MemorySaver` checkpointer, structured `interrupt` payload, and `Command(resume=...)` resume; a `run_id → thread_id` registry (`_PAUSED_THREADS`) that lets the dashboard approve/reject without tracking LangGraph thread ids; `reset_graph()` for the "fresh day" semantic.

**Data Engineering** — 11-table SQLite schema (source/analytics mocks + execution + cross-cutting); FK-enabling `PRAGMA foreign_keys=ON`; deterministic seeding; gap-free `PO-<year>-<seq>` numbering via `db.next_po_number()`; `effective_stock = on_hand + in_transit` arithmetic; pack-size rounding in `math.ceil`.

**Governance / Reliability** — append-only `audit_log` enforced at the **DB level** via SQLite triggers (`SELECT RAISE(ABORT, ...)` on `UPDATE`/`DELETE`); SUPPRESSED audit events carry `details.effective_stock_calc`; required-field validation (`_validate_required_fields`) refuses writes missing vendor, qty, or approver; `write_po()` refuses empty line lists.

**Human-in-the-Loop (HITL)** — physical (not conventional) gate via LangGraph `interrupt`; `runner.approve()` / `runner.reject()` resume verbs; `alternate_sourcing` flag + procurement-desk notification on rejection; CRITICAL-LOW SLA stub (`approval_deadline` stamped from `config.CRITICAL_DRAFT_SLA_HOURS`).

**Frontend / Product** — multi-page Streamlit dashboard with server-side state, read-only `data_access.py` over the live `poc.db`, and a thin `service.py` that funnels run/approve/reject through the orchestration runner; colour-coded AUTO-ISSUED / NEEDS APPROVAL / SUPPRESSED worklist cards; live Blue Yonder + Notifications + Audit panels.

**Quality Engineering** — 18 pytest cases + 4 phase validators as deterministic non-zero-exit gates; `no_llm` autouse fixture; byte-stable determinism from `POC_RANDOM_SEED=42` and `POC_REFERENCE_DATE=2026-06-09`; all numeric routing decisions reproducible on any machine.

**Research / Domain Modelling** — translates supply-chain replenishment policy into a routing table (`docs/decision_logic.md`); encodes the four canonical scenarios (S1 auto-issue, S2 draft, S3 batch consolidation, S4 suppress) as byte-stable test anchors.

---

## 5. Key Contributions

- **Six-agent pipeline** with one Pydantic state object (`agents/state.py:27`) flowing through every node; per-agent output models keep the import graph acyclic via `TYPE_CHECKING`.
- **Three-way autonomy fork** in `orchestration/graph.py:309` driven by `ApprovalDecision.tier`; `route_after_approval` is the single fork point (`graph.py:252`).
- **Structural PO-write guardrail** in `agents/po_generator.py:76` (`_write_allowed`); required-field check at `po_generator.py:102`; empty-line refusal in `agents/mock_blue_yonder.py:67`. **One** writer in the codebase, mirroring a real integration boundary.
- **DB-level append-only audit** in `data/database.py:48` (SQLite `BEFORE UPDATE/DELETE` triggers that `RAISE(ABORT)`); single writer `agents/db.py:267` (`append_audit`); suppression events carry `effective_stock_calc` so "why no PO?" is defensible.
- **LangGraph `interrupt` HITL** in `orchestration/graph.py:124` (`_human_approval_node`) — the draft path physically cannot reach `po_generator` without a `Command(resume=HumanDecision(...))`.
- **Vendor-consolidated batch PO** in `agents/vendor_checker.py:193` (`consolidate_by_vendor`) + `agents/po_generator.py:217` (`generate_consolidated`) — the S3 efficiency win (N per-SKU orders → 1 order per vendor).
- **Provider-agnostic LLM wrapper** `llm/provider.py:52` — `Gemini → Ollama → template`, never raises, records the source on the notification so the dashboard shows machine-written vs. templated text.
- **Deterministic narrative templates** in `agents/approval.py:303` (`_fallback_narrative`) and `agents/notification.py:230` (`_template`) — the LLM only ever rephrases facts the agent already computed; the system prompt forbids new data, the template body is the explicit fallback.
- **Demand sizing** in `agents/demand_forecast.py:117` — `weekly_avg × (1+promo) × (1+season) × lead_multiplier + safety_buffer`, ceil-rounded to `pack_size`, with explicit `advisory_only` for the SUPPRESS path.
- **Streamlit dashboard** (`ui/app.py`, `ui/service.py`, `ui/data_access.py`) — "Run 6 AM scan" button (re-seeds, scans, runs the runner), draft approve/reject resume the graph, live Blue Yonder / Notifications / Audit tabs.
- **Acceptance gates** under `scripts/` (`validate_phase1` … `validate_phase4.py`, `smoke_agents.py`) — deterministic, non-zero-exit regression checks; `validate_phase4.py` is a 17-check phase-4 gate.
- **18 pytest cases** across `tests/test_guardrails.py` (write-guard matrix + suppress + paused-draft), `tests/test_audit.py` (DB-level immutability + per-agent audit), `tests/test_hitl.py` (approve / reject / SLA), `tests/test_graph.py` (S1 / S2 / S4 through the graph).

---

## 6. Keywords (ATS-friendly)

`Python 3.11` · `LangGraph` · `StateGraph` · `MemorySaver` · `interrupt / resume` · `human-in-the-loop (HITL)` · `Pydantic v2` · `SQLAlchemy 2.0` · `SQLite triggers` · `append-only audit` · `Pydantic BaseModel` · `Enum(str, Enum)` · `deterministic seeding` · `reference-date determinism` · `multi-agent orchestration` · `agentic pipeline` · `autonomy tiers` · `AUTO-ISSUE / DRAFT-FOR-APPROVAL / SUPPRESS` · `MOQ gating` · `vendor consolidation` · `Streamlit` · `google-generativeai (Gemini 2.5 Flash)` · `Ollama` · `provider fallback chain` · `prompt engineering` · `zero-hallucination design` · `negative constraints` · `pandas` · `numpy` · `statsmodels` · `faker` · `python-dotenv` · `pytest` · `conftest fixtures` · `acceptance gates` · `CRUD guardrail` · `required-field validation` · `SQLite BEFORE UPDATE/DELETE trigger` · `immutable audit trail` · `LangGraph conditional edges` · `Command(resume=...)` · `checkpointer` · `deterministic template fallback` · `supply-chain replenishment` · `automotive parts distribution` · `Blue Yonder / SCPO mock` · `Palantir / Snowflake / AS400 mock` · `production-grade engineering hygiene` · `decision-logic table` · `service-layer architecture` · `read-only data access layer` · `multi-page Streamlit app` · `server-side session state` · `SLA stub` · `alternate sourcing` · `Effective-stock arithmetic` · `promo + season uplifts` · `pack-size rounding` · `JSON audit details` · `graph state snapshot` · `run_id → thread_id registry`.
