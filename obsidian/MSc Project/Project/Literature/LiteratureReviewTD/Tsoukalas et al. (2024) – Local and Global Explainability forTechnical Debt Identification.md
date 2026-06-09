---
tags: [technical-debt, explainable-ai, machine-learning, technical-debt-identification, software-metrics, xai, literature, msc-project]
type: literature-note
status: processed
---
## Summary
Empirical study proposing an explainable machine learning approach for identifying technical debt at the class level. The authors build project specific classifiers across 21 Java open source projects and apply SHAP explainable AI techniques to interpret model predictions. The study identifies key structural and process metrics associated with high technical debt risk and demonstrates how global explanations reveal important metrics while local explanations provide actionable insights for refactoring decisions.

## Key Arguments
- Machine learning models can accurately identify high technical debt classes, but their usefulness is limited without transparency and interpretability
- Explainable AI methods can bridge the gap between predictive accuracy and practitioner trust by revealing why modules are classified as high technical debt
- Both structural code metrics and development process metrics contribute to technical debt identification
- Global explanations can reveal common influential metrics, while local explanations provide actionable guidance for refactoring individual classes
- Metric thresholds vary substantially across projects, making universal thresholds unreliable for technical debt identification

## Key Concepts
- Explainable AI (XAI)
- SHAP explanations
- Machine learning based TD identification
- Global vs local explainability
- Software quality metrics
- Technical debt prediction

## Relevance to Project
Primarily informs section 2.6.1 (The Dominance of Static Analysis and Its Limits) by illustrating how automated technical debt detection increasingly relies on machine learning models built on code metrics, while also exposing the interpretability limitations of purely predictive approaches.
Also contributes to section 2.6.2 (The Prioritisation Gap) because the paper focuses on identifying debt prone components but does not address how identified debt should be prioritised or economically evaluated, highlighting a gap between detection and decision making.
Finally, it supports discussion in section 2.5.2 (Theoretical Development) by showing how contemporary technical debt research increasingly operationalises the concept through quantitative metrics and predictive modelling frameworks.