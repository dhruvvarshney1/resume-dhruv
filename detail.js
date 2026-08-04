window.portfolioDetails = {
  polestar: ['Experience','15.05.2026 — present','Machine Learning Intern','Polestar Analytics / Polestar LLP · Noida','Joined Polestar Analytics on 15 May 2026 to build production-minded retail ML systems across demand forecasting, uplift modeling, feature engineering, calibration, and scalable Databricks workflows.','Python · pandas · NumPy · scikit-learn · CatBoost · LightGBM · XGBoost · Optuna · PySpark · Databricks','Developing a phased baseline-purchase, promotion-effect, and uplift-estimation pipeline with leakage-safe rolling features.'],
  xceedance: ['Experience','05.2025 — 10.2025','Analyst Programmer Intern','Xceedance Consulting Pvt. Ltd.','Built insurance document understanding workflows with LLM extraction, synthetic edge cases, entity normalization, and Azure OpenAI few-shot classification.','Python · Azure OpenAI · LLMs · Few-shot prompting · EDA · Data normalization','Reached 94.2% peak classification accuracy and 0.91 weighted F1 while reducing downstream parse errors ~15%.'],
  vedvani: ['Experience','05.2024 — 11.2024','Undergraduate Research Intern','Vedvani · Dept. of Computer Science, IIT Kharagpur · Prof. Pawan Goyal','A low-resource Sanskrit speech-to-text pipeline built from aligned transcripts, svara-preserving normalization, augmentation, and Wav2Vec2 fine-tuning.','Python · Wav2Vec2 · Transformers · BeautifulSoup · NLP · Speech processing · Deep learning','Achieved a 12% relative WER reduction against baseline.'],
  'stock-market': ['Project','Quantitative ML / systems','Stock Market Prediction & Trading Simulator','Independent research project','A research-oriented market workflow exploring NSE data, feature engineering, tree-based prediction, market microstructure, order-book signals, backtesting, and trading simulation.','Python · pandas · NumPy · scikit-learn · Random Forest · XGBoost · CatBoost · LightGBM · Backtesting','Combines predictive modeling with realistic evaluation and a simulator designed for future reinforcement-learning experiments.'],
  pokerbots: ['Competition','Game theory / AI','Jane Street Pokerbots','Independent competition','A high-performance poker bot using Monte Carlo estimation and EV-based auction bidding under uncertainty.','Python · Monte Carlo · Game theory','Peak competition rank: #30.'],
  evacuation: ['Project','Computer vision / realtime systems','Real-Time AI Emergency Evacuation System','Independent project','A live vision system that detects people and hazards, maps camera coordinates to a floor plan, and regenerates safe routes.','Python · YOLOv11 · OpenCV · NumPy · A*','30 FPS processing; safe routes regenerated in under 50 ms.'],
  'house-prices': ['Competition','Kaggle / regression','Prediction of House Prices','Kaggle','A feature-rich regression workflow with 200+ engineered features, model comparison, and Bayesian XGBoost tuning.','Python · pandas · scikit-learn · XGBoost · scikit-optimize','90% R²; $25,450 RMSE; Kaggle rank 2,111.'],
  'spaceship-titanic': ['Competition','Kaggle / classification','Spaceship Titanic','Kaggle','A complete passenger-outcome pipeline covering cabin parsing, amenity aggregation, missing values, model comparison, and submission artifacts.','Python · pandas · scikit-learn · GridSearchCV','Public leaderboard score 0.75403; rank 1,582.'],
  titanic: ['Competition','Kaggle / classification','Titanic Survival Prediction','Kaggle','An interpretable survival prediction workflow using EDA, aligned preprocessing, and tuned XGBoost classification.','Python · pandas · scikit-learn · XGBoost','ROC-AUC 0.82–0.88; leaderboard accuracy 0.77511.'],
  'cloud-kitchen': ['Project','Web development','Homecoming Cloud Kitchen Website','Independent project','A responsive static ordering experience with reusable UI, availability states, dynamic pricing, validation, and JSON payload assembly.','HTML · CSS · JavaScript · GitHub Pages','Deployed on GitHub Pages and prepared for API integration.'],
  'image-filtering': ['Project','Computer vision / web','Image Filtering Web App','Independent project','A Flask and OpenCV app that applies image transforms on demand and returns live browser previews through Fetch.','Python · Flask · OpenCV · JavaScript · Fetch API','Delivered a working browser-to-Flask processing loop with cached transforms.'],
  sudoku: ['Project','C++ / interactive graphics','Sudoku Solver','Independent project','An interactive SFML solver that makes recursive backtracking visible through step-by-step progress, conflicts, and hints.','C++ · SFML · Recursion · Backtracking','Demonstrates pruning and event-driven graphics in a focused learning tool.'],
  'academic-outreach': ['Project','Agentic AI / Streamlit','Academic Outreach AI','Independent project','An evidence-first LangGraph pipeline that turns an applicant profile into grounded, reviewable faculty outreach drafts.','Python · LangGraph · Streamlit · Pydantic · SQLite · Gmail API','Reduced the workflow to two LLM calls per email; targeted under ~25 seconds per professor.'],
  'ml-pipeline': ['Project','Machine learning engineering','Classical ML Pipeline','Independent project','A configuration-driven, leakage-safe framework for training, evaluating, reporting, and packaging tabular ML experiments.','Python · pandas · scikit-learn · XGBoost · joblib · Databricks','Reduced runtime ~30%; CV F1 0.74 and ROC-AUC 0.93 on the health task.'],
  'dunnhumby-uplift': ['Project','Forecasting / Databricks','Dunnhumby Uplift & Sales Forecasting','Independent project','Retail demand forecasting across product-week features, intermittent demand modeling, hierarchical approaches, and distributed inference.','Python · CatBoost · PyMC · PySpark · Databricks · MLflow','Produced reusable models, MLflow runs, feature-importance tables, and predictions.'],
  'agentic-poc': ['Project','Agentic systems / inventory','Agentic Inventory-Replenishment POC','Independent project','A supplier-aware replenishment prototype combining demand sizing, eligibility checks, and minimum-order-quantity gating.','Python · LLM workflows · Inventory analytics','Created a constraint-aware, reviewable inventory recommendation flow.'],
  dhruvgpt: ['Project','AI assistant','DhruvGPT','Independent project','A focused personal AI assistant exploration covering prompt behavior, useful interaction boundaries, and a compact interface concept.','Python · LLM APIs · Prompt engineering','Built a small exploration of personal AI product design.']
};

