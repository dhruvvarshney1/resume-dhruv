# Dhruv Varshney

B.S. (Hons.) in Exploration Geophysics with a CS&E Minor | IIT Kharagpur | 2023–2027  
Email: dhruvvarshney2906@gmail.com | Phone: +91 85979 86847 | Location: Kharagpur, India  
LinkedIn: [add profile] | GitHub: [add profile]

---

## Professional Summary

I am a student researcher and builder at IIT Kharagpur working at the intersection of geophysics, machine learning, and applied AI. My background in exploration geophysics has trained me to think carefully about noisy signals, real-world constraints, and measurable outcomes, while my technical work has focused on building reliable systems for forecasting, automation, and intelligent decision support. Over the past few years, I have worked on production-style machine learning pipelines, language-model and agentic systems, computer vision applications, and full-stack web tools. I am motivated by problems that require both rigorous engineering and thoughtful modeling.

---

## Education

- B.S. (Hons.), Exploration Geophysics, IIT Kharagpur, 2023–2027
  - CGPA: 8.41 / 10 (Current)
  - Coursework includes geophysical signal processing, field theory, structural geology, petrology, paleontology, stratigraphy, mathematics, probability, statistics, and computational methods.
- CBSE Class XII, Kendriya Vidyalaya IIT Kharagpur, 2023
  - Percentage: 91.2%
- CBSE Class X, Kendriya Vidyalaya IIT Kharagpur, 2021
  - Percentage: 97.6%

---

## Work Experience

### Machine Learning Intern, Polestar Analytics
May 2026 – Present

- Working on leakage-safe retail demand and uplift modeling systems that combine baseline purchase probability, promotion effect estimation, and uplift analysis within a unified modeling workflow.
- Designing and implementing feature engineering pipelines that incorporate trend components, Fourier seasonality, lag-based features, rolling statistics, and household, basket, store, and product-level signals with chronological validation to preserve real-world integrity.
- Building and evaluating forecasting and classification systems using CatBoost, LightGBM, XGBoost, Optuna, PySpark, and Databricks, with an emphasis on calibration, reproducibility, and practical decision support.
- Contributing to a production-oriented analytics stack for retail and promotional modeling, where the focus is not only predictive accuracy but also stability, interpretability, and deployment readiness.

### Analyst Programmer Intern, Xceedance Consulting Pvt Ltd
May 2025 – Oct 2025

- Built LLM-based workflows to extract structured information from insurance data and normalize it into a consistent, domain-aware format for downstream processing.
- Used generative AI to create synthetic datasets that covered rare and edge-case policy structures, improving test coverage and enhancing model robustness for unusual data patterns.
- Performed exploratory data analysis, data cleaning, standardization, and normalization to reduce inconsistencies in entity fields and improve the reliability of parsed outputs.
- Developed and evaluated a few-shot classification model using Azure OpenAI for entity tagging, achieving a peak accuracy of 94.2% and weighted F1 of 0.91 while improving overall workflow quality and reducing downstream parsing errors by around 15%.

### Undergraduate Research Intern, Vedvani (Prof. Pawan Goyal)
May 2024 – Nov 2024

- Built a Sanskrit speech-to-text pipeline by collecting, scraping, and aligning audio and text transcripts to create a usable dataset for low-resource speech recognition.
- Cleaned and normalized the dataset while preserving svaras and tonal markers in Sanskrit text to improve phoneme-level representation and downstream acoustic modeling.
- Fine-tuned a Wav2Vec2 / transformer-based acoustic model for Sanskrit phonetics with augmentation strategies tailored to low-resource settings.
- Evaluated the system using Word Error Rate and Character Error Rate and achieved a 12% relative WER reduction over the baseline, demonstrating measurable improvement in model quality.

---

## Selected Projects

### 1. Agentic Inventory-Replenishment POC
Role: Agentic AI / Software Engineer (sole contributor)

