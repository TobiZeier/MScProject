---
tags: [technical-debt, microservices, architectural-debt, case-study, mixed-method, literature, msc-project]
type: literature-note
status: processed
---
## Summary
Mixed-method case study of a system with over 100 microservices serving 15,000+ locations. Combines static code analysis with focus group and interview data. Identifies a "microservice architecture technical debt gamble", the phenomenon of rapid TD accumulation and resolution cycles.

## Key Arguments
- Simple static source code analysis is an efficient entry point for holistic TD discovery in microservices
- Inadequate communication significantly contributes to TD
- Misalignment between architectural and organisational structures exacerbates TD accumulation
- Microservices can rapidly cycle through TD accumulation and resolution — unlike monoliths where debt compounds more slowly

## Key Concepts
- TD gamble (rapid accumulation/resolution cycles)
- Communication-driven TD
- Architectural-organisational misalignment
- Mixed-method TD investigation

## Relevance to Project
Section 2.5.3 (Expanding the Conceptual Perimeter) and section  2.6.1 (The Dominance of Static Analysis and Its Limits). The communication and organisational findings support Ahmad et al.'s non-technical TD argument. The rapid cycling phenomenon is relevant context for the service-level measurement rationale.

## Links
- [[Ahmad et al. (2026) – Technical Debt Is Not Just Technical]]
- [[de Toledo et al. (2022) – Accumulation and Prioritisation of Architectural Debt in Three Companies Migrating to Microservices]]
- [[Sas & Avgeriou (2023) – An Architectural Technical Debt Index Based on Machine Learning and Architectural Smells]]
