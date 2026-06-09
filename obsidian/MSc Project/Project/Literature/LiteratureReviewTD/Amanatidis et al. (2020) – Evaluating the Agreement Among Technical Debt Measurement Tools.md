---
tags: [technical-debt, measurement, SonarQube, literature, msc-project]
type: literature-note
status: processed
---
## Summary
Empirically compares multiple TD measurement tools (including SonarQube) and evaluates the degree to which they agree when measuring the same codebases. Finds limited consensus across tools.

## Key Arguments
- TD measurement tools produce inconsistent and often contradictory results
- No single tool can be considered a gold standard
- The Technical Debt Ratio (TDR) varies significantly across tools even on the same codebase
- Tools are primarily code-centric and not applicable beyond source code

## Limitations
- Focuses exclusively on code-level debt
- Does not address infrastructure, operational, or service-level debt

## Relevance to Project
Directly addresses section 2.6.1 (The Dominance of Static Analysis and Its Limits). Justifies the limitation of code-centric tools in trading IT.

## Links
- [[Alfayez et al. (2023) – How SonarQube Identified Technical Debt is Prioritised]]
- [[Biazotto et al. (2024) – Technical Debt Management Automation]]
