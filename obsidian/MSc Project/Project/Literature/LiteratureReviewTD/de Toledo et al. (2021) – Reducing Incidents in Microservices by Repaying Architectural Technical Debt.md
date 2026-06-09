---
tags: [technical-debt, architectural-debt, microservices, incidents, MTTR, empirical, quantitative, literature, msc-project]
type: literature-note
status: processed
---
## Summary
Quantitative and qualitative case study of a project with approximately 1,000 microservices at a large international financial services company. Measures and compares incident counts before and after architectural TD remediation.

## Key Arguments
- Total incidents reduced by 84% after architectural refactoring
- Critical and high-priority incidents each reduced by approximately 90%
- The number of incidents was roughly constant over time with TD present, suggesting TD creates a persistent incident baseline, not random spikes
- ATD items studied included lack of communication standards, poor dead-letter queue management, and use of inadequate technologies

## Key Concepts
- ATD repayment impact
- Incident frequency as TD interest
- Architectural refactoring
- Microservices TD

## Relevance to Project
- Section 2.7 (Technical Debt in Financial and Regulated Enterprise IT) since the study was conducted in a large international financial services company.
- Section 2.9 (Synthesis: Converging Evidence and the Research Gap) the study shows that incidents were first stable but then reduced after architectural refactoring. Provides the strongest direct evidence in the literature that TD repayment measurably reduces incident frequency.
 
## Links
- [[Forsgren et al. (2018) — Accelerate Building and Scaling High Performing Technology Organisations]]
- [[Ramasubbu and Kemerer (2016) – Technical Debt and the Reliability of Enterprise Software Systems]]
- [[de Toledo et al. (2022) – Accumulation and Prioritisation of Architectural Debt in Three Companies Migrating to Microservices]]