- Designed and implemented a six-agent LangGraph pipeline for supply-chain replenishment decisions, with a structured three-way autonomy flow covering AUTO-ISSUE, DRAFT-FOR-APPROVAL, and SUPPRESS scenarios.
- Built an interrupt-driven human-in-the-loop approval mechanism so that no draft could reach the purchase-order stage without explicit human resume, making the workflow safer and audit-friendly.
- Created a deterministic and audit-bound data layer using SQLAlchemy and SQLite, with append-only audit logging and guardrails to maintain traceability and reduce invalid transitions.
- Implemented vendor-consolidated batch purchase-order generation, supplier eligibility checks, MOQ gating, and demand sizing logic that incorporates seasonality and promotional effects.
- Delivered a Streamlit-based Demand Planner dashboard with run, approve, reject, and audit-history controls to make the system usable in a realistic operational setting.
- Tech stack: Python 3.11, LangGraph, Pydantic v2, SQLAlchemy 2.0, Streamlit, SQLite, Gemini/Ollama fallback chain.

### 2. Academic Outreach AI
Role: Personalization & Automation Engineer (sole contributor)

- Built an evidence-first agentic pipeline that transforms a single applicant profile into personalized faculty outreach emails while minimizing hallucination risk and preserving credibility.
- Designed a retrieval layer that combines web crawling, Semantic Scholar data, and search-based context gathering to collect relevant academic information before drafting outreach messages.
- Implemented a SQLite/aiosqlite caching strategy with TTL support so repeated runs avoid redundant calls and make the system more efficient and reproducible.
- Developed a Gmail API-based sender that handles OAuth refresh, MIME/base64url encoding, UTF-8 preservation, and header sanitization for reliable email delivery.
- Shipped a streaming Streamlit directory-outreach workflow with per-draft Approve / Edit / Skip controls and bounded concurrency, making the system suitable for practical outreach workflows.
- Tech stack: Python 3.11+, LangGraph, LangChain, Streamlit, Pydantic, SQLAlchemy, aiosqlite, Gmail API, OpenAI-compatible LLMs.

### 3. DhruvGPT
Role: Full-stack AI Application Builder

- Built an asynchronous FastAPI chat backend that streams NVIDIA LLM responses through Server-Sent Events while persisting conversations and messages in PostgreSQL.
- Implemented SQLAlchemy ORM models, CRUD services, Alembic migrations, UUID-based entities, cascading deletes, database constraints, and indexed queries to support a robust chat application backend.
- Engineered resilient NVIDIA API integration with streaming token delivery, reasoning-token support, usage tracking, retry logic, timeout handling, rate-limit handling, and graceful tolerance for malformed payloads.
- Delivered a responsive vanilla JavaScript frontend with model selection, reasoning-budget controls, markdown rendering, syntax highlighting, cancellation, retry handling, and deployment automation for a polished end-user experience.
- Tech stack: Python, FastAPI, async SQLAlchemy, PostgreSQL, Alembic, NVIDIA inference API, httpx, Pydantic v2, JavaScript, HTML/CSS, Docker, Render, GitHub Pages.

### 4. Classical ML Pipeline
Role: Machine Learning Engineer

- Designed and implemented a modular, configuration-driven classical machine learning framework that follows a full end-to-end workflow for tabular data, from raw ingestion to model evaluation and artifact generation.
- Built leakage-safe preprocessing logic with train-only fitting, imputation, scaling, encoding, and dynamic feature engineering such as log transforms and spline-like transformations.
- Integrated a model registry supporting multiple scikit-learn and optional XGBoost models, with automated hyperparameter tuning through grid and random search and cross-validation.
- Generated comprehensive reporting artifacts including markdown reports, confusion matrices, ROC-AUC summaries, feature importance plots, residual diagnostics, and Kaggle-ready submission outputs.
- Tech stack: Python, scikit-learn, XGBoost, pandas, NumPy, matplotlib, seaborn, joblib, YAML, logging.

