Project Summary  
The Classical ML Pipeline is a production‑grade, configuration‑driven framework that implements the full ten‑step classical machine‑learning workflow on tabular data. It loads raw CSVs, performs leakage‑safe exploratory analysis, applies dynamic feature‑engineering (skew correction, splines, piecewise transforms), and executes a fully leak‑proof preprocessing pipeline (imputation, outlier capping, scaling, one‑hot/ordinal encoding). A model registry of scikit‑learn and optional XGBoost classifiers/regressors supports automated hyper‑parameter tuning via grid or random search with k‑fold cross‑validation. The best model is trained, evaluated on a hold‑out set, and all diagnostics (confusion matrix, ROC‑AUC, feature‑importance, residual plots) are saved as PNGs. Run statistics are written to a markdown report and a JSON summary; models and preprocessors are persisted as pickle files. An optional Kaggle‑submission stage generates a ready‑to‑upload CSV using the same preprocessing pipeline. The pipeline is fully reproducible (global seeding, deterministic joblib executors) and robust on Windows terminals (process‑hang mitigation).  
Resume / CV Entry  
Machine Learning Engineer – Classical ML Pipeline Development  
- Designed and delivered a modular, ten‑stage ML pipeline that reduced end‑to‑end runtime by ≈ 30 % and eliminated data‑leakage bugs, enabling reliable experimentation across multiple datasets.  
- Implemented automated hyper‑parameter tuning across 8+ algorithms; achieved a best CV F1 score of 0.74 and ROC‑AUC 0.93 for gradient‑boosted models on the health‑condition classification task.  
- Integrated dynamic feature‑engineering (log1p/Box‑Cox/Yeo‑Johnson, spline generation) and variance‑correlation filtering, decreasing model MAE by ≈ 12 % compared with baseline preprocessing.  
- Built end‑to‑end reporting: markdown run reports, visual diagnostics (histograms, heatmaps, feature‑importance, confusion matrix) and JSON run summaries; automated Kaggle submission CSV generation.  
- Established production‑ready MLOps practices: rotating file logger, artifact versioning, reproducible seeding, and Windows‑compatible process cleanup, supporting continuous integration pipelines.
Tech Stack  
- Languages & Runtime: Python 3.12  
- ML Libraries: scikit‑learn, XGBoost (optional), joblib/loky, pandas, numpy  
- Visualization: matplotlib, seaborn, (optional tabulate for markdown tables)  
- Configuration & Data: dataclasses, yaml, pathlib, .env  
- DevOps & tooling: Git, logging (rotating file handler), JSON/CSV I/O, markdown generation, Windows PowerShell for script execution
Skills Demonstrated  
- End‑to‑end ML pipeline architecture, leakage‑safe data handling, advanced feature engineering, model registry design, hyper‑parameter optimization (grid/random search, CV), performance evaluation (precision/recall/F1, ROC‑AUC, regression metrics), automated reporting & visualization, reproducibility (random‑seed management, joblib clean‑up), MLOps artifact management, production‑ready logging, cross‑platform (Windows) robustness, Kaggle competition workflow automation.
Key Contributions  
- Created a config‑driven, modular pipeline that isolates each workflow stage while sharing a single Config object.  
- Developed leakage‑safe preprocessing that fits transforms only on the training split and reapplies them to test/submission data.  
- Implemented dynamic model registry with optional XGBoost and on‑demand SVM injection, enabling rapid algorithm swapping.  
- Added hyper‑parameter tuning engine (HyperparameterTuner) supporting both GridSearchCV and RandomizedSearchCV with automated CV reporting and CSV logging.  
- Produced automated markdown run reports and high‑resolution PNG diagnostics, facilitating stakeholder communication.  
- Integrated Kaggle submission generation that respects column dropping, target column mapping, and preprocessor reuse.  
- Fixed Windows‑specific process‑hang issue by explicitly shutting down Loky executors, guaranteeing clean exits.
Keywords  
Machine Learning, Python, scikit‑learn, XGBoost, pandas, NumPy, feature engineering, data leakage prevention, hyper‑parameter tuning, cross‑validation, model registry, pipeline automation, MLOps, logging, reproducibility, Kaggle, classification, regression, visualization, matplotlib, seaborn, joblib, config‑driven, JSON, CSV, markdown reporting.