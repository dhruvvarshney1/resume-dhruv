# Analyst Programmer Intern | Xceedance Consulting Pvt. Ltd.
**May 2025 – September 2025**

## Entity Normalization and Information Extraction Pipeline for Commercial Insurance Workflows

---

### Abstract

Commercial insurance processing relies heavily on unstructured and semi-structured documents, including policy schedules, broker slips, endorsements, and underwriting submissions. Extracting and canonicalizing key entities across multi-party relationships—specifically **Named Insureds**, **Underwriters**, **Brokers**, and **Reinsurers**—presents operational hurdles due to inconsistent naming conventions, legal entity suffixes, typos, and document noise introduced during digitisation. 

During an internship at Xceedance Consulting, an end-to-end automated document intelligence pipeline was engineered to resolve these bottlenecks. The system combines **Tesseract OCR** for optical text extraction, a **fine-tuned domain-specific BERT model** for token-level Named Entity Recognition (NER), and a high-performance **RapidFuzz-based entity normalization module** linked to canonical master datasets. Deployed via an interactive **Streamlit** dashboard and orchestrated through **Databricks** with **MLflow** experiment tracking, the pipeline achieved a **94.2% peak entity extraction accuracy**, a **0.91 weighted F1-score**, and drove an estimated **15% reduction in downstream policy parsing errors**, while significantly cutting down reliance on costly commercial LLM API calls.

---

## 1. Introduction & Domain Context

The commercial insurance ecosystem processes thousands of complex legal and contractual documents daily. Accurate policy binding, risk evaluation, accounting reconciliation, and regulatory compliance demand flawless extraction and identification of four core commercial entities:

1. **Named Insured:** The primary individual or commercial corporate entity covered by the policy.
2. **Underwriter:** The insurance carrier or individual risk engineer assuming financial liability.
3. **Broker:** The registered intermediary negotiating policy terms on behalf of the client.
4. **Reinsurer:** The third-party financial institution providing secondary risk coverage.

```
       +-------------------------------------------------------+
       |               Commercial Insurance Slip               |
       +-------------------------------------------------------+
       | • Insured:     Acme Manufacturing Corp.               |
       | • Broker:      Marsh McLennan Ltd.                    |
       | • Underwriter: AIG Specialty Lines                    |
       | • Reinsurer:   Munich Re Syndicate 457                |
       +-------------------------------------------------------+
```

Manual indexation of these entities creates operational latency and human error. Traditional rule-based regex parsers frequently fail because document layouts vary widely across carriers, and entities often appear in free-form narrative sections (e.g., policy endorsement clauses or broker correspondence). This project delivers an automated, scalable machine learning pipeline that parses digitized documents, reliably tags target entities, and normalizes them into standardized master database keys.

---

## 2. Problem Statement & Design Objectives

Entity resolution in commercial insurance faces two distinct technical hurdles:

### 2.1 Contextual Entity Extraction under Noisy OCR
Raw insurance records are commonly scanned PDFs or multi-generation faxes. Running Optical Character Recognition (OCR) produces noisy tokens, misaligned headers, and broken syntax. Standard syntactic parsers cannot reliably disambiguate between an *Underwriter* and a *Broker* when both are corporate entities appearing within the same clause (e.g., *"Placed by Aon Risk Solutions on behalf of Lloyd’s Syndicate 2003"*).

### 2.2 Entity Surface-Form Divergence
Even when successfully extracted, organization names exhibit severe surface-form variability across documents:
* Legal entity tails: `Acme Corp`, `Acme Corporation LLC`, `Acme Inc.`, `Acme GmbH`
* Abbreviations & Acronyms: `AIG Specialty`, `American International Group`, `AIG`
* OCR artifacts & Typos: `Acmc Corp`, `Marsh & McLcnnan`

Direct SQL lookups fail against master customer/partner databases. The pipeline must calculate fuzzy semantic and token-level distances to reconcile noisy surface strings to canonical records.

---

## 3. End-to-End System Architecture

The pipeline processes raw document artifacts through five decoupled, linearly orchestrated stages:

```text
+-----------------------------------------------------------------------------------+
|                            Unstructured Document Ingestion                        |
|                     (Scanned PDFs, TIFFs, Endorsement Slips)                      |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                 1. Optical Layer                                  |
|     Tesseract OCR Engine  -->  Noise Filtering & Token Coordinate Normalization   |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                           2. Named Entity Recognition                             |
|          Fine-Tuned BERT Transformer (Token Classification: BIO Scheme)           |
|            Extracts: Named Insured, Underwriter, Broker, Reinsurer                |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                         3. RapidFuzz Normalization Layer                          |
|         Legal Suffix Stripping --> Levenshtein / Token Sort Ratio Scoring          |
|                  Thresholding: Automated Mapping vs. HITL Flag                    |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                              4. Presentation & MLOps                              |
|           Streamlit Review UI  <-->  MLflow Tracking  <-->  Databricks ML         |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                          Downstream Insurance Workflows                           |
|                  (Policy Administration Systems, Underwriting Data Marts)         |
+-----------------------------------------------------------------------------------+
```

---

## 4. Pipeline Implementation & Technical Methodology

### 4.1 Document Ingestion & Optical Character Recognition (OCR)
* **Engine:** `pytesseract` / Tesseract OCR v5.
* **Image Preprocessing:** Grayscale conversion, adaptive Otsu thresholding for binarization, and skew correction using Hough line transforms to handle skewed document scans.
* **Layout Parsing:** Token-level bounding boxes and bounding text blocks are extracted, standardizing unstructured layouts into sequential text streams while preserving line-break tokens for structural context.

