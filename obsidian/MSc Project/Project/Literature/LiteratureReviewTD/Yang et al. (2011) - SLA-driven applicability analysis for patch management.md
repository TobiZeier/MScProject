---
tags: [patch-management, sla, it-service-management, risk-assessment, business-impact-analysis, automation, msc-project]
type: literature-note
status: processed
---
## Summary
Technical paper presenting a patch management framework that integrates Service Level Agreement (SLA) data to perform automated applicability analysis. It moves beyond simple technical deployment to consider business impact by mapping IT components to the business services they support through a dependency network. The study uses simulations of realistic business services to demonstrate that an SLA driven approach reduces financial losses from service disruptions compared to traditional LiveUpdate or simple rule based strategies.

## Key Arguments
- Patching should not be viewed as an isolated technical task but as a core component of IT Service Management (ITSM) that affects business continuity
- Traditional patching methods often fail because they lack visibility into the complex interdependencies between hardware, software, and business services
- Business service loss represents the most effective criterion for prioritising patch interventions and minimising adverse impacts
- Automated simulation of service disruptions through fault tree analysis allows for better planning of patch windows and financial risk mitigation

## Key Concepts
- SLA driven optimisation
- Business Impact Analysis (BIA)
- Configuration Item (CI) dependency topology
- Global Asset and Configuration Data Warehouse (GACDW)
- Patch applicability analysis

## Relevance to Project
Supports section 2.7.4 (Security Debt & Patching) and section 2.8.1 (Case for Multi-Criteria Methods) by providing a practical framework for how technical maintenance can be quantified through service level metrics. It offers a concrete model for shifting from a code centric view of technical debt to an operational, service oriented perspective where the cost of technical neglect is measured by SLA penalties and business downtime.