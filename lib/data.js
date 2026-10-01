export const profile = {
  name: "Sri Harshitha Anugu",
  shortName: "Sri Harshitha",
  headline: "Generative AI Engineer & Data Scientist",
  titles: [
    "Generative AI Engineer",
    "Data Scientist",
    "Agentic AI Engineer",
    "Machine Learning Engineer",
  ],
  tagline:
    "4+ years designing, building, and deploying production generative AI, data science, agentic AI, and machine learning solutions across retail, healthcare, and financial services.",
  availability: "Open to Senior GenAI / Data Science / ML Engineering roles",
  location: "United States",
  email: "sriharshitha0504@gmail.com",
  phone: "+1-470-658-4450",
  linkedin: "https://www.linkedin.com/in/sri-harshitha-anugu/",
  github: "https://github.com/harshithaanugu5",
  resume: "/SriHarshitha_Anugu_Resume.pdf",
  photo: "/headshot.png",
  yearsExperience: 4,
};

export const summary = [
  "Generative AI Engineer, Data Scientist, Agentic AI Engineer, and Machine Learning Engineer with 4+ years of experience designing, building, and deploying production generative AI, data science, agentic AI, and machine learning solutions across retail, healthcare, and financial services — with hands-on expertise in statistical modeling, statistical inference, forecasting, optimization, predictive modeling, anomaly detection, experimentation, and data visualization.",
  "Experienced across the full AI/ML lifecycle: data preparation, EDA, feature engineering, model development, hyperparameter tuning, cross-validation, evaluation, deployment, model serving, monitoring, drift detection, retraining, explainability, and responsible AI governance.",
  "Delivered 70% reduction in manual compliance review, 60% reduction in fraudulent claims, 35% improvement in claims processing efficiency, 35% improvement in inventory forecasting accuracy, and 50% reduction in fraudulent review influence.",
];

export const metrics = [
  { value: 4, suffix: "+", label: "Years of experience", detail: "Retail · Healthcare · Financial Services" },
  { value: 70, suffix: "%", label: "Less manual compliance review", detail: "Agentic LLM workflows" },
  { value: 60, suffix: "%", label: "Reduction in fraudulent claims", detail: "Real-time ML + anomaly detection" },
  { value: 35, suffix: "%", label: "Better forecasting & processing", detail: "ARIMA · Prophet · TFT" },
  { value: 50, suffix: "%", label: "Less fraudulent review influence", detail: "NLP + anomaly detection" },
];

/* ── The animated architecture diagram ─────────────────────────────── */
export const pipelineStages = [
  {
    id: "sources",
    label: "Data & Preparation",
    icon: "database",
    items: ["Regulatory filings", "Claims & transactions", "500K+ reviews", "EDA · Data cleaning"],
    blurb: "Structured tables and unstructured documents, prepared and explored.",
  },
  {
    id: "ingest",
    label: "Pipelines & Features",
    icon: "workflow",
    items: ["AWS S3 · SNS · Lambda", "Textract · Comprehend", "PySpark · Airflow"],
    blurb: "Real-time ingestion and feature engineering — no knowledge-base sync lag.",
  },
  {
    id: "store",
    label: "Retrieval & Vector Search",
    icon: "layers",
    items: ["FAISS · Pinecone", "Milvus · Chroma · Weaviate", "Snowflake · Redis"],
    blurb: "Embeddings, chunking, and semantic retrieval kept continuously fresh.",
  },
  {
    id: "models",
    label: "Models & Agents",
    icon: "brain",
    items: ["GPT-4o · Llama 3 · Claude", "LangGraph · CrewAI · AutoGen", "LoRA / QLoRA", "XGBoost · LightGBM"],
    blurb: "Multi-agent orchestration beside classical ML — whichever fits the problem.",
  },
  {
    id: "guardrails",
    label: "Evaluation & Governance",
    icon: "shield",
    items: ["Langfuse observability", "Hallucination detection", "SHAP · LIME", "HIPAA · PCI DSS"],
    blurb: "Hypothesis testing, explainability, and responsible AI guardrails before release.",
  },
  {
    id: "serve",
    label: "Serving & Monitoring",
    icon: "rocket",
    items: ["FastAPI · REST · MCP", "Docker · Kubernetes", "Drift detection · Retraining"],
    blurb: "Inference services, CI/CD, and monitoring that triggers the next retrain.",
  },
];