const data = window.portfolioDetails;
const item = data[document.body.dataset.detail];
if (item) {
  document.title = `${item[2]} — Dhruv Varshney`;
  const bullets = ['Designed the end-to-end workflow and implementation.', 'Evaluated edge cases and kept outputs reproducible.', 'Documented decisions, trade-offs, and the path to future integration.'];
  document.querySelector('#detail').innerHTML = `<a class="back-link" href="index.html">← Back to portfolio</a><header class="detail-hero reveal is-visible"><p class="eyebrow">${item[0]} · ${item[1]}</p><h1>${item[2]}</h1><p class="detail-org">${item[3]}</p><p class="detail-overview">${item[4]}</p></header><figure class="detail-visual reveal is-visible" role="img" aria-label="Visual overview for ${item[2]}"><div class="visual-mark"><span>${item[2][0]}</span><span>${item[2].split(' ')[1]?.[0] || '·'}</span></div><figcaption>Project visual · Add a repository screenshot or demo capture when available.</figcaption></figure><div class="detail-grid"><section><p class="eyebrow">01 / Overview & objective</p><h2>What this work set out to do</h2><p>${item[4]}</p></section><section><p class="eyebrow">02 / Responsibilities</p><ul>${bullets.map(x => `<li>${x}</li>`).join('')}</ul></section><section><p class="eyebrow">03 / Technologies used</p><div class="tags">${item[5].split(' · ').map(x => `<span class="tag">#${x}</span>`).join('')}</div></section><section><p class="eyebrow">04 / Features</p><ul><li>Responsive, modular implementation</li><li>Clear user-facing outputs</li><li>Measured performance and quality checks</li></ul></section><section><p class="eyebrow">05 / Challenges & solution</p><p>The main challenge was balancing useful output with practical constraints. I kept the core flow explicit, validated intermediate results, and optimized the smallest bottleneck that mattered.</p></section><section><p class="eyebrow">06 / Achievements & outcomes</p><ul><li>${item[6]}</li><li>Created a maintainable foundation for future iteration.</li></ul></section></div>`;
}

(() => {
  const nav = document.getElementById('navbar');
  if (!nav) {
    return;
  }

  const sampleFractions = [0.25, 0.5, 0.75];
  let framePending = false;

  const parseColor = value => {
    const match = value.match(/rgba?\(([^)]+)\)/i);
    if (!match) {
      return null;
    }

    const parts = match[1].split(',').map(part => part.trim());
    if (parts.length < 3) {
      return null;
    }

    return {
      red: Number(parts[0]),
      green: Number(parts[1]),
      blue: Number(parts[2]),
      alpha: parts[3] === undefined ? 1 : Number(parts[3])
    };
  };

  const backdropColor = element => {
    for (let current = element; current && current !== document.documentElement; current = current.parentElement) {
      const style = getComputedStyle(current);
      const color = parseColor(style.backgroundColor);
      if (color && color.alpha > 0) {
        return color;
      }
    }

    const bodyColor = parseColor(getComputedStyle(document.body).backgroundColor);
    if (bodyColor && bodyColor.alpha > 0) {
      return bodyColor;
    }

    return { red: 255, green: 255, blue: 255, alpha: 1 };
  };

  const isLightBackdrop = element => {
    const color = backdropColor(element);
    return (0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) >= 160;
  };

  const updateNavTone = () => {
    const rect = nav.getBoundingClientRect();
    const sampleY = Math.min(rect.bottom - 1, rect.top + rect.height * 0.5);
    const lightSamples = sampleFractions.reduce((count, fraction) => {
      const sampleX = rect.left + rect.width * fraction;
      const topElement = document.elementsFromPoint(sampleX, sampleY).find(element => !nav.contains(element));
      return count + (topElement && isLightBackdrop(topElement) ? 1 : 0);
    }, 0);

    nav.classList.toggle('nav-on-light', lightSamples >= 2);
  };

  const scheduleUpdate = () => {
    if (framePending) {
      return;
    }

    framePending = true;
    requestAnimationFrame(() => {
      framePending = false;
      updateNavTone();
    });
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate, { once: true });
  scheduleUpdate();
})();
