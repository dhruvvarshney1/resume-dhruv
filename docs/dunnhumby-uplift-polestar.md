# Dunnhumby Uplift / Sales Forecasting Project

## Project Summary
This project builds a retail demand forecasting pipeline for the Dunnhumby "Complete Journey" dataset, focused on predicting weekly organic sales at the product-week level after filtering out promotional and discount-driven noise. The implementation combines reproducible notebook exploration with reusable Python modules in [scripts/processor.py](scripts/processor.py), [scripts/etl_pipeline.py](scripts/etl_pipeline.py), and [scripts/inference.py](scripts/inference.py), plus a Databricks-oriented production guide in [automated_etl_and_prediction_guide.md](automated_etl_and_prediction_guide.md). The core approach engineers a dense product-week panel, extracts size and category signals, adds Fourier seasonality, lags, rolling statistics, percent changes, and exposure features, then evaluates multiple model families. Classical hierarchical baselines were benchmarked with MixedLM and PyMC, but the strongest results came from CatBoost Poisson/Tweedie models. Saved notebook outputs show a best test result of WAPE 1.83%, SMAPE 2.28%, R² 0.996, RMSE 0.372, and MAE 0.047. The project also persists model artifacts, feature importance outputs, MLflow runs, and prediction files, making the workflow reproducible and deployment-ready in shape, even though the Databricks ETL/inference path is documented more than fully wired end-to-end. Overall, the project demonstrates careful leakage control, time-aware splitting, scalable feature engineering, and production-minded batch scoring for intermittent retail demand.

## Resume / CV Entry
**Retail Demand Forecasting / ML Engineer | Dunnhumby Sales Prediction Project**

- Engineered a leakage-safe product-week demand dataset from 458,530 observations, filtering discount/promotion effects and generating seasonal, lag, rolling-window, and exposure features for weekly sales forecasting.
- Trained and tuned CatBoost Poisson/Tweedie regressors against hierarchical baselines; best recorded test run achieved WAPE 1.83%, SMAPE 2.28%, R² 0.996, RMSE 0.372, and MAE 0.047.
- Built reusable preprocessing, evaluation, and inference modules to support repeatable train/validation/test splits, batch scoring, and saved prediction outputs.
- Documented a scalable Databricks architecture using Spark, Delta Lake, Pandas UDF inference, DBFS/Unity Catalog, and Workflows for distributed ETL and batch prediction.
- Logged model artifacts and feature-importance outputs with MLflow/CatBoost to support experiment tracking, interpretation, and reproducibility.

## Tech Stack
- Languages: Python, SQL
- Data / ML libraries: pandas, NumPy, scikit-learn, CatBoost, Optuna, SHAP, statsmodels, PyMC, PyTensor, PyTorch
- Data engineering: PySpark, Spark SQL, Delta Lake, Pandas UDFs, Apache Arrow
- Visualization: Matplotlib, Seaborn
- MLOps / tracking: MLflow, CatBoost artifacts, notebook-based experiment tracking
- Storage / formats: CSV, Parquet, pickle, JSON, Delta tables
- Cloud / platform: Databricks, DBFS, Unity Catalog, Databricks Workflows
- Development tools: Jupyter notebooks, VS Code, Git

## Skills Demonstrated
- Time-series feature engineering and leakage prevention
- Retail demand forecasting and intermittent demand modeling
- Gradient boosting regression, Poisson/Tweedie objective selection, and hyperparameter tuning
- Hierarchical modeling with frequentist and Bayesian methods
- Distributed ETL and batch inference design
- Model evaluation, diagnostics, and feature interpretation
- Reproducible notebook-to-script operationalization
- Experiment tracking and artifact management

## Key Contributions
- Built a reusable preprocessing layer that standardizes product attributes, parses size metadata, aligns categorical levels, and performs chronological splitting.
- Designed a feature set that captures trend, seasonality, product history, store exposure, and short-term momentum.
- Benchmarked multiple modeling families, including MixedLM, PyMC, CatBoost Poisson, and CatBoost Tweedie, to validate model choice empirically.
- Produced a documented Databricks deployment pattern for scalable ETL and distributed inference.
- Persisted outputs such as model binaries, MLflow runs, feature importance tables, and `predictions.csv` for downstream use and review.
- Improved model performance through iterative feature selection and tuning, with top drivers centered on lagged sales, percent change, and basket/store exposure signals.

## Keywords
Retail demand forecasting, sales prediction, time series forecasting, product-week modeling, feature engineering, intermittent demand, CatBoost, Poisson regression, Tweedie regression, hierarchical modeling, MixedLM, Bayesian regression, PyMC, Optuna, SHAP, MLflow, Spark, PySpark, Databricks, Delta Lake, Pandas UDF, batch inference, experiment tracking, model interpretability, leakage prevention, time-based split, retail analytics, MLOps, Python, scikit-learn