/* Feedback loop drawn as a dotted returning arrow under the diagram */
export const pipelineLoops = [
  { from: "serve", to: "models", label: "monitoring · drift detected · automated retraining" },
];

export const experience = [
  {
    company: "Wells Fargo",
    role: "Generative AI Engineer",
    period: "Nov 2024 — Present",
    current: true,
    domain: "Financial Services",
    impact: [
      "70% less manual compliance review",
      "Production RAG over enterprise financial data",
      "LLM fine-tuning (LoRA/QLoRA)",
    ],
    points: [
      "Designed and deployed production Generative AI, machine learning, and agentic AI workflows (Python, LLMs, LangChain, LangGraph, CrewAI) for financial-compliance and fraud-investigation use cases, cutting manual compliance review effort by 70%.",
      "Improved domain-specific model performance and inference efficiency by developing and evaluating LLM fine-tuning workflows (LoRA/QLoRA), benchmarking challenger models against production baselines through structured experimentation.",
      "Built production RAG pipelines for enterprise financial data covering document ingestion, preprocessing, chunking, embedding generation, vector retrieval, context construction, response generation, validation, and monitoring.",
      "Engineered real-time ML/AI data pipelines (AWS S3, SNS, Lambda), eliminating knowledge-base sync delays and continuously updating enterprise retrieval indexes.",
      "Implemented production AI/ML evaluation and observability — retrieval relevance, hallucination tracking, response quality, prompt/response tracing, and responsible AI guardrails — using Langfuse and structured evaluation workflows.",
      "Developed human-in-the-loop AI applications (Chainlit) with session-level memory, structured outputs, and function calling for compliance and investigation teams.",
      "Automated document intelligence workflows (AWS Textract, Comprehend) to extract structured data from scanned regulatory filings for downstream ML and RAG pipelines.",
      "Built and exposed production inference/AI services (FastAPI, REST APIs, MCP, function calling, API Gateway), enabling agents and downstream applications to securely access internal tools and model services.",
      "Containerized and deployed AI/ML services (Docker, Kubernetes) with GitLab CI/CD workflows for repeatable builds, testing, and production releases.",
      "Applied model monitoring, data-quality checks, observability, scalable inference, and responsible AI controls across production workflows to improve reliability and governance.",
    ],
    tech: ["Python", "SQL", "LLMs", "GPT-4o", "Llama 3", "OpenAI API", "Anthropic API", "LangChain", "LangGraph", "CrewAI", "AutoGen", "RAG", "Agentic AI", "MCP", "Function Calling", "FAISS", "Pinecone", "Milvus", "Chroma", "Langfuse", "SageMaker", "Bedrock", "FastAPI", "Docker", "Kubernetes", "GitLab CI/CD", "MLOps"],
  },
  {
    company: "Omega Healthcare",
    role: "Data Scientist",
    period: "Jun 2022 — Dec 2023",
    domain: "Healthcare",
    impact: [
      "60% reduction in fraudulent claims",
      "35% lift in claims-processing efficiency",
      "HIPAA/PCI-compliant explainable AI",
    ],
    points: [
      "Designed and deployed a production ML classification and anomaly-detection system (XGBoost, LightGBM, Autoencoders) on Azure Machine Learning, cutting fraudulent claims by 60%.",
      "Performed end-to-end statistical analysis and predictive modeling: data analysis, EDA, preprocessing, feature engineering and selection, model training, hyperparameter tuning, cross-validation, and evaluation (Python, SQL, Pandas, NumPy, Scikit-learn).",
      "Implemented automated ML pipelines with model monitoring, data/model drift detection, and retraining workflows, lifting claims-processing efficiency by 35%.",
      "Reduced model deployment risk via hypothesis testing, A/B testing, statistical inference and analysis, baseline comparison, and challenger-model evaluation before production releases.",
      "Integrated SHAP and LIME into production inference to improve model interpretability, giving investigators visibility into feature-level fraud drivers while supporting HIPAA/PCI governance.",
      "Identified previously undetected fraud patterns through anomaly detection, distribution-shift analysis, and mining of structured claims data and unstructured provider notes.",
      "Built repeatable production ML workflows (Azure ML, Azure ML Pipelines, Docker, Kubernetes/AKS, Apache Airflow), replacing manual notebook-based retraining.",
      "Partnered with business stakeholders to translate ambiguous business questions into analytical problems, applying data storytelling and clear statistical communication to convert model findings into actionable, data-driven recommendations.",
    ],
    tech: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "LightGBM", "Autoencoders", "Statistical Modeling", "Statistical Inference", "Predictive Modeling", "Feature Engineering", "Hypothesis & A/B Testing", "SHAP", "LIME", "Azure ML", "Azure ML Pipelines", "Docker", "Kubernetes/AKS", "Apache Airflow", "MLOps", "Drift Detection", "HIPAA", "PCI"],
  },
  {
    company: "Aditya Birla Retail",
    role: "Machine Learning Engineer",
    period: "Jun 2021 — May 2022",
    domain: "Retail",
    impact: [
      "35% better inventory forecasting accuracy",
      "50% less fraudulent review influence",
      "CTR & AOV lift from personalization",
    ],
    points: [
      "Developed and evaluated time-series forecasting models (ARIMA, SARIMA, Prophet, Temporal Fusion Transformers) capturing seasonality, trend, and promotional effects, improving inventory forecasting accuracy by 35% and supporting optimization decisions.",
      "Performed data preprocessing, EDA, feature engineering, time-series backtesting and holdout validation, model training, and forecasting error analysis to support inventory planning.",
      "Increased click-through rate and average order value through personalized recommendation models combining CNN visual embeddings and Transformer text embeddings.",
      "Developed NLP and anomaly-detection approaches to flag suspicious review behavior and content patterns, cutting fraudulent review influence by 50%.",
      "Analyzed 500K+ customer reviews (BERT, spaCy) for Aspect-Based Sentiment Analysis, identifying product-level sentiment and supplier-quality issues.",
      "Built reproducible ML workflows (Kubeflow, Databricks), improving consistency across development, validation, and deployment environments.",
      "Reduced recommendation-serving latency during peak traffic by caching product embeddings in Redis and distributing inference across scalable services.",
    ],
    tech: ["Python", "SQL", "Pandas", "NumPy", "TensorFlow", "PyTorch", "CNN", "Transformers", "BERT", "spaCy", "NLP", "Recommendation Systems", "Embeddings", "ARIMA", "SARIMA", "Prophet", "TFT", "Redis", "Kubeflow", "Databricks"],
  },
];

