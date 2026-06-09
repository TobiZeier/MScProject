---
tags: [mcdm, madm, topsis, decision-theory, attributes, saw, weight-evaluation, msc-project]
type: literature-note
status: processed
---
## Summary
A fundamental text on Multiple Attribute Decision Making (MADM) that provides a comprehensive overview of methods for selecting the best alternative from a finite set of options based on conflicting criteria. The authors detail several classical methodologies, including Simple Additive Weighting (SAW), the Analytic Hierarchy Process (AHP), and specifically the Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS). The book emphasises the importance of structuring a goal hierarchy and converting qualitative attributes into quantitative measures to facilitate objective decision-making.

## Key Arguments
- Real-world decisions are rarely based on a single criterion; they require a systematic way to trade off conflicting attributes (e.g., cost vs. performance)
- The quality of a decision depends more on the generation and structuring of appropriate attributes (goal hierarchy) than on the specific mathematical method chosen
- TOPSIS is uniquely valuable because it defines the best alternative as the one closest to a "positive ideal solution" and furthest from a "negative ideal solution," mirroring human logic
- While different MADM methods (SAW, TOPSIS, ELECTRE) often yield similar rankings, the more complex methods are necessary for large-scale government or enterprise projects to ensure defensibility and rigour

## Key Concepts
- Multiple Attribute Decision Making (MADM)
- Positive Ideal Solution (PIS) and Negative Ideal Solution (NIS)
- Euclidean Distance (as a measure of preference)
- Goal Hierarchy (Attributes and Sub-attributes)
- Relative Closeness Coefficient

## Known Limitations (as identified by subsequent literature)
- The standard Euclidean normalisation makes the PIS and NIS dependent on the
  current set of alternatives — adding or removing an alternative changes the
  ideal reference points, causing **rank reversal**
- The best-ranked alternative is not always the one geometrically closest to the
  PIS — a theoretical inconsistency noted by multiple authors
- Standard TOPSIS does not address uncertainty or imprecision in criterion values
  (addressed by fuzzy TOPSIS extensions)

## Relevance to Project
- Section 2.8.1 (The Case for Multi-Criteria Methods):Provides the foundational theoretical justification for moving away from single-metric assessments (like code coverage) toward multi-criteria service health models.
- Section 2.8.2 (TOPSIS: Mechanics, Applications, and Critical Limitations): Acts as the primary source for the mathematical mechanics of TOPSIS, specifically the logic of the "ideal solution" which can be applied to "ideal system state" vs "debt-laden state."
- Section 2.9.1 (Cross-Pillar Convergence): Supports the argument that technical debt remediation is ultimately an allocation problem of limited resources (time/budget) across competing technical priorities, necessitating a formal MADM approach.

## Important Note on Citation
This is a textbook (Springer, Heidelberg, 1981, Vol. 186) not a journal article.
It is cited consistently across the MCDM literature as the originating source for
TOPSIS. 


## Links
- [[Yang (2020) – Ingenious Solution for the Rank Reversal Problem of TOPSIS]]
- [[García-Cascales & Lamata (2012) – On Rank Reversal and TOPSIS Method]]
- [[Albarak et al. (2022) – Managing Technical Debt in Database Normalisation]]
- [[Khan & Purohit (2022) – An Integrated Methodology of Ranking Based on PROMETHEE-CRITIC and TOPSIS-CRITIC In Web Service Domain]]
- [[Zytoon (2020) – A Decision Support Model for Prioritization of Regulated Safety Inspections Using Integrated Delphi, AHP and Double-Hierarchical TOPSIS Approach]]
