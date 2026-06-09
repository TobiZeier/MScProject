---
tags: [MCDM, TOPSIS, methodology, msc-project]
type: methodology-note
status: processed
---
## What is TOPSIS?
Technique for Order of Preference by Similarity to Ideal Solution. An MCDM method that ranks alternatives based on their geometric distance from an ideal and a negative ideal solution.

## Steps
1. Build decision matrix (alternatives × criteria)
2. Normalise the matrix (vector normalisation)
3. Apply weights to produce weighted normalised matrix
4. Determine **Positive Ideal Solution (PIS)** — best value for each criterion
5. Determine **Negative Ideal Solution (NIS)** — worst value for each criterion
6. Calculate Euclidean distance of each alternative from PIS and NIS
7. Compute **Closeness Coefficient (CC)** for each alternative:

$$CC_i = \frac{d_i^-}{d_i^+ + d_i^-}$$

   where $d_i^+$ = distance from PIS, $d_i^-$ = distance from NIS

8. Rank alternatives by descending CC (higher = higher priority)

## Strengths
- Handles multiple conflicting criteria simultaneously
- Incorporates differential weights per criterion
- Produces an interpretable, auditable ranking
- Computationally straightforward (implementable in Python/pandas)
- Does not require pairwise comparisons (unlike AHP)

## Limitations
- Sensitive to normalisation method choice
- Requires predefined weights (subjectivity risk)
- Rank reversal possible when alternatives are added or removed

## Application in This Project
- **Alternatives:** trading IT services (anonymised)
- **Criteria:** incident frequency, incident age/backlog, MTTR, change failure rate, patch/upgrade lag, EoL component proportion
- **Output:** ranked list of services by remediation priority (CC score)

## Links
- [[Design Science Research (DSR) – Methodology Notes]]
- [[Lenarduzzi et al. (2021) – A Systematic Literature Review on Technical Debt Prioritisation]]
- [[Research Proposal – MSc Computing Project]]