### 4.2 BERT-Based Named Entity Recognition
Rather than relying continuously on external, costly, closed-source LLM APIs (e.g., OpenAI GPT-4) for high-volume policy batches, a specialized transformer model was trained:
* **Base Architecture:** Pretrained `bert-base-uncased` with a token classification head.
* **Tagging Schema:** Standard BIO scheme (`B-INSURED`, `I-INSURED`, `B-BROKER`, `I-BROKER`, `B-UNDERWRITER`, `I-UNDERWRITER`, `B-REINSURER`, `I-REINSURER`, `O`).
* **Training Dynamics:**
  * Optimizer: AdamW (learning rate = $3 \times 10^{-5}$, linear warmup, weight decay = $0.01$).
  * Loss Function: Cross-Entropy Loss with class-weighting to mitigate the severe imbalance of `O` (outside) tokens.
  * Context Window: 512 tokens with sliding-window striding (overlap = 64 tokens) to prevent entity boundary truncation across page splits.
* **Operational Rationale:** Fine-tuning an on-premise/cloud-hosted BERT reduced recurring API inference costs to near-zero marginal compute, eliminated data privacy (PII/commercial IP) leakage to external APIs, and lowered inference latency to $< 180\text{ ms}$ per document page.

### 4.3 RapidFuzz Entity Canonicalization Layer
Raw entity strings extracted by BERT pass through a multi-stage normalization filter to pair them with master reference IDs:

1. **Preprocessing & Legal Tail Cleansing:**
   * Case folding and punctuation strip.
   * Regex-driven removal of non-informative corporate legal identifiers:
     $$\text{Suffixes} \in \{\text{"inc", "corp", "llc", "ltd", "gmbh", "plc", "co", "holding"}\}$$
2. **Similarity Computation:**
   * Uses **RapidFuzz** (C++ optimized string distance library) executing a weighted combination of **Levenshtein Distance** and **Token Sort Ratio**:
     $$\text{Score}(S_1, S_2) = \max \left( \text{Ratio}(S_1, S_2), \; \text{TokenSortRatio}(S_1, S_2) \right)$$
   * `TokenSortRatio` tokenizes strings, sorts them alphabetically, and joins them back together prior to scoring, effectively resolving word order shifts (e.g., `"Munich Re Syndicate"` vs. `"Syndicate Munich Re"`).
3. **Dual-Threshold Decision Logic:**
   * $\mathbf{\text{Score}} \ge \mathbf{85\%}$: **Automated Ingestion**. High-confidence match; automatically mapped to the master database entity ID.
   * $\mathbf{60\%} \le \mathbf{\text{Score}} < \mathbf{85\%}$: **Human-in-the-Loop (HITL) Review**. Flagged for underwriter/analyst sign-off on the Streamlit dashboard.
   * $\mathbf{\text{Score}} < \mathbf{60\%}$: **New Entity Flag**. Tagged as an unregistered party; dispatched to master data stewards.

### 4.4 Streamlit Review Dashboard
* Developed an intuitive Streamlit UI enabling underwriting teams to upload documents, review color-coded entity extractions side-by-side with original OCR text, inspect similarity confidence scores, and resolve HITL-flagged ambiguous mappings with a single click.

### 4.5 MLOps, Tracking, & Databricks Execution
* **MLflow Integration:** Tracked all BERT fine-tuning runs, logging hyperparameter sweeps (learning rates, batch sizes, epochs), token-level classification metrics, and artifact checkpoints.
* **Databricks Workflows:** Packaged the end-to-end ingestion and normalization pipeline into Databricks jobs, automating distributed batch inference over large policy repositories.

---

## 5. Experimental Results & Performance Evaluation

The end-to-end pipeline was evaluated on a curated, diverse insurance test suite containing varied document templates, OCR degradations, and naming edge cases.

### 5.1 Quantitative Model & Pipeline Performance

| Metric | Achieved Value | Baseline (Regex / Static Heuristics) |
| :--- | :---: | :---: |
| **Entity Extraction Accuracy** | **94.2%** | 61.4% |
| **Weighted Precision** | **0.92** | 0.64 |
| **Weighted Recall** | **0.90** | 0.58 |
| **Weighted F1-Score** | **0.91** | 0.61 |
| **Downstream Parsing Error Reduction** | **~15.0%** | Reference Baseline |
| **Mean Inference Latency (per page)** | **~175 ms** | 1,200 ms (LLM API via network) |

### 5.2 Entity-Specific Breakdown

| Target Class | Precision | Recall | F1-Score | Primary Challenge Resolved |
| :--- | :---: | :---: | :---: | :--- |
| **Named Insured** | 0.94 | 0.93 | 0.935 | Handled varied trade names and complex holding structures |
| **Broker** | 0.90 | 0.88 | 0.890 | Resolved contextual proximity confusion with Underwriters |
| **Underwriter** | 0.91 | 0.89 | 0.900 | Disambiguated carrier names from broker slips |
| **Reinsurer** | 0.93 | 0.91 | 0.920 | Correctly tagged syndicate codes and treaty references |

---

## 6. Key Takeaways & Operational Impact

1. **Elimination of Costly LLM Dependencies:** Proved that fine-tuning an encoder-only architecture (BERT) on domain-specific commercial insurance text delivers state-of-the-art token extraction accuracy (0.91 F1) without incurring high LLM API operational costs or introducing generative hallucinations.
2. **Resilience to Document Noise:** Coupling BERT contextual extraction with RapidFuzz token sorting eliminated mapping errors caused by character-level OCR jitter and corporate name permutations.
3. **Operational Error Reduction:** Directly decreased structural parsing and entity linkage errors in downstream policy data stores by 15%, reducing the manual review overhead of data operations teams.
4. **Production-Ready Scalability:** Full integration into Databricks and MLflow demonstrated an enterprise-grade ML lifecycle, transitioning experimental NLP models into an automated, monitored batch-processing pipeline.