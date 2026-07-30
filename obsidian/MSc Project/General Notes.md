## To Do
- [x] read chapter 3 and decide where the flow diagram should be placed
- [x] write justification for flow diagram
- [x] add more details to diagram
- [x] end literature review with a table (supervisor suggestion)
- [x] Revise all chapter openings, currently the ALL begin with "This chapter [verb] the [noun] for [purpose]"
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
- [x] revise section 1.6 Thesis Structure - depending on actual evaluation in Chapter 5
- [x] decide how to evaluate and review
	- [x] 2.8.3 "validating indicator scores against historical operational records"
	- [x] Table 3.1 Design evaluation
	- [x] 3.1.2 "by evaluating the framework against operational data"
	- [x] decide which term to use and adjust accordingly (Swiss securities trading institution, trading IT, financial trading IT, Swiss financial institution,)
- [ ] rewrite abstract
- [x] absolute-mode table in appendix c has three decimals against four everywhere else
- [x] rerun monte carlo simulation and add results to appendix c
- [x] weight perturbation for composite rankings according to greco et al.?
	- [x] refine section 2.6.1
	- [x] refine section 2.7

- [x] recalculate TOPSIS rankings to make sure python calculation is accurate
- [x] recalculate Kendall's Tau and P-Values
- [x] write chapter 5 and include graphs




