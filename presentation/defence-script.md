# Defence Speaking Script

Measuring and Prioritising Technical Debt in Mission-Critical Trading Systems
Tobias Zeier, MSc Enterprise IT Management, University of Essex

Target length 15 minutes at a measured pace of roughly 140 words per minute. Timings are cumulative. Sentences in square brackets are stage directions, not spoken text. The script matches the corrected deck of 12 July 2026.

---

## Slide 1, Title (0:00 to 0:45)

Good morning, and thank you for your time. My name is Tobias Zeier, and this is the defence of my thesis on measuring and prioritising technical debt in mission-critical trading systems.

The chart on this slide is the thesis in a single image. Six production trading services, ranked by technical debt priority, computed entirely from operational records. No source code was read to produce this ranking, because in the environment I studied, source code is largely not available to be read. The next fifteen minutes explain why that matters, how this ranking was built, and, most importantly, why you can trust it.

## Slide 2, The problem lives outside the code (0:45 to 2:00)

In vendor-dominated trading IT, the dominant measurement tools, SonarQube, SQALE, CAST, are structurally inapplicable, because they all require source code that vendors do not provide. The debt that matters in this environment sits elsewhere: in infrastructure lifecycle exposure, in patch delay, in operational instability.

And this debt is expensive. Banker and colleagues followed twenty-six firms over an eleven-year system lifecycle and found that ten per cent more technical debt cost sixteen per cent of gross return on assets. Di Tizio and colleagues analysed three hundred and fifty attack campaigns and found that one month of patch delay raises the odds of compromise by a factor of four point nine, and three months by a factor of nine point one. And de Toledo and colleagues showed the positive case: repaying architectural debt in a production microservices system cut incidents by eighty-four per cent.

The point on which the whole thesis rests is the last line on this slide. The costliest debt here is invisible to the standard tools, but its symptoms are recorded every day, in ITSM and CMDB systems. The data already exists. What was missing is an instrument that reads it.

## Slide 3, The gap and the research questions (2:00 to 3:00)

Lenarduzzi and colleagues reviewed forty-four primary studies on technical debt prioritisation and found that quantitative multi-criteria approaches are uncommon and industrial validation is rare. More specifically, no study I reviewed combines four elements: service-level indicators, multi-criteria prioritisation, live operational data, and a trading IT context. Each pair exists somewhere in the literature. The combination does not.

That gap produces three research questions. RQ1 asks how technical debt can be prioritised quantitatively at the service level using operational data. RQ2 asks to what extent operational metrics are valid proxies for debt severity, and I want to flag the wording: to what extent. The proxy link is treated as a testable hypothesis throughout this thesis, never as a premise. RQ3 asks how stable the resulting rankings are when the weights are perturbed.

## Slide 4, Five indicators, one auditable instrument (3:00 to 4:15)

The study follows Design Science Research after Hevner and colleagues, as a single-organisation embedded case study, with the IT service as the unit of analysis.

Five indicators feed the model, each mapped to a technical debt dimension in the thesis. Let me walk one row fully, as an example of how each mapping is grounded. Mean time to restore comes from ITSM records. Forsgren and colleagues validated it as a delivery performance metric across more than two thousand organisations. Nord and colleagues then ground its diagnostic reading: elevated recovery time is not a generic shortfall but a symptom that accumulated debt is impeding the system's ability to absorb and recover from change. That two-step justification, metric validity plus diagnostic reading, is repeated for every row.

I should also say what is not in the table. Documentation, test coverage and coupling indicators were excluded on data availability, not on relevance. Declaring what could not be measured is part of the audit trail.

## Slide 5, From records to ranking (4:15 to 5:15)

The pipeline is deliberately simple. Indicators are extracted from live records, normalised by vector normalisation, which preserves extreme observations, then weighted. Two configurations are used: equal weights of nought point two, and a differential configuration placing nought point three on MTTR and patch recency. TOPSIS then computes a closeness coefficient between zero and one, and services are ranked with the lowest coefficient as the highest debt priority.

Two design decisions to flag. First, the differential weights are a declared practitioner assumption, not derived from literature, and the evaluation is designed so that nothing depends on them. Second, the choice of TOPSIS itself is treated as a robustness question rather than an article of faith, which is why the evaluation re-ranks everything with SAW and VIKOR.

## Slide 6, The data, and its honest limits (5:15 to 6:15)

