---
tags: [DORA-metrics, software-delivery-performance, DevOps, MTTR, change-failure-rate, deployment-frequency, lead-time, organisational-performance, psychometrics, survey-research, legacy-systems, trading-IT, literature-review, anchor-paper]
type: literature-note
status: processed
---
## Summary
Software delivery performance, operationalised through four key metrics (deployment frequency, lead time for changes, MTTR, change failure rate), is a statistically validated construct that predicts both organisational performance and system stability. High performance on these metrics is driven by technical practices (continuous delivery, loosely coupled architecture, trunk-based development) and organisational culture (Westrum generative culture), not by trade-offs between speed and stability.

## Key Findings
- The four DORA metrics constitute a validated psychometric construct via structural equation modelling
- High performers restore service in under one hour; low performers take days to weeks
- High performers spend 49% of time on new work, 21% on unplanned rework; low performers spend 38% on new work, 27% on unplanned rework
- Technical debt and poor architectural coupling are primary drivers of deployment pain and unplanned rework
- Low performers are more likely to be working on mainframe systems — directly contextualises trading IT
- Loosely coupled architecture was the single biggest contributor to continuous delivery performance in 2017 dataset
- High performers spend 50% less time remediating security issues than low performers

## Relevance to Thesis
- Section 2.7.3 (DORA Metrics as Operational Debt Proxies), Primary citation for DORA four key metrics — defines, operationalises, and validates MTTR, change failure rate, deployment frequency, and lead time as rigorous constructs
- Section 2.3 (Methodology) could be cited as anchor paper for citation snowballing
- Section 2.7.1 (The Financial Services Context) Cite for mainframe/legacy finding as contextual evidence for trading IT domain

## Critical Notes
- All data is self-reported via surveys: Martin Fowler explicitly flags this limitation in the foreword; causal inference is limited
- Population sample may not reflect regulated financial services IT proportionally
- Metrics validated as perceptual constructs, not as objective operational measurements, this is the key distinction my research exploits
- Book format means peer review process is less rigorous than journal publication, acknowledge alongside the scale and rigour of the underlying research programme

## Connections
- [[Neil et al. (2009) — Modelling Operational Risk in Financial Institutions using Hybrid Dynamic Bayesian Networks]] — both argue against single-dimension, lagging-indicator risk measurement
- [[de Toledo et al. (2021) – Reducing Incidents in Microservices by Repaying Architectural Technical Debt]] — provides objective empirical evidence for what Forsgren et al. measure perceptually
- [[Amanatidis et al. (2020) – Evaluating the Agreement Among Technical Debt Measurement Tools]] — both demonstrate that dominant measurement approaches have reliability limitations
- [[Ramasubbu and Kemerer (2016) – Technical Debt and the Reliability of Enterprise Software Systems]] — both examine TD consequences in enterprise IT contexts