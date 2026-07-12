# Anticipated Defence Questions and Answers

Prepared for the defence of "Measuring and Prioritising Technical Debt in Mission-Critical Trading Systems". Every answer is grounded in the thesis; chapter references are given so each claim can be located under pressure. The first five questions are addressed on slides 13 and 14; the remainder are held in reserve.

## Method and design

**Q1. Why TOPSIS rather than AHP, VIKOR or a fuzzy extension?**
Because the task is producing a full ranked list of a service portfolio from mixed cost and benefit criteria on different scales, and TOPSIS integrates normalisation, weighting and ranking in one transparent procedure. AHP derives weights from pairwise comparisons but does not natively produce a full ranking, and its comparison burden grows with the number of criteria. VIKOR identifies compromise solutions rather than a global ranking. Crucially, the thesis does not treat this choice as settled by argument: method choice is handled as a robustness question, and the evaluation re-ranks everything with SAW and VIKOR precisely to test whether the ordering depends on the mechanics of one method (Chapters 2 and 5). Fuzzy extensions address imprecise expert judgements; the inputs here are measured operational values, so the added machinery would not address a problem this study has.

**Q2. Why vector normalisation rather than min-max?**
Min-max rescales to fixed bounds and compresses extreme observations, altering the relative distances on which a distance-based method relies. Vector normalisation preserves proportional relationships, so a service with an unusually high MTTR keeps its full separation in the normalised space. Greco and colleagues recommend it for composite indicators for exactly this reason (Chapter 4). The one place min-max is used deliberately is SAW in the convergent-validity strand, where Weitendorf normalisation avoids the division by zero that classic cost normalisation would produce on the dataset's genuine zero values (Chapter 5).

**Q3. Your differential weights are not derived from literature. Are they arbitrary?**
They are a declared practitioner assumption, stated as such in Chapter 3: recovery time and patching delay carry greater operational consequence in time-critical trading environments. The design response to that arbitrariness is twofold. The two discrete configurations bound the effect, and the Monte Carlo strand removes the dependence entirely: across 20,000 weight vectors drawn uniformly from the simplex, SVC-03 is last in 99.1 per cent of weightings and the high-priority cluster holds the top positions in the large majority. The conclusions the thesis actually relies on hold under any admissible weighting.

**Q4. Why a uniform Dirichlet for the weight sweep?**
Because absent evidence privileging one weighting over another, every valid weight vector should be equally plausible; a uniform draw over the simplex encodes exactly that neutrality. The procedure approximates, in tractable form, the stochastic acceptability analysis Greco and colleagues advocate for composite indicators. The run is seeded and reproducible, and repeating it with a different seed and sample size changed no reported figure by more than 0.01 (Chapter 5).

**Q5. Why Kendall's tau rather than Spearman's rho?**
Tau has a direct decision-relevant interpretation for this problem: it counts pairwise order agreements, and a pairwise inversion is precisely what changes a remediation decision. With six alternatives it also admits an exact p-value by enumerating all 720 orderings, avoiding any large-sample approximation the data could not support. The p-values are read as effect sizes rather than accept-or-reject decisions, because the sample size caps attainable significance regardless of how strong the agreement is (Chapter 5).

## Data

**Q6. Six services from a portfolio of 108. How were they chosen, and what can that support?**
Selection was by data completeness: each of the six holds a continuous record across all five indicators for the full two-year window in both the ITSM instance and the CMDB, is an active configuration item, and has operated for more than thirty-six months. Fifty-three small vendor interfaces requiring no significant ongoing work were excluded first. Two consequences are declared in Chapter 4: the selected services skew toward higher operational activity, so absolute values are not portfolio-representative, and six alternatives limit the discriminatory power of the rank-stability tests. The contribution is therefore the instrument and its evaluation logic, not a portfolio ranking; portfolio-wide deployment is stated future work.

**Q7. Your change failure rate takes values above one. That is not a rate. Explain.**
Correct, and Chapter 3 declares it. CFR here is a derived proxy, weighted incidents divided by the number of changes, which is the formula the case organisation itself applies in practice. It approximates the intent of the DORA change failure rate without being identical to it, because a true CFR requires deployment-outcome labelling the organisation does not record. The values function correctly as a cost criterion in the model; only the label inherits DORA vocabulary.

**Q8. CFR shares its numerator with incident frequency. Is that not double counting?**
The two criteria are not fully independent, and the thesis says so. The overlap is accepted as a constraint of working with operational data rather than engineered away, and its effect on the ordering is bounded by the weight sensitivity analysis: rankings are stable when the weight on either criterion moves, which they could not be if the shared numerator were silently driving the result (Chapters 3 and 5).

**Q9. Why cap MTTR at the 98th percentile?**
Because the upper tail of the resolution-time distribution is dominated by records whose elapsed time reflects administrative inactivity rather than active resolution effort, for example tickets left open across calendar time. Including them would let data-hygiene artefacts, not debt, drive a criterion. The cap is a declared data-preparation decision in Chapter 4, alongside alarm-storm consolidation and removal of automatic closures under 0.1 hours.

## Validity

**Q10. You built and evaluated the framework on the same dataset. Is the evaluation circular?**
The design is declared and its consequences are bounded rather than hidden. What the evaluation establishes is robustness, method-independence and discriminant value; what it cannot establish is criterion validity, because no independent measure of the non-code debt in scope exists to validate against, a gap that is itself documented in the literature review. Proxy validity is therefore assessed on convergence with theory rather than demonstrated causal mechanism, and external validation in other organisations is named as the primary avenue for future work (Chapters 3, 5 and 6).