/* Hub-and-spoke skills graph — mirrors the resume's Technical Skills sections */
export const skills = [
  {
    group: "Generative AI & LLMs",
    short: "GenAI",
    items: ["LLMs", "GPT-4o", "Llama 3", "Claude", "OpenAI API", "Anthropic API", "Prompt Engineering", "RAG", "Agentic AI", "Multi-Agent Systems", "LangChain", "LangGraph", "CrewAI", "AutoGen", "MCP", "Function Calling", "Structured Outputs", "LoRA", "QLoRA", "LLM Evaluation", "Hallucination Detection", "AI Guardrails"],
  },
  {
    group: "Machine Learning",
    short: "ML",
    items: ["Supervised & Unsupervised Learning", "Classification", "Regression", "Clustering", "Predictive Modeling", "Optimization", "Feature Engineering", "Model Development", "Hyperparameter Tuning", "Cross-Validation", "XGBoost", "LightGBM", "CatBoost", "Scikit-learn", "Anomaly Detection", "Autoencoders"],
  },
  {
    group: "Statistics & Experimentation",
    short: "Stats",
    items: ["Hypothesis Testing", "A/B Testing", "Experimental Design", "Causal Inference", "Regression Analysis", "Predictive Analytics", "Baseline & Challenger Comparison", "Precision / Recall / F1", "AUC-ROC"],
  },
  {
    group: "Deep Learning & NLP",
    short: "DL/NLP",
    items: ["TensorFlow", "PyTorch", "CNN", "RNN", "LSTM", "Transformers", "BERT", "ALBERT", "NLP", "Text Classification", "Sentiment Analysis", "NER", "Aspect-Based Sentiment Analysis", "Embeddings"],
  },
  {
    group: "AI/ML Engineering",
    short: "AI Eng",
    items: ["ML Pipelines", "AI Pipelines", "Model Deployment", "Model Serving", "Inference APIs", "REST APIs", "FastAPI", "Microservices", "Distributed Systems", "Event-Driven Architecture", "API Gateway", "Redis"],
  },
  {
    group: "MLOps & Production",
    short: "MLOps",
    items: ["MLOps", "GenAIOps", "MLflow", "Experiment Tracking", "Model Monitoring", "Data/Model Drift", "Automated Retraining", "Model Versioning", "CI/CD", "GitLab CI/CD", "Docker", "Kubernetes", "Airflow", "Kubeflow", "Observability"],
  },
  {
    group: "Cloud & AI Platforms",
    short: "Cloud",
    items: ["AWS SageMaker", "AWS Bedrock", "S3", "Lambda", "SNS", "Step Functions", "Textract", "Comprehend", "Azure ML", "Azure ML Pipelines", "Azure OpenAI", "AKS", "GCP Vertex AI", "BigQuery"],
  },
  {
    group: "Data Engineering & Analytics",
    short: "Data Eng",
    items: ["Apache Spark", "PySpark", "Databricks", "Snowflake", "MongoDB", "NoSQL", "ETL/ELT", "Data Pipelines", "Power BI", "Tableau"],
  },
  {
    group: "Retrieval & AI Infrastructure",
    short: "Retrieval",
    items: ["Pinecone", "FAISS", "Milvus", "Chroma", "Weaviate", "Vector Search", "Semantic Search", "Similarity Search"],
  },
  {
    group: "Programming & Data Science",
    short: "Python/SQL",
    items: ["Python", "SQL", "R", "Pandas", "NumPy", "SciPy", "PySpark", "Data Analysis", "EDA", "Data Cleaning", "Statistical Analysis", "Data Visualization", "Excel", "Git", "Bitbucket"],
  },
  {
    group: "Explainability, Governance & Security",
    short: "Governance",
    items: ["SHAP", "LIME", "Model Explainability", "Model Traceability", "Responsible AI", "AI Governance", "Auditability", "HIPAA", "PCI DSS"],
  },
];

