---
title: |
  **Measuring Technical Debt in Mission Critical Trading Systems
  A Service Level Quantitative Framework**

  \vspace{1cm}

subtitle: "Research Proposal for MSc Computing Project"
author: 
  - name: "Tobias Zeier"
    affiliation: "Student Number: 12696372"
date: "2 March 2026"
date-format: "MMMM YYYY"
bibliography: references.bib
csl: harvard-cite-them-right-no-et-al.csl
format:
  pdf:
    documentclass: article
    number-sections: false
    toc: false
    fontsize: 12pt
    linestretch: 1.5
    geometry: "margin=2.5cm"
lang: en-GB
---

\vspace{2cm}
\centerline{University of Essex Online}
\vspace{5cm}

**Supervisor:** Zahid Ullah\
**Co-Supervisor:** Doug Millward \vspace{2cm}

------------------------------------------------------------------------

\clearpage

# Introduction and Research Question

Technical debt is a well-established concept in software engineering and information systems research, originally coined by @cunninghamWyCashPortfolioManagement1993 as a metaphor to describe the long-term cost implications of short-term technical decisions. The metaphor draws an analogy between financial debt and the accumulated burden created when expedient but suboptimal solutions are chosen during software development or system maintenance. Just as financial debt accrues interest, technical debt accumulates over time, making future changes increasingly costly and difficult [@sasArchitecturalTechnicalDebt2023]. The concept has since expanded well beyond its origins in agile software development to encompass architectural, infrastructure, organisational, and process dimensions of IT systems [@rosserSystemsPerspectiveTechnical2021].

Despite the breadth of academic and practitioner literature, existing technical debt approaches primarily focus on code-level metrics or qualitative classifications. Tools such as SonarQube measure debt through static code analysis, identifying issues such as code smells, duplications, and complexity violations [@amanatidisEvaluatingAgreementTechnical2020]. While valuable in pure software development contexts, such approaches offer limited applicability in complex trading IT environments, where operational reliability depends on tightly coupled services, third-party vendor platforms, middleware, and infrastructure components rather than on internally developed software alone. In these environments, the most impactful forms of technical debt are often invisible to code analysis tools yet manifest clearly in operational metrics such as incident frequency, recovery time, and change failure rates.

Trading IT services operate under strict availability and performance requirements governed by internal service level agreements and external regulatory obligations. Failures can lead to immediate financial loss, regulatory censure, and lasting reputational damage [@ramasubbuTechnicalDebtReliability2016]. The relationship between accumulated technical debt and such operational outcomes is therefore of critical importance to practitioners responsible for managing these environments. However, decisions regarding technical debt remediation are frequently made on the basis of intuition or ad hoc judgement rather than empirically grounded, quantitative evidence. This disconnect between technical debt theory and practice in enterprise service management represents the central problem motivating this research.

This research addresses the following question: *To what extent can a quantitative, service-level framework reliably measure and prioritise technical debt in mission-critical trading IT services, and how does the resulting debt score correlate with operational performance outcomes such as incident frequency, mean time to recovery, and change failure rate?*

# Aims and Objectives

The aim of this research is to design and evaluate a quantitative framework for measuring and prioritising technical debt at the service level within trading IT environments. Unlike existing approaches that focus on source code, the framework will operate on service management data, making it applicable to the full technology stack of a trading IT organisation, including vendor platforms, infrastructure services, and middleware components.

The supporting objectives are:

- To identify measurable service-level indicators of technical debt applicable to trading IT services through a structured and critical review of the existing literature
- To construct a composite technical debt score based on those indicators, operationalised using anonymised historical service management data drawn from a real trading IT environment
- To apply the Technique for Order of Preference by Similarity to Ideal Solution (TOPSIS), a Multi-Criteria Decision-Making (MCDM) method, to rank and prioritise services according to their composite technical debt profile
- To empirically examine the statistical relationship between technical debt scores and operational outcomes, including incident frequency, mean time to recovery (MTTR), and change failure rate, in order to validate the framework's explanatory power
- To implement the framework as a functional prototype analytical artefact and evaluate its practical utility through a case study applied to anonymised operational data
- To reflect on the limitations of the framework and identify directions for future refinement and broader application in regulated enterprise IT contexts


