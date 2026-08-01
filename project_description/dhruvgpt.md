# 1. CV Entry

  Project Name: DhruvGPT — NVIDIA API Chat Interface

  Tech Stack: Python, FastAPI, async SQLAlchemy, PostgreSQL, Alembic, NVIDIA hosted inference API, httpx, Pydantic v2, vanilla JavaScript, HTML, CSS, Docker, Render, GitHub Pages, GitHub
  Actions

  - Built an asynchronous FastAPI chat backend that streams NVIDIA LLM responses through Server-Sent Events while persisting conversations and messages in PostgreSQL.
  - Implemented SQLAlchemy ORM models, CRUD services, Alembic migrations, UUID keys, cascading deletes, database constraints, and indexed conversation/message queries.
  - Engineered resilient NVIDIA API integration with streaming token delivery, reasoning-token support, usage tracking, timeout handling, rate-limit handling, malformed-payload
    tolerance, and exponential retries for connection and 5xx failures.

  - Delivered a responsive vanilla JavaScript frontend with model selection, reasoning-budget controls, conversation management, Markdown rendering, syntax highlighting, DOM
    sanitization, cancellation, retry handling, and GitHub Pages deployment automation.

  # 2. Full Project Description

  ## Overview

  DhruvGPT is a web-based LLM chat application powered by NVIDIA’s hosted inference API. It provides persistent conversations, streaming responses, model selection, optional reasoning-
  token controls, Markdown rendering, and responsive desktop/mobile interaction.

  The backend is an asynchronous FastAPI service. The frontend is a static HTML/CSS/JavaScript application with no build step.

  ## Problem Solved

  The project provides a browser-based interface for interacting with hosted NVIDIA language models while solving several practical application concerns:

  - Securely keeping the NVIDIA API key on the backend.
  - Streaming model output incrementally instead of waiting for full responses.
  - Persisting conversation history across sessions.
  - Supporting multiple models and optional reasoning budgets.
  - Handling provider failures, timeouts, rate limits, cancellation, and partial responses.
  - Deploying the backend and frontend independently.

  ## Architecture

  The application follows a frontend-backend-database-provider architecture:

  1. The browser sends chat requests to FastAPI.
  2. FastAPI validates requests with Pydantic.
  3. Conversation and user-message data are persisted through async SQLAlchemy.
  4. The backend builds the system prompt and conversation history.
  5. The NVIDIA client sends an OpenAI-compatible streaming request.
  6. NVIDIA response chunks are converted into SSE events.
  7. The frontend parses SSE events and updates the interface incrementally.
  8. Assistant output is persisted after completion or partial cancellation.
  9. New conversations receive an asynchronously generated title.

  Primary backend modules include:

  - main.py: FastAPI application, middleware, routers, health endpoint, exception handling.
  - routers/chat.py: Model discovery, chat streaming, SSE formatting, title generation.
  - routers/conversations.py: Conversation listing, retrieval, and deletion.
  - nvidia_client.py: NVIDIA streaming client, retries, provider errors, usage tracking.
  - crud.py: Async database operations.
  - models.py: SQLAlchemy ORM models.
  - schemas.py: Pydantic request and response models.
  - database.py: Async engine, session factory, and dependency injection.
  - config.py: Environment-driven application settings.

  ## Key Features

  - Streaming chat responses using Server-Sent Events.
  - Persistent conversations and messages.
  - Conversation listing ordered by most recent update.
  - Conversation retrieval with complete message history.
  - Conversation deletion with cascading message deletion.
  - Automatic titles generated from the first user message.
  - Configurable NVIDIA model selection.
  - Reasoning-token support for configured models.
  - Dynamic reasoning-budget slider in the frontend.
  - Token usage capture and reporting in final SSE events.
  - Retry behavior for connection failures and provider 5xx responses.
  - Dedicated handling for rate limits and request timeouts.
  - Stop-response control using AbortController.
  - Retry buttons for failed or interrupted responses.
  - Markdown rendering with syntax highlighting.
  - DOMPurify-based assistant-content sanitization.
  - Copy buttons for rendered code blocks.
  - Responsive mobile sidebar and chat layout.
  - Backend health-check endpoint for deployment monitoring.

  ## Technical Implementation

  ### Backend API

  Implemented endpoints include:

  - GET /health
  - GET /models
  - POST /chat
  - GET /conversations
  - GET /conversations/{conversation_id}
  - DELETE /conversations/{conversation_id}

  POST /chat accepts a message, optional conversation UUID, optional model override, and optional thinking budget. It returns a text/event-stream response containing:

  - conversation_id
  - reasoning
  - token
  - done
  - error

  ### NVIDIA Integration

  The NVIDIA client uses httpx.AsyncClient and an OpenAI-compatible /chat/completions endpoint.

  Implemented behavior includes:

  - Bearer-token authentication.
  - Streaming response consumption.
  - Incremental token and reasoning extraction.
  - Optional nvext.max_thinking_tokens.
  - Usage extraction through stream_options.include_usage.
  - Three-attempt retry handling.
  - Exponential backoff for connection errors and HTTP 5xx responses.
  - Immediate failure for most 4xx responses.
  - Dedicated 429 and timeout exceptions.
  - Malformed SSE JSON logging and skipping.

  ### Data Layer

  The PostgreSQL schema contains:

  - conversations
      - UUID primary key
      - Optional title
      - Creation and update timestamps
      - Index on updated_at

  - messages
      - UUID primary key
      - Conversation foreign key
      - Role constraint allowing user or assistant
      - Text content
      - Creation timestamp
      - Optional token count
      - Index on conversation_id
      - Cascading deletion from conversations

  Async sessions use expire_on_commit=False, and conversation detail queries use selectinload for message retrieval.

  ### Frontend

  The frontend uses browser-native APIs and CDN libraries:

  - fetch
  - ReadableStream
  - TextDecoder
  - AbortController
  - localStorage
  - requestAnimationFrame

  The client manually parses SSE frames, maintains conversation state, renders streaming output, preserves partial responses, and avoids automatic scrolling when the user has scrolled
  upward.

  Assistant Markdown is rendered through marked, syntax-highlighted with Highlight.js, and sanitized with DOMPurify when available. User messages are inserted with textContent.

  ## Tech Stack

  ### Backend

  Python 3.12, FastAPI, Uvicorn, Pydantic v2, Pydantic Settings, async SQLAlchemy, asyncpg, Alembic, httpx

  ### Frontend

  HTML5, CSS3, vanilla JavaScript, marked.js, DOMPurify, Highlight.js

  ### Database

  PostgreSQL with UUID-based relational models, indexes, constraints, foreign keys, and Alembic migrations

  ### Infrastructure

  Docker, Python slim base image, Render web service, GitHub Pages, GitHub Actions

  ### Configuration

  Environment variables loaded through Pydantic Settings and .env support for local development

  ## Engineering Challenges

  - Correctly translating provider SSE streams into browser-consumable SSE events.
  - Preserving partial assistant output when a browser request is cancelled.
  - Separating reasoning content from final answer content.
  - Handling provider rate limits, timeouts, connection failures, malformed chunks, and 5xx responses.
  - Managing async database sessions during long-lived streaming responses.
  - Ensuring newly created conversation IDs reach the frontend before subsequent requests.
  - Loading and applying a system prompt from a backend file.
  - Supporting model-specific reasoning configuration without hard-coding frontend metadata.
  - Rendering untrusted model Markdown while limiting script injection risk.

  ## Performance & Scalability

  The implementation includes:

  - Async FastAPI request handling.
  - Async SQLAlchemy database access.
  - Streaming model output to reduce perceived response latency.
  - Indexed conversation update and message foreign-key columns.
  - Lightweight conversation-list queries that omit message bodies.
  - Eager loading only when full conversation details are requested.
  - Client-side requestAnimationFrame batching during streaming renders.
  - Exponential backoff for transient provider failures.
  - Docker layer caching by installing dependencies before copying application code.

  Current scalability limitations visible in the implementation include:

  - Every chat request loads the complete conversation history.
  - Conversation listing has no pagination.
  - There is no authentication or per-user data isolation.
  - There is no application-level rate limiter.
  - Each generated conversation title requires an additional model completion.
  - The backend creates a new httpx.AsyncClient for each streaming attempt.

  ## Security

  Implemented protections include:

  - NVIDIA credentials are supplied through environment variables and kept server-side.
  - .env files are ignored by Git.
  - Pydantic validates required fields and minimum message length.
  - UUID route parameters are type-validated.
  - Database role constraints restrict persisted message roles.
  - Foreign keys and cascading deletes preserve relational integrity.
  - User content is rendered with textContent.
  - Assistant Markdown is sanitized with DOMPurify when available.
  - API errors are logged server-side and returned through JSON/SSE error paths.

  Security gaps present in the implementation include:

  - CORS is configured with allow_origins=["*"], despite configurable CORS settings existing in config.py.
  - No authentication or authorization is implemented.
  - No per-user conversation ownership model exists.
  - The global exception handler includes exception text in the response body.
  - External CDN assets are loaded without visible integrity attributes.

  ## Testing

  The repository contains two standalone manual scripts:

  - backend/scripts/test_nvidia_client.py
      - Exercises streaming completion.
      - Exercises full completion aggregation.
      - Displays token usage when returned.

  - backend/scripts/test_models.py
      - Runs configurable prompts against one or more NVIDIA models.
      - Captures response text, reasoning, elapsed time, usage, and errors.
      - Prints per-model summaries.

  A repository inspection found no automated unit or integration test suite, no collected pytest tests, and no test workflow in GitHub Actions.

  A lightweight Python compilation check passed for the backend application and Alembic code.

  ## Deployment

  ### Backend

  The backend is containerized with python:3.12-slim.

  The Docker image:

  - Installs dependencies from requirements.txt.
  - Copies the backend application.
  - Runs alembic upgrade head during container startup.
  - Starts Uvicorn on Render’s $PORT value or port 8000.
  - Exposes /health for deployment health checks.

  ### Frontend

  The static frontend is deployed to GitHub Pages through .github/workflows/deploy.yml.

  The workflow:

  - Runs on pushes to main affecting frontend/**.
  - Supports manual dispatch.
  - Uploads the frontend directory as a Pages artifact.
  - Deploys using GitHub Pages actions.
  - Uses concurrency cancellation for overlapping deployments.

  ## Key Contributions

  - Designed the asynchronous FastAPI service and provider integration.
  - Implemented persistent conversation and message storage.
  - Added database constraints, indexes, UUID identifiers, and migration support.
  - Built the SSE protocol between backend and browser.
  - Added provider retries, timeout handling, rate-limit handling, and usage capture.
  - Implemented model discovery and reasoning-budget configuration.
  - Developed responsive frontend chat, conversation navigation, deletion, cancellation, and retry behavior.
  - Added Markdown, syntax highlighting, code copying, and sanitization.
  - Added Docker and Render deployment support.
  - Added GitHub Pages deployment automation.
  - Recent Git history shows incremental work on reasoning support, model switching, timeout tuning, CORS/error handling, and Render environment parsing.

  ## ATS Keywords

  Python, FastAPI, REST API, asynchronous programming, async SQLAlchemy, PostgreSQL, asyncpg, Alembic, database migrations, ORM, Pydantic, httpx, NVIDIA API, LLM integration, generative
  AI, Server-Sent Events, SSE, streaming responses, retry logic, exponential backoff, rate-limit handling, timeout handling, Docker, Render, GitHub Pages, GitHub Actions, JavaScript,
  HTML, CSS, responsive design, Markdown rendering, syntax highlighting, DOM sanitization, API integration, database indexing, error handling, observability, cloud deployment

  ## 10 Interview Talking Points

  1. Why Server-Sent Events were selected for incremental LLM response delivery.
  2. How the backend converts NVIDIA streaming chunks into provider-neutral SSE events.
  3. How async SQLAlchemy sessions are managed across FastAPI requests and streaming generators.
  4. How conversation history is reconstructed before each model request.
  5. How partial assistant responses are preserved after cancellation or provider failure.
  6. How retries differ between connection errors, 5xx responses, 4xx responses, and 429 rate limits.
  7. How model metadata and reasoning budgets are exposed through /models.
  8. How database indexes, eager loading, and lightweight summary queries reduce unnecessary work.
  9. How frontend Markdown rendering is protected with DOMPurify and safe DOM APIs.
  10. What would be added for production scale: authentication, tenant isolation, pagination, rate limiting, automated tests, observability, and stricter CORS configuration.