The portfolio holds one hundred and eight services. Fifty-three small vendor interfaces were excluded, and six services were selected for demonstration on one criterion: data completeness across all five indicators for the full window, January 2024 to December 2025. Quality filters consolidated alarm storms, removed automatic closures under six minutes, and capped the MTTR distribution at the ninety-eighth percentile.

The right-hand column I want to state myself, before you ask. Recording practices vary by team, so the scores are ordinal signals, not measurements. The change failure rate shares its incident numerator with incident frequency, a dependency whose effect is bounded by the sensitivity analysis. And six services are a demonstration set, not a portfolio ranking. The contribution of this thesis is the instrument and its evaluation logic; the small-n consequence is handled statistically, as the next slides show.

## Slide 7, The priority ranking (6:15 to 7:15)

Here is the 2025 result under equal weights, and the best way to read it is through three service profiles.

SVC-04 holds rank one: five hundred and seventy-four incidents a year, a mean time to restore of nearly forty-two hours, the highest change failure rate but for one, and yet a completely clean infrastructure record. Its debt spans the architectural, platform and process dimensions. SVC-03, at the bottom, is the portfolio's reference for a well-maintained service on every indicator. And SVC-02 is the case the framework was built for: only thirty incidents a year, so it looks stable, but one thousand two hundred and twenty-one unsupported component months, by far the largest structural exposure in the portfolio. That is the debt an incident count cannot see.

Each position maps onto a distinct debt dimension from the literature mapping, and that correspondence is the practical-validity argument for RQ2.

## Slide 8, Five strands, no single point of trust (7:15 to 8:15)

Now, why should you trust this ranking? There is no external ground truth for non-code technical debt, so no single test can validate it. The evaluation therefore triangulates across five strands: stability under weight and temporal variation, a Monte Carlo sweep of the entire weight space, convergent validity against SAW and VIKOR, discriminant value against an incident-only baseline, and structural rigour under service removal, including a rank-reversal-free variant.

I want to be precise about what this establishes and what it does not. It establishes robustness, method-independence and discriminant value. It explicitly does not claim criterion validity, because no independent measure exists to validate against. That boundary is stated in the thesis, and I will return to it.

## Slide 9, Robust where it matters (8:15 to 9:15)

The stability results. Between the two discrete weight configurations, agreement in 2025 is tau nought point eight six seven, a single adjacent swap. Across years, tau is nought point eight six seven under equal weights and a perfect one point nought under adjusted weights. The weakest figure, nought point seven three three for the 2024 weights, arises because the mid-field profiles are tightly grouped that year.

The Monte Carlo sweep generalises this: across twenty thousand weight vectors drawn uniformly from the simplex, SVC-03 occupies last place in ninety-nine point one per cent of them, and the high-priority cluster holds the top three positions in the large majority. Sensitivity is confined to the middle ranks. So the answer to RQ3 is: stable at the extremes, where decisions are made, sensitive in the middle, where profiles genuinely resemble each other.

One framing note: cross-year movement is reported as descriptive context, not as a quality criterion. Services genuinely evolve, and a faithful ranking should follow them.

## Slide 10, Does it earn its complexity? (9:15 to 10:00)

A multi-criteria framework has to justify itself against the obvious single signal, so I compared it with a ranking by incident frequency alone. The orderings diverge, tau nought point six in 2025 and nought point two in 2024, and the divergence concentrates exactly where it should. SVC-02 rises, because its infrastructure lifecycle debt, those one thousand two hundred and twenty-one unsupported component months and the second-lowest patch recency, is invisible to an incident count. SVC-05 falls, because its high incident volume is offset by a fully patched, fully supported stack. Noisy, but structurally sound. If the framework merely reproduced the incident count, it would be redundant. It does not, and the services that move are the right ones.

## Slide 11, Where the methods disagree (10:00 to 11:15)

This slide carries the finding I did not expect. All methods agree on the portfolio halves and on SVC-03 last, in every year and configuration. They disagree about exactly one service, SVC-06.

SAW and VIKOR rank SVC-06 first in both years. Its VIKOR regret sits at the maximum throughout, driven by worst-in-portfolio patch recency in both years, joined by unsupported components in 2024 and by the change failure rate in 2025. The absolute-mode TOPSIS variant, by contrast, places it fifth in 2024 and first in 2025, with the closeness coefficient moving from nought point eight five three to nought point six nought nine.

