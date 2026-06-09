---
tags: [technical-debt, service-oriented, SOA, measurement, literature, msc-project]
type: literature-note
status: processed
---
## Summary
Examines how technical debt manifests specifically in service-oriented architectures (SOA). Identifies service-level TD indicators and discusses how traditional code-centric metrics fail to capture debt in service compositions.

## Key Arguments
- Service-oriented systems exhibit unique TD types (interface debt, composition debt, dependency debt)
- TD in SOA is poorly captured by code metrics alone
- Service coupling and interface instability are strong TD indicators in service environments
- Operational data (e.g., service call failures, dependency failures) can supplement code metrics

## Key Concepts
- Service-oriented TD
- Interface and composition debt
- Service coupling metrics

## Relevance to Project
Directly relevant for section 2.6.1 (The Dominance of Static Analysis and Its Limits): validates the research approach of measuring TD at the service level using operational data rather than code metrics. Cited in Literature Review Theme 1 and research gap justification.

## Links
- [[Rosser and Norton (2021) – A Systems Perspective on Technical Debt]]
- [[Amanatidis et al. (2020) – Evaluating the Agreement Among Technical Debt Measurement Tools]]