# Literature Review Skeleton

The literature review will be structured into six thematic sections with an indicative total length of 4,400–4,600 words. It will draw on peer-reviewed journal articles, conference proceedings, and empirical case studies to build a critical and theoretically grounded foundation for the research.

**Section 1 — Introduction (\~500 words):** Introduces technical debt as a persistent and growing challenge in enterprise IT management, with particular relevance to regulated financial institutions. The section will contextualise the review within the specific demands of trading IT services, including high availability requirements, complex vendor dependencies, and regulatory oversight. It will state the objectives and scope of the review and explain its connection to the research artefact.

**Section 2 — Conceptual Foundations of Technical Debt (\~900 words):** Establishes the theoretical grounding for the research. Covers the origin and evolution of the technical debt metaphor [@cunninghamWyCashPortfolioManagement1993; @avgeriouTechnicalDebtManagement2024], the major typologies of debt including code, architectural, infrastructure, and organisational forms, the distinction between intentional and unintentional incurrence, and the short-term value versus long-term cost trade-off inherent in the concept. The section will also address scholarly critiques of the metaphor and discuss its extension to system-level and service-level concerns [@rosserSystemsPerspectiveTechnical2021], which is directly relevant to this research.

**Section 3 — Existing Frameworks and Metrics (\~1,200 words):** Critically reviews established approaches to technical debt measurement and management. This includes the Technical Debt Ratio and SonarQube-based metrics [@amanatidisEvaluatingAgreementTechnical2020; @alfayezHowSonarQubeidentifiedTechnical2023], the widely used quadrant model distinguishing reckless, prudent, deliberate, and inadvertent debt, prioritisation heuristics including Pareto-based approaches [@lenarduzziSystematicLiteratureReview2021], and the growing body of work on TDM automation [@biazottoTechnicalDebtManagement2024]. The section will critically examine the assumptions underlying each approach and highlight the limitations of purely code-centric models when applied to enterprise and service-level operational contexts, motivating the need for a broader, service-level framework.

**Section 4 — Technical Debt in Financial and Regulated Environments (\~900 words):** Contextualises the research problem within the specific domain of banking and trading IT. Examines the prevalence and impact of legacy systems in capital markets and trading platforms, the influence of regulatory constraints on technical decision-making, and the tension between risk appetite, auditability, and the need for continuous modernisation. Reviews empirical evidence from large enterprise environments [@ramasubbuTechnicalDebtReliability2016; @wieseITManagersPerspective2023] and discusses how operational risk and service continuity considerations shape technical debt management in regulated financial services organisations.

**Section 5 — Research Gap and Positioning (\~500 words):** Explicitly justifies the dissertation by synthesising the gaps identified across the preceding sections. Three key gaps are identified: first, the absence of empirically validated frameworks that connect service-level technical debt indicators to managerial prioritisation decisions in enterprise IT; second, the lack of artefact-based Design Science Research conducted in regulated, operationally critical contexts; and third, the need for decision-oriented quantitative tooling rather than purely diagnostic or code-centric dashboards. The section will position this research in relation to these gaps and clarify its intended contribution.

**Section 6 — Summary and Link to Methodology (\~400 words):** Synthesises the key themes from the review and explicitly bridges the literature to the research design. Demonstrates how the literature-derived understanding of technical debt types, measurement approaches, and enterprise-specific challenges informs the design of the proposed framework and the selection of both the Design Science Research methodology and the TOPSIS prioritisation technique.

# Research Methods

The research adopts a Design Science Research (DSR) methodology [@vombrockeIntroductionDesignScience2020]. DSR is particularly appropriate for this project as it explicitly supports the creation and rigorous evaluation of novel artefacts, in this case a quantitative scoring framework and its associated prototype implementation, within a real-world organisational context. The research philosophy is pragmatist, treating quantitative empirical analysis and engineering design as complementary and mutually reinforcing modes of inquiry, each contributing to a holistic understanding of the research problem.

