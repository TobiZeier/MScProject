---
tags: [operational-risk financial-services trading-IT bayesian-networks causal-modelling risk-measurement basel-II multi-factor-scoring domain-context literature-review]
type: literature-note
status: processed
---
## Summary
Proposes Hybrid Dynamic Bayesian Networks (HDBNs) as a methodology for modelling operational risk in financial institutions. Argues that purely statistical, data-driven AMA models are insufficient because they cannot account for causal dependencies between failure modes and controls. The HDBN approach links operational conditions, including control environment degradation, directly to the probability and severity of losses.

## Key Findings
- Purely actuarial OpRisk models fail to support management decisions because they cannot identify which causal factors are most critical or simulate the effect of risk-reducing interventions
- Controls degradation is directly linked to loss frequency and severity through causal modelling
- The trading process (front office, middle office, back office) provides a natural structure for layered causal risk modelling
- Applied to rogue trading cases (Barings 1995, Daiwa 1995, Allied Irish Bank 2002, Société Générale 2008)
- Concludes that Basel II AMA models should incorporate causal, multi-factor scoring rather than relying solely on historical loss distributions

## Method
Hybrid Dynamic Bayesian Network with dynamic discretization algorithm; applied to a fictitious but empirically grounded trading scenario using real case data for causal structure

## Relevance to Thesis
- Section 2.7 (Financial and Regulated Enterprise IT): Establishes that causal, multi-factor risk scoring is the methodologically appropriate approach in financial services, directly analogous to the rationale for TOPSIS-based TD scoring
- Section 2.7 (Financial and Regulated Enterprise IT): Use as contextual framing for why single-dimension, lagging-indicator approaches are insufficient in trading IT
- Supports the use of incident frequency and control failure as legitimate risk indicators, maps to MTTR and change failure rate as TD outcome proxies
- NO citation as methodological predecessor: BNs and TOPSIS are fundamentally different

## Critical Notes
- Focused on human/fraud risk (rogue trading), not IT infrastructure or software quality risk, domain mismatch must be acknowledged
- Model uses fictitious probability estimates despite real case structure, limits direct empirical applicability
- Predates modern DevOps and cloud-native trading architectures

## Connections
- [[Forsgren et al. (2018) — Accelerate Building and Scaling High Performing Technology Organisations]] — both argue for causal, multi-factor performance measurement over single-dimension lagging indicators
- [[Ramasubbu & Kemerer (2021) – Technical Debt and the Reliability of Enterprise Software Systems A Competing Risks Analysis]] — both frame TD as a form of IT risk with financial consequences in regulated environments
- [[Alfayez et al. (2023) – How SonarQube Identified Technical Debt is Prioritised]] — both critique single-metric approaches to complex risk prioritisation

