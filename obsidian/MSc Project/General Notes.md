## To Do
- [x] read chapter 3 and decide where the flow diagram should be placed
- [x] write justification for flow diagram
- [x] add more details to diagram
- [x] end literature review with a table (supervisor suggestion)
- [ ] Revise all chapter openings, currently the ALL begin with "This chapter [verb] the [noun] for [purpose]"
- [x] Revise: Every cited study receives the same "single-case design / not generalisable" limitation
- [x] Revise: Nearly every paragraph in Chapter 2 follows: **(1) claim → (2) cite supporting study → (3) state limitation → (4) link implication to present work**. For example:
- [x] Revise: 3.2.3 (Responsible Use of Prioritisation Outputs)  
- [x] which of Nord et al. paper should be cited in chapter 4?
- [x] rework metrics - where are they mentioned and where is the justification about which metrics are being used?
- [x] specification for data usage:
	- [x] patch recency: percentage of components that have been flagged to end of support,  not end of life, either by the vendor or the company itself
	- [x] mention that only assets in production were taken into account
	- [x] excluded: 
		- [x] issues that have raised several incidents but same root cause (i.e. an alarm triggered the recurring creation of an incident)
		- [x] incidents with MTTR <=0.1h
		- [x] 98th percentile cap = incidents with a huge MTTR have not been considered since there was an obvious mishandling of the incident
	- [x] date of data extraction
	- [x] rewrite data preparation AND Indicator Extraction and Quality Checks
- [x] finish chapter 4
	- [x] if materially incomplete CMDB records exist, flag them in section  data preparation, if not, remove remark in section data limitation
	- [x] remove equations from chapter 4
	- [x] Rewrite **Data Preparation** section, using actual numbers.  Inclusion and exclusion criteria - justify which services from the trading IT portfolio have been excluded and why
	- [x] Rewrite **Indicator Extraction and Quality Checks** use actual numbers and checks
- [ ] revise section 1.6 Thesis Structure - depending on actual evaluation in Chapter 5
- [ ] decide how to evaluate and review
	- [ ] 2.8.3 "validating indicator scores against historical operational records"
	- [ ] Table 3.1 Design evaluation
	- [ ] 3.1.2 "by evaluating the framework against operational data"
	- [ ] decide which term to use and adjust accordingly (Swiss securities trading institution, trading IT, financial trading IT, Swiss financial institution,)
- [ ] rewrite abstract
- [x] absolute-mode table in appendix c has three decimals against four everywhere else
- [x] rerun monte carlo simulation and add results to appendix c
- [ ] weight perturbation for composite rankings according to greco et al.?
	- [ ] refine section 2.6.1
	- [ ] refine section 2.7
	- [ ] 

- [x] recalculate TOPSIS rankings to make sure python calculation is accurate
- [x] recalculate Kendall's Tau and P-Values
- [x] write chapter 5 and include graphs


abstract: "Technical debt in mission-critical trading IT accumulates largely outside source code, in infrastructure lifecycle exposure, patch delay and operational instability, where the dominant code-centric measurement tools cannot observe it. This thesis develops and evaluates a quantitative framework for prioritising technical debt at the service level using operational data alone. Following a Design Science approach, five indicators (incident frequency, mean time to restore, change failure rate, patch recency and unsupported component months) were extracted from two years of live ITSM and CMDB records at a regulated Swiss financial trading institution and combined in a TOPSIS model that ranks services by debt priority under two weight configurations. The evaluation tests the ranking's stability under weight and temporal variation, its convergence with SAW and VIKOR, its divergence from an incident-only baseline and its structural rigour under service removal, including a rank-reversal-free absolute-mode TOPSIS variant. The extreme priorities prove robust across 20,000 sampled weightings, the multi-criteria design surfaces infrastructure lifecycle debt that an incident count misses, and method disagreement localises to services with concentrated debt profiles, exposing a substantive choice about whether debt dimensions are compensatory. The contribution is, to the best of current knowledge, the first application of TOPSIS to live service management records for technical debt prioritisation in financial trading IT, together with an auditable evaluation logic suited to regulated environments. The rankings are ordinal decision-support signals rather than measurements of debt, and external and longitudinal validation are identified as the principal directions for future work."