**Q11. Degraded operational metrics could reflect staffing, release practices or organisational disruption rather than debt. How do you exclude that?**
The thesis does not claim to exclude it; it names those exact confounders in Chapter 2 and treats the proxy link as the central testable hypothesis rather than a premise. Three things make the hypothesis credible within this design: Nord and colleagues ground elevated MTTR and CFR as diagnostic debt symptoms rather than generic shortfalls; the multi-criteria construction means no single confounded metric drives a rank; and the resulting profiles match what the literature predicts, for instance SVC-02's incident-quiet, lifecycle-heavy profile. A cross-sectional design cannot demonstrate the causal mechanism, which is why longitudinal tracking is the named next step.

**Q12. What would falsify the proxy hypothesis?**
Longitudinal disconfirmation: if services ranked high priority systematically failed to generate the operational and financial consequences the debt literature predicts, in the sense of Banker and colleagues, while low-priority services generated them, the proxy claim would fail. Chapter 6 frames longitudinal evaluation in exactly these terms, as the study that would move the claim from plausible to evidenced or refute it.

**Q13. Two of your key sources are single-organisation studies. Does your evidence base generalise?**
The thesis flags this itself: the Credit Suisse, BankAlpha and ING studies are each single-organisation, and whether their patterns generalise to securities trading remains open. This study does not resolve that; it contributes an operational dataset from a trading environment that was previously absent from the literature, which is a necessary step toward the multi-site evidence base the field lacks (Chapter 2).

## Results

**Q14. What actually happened to SVC-06 between 2024 and 2025?**
Its debt broadened from concentrated to general. In 2024 it was worst in the portfolio on patch recency and unsupported components while remaining unremarkable elsewhere; sample-relative methods flagged it first while the absolutely anchored variant read it as mid-ranking. By 2025 its incident count had risen substantially, its change failure rate had become the portfolio's worst, and patch recency remained the lowest. VIKOR's utility component rose from 0.491 to 0.559 while its regret stayed capped, and all methods converged on rank one. The framework thus recorded both the relative weakness, early, and the absolute deterioration, once it occurred (Chapter 5, Appendices B and C).

**Q15. So which service actually gets remediated first, SVC-04 or SVC-06?**
The framework narrows that to a two-way decision and states what the decision turns on: whether debt dimensions are compensatory. SVC-04 carries diffuse debt across the architectural, platform and process dimensions; SVC-06 carries deficiencies concentrated in patching and, by 2025, change failure. Whether concentrated infrastructure-lifecycle exposure outranks diffuse operational debt is a managerial judgement about the organisation's risk appetite, informed by the dimensional profiles the framework supplies. The thesis regards declining to fabricate a numeric tiebreak as intellectual honesty, not indecision (Chapters 5 and 6).

**Q16. Is rank reversal actually a problem at n = 6, or a theoretical worry?**
It is observable in this data: removing single services changes an adjacent pair in three of six cases under the standard formulation, though no service ever crosses between portfolio halves. The absolute-mode correction eliminates it entirely, and not incidentally: Yang proves that variants with set-independent bounds and ideal solutions are ranking stable by construction. The cost is that the fixed bounds must be justified from organisational thresholds, which is why the variant is a complementary perspective rather than the primary signal (Chapter 5, Appendix A).

## Governance, ethics and impact

**Q17. Could this instrument be used to evaluate teams, and what prevents that?**
Three safeguards. The governance scope agreed with the Head of Trading IT at the outset defines the output as decision support for portfolio conversations, not a binding assessment instrument. The dataset contains no team, vendor or individual identifiers, with anonymisation applied before analysis. And the thesis states the interpretive principle: high-debt profiles typically reflect historical design decisions rather than the competence of current custodians, following Ahmad and colleagues. The framework describes services, not people (Chapters 3 and 6).

**Q18. What does FINMA Circular 2023/1 have to do with a technical debt ranking?**
The circular requires comprehensive ICT operational risk management, including incident monitoring and service resilience, and it charges the board with approving and monitoring the relevant strategies. It does not prescribe the metrics used here; those are organisationally defined. The connection is that an auditable, reproducible priority ordering built from the institution's own operational records is precisely the kind of demonstrable risk-management evidence that regime rewards, which is why auditability is a design requirement rather than a nicety (Chapters 3 and 6).

**Q19. What would an organisation need to adopt this framework?**
Three things, all stated in the thesis. An ITSM instance and CMDB with sufficient recording discipline to populate the five indicators, which is the binding constraint, since indicator coverage limited even this study to six services. A locally justified weight configuration, revalidated rather than transferred, because the single-site calibration is a declared limitation. And a governance agreement on use, of the kind established here, so the ordinal signal feeds portfolio conversations rather than performance management (Chapters 3, 4 and 6).

**Q20. Where does this work go next, academically?**
Four named directions in Chapter 6: external validation in other regulated organisations to test the proxy hypothesis beyond one case; longitudinal evaluation to test the predictive content of the rankings; portfolio-wide deployment once indicator coverage is complete, which also strengthens the statistical footing; and deriving the absolute-mode bounds from regulatory or cross-industry reference points, which would make scores comparable between organisations as well as between years. For publication, the methodological finding, that sample-relative and absolutely anchored methods respond differently to concentrated profiles, stands on its own for an MCDM venue, while the framework and case evidence suit an empirical software engineering or IS venue.