export const education = [
  {
    school: "University of North Texas",
    degree: "Master of Science, Computer Science",
    period: "2024 — 2025",
    location: "Denton, TX",
  },
  {
    school: "Vidya Jyothi Institute of Technology",
    degree: "Bachelor of Technology, Computer Science and Engineering",
    period: "2019 — 2023",
    location: "India",
  },
];

export const certifications = [
  { name: "Azure AI Engineer Associate", issuer: "Microsoft Certified" },
  { name: "Certified Developer – Associate", issuer: "AWS" },
  { name: "Certified Generative AI Professional", issuer: "Oracle Cloud Infrastructure" },
  { name: "Certified Data Science Professional", issuer: "Oracle Cloud Infrastructure" },
  { name: "AI Foundations Associate", issuer: "Oracle Cloud Infrastructure" },
  { name: "Data Science Professional Certificate", issuer: "IBM" },
];

export const publication = {
  title: "Question Answering System using NLP and ALBERT",
  description:
    "QA system using ALBERT parameter-sharing and Sentence Order Prediction pretraining to reduce model size while maintaining answer-extraction performance on standard QA benchmarks.",
  tags: ["ALBERT", "NLP", "Question Answering", "Fine-Tuning", "Python"],
};

/* Marquee strip under the hero */
export const stackMarquee = [
  "Python", "SQL", "PyTorch", "TensorFlow", "LangChain", "LangGraph", "CrewAI",
  "AutoGen", "GPT-4o", "Llama 3", "Claude", "RAG", "MCP", "LoRA", "QLoRA",
  "Pinecone", "FAISS", "Milvus", "XGBoost", "LightGBM", "CatBoost", "Prophet",
  "BERT", "ALBERT", "spaCy", "SageMaker", "Bedrock", "Azure ML", "Vertex AI",
  "Snowflake", "Databricks", "PySpark", "Airflow", "Kubeflow", "MLflow",
  "Langfuse", "Docker", "Kubernetes", "FastAPI", "SHAP", "LIME", "Power BI",
];
