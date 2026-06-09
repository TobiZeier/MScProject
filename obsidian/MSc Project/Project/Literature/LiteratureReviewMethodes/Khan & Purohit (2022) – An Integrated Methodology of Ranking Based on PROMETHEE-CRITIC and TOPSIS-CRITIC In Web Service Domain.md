---
tags: [web-services, qos, mcdm, critic-method, promethee, topsis, service-selection, msc-project]
type: literature-note
status: processed
---
## Summary
Technical paper proposing an integrated Multi-Criteria Decision Making (MCDM) framework for ranking web services based on Quality of Service (QoS) attributes. The authors address the challenge of service discovery when multiple providers offer similar functional capabilities. They introduce a two part approach: using the CRITIC method to objectively calculate weights for various QoS criteria (such as response time, availability, and throughput) and then applying PROMETHEE-II and TOPSIS methods to rank the services. The study validates the stability of these rankings through Spearman’s rank correlation.

## Key Arguments
- Subjective weighting of QoS criteria by users often leads to biased or inaccurate web service selection
- The CRITIC method provides a superior objective weighting mechanism by considering both the contrast intensity and the conflicting relationships between criteria
- Combining objective weighting with established ranking algorithms like PROMETHEE and TOPSIS creates a more reliable decision support system for automated service discovery
- Evaluation across multiple datasets shows high consistency between different MCDM methods, suggesting that the integrated approach is robust for real world web service domains

## Key Concepts
- Quality of Service (QoS) 
- Criteria Importance Through Inter-criteria Correlation (CRITIC)
- PROMETHEE-II (Preference Ranking Organisation Method for Enrichment Evaluations)
- TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)
- Spearman’s Rank Correlation Coefficient

## Relevance to Project
Directly supports section 2.8.2 (TOPSIS Mechanics & Apps) and section 2.6.1 (Static Analysis Limits) by providing a mathematical foundation for ranking and evaluating services based on non-functional requirements. It demonstrates how to move away from subjective "technical debt" assessments toward an objective, multi criteria measurement of service health. The use of CRITIC for weight evaluation is particularly relevant for developing a service level measurement framework where different indicators (latency, reliability, debt density) must be balanced without human bias.