**Data Collection:** The sole data source is anonymised historical service management data extracted from a trading IT environment in which the researcher operates professionally. The dataset will include incident management records, change management logs, configuration management data, and infrastructure lifecycle information. All data will be aggregated at the service level prior to analysis. Personally identifiable information and commercially sensitive details will be removed through a documented anonymisation process before any analytical work is conducted. No human participants will be recruited and no primary data collection from individuals will take place at any stage of the research.

**Artefact Design:** A composite technical debt scoring model will be constructed that translates a defined set of service-level indicators into a weighted numeric score for each service under study. Candidate indicators derived from the literature include the proportion of end-of-life or unsupported components, volume and age of open incidents in the backlog, patch and upgrade lag relative to vendor release schedules, rolling change failure rate, and mean time to recovery (MTTR) trend over time. The weighting of each indicator will be determined through a systematic mapping to the literature, ensuring full traceability between the framework design and its theoretical foundations.

**Prioritisation using TOPSIS:** After computing individual technical debt scores, the framework employs the TOPSIS multi-criteria decision-making method to prioritise services for remediation. This technique ranks alternatives by calculating their geometric distance from both a theoretically ideal solution and a negative ideal solution. Services closest to the ideal and furthest from the negative ideal receive the highest priority. This approach effectively manages conflicting criteria, incorporates differential weights, and produces auditable results to inform management decisions.

**Analysis:** Statistical correlation and regression analysis will be applied to examine the relationship between the composite technical debt scores and observed operational performance metrics across the services in the dataset. This will allow the research to assess whether higher technical debt scores are statistically associated with worse operational outcomes, thereby empirically validating the framework's explanatory power. All analysis will be conducted in Python, using freely available libraries. Results will be clearly visualised to support interpretation and communication of findings within the dissertation.

**Evaluation:** The framework will be evaluated by applying the prototype to the full anonymised case study dataset and assessing the extent to which the resulting TOPSIS-derived prioritisation rankings align with known operational outcomes. Evaluation will be conducted against criteria derived from the literature, including predictive validity, interpretability for non-technical stakeholders, and practical applicability to service-level prioritisation decisions in a trading IT context.

# Work Packages and Timeline

| # | Work Package | Description | Duration |
|---|---|---|---|
| 1 | Project initiation and ethical approval | Define scope, complete proposal and ethical approval process | 6 weeks |
| 2 | Literature review and gap analysis | Structured critical review of technical debt, service management, and operational resilience literature | 4 weeks |
| 3 | Research design and data strategy | Finalise methodology, case study design, and data anonymisation approach | 3 weeks |
| 4 | Framework design | Identify and validate service-level indicators; design composite scoring and TOPSIS prioritisation model | 5 weeks |
| 5 | Data preparation and analysis design | Extract, anonymise, and prepare data; define statistical analytical approach | 3 weeks |
| 6 | Artefact implementation | Implement the scoring and TOPSIS framework as a functional Python-based prototype | 3 weeks |
| 7 | Empirical evaluation | Apply artefact to case study dataset and analyse results against evaluation criteria | 1 week |
| 8 | Writing and submission | Integrate findings, finalise dissertation, and submit | 3 weeks |
| 9 | Presentation and defence | Prepare materials and deliver oral defence | 2 weeks |
: Workpakage-Table {tbl-colwidths="[5, 30, 50, 15]"}

**Total estimated duration:** 30 weeks.

A Gantt chart detailing the full project timeline is available at:<https://github.com/TobiZeier/UoEO_MSc_EIM/blob/main/Module8_MSc_Computing_Project/Unit2-GanttChartMScProject.pdf>

The primary **artefact** is a Python-based prototype capable of ingesting anonymised service management data, computing a composite technical debt score per service, applying TOPSIS to produce a ranked prioritisation of services for remediation, and generating visualisations of the relationship between debt scores and operational performance metrics. The artefact is designed to be practically applicable to prioritisation decisions within mission-critical trading IT service portfolios, representing the research's primary contribution to practice.

# References

::: {#refs}
:::