The mechanism is the interaction between compensation and the reference frame. Sample-relative methods punish a worst-in-portfolio value however moderate it is in absolute terms, and VIKOR's regret term is designed so a concentrated weakness cannot be averaged away. Absolute-mode TOPSIS measures distance to fixed anchors, so squared aggregation lets four strong criteria dilute one weak one. In 2024 SVC-06's debt was concentrated in precisely that shape. By 2025 it had broadened in absolute magnitude, VIKOR's utility component rose from nought point four nine to nought point five six while the regret stayed capped, and every method converged. Two lenses, one coherent story.

## Slide 12, Division of labour, not a winner (11:15 to 12:00)

So which formulation is right? My answer is that this is the wrong question. The standard formulation, triangulated against SAW and VIKOR, is the primary signal, because in debt prioritisation a concentrated deficiency is often exactly what should be flagged. The absolute-mode variant contributes what the others cannot: rank-reversal immunity by construction, proven by Yang for variants with set-independent bounds, and scores that remain comparable across observation periods.

The residual disagreement, whether SVC-04 or SVC-06 deserves the single first remediation slot, is a judgement about whether debt dimensions are compensatory. Can excellent recovery offset terrible patching? The framework informs that judgement. It does not settle it, and I regard saying so openly as a feature of the work, not a weakness.

## Slides 13 and 14, Anticipated questions (12:00 to 14:00)

Before I close, let me address five questions this work should face.

Only six services, what can that prove? The contribution is the instrument and its evaluation logic, not a portfolio ranking. Selection was by data completeness, the p-values are computed exactly over all seven hundred and twenty permutations and read as effect sizes, and portfolio-wide deployment is stated future work.

Built and evaluated on the same data, is that circular? It is declared openly: the evaluation establishes robustness, method-independence and discriminant value, not criterion validity, because no independent measure of non-code debt exists. External validation is the primary avenue for future work.

Are DORA metrics really debt proxies? That is the central testable hypothesis of the thesis, never a premise. Forsgren and colleagues validate the metrics, Nord and colleagues ground the diagnostic reading, and the rankings match the profiles the literature predicts. Longitudinal tracking would move the claim from plausible to evidenced.

Are the differential weights arbitrary? Yes, and they are declared as a practitioner assumption. That is exactly why the evaluation was designed not to depend on them, and the twenty-thousand-draw sweep shows the extreme priorities hold under any admissible weighting.

Could this be misused to judge teams? The governance scope was agreed with the Head of Trading IT at the outset: decision support for portfolio conversations, not a binding instrument. High-debt profiles typically reflect historical design decisions rather than the competence of current custodians, and the dataset contains no team, vendor or individual identifiers.

## Slide 15, Contributions (14:00 to 14:40)

Three contributions, one practical consequence. First, to the best of current knowledge, this is the first application of TOPSIS to live ITSM and CMDB records for technical debt prioritisation in financial trading IT. Second, an operationally defined indicator set with an explicit literature mapping, together with evidence of how it behaves under a multi-strand evaluation. Third, the methodological finding: sample-relative and absolutely anchored methods respond differently to concentrated debt profiles, and that difference is consequential at the top of a ranking.

Practically, the framework converts data organisations already hold into an auditable priority ordering, aligned with the operational-resilience expectations of FINMA Circular 2023/1, and it surfaces exactly the debt that current governance misses.

## Slide 16, Close (14:40 to 15:00)

Let me close with the sentence the thesis itself closes on. The framework does not measure technical debt. It orders services by the operational shadow debt casts, and within stated limits, it does so reproducibly, defensibly, and in a form a regulated institution can act on.

Thank you. I welcome your questions.

---

## Delivery notes

Rehearse with the takeaway bars: speak each takeaway line as you land on it rather than after the panel has read it. The numbers to know cold, because they will be probed: 574, 41.91, 3.38 for SVC-04; 30 and 1,221 and 59.93 for SVC-02; 56.25 and 353 and 3.96 for SVC-06 in 2025; 81.25 and 329 in 2024; tau values 0.867, 0.733, 1.000, 0.600, 0.200, 0.333, 0.467; 99.1 per cent; 20,000 draws; 108 and 53 and 6 services. If a question lands mid-talk, answer briefly and offer to return to it at slide 13, which exists for that purpose. Slide 17 is the reference list; jump there with the slide number if asked for a source, answer, and return.
