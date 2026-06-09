---
tags: [technical-debt, architectural-debt, machine-learning, architectural-smells, index, measurement, literature, msc-project]
type: literature-note
status: processed
---
## Summary
Proposes an ATD index combining machine learning classification and architectural smell detection to produce a composite score for architectural TD. Evaluated on open-source projects.

## Key Arguments
- Composite indices outperform single-metric approaches for architectural TD characterisation
- ML classification can identify high-ATD components with reasonable accuracy
- Architectural smells are reliable proxies for ATD principal
- Index-based approaches provide more actionable prioritisation than raw smell counts

## Key Concepts
- ATD index
- Architectural smells
- ML-based TD detection
- Composite scoring

## Relevance to Project
Section 2.5.3 (Expanding the Conceptual Perimeter) and section 2.8.2 (TOPSIS: Mechanics, Applications, and Critical Limitations). The composite index approach is methodologically related to my TOPSIS composite score and supports the general argument that multi-factor scoring produces superior prioritisation.

## Links
- [[Amanatidis et al. (2020) – Evaluating the Agreement Among Technical Debt Measurement Tools]]
- [[Albarak et al. (2022) – Managing Technical Debt in Database Normalisation]]
- [[de Toledo et al. (2022) – Accumulation and Prioritisation of Architectural Debt in Three Companies Migrating to Microservices]]