### 5. Dunnhumby Retail Demand Forecasting
Role: Forecasting / ML Engineer

- Built a leakage-safe forecasting pipeline for the Dunnhumby Complete Journey dataset at the product-week level, with a focus on realistic evaluation and robust feature engineering.
- Engineered a dense feature set combining trend, Fourier seasonality, lag features, rolling statistics, percent-change signals, and exposure-based indicators to capture both historical dependence and business context.
- Benchmarked classical baselines and gradient boosting models, including CatBoost Poisson and Tweedie regressors, and achieved strong results with WAPE 1.83%, SMAPE 2.28%, R² 0.996, RMSE 0.372, and MAE 0.047.
- Documented a scalable Databricks-oriented architecture using Spark, Delta Lake, Pandas UDFs, and workflow-based batch inference for a more production-ready deployment path.
- Tech stack: Python, pandas, NumPy, scikit-learn, CatBoost, Optuna, SHAP, statsmodels, PyMC, PyTorch, PySpark, Databricks, MLflow.

### 6. Real-Time AI Emergency Evacuation System
Role: Computer Vision / AI Systems Developer

- Engineered a computer vision system that computes optimal evacuation routes from live video feeds in real time, with a focus on low-latency decision making.
- Integrated YOLOv11 for human detection and HSV-based hazard simulation to identify unsafe regions and evaluate dynamic evacuation paths in changing environments.
- Mapped 3D camera coordinates onto a 2D floor plan using homography, enabling spatially accurate route planning from a camera feed.
- Implemented the A* pathfinding algorithm to regenerate safe routes under 50 ms while optimizing the system with OpenCV and NumPy for robust real-time performance.
- Tech stack: Python, OpenCV, NumPy, YOLOv11, computer vision, pathfinding.

### 7. Stock Market Prediction & Trading Simulator
Role: Research Project

- Explored tree-based and gradient-boosted models such as Random Forest, XGBoost, CatBoost, and LightGBM for stock market prediction using NSE data and engineered market features.
- Investigated backtesting and trading simulation workflows, including market microstructure and order-book behavior, to make model evaluation more realistic and researcher-friendly.
- Explored reinforcement-learning concepts and algorithmic trading ideas for advancing the system toward more sophisticated market simulation.
- Tech stack: Python, pandas, NumPy, scikit-learn, XGBoost, CatBoost, LightGBM.

### 8. Jane Street Pokerbots
Role: Competitive AI / Game Theory

- Developed a high-performance Python bot for the Pokerbots competition using Monte Carlo estimation and expected-value-based auction bidding.
- Applied principles from game theory and artificial intelligence to improve decision-making under uncertainty in a competitive environment.
- Achieved a peak competition rank of #30, demonstrating strong strategic reasoning and optimized execution.

### 9. Prediction of House Prices (Kaggle)

- Engineered more than 200 features from 79 variables through careful imputation, encoding, and transformation strategies to improve predictive performance.
- Built and compared six regression models, including Random Forest, Gradient Boosting, and XGBoost, and tuned them with Bayesian optimization to reduce prediction error significantly.
- Achieved an R² score of 90% and RMSE of 25,450 on the task and reached Kaggle leaderboard rank 2,111.

### 10. Spaceship Titanic (Kaggle)

- Built a full machine learning pipeline covering feature creation, missing-value handling, cabin parsing, and one-hot encoding.
- Benchmarked Random Forest, SVM, and Naive Bayes classifiers with GridSearchCV and generated calibrated probability outputs for competition submission.
- Achieved Kaggle rank 1,582 with a public leaderboard score of 0.75403.

### 11. Titanic Survival Prediction (Kaggle)

- Analyzed 891 training samples to uncover survival patterns based on demographic and ticket-class features.
- Built a robust preprocessing pipeline with imputation, one-hot encoding, and feature alignment to make the training data suitable for strong predictive modeling.
- Developed an XGBoost classifier with tuned hyperparameters and achieved ROC-AUC in the range of 0.82 to 0.88 while ranking 3,916 on the Kaggle leaderboard with accuracy 0.77511.

### 12. Homecoming Cloud Kitchen Website
Role: Frontend / Full-Stack Web Developer

- Built a responsive static website for a local cloud kitchen using HTML, CSS, and JavaScript with a clear focus on usability and modern UI.
- Implemented modular components, a menu system, dynamic pricing and subtotal logic, and form validation to make the ordering experience practical and polished.
- Structured the frontend for possible future API integration and deployed the site on GitHub Pages for easy access.

### 13. Image Filtering Web App
Role: Flask / Computer Vision Developer

- Built a Flask backend with RESTful routes that return processed images on demand, making the image pipeline accessible via web requests.
- Supported real-time previews through the Fetch API and improved runtime efficiency by caching repeated transformations.
- Tech stack: Flask, OpenCV, Python, JavaScript, HTML/CSS.

### 14. Sudoku Solver
Role: C++ / Graphics Developer

- Built a backtracking Sudoku solver with interactive visualization, showing each step of the solving process and highlighting conflicts visually.
- Demonstrated recursive problem solving, pruning, and event-driven UI logic using C++ and SFML.

---

## Technical Skills

### Programming Languages
- Python, C, C++, SQL, HTML, CSS, JavaScript, Bash

### Machine Learning / AI
- scikit-learn, XGBoost, LightGBM, CatBoost, PyTorch, TensorFlow, PySpark, OpenCV, spaCy, BeautifulSoup4
- LLMs, prompt engineering, agentic systems, LangGraph, LangChain, Azure OpenAI, NVIDIA APIs
- Speech recognition, ASR, NLP, computer vision, time-series modeling, uplift modeling, reinforcement learning

### Data & Software Engineering
- Pandas, NumPy, Matplotlib, Seaborn, SQLAlchemy, SQLite, PostgreSQL, Alembic, MLflow, Git, GitHub, Jupyter, VS Code, Databricks

### Web / App Development
- Flask, FastAPI, Streamlit, vanilla JavaScript, HTML/CSS, REST APIs, Docker, GitHub Pages

---

## Achievements

- JEE Advanced 2023: Top 6.4% nationally
- JEE Main 2023: Top 1.9%
- WBJEE: Top ~1% among 100K+ candidates
- Codeforces peak rating: 1200+
- Solved 150+ LeetCode problems
- 4th Place – Open IIT Data Analytics Competition 2024
- Kaggle ranks: Top 2,111 in House Prices, 1,582 in Spaceship Titanic, 3,916 in Titanic Survival
- Peak rank #30 in Jane Street Pokerbots competition

---

## Coursework

- Programming and Data Structures
- Linear Algebra
- Advanced Calculus
- Partial Differential Equations
- Probability and Statistics
- Transform Calculus
- Geophysical Signal Processing
- Geophysical Field Theory
- Structural Geology
- Petrology
- Paleontology and Stratigraphy
- Economics
- Innovation and Entrepreneurship
- MOOCs: Machine Learning Specialization (Andrew Ng), Hugging Face Audio Course, MATLAB Onramp, Striver A2Z DSA Course

---

## Leadership & Responsibility

- Led the design and content team at Click KGP, coordinating event photography and post-production workflow for campus initiatives.
- Built and maintained technical projects with a strong focus on clarity, reliability, and measurable outcomes.
- Worked independently and collaboratively across research, software, and product-oriented tasks, balancing technical depth with practical delivery.

---

## Interests

- Applied machine learning for low-resource languages
- AI-assisted document intelligence
- Geophysical data modeling
- Agentic AI and human-in-the-loop systems
- Quantitative ML and retail analytics
- Competitive programming and algorithmic problem solving

---

## Closing Statement

I am excited to work on problems that sit at the intersection of data, machine learning, and real-world impact. I am especially interested in building trustworthy AI systems, robust data pipelines, and production-ready ML applications that turn technical insight into practical value.
