const pptxgen = require("pptxgenjs");

// ── Palette (thesis identity) ──
const INK = "14283C";     // deep navy
const PAPER = "FFFFFF";
const STEEL = "5C7186";
const MIST = "E9EDF1";
const AMBER = "D98E1F";
const TEAL = "1E7F82";
const INKSOFT = "2A3F55";

// Safe fonts
const SANS = "Arial";
const MONO = "Courier New";

const W = 13.3, H = 7.5;
const ML = 0.75; // left margin
const CW = W - 2 * ML; // content width

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "MSc Thesis Defence";

// ── helpers ──
function tag(slide, text, opts = {}) {
  const dark = opts.dark || false;
  slide.addText(text.toUpperCase(), {
    x: ML, y: opts.y ?? 0.55, w: 6.5, h: 0.32,
    fontFace: MONO, fontSize: 11, bold: true, charSpacing: 3,
    color: dark ? "9FB4C8" : STEEL, margin: 0, align: "left",
  });
}

function title(slide, text, opts = {}) {
  slide.addText(text, {
    x: ML, y: opts.y ?? 0.92, w: CW, h: 0.85,
    fontFace: SANS, fontSize: 30, bold: true,
    color: opts.dark ? PAPER : INK, margin: 0, align: "left",
  });
}

function takeaway(slide, text, y, w = CW, x = ML) {
  slide.addShape("rect", { x, y, w, h: 0.78, fill: { color: "F2F7F6" } });
  slide.addText("TAKEAWAY", {
    x: x + 0.22, y: y + 0.08, w: w - 0.4, h: 0.22,
    fontFace: MONO, fontSize: 9.5, bold: true, charSpacing: 3, color: TEAL, margin: 0,
  });
  slide.addText(text, {
    x: x + 0.22, y: y + 0.3, w: w - 0.4, h: 0.42,
    fontFace: SANS, fontSize: 12.5, color: INK, margin: 0, valign: "top",
  });
}

// ranking bars: rows = [{svc, ci, width(0-1), hot}]
function rankBars(slide, rows, x, y, w, opts = {}) {
  const rowH = opts.rowH ?? 0.42;
  const barH = 0.2;
  const svcW = 1.05, ciW = 0.75;
  const barW = w - svcW - ciW - 0.3;
  rows.forEach((r, i) => {
    const yy = y + i * rowH;
    slide.addText(r.svc, {
      x, y: yy, w: svcW, h: barH + 0.06, fontFace: MONO, fontSize: 12, bold: true,
      color: opts.dark ? PAPER : INK, margin: 0, valign: "middle",
    });
    slide.addShape("rect", { x: x + svcW + 0.1, y: yy + 0.02, w: barW, h: barH, fill: { color: opts.dark ? "24405C" : MIST } });
    slide.addShape("rect", {
      x: x + svcW + 0.1, y: yy + 0.02, w: Math.max(barW * r.width, 0.04), h: barH,
      fill: { color: r.hot ? AMBER : (opts.dark ? "8FA6BC" : STEEL) },
    });
    slide.addText(r.ci, {
      x: x + svcW + 0.15 + barW, y: yy, w: ciW, h: barH + 0.06, fontFace: MONO, fontSize: 11,
      color: opts.dark ? "9FB4C8" : STEEL, margin: 0, valign: "middle", align: "right",
    });
  });
}

const RANK25 = [
  { svc: "SVC-01", ci: "0.470", width: 0.53, hot: true },
  { svc: "SVC-04", ci: "0.478", width: 0.52, hot: true },
  { svc: "SVC-06", ci: "0.554", width: 0.45, hot: true },
  { svc: "SVC-02", ci: "0.768", width: 0.23, hot: false },
  { svc: "SVC-05", ci: "0.779", width: 0.22, hot: false },
  { svc: "SVC-03", ci: "0.977", width: 0.02, hot: false },
];

// bullets helper
function bullets(slide, items, x, y, w, opts = {}) {
  slide.addText(
    items.map((t, i) => ({
      text: t.text,
      options: {
        bullet: t.sub ? { code: "2013", indent: 12 } : { code: "2022", indent: 14 },
        indentLevel: t.sub ? 1 : 0,
        breakLine: true,
        paraSpaceAfter: opts.space ?? 8,
        fontSize: t.sub ? (opts.size ?? 14) - 1.5 : (opts.size ?? 14),
        color: t.sub ? INKSOFT : INK,
        bold: !!t.bold,
      },
    })),
    { x, y, w, h: opts.h ?? 3.5, fontFace: SANS, margin: 0, valign: "top", lineSpacingMultiple: 1.12 }
  );
}

function colHead(slide, text, x, y, w, color = INK) {
  slide.addText(text, { x, y, w, h: 0.35, fontFace: SANS, fontSize: 16, bold: true, color, margin: 0 });
}

// ══════════ SLIDE 1 · TITLE (dark) ══════════
{
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addImage({ path: "logo_white.png", x: 10.7, y: 0.55, w: 1.85, h: 0.92 });
  s.addText("MSC THESIS DEFENCE", {
    x: ML, y: 1.55, w: 8, h: 0.3, fontFace: MONO, fontSize: 12, bold: true, charSpacing: 3, color: AMBER, margin: 0,
  });
  s.addText("Measuring and Prioritising Technical Debt in Mission-Critical Trading Systems", {
    x: ML, y: 2.05, w: 10.2, h: 1.6, fontFace: SANS, fontSize: 34, bold: true, color: PAPER, margin: 0,
  });
  s.addText("A TOPSIS framework on live ITSM and CMDB data from a regulated Swiss trading institution", {
    x: ML, y: 3.55, w: 10.5, h: 0.45, fontFace: SANS, fontSize: 16, color: "AFC2D4", margin: 0,
  });
  s.addText([
    { text: "Tobias Zeier", options: { bold: true, color: PAPER } },
    { text: "  \u00B7  MSc Enterprise IT Management, University of Essex", options: { color: "AFC2D4" } },
  ], { x: ML, y: 4.35, w: 11.8, h: 0.4, fontFace: SANS, fontSize: 15, margin: 0 });
  s.addShape("line", { x: ML, y: 4.15, w: 2.2, h: 0, line: { color: AMBER, width: 2 } });
  s.addText("STUDENT ID 12696372  \u00B7  SUPERVISOR DR ZAHID ULLAH  \u00B7  CO-SUPERVISOR DOUG MILLWARD  \u00B7  12 JULY 2026", {
    x: ML, y: 6.85, w: 11.8, h: 0.28, fontFace: MONO, fontSize: 10, charSpacing: 2, color: "8FA6BC", margin: 0,
  });
  s.addNotes("0:00-0:45. This chart is the thesis in one image: six production trading services, ranked by technical debt priority, computed entirely from operational records. No source code was read to produce it. The next 15 minutes explain why that matters, how it was built, and why you can trust it.");
}

// ══════════ SLIDE 2 · PROBLEM ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Motivation");
  title(s, "The problem lives outside the code");
  bullets(s, [
    { text: "In vendor-dominated trading IT, source code is inaccessible, so the dominant tools (SonarQube, SQALE, CAST) are structurally inapplicable" },
    { text: "The debt that matters sits in infrastructure lifecycle exposure, patch delay and operational instability, which code-centric tools cannot observe" },
    { text: "Its symptoms, however, are recorded daily in ITSM and CMDB systems" },
  ], ML, 2.0, 6.3, { size: 15, space: 12, h: 3.4 });

  // stat callouts on right
  const stats = [
    { n: "\u221216%", l: "gross return on assets per 10% more technical debt in COTS platforms (Banker et al., 2020)", c: AMBER },
    { n: "4.9\u00D7 / 9.1\u00D7", l: "higher odds of compromise after one / three months of patch delay (Di Tizio et al., 2023)", c: AMBER },
    { n: "\u221284%", l: "incidents after targeted architectural debt repayment (de Toledo et al., 2021)", c: TEAL },
  ];
  stats.forEach((st, i) => {
    const y = 1.95 + i * 1.45;
    s.addShape("rect", { x: 7.45, y, w: 5.1, h: 1.28, fill: { color: "F7F9FA" }, shadow: { type: "outer", color: "9AA7B2", blur: 6, offset: 2, angle: 90, opacity: 0.25 } });
    s.addText(st.n, { x: 7.7, y: y + 0.12, w: 2.3, h: 0.55, fontFace: MONO, fontSize: 26, bold: true, color: st.c, margin: 0 });
    s.addText(st.l, { x: 7.7, y: y + 0.62, w: 4.6, h: 0.6, fontFace: SANS, fontSize: 11, color: INKSOFT, margin: 0, valign: "top" });
  });
  takeaway(s, "The costliest debt in this environment is invisible to the standard tools, but its symptoms are already being recorded.", 6.35, 6.3, ML);
  s.addNotes("0:45-2:00. Frame the environment: continuous availability, FINMA oversight, vendor platforms that cannot be refactored. Then the three anchor numbers, delivered slowly. The last line sets up the whole design: the symptoms are already recorded, we just need an instrument that reads them.");
}

// ══════════ SLIDE 3 · GAP + RQs ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Research questions \u00B7 Chapters 1\u20132");
  title(s, "The gap and the research questions");
  s.addText([
    { text: "Across 44 primary studies on TD prioritisation, quantitative multi-criteria approaches are uncommon and industrial validation is rare (Lenarduzzi et al., 2021). ", options: {} },
    { text: "No reviewed study combines", options: { bold: true } },
    { text: " service-level indicators, multi-criteria prioritisation, live operational data and a trading IT context.", options: {} },
  ], { x: ML, y: 1.95, w: CW, h: 0.85, fontFace: SANS, fontSize: 15, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.15 });

  const rqs = [
    { q: "RQ1", t: "How can technical debt in mission-critical trading systems be prioritised quantitatively at the service level using operational data?" },
    { q: "RQ2", t: "To what extent do operational service management metrics serve as valid proxies for technical debt severity?" },
    { q: "RQ3", t: "How stable are the resulting rankings when criterion weights are perturbed?" },
  ];
  rqs.forEach((r, i) => {
    const y = 3.15 + i * 1.12;
    s.addShape("rect", { x: ML, y, w: CW, h: 0.95, fill: { color: i === 1 ? "FBF4E8" : "F7F9FA" } });
    s.addText(r.q, { x: ML + 0.25, y: y + 0.18, w: 0.9, h: 0.6, fontFace: MONO, fontSize: 18, bold: true, color: AMBER, margin: 0 });
    s.addText(r.t, { x: ML + 1.3, y: y + 0.12, w: CW - 1.6, h: 0.72, fontFace: SANS, fontSize: 14.5, color: INK, margin: 0, valign: "middle" });
  });
  s.addNotes("2:00-3:00. Emphasise the four-way combination: each pairwise element exists in the literature, the combination does not. RQ2 is deliberately worded 'to what extent': the proxy link is treated as a testable hypothesis throughout, not a premise.");
}

// ══════════ SLIDE 4 · INDICATORS ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Method \u00B7 Design Science Research");
  title(s, "Five indicators, one auditable instrument");
  s.addText("DSR (Hevner et al., 2004) \u00B7 single-organisation embedded case study \u00B7 unit of analysis: the IT service as a configuration item", {
    x: ML, y: 1.9, w: CW, h: 0.35, fontFace: SANS, fontSize: 13.5, color: INKSOFT, margin: 0,
  });

  const rows = [
    [{ text: "INDICATOR", options: { bold: true } }, { text: "SOURCE", options: { bold: true } }, { text: "DEBT DIMENSION (TABLE 2.3)", options: { bold: true } }],
    ["Incident frequency", "ITSM", "Architectural"],
    ["Mean time to restore (MTTR)", "ITSM", "Infrastructure / platform"],
    ["Change failure rate (CFR)", "ITSM", "Process"],
    ["Patch recency", "CMDB", "Vulnerability"],
    ["Unsupported component months", "CMDB", "Infrastructure lifecycle"],
  ];
  s.addTable(rows, {
    x: ML, y: 2.5, w: CW, colW: [4.6, 1.9, 5.3],
    fontFace: SANS, fontSize: 14, color: INK,
    border: [{ type: "none" }, { type: "none" }, { pt: 0.75, color: "D8DFE5" }, { type: "none" }],
    fill: { color: PAPER }, rowH: 0.5, valign: "middle", margin: 0.06,
  });
  s.addText("Dimension assignments are this study's literature-grounded synthesis. Documentation, test coverage and coupling indicators were excluded on data availability, not relevance.", {
    x: ML, y: 5.85, w: CW, h: 0.55, fontFace: SANS, fontSize: 12, italic: true, color: STEEL, margin: 0,
  });
  s.addNotes("3:00-4:15. Walk one row fully (MTTR: Forsgren et al. validate the metric, Nord et al. ground its diagnostic reading as debt impeding recovery from change). State the exclusions and why: honesty about what could not be measured is part of the audit trail. Pre-empts 'why these five?'.");
}

// ══════════ SLIDE 5 · PIPELINE ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Method \u00B7 TOPSIS");
  title(s, "From records to ranking");
  colHead(s, "Pipeline", ML, 1.95, 5.6);
  const steps = [
    "Extract indicators from live ITSM / CMDB records",
    "Vector normalisation (preserves extreme observations)",
    "Weighting: equal (0.20 each) and differential (0.30 MTTR & patch recency)",
    "TOPSIS closeness coefficient Ci \u2208 [0, 1]",
    "Rank: lowest Ci = highest debt priority",
  ];
  steps.forEach((t, i) => {
    const y = 2.45 + i * 0.78;
    s.addShape("ellipse", { x: ML, y: y + 0.03, w: 0.42, h: 0.42, fill: { color: i === 3 ? AMBER : INK } });
    s.addText(String(i + 1), { x: ML, y: y + 0.03, w: 0.42, h: 0.42, fontFace: MONO, fontSize: 14, bold: true, color: PAPER, align: "center", valign: "middle", margin: 0 });
    s.addText(t, { x: ML + 0.6, y, w: 5.2, h: 0.6, fontFace: SANS, fontSize: 13.5, color: INK, margin: 0, valign: "middle" });
  });

  colHead(s, "Why TOPSIS", 7.2, 1.95, 5.3);
  bullets(s, [
    { text: "Handles mixed cost/benefit criteria and different scales in one procedure" },
    { text: "Produces a full ranking, unlike VIKOR's compromise set or AHP alone" },
    { text: "Precedent: Albarak & Bahsoon (2022) for TD, but on controlled data" },
    { text: "Method choice treated as a robustness question, tested against SAW and VIKOR", bold: true },
  ], 7.2, 2.45, 5.3, { size: 13.5, space: 10, h: 3.6 });
  takeaway(s, "Differential weights are a declared practitioner assumption, and the evaluation is designed so nothing depends on them.", 6.35, CW, ML);
  s.addNotes("4:15-5:15. Keep this brisk; examiners know TOPSIS. Two points to land: differential weights are a declared practitioner assumption, not literature-derived, and are themselves stress-tested; and method choice is defended empirically, not a priori.");
}

// ══════════ SLIDE 6 · DATA ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Data \u00B7 Chapter 4");
  title(s, "The data, and its honest limits");
  colHead(s, "Dataset", ML, 1.95, 5.7);
  bullets(s, [
    { text: "Portfolio of 108 services; 53 small vendor GUIs excluded; 6 selected for demonstration on data completeness over the full window" },
    { text: "Jan 2024 \u2013 Dec 2025, production records only, anonymised at source" },
    { text: "Quality filters: alarm-storm consolidation, <0.1 h auto-closures removed, 98th percentile MTTR cap" },
  ], ML, 2.45, 5.7, { size: 13.5, space: 11, h: 3.7 });

  colHead(s, "Declared limitations", 7.2, 1.95, 5.3, AMBER);
  bullets(s, [
    { text: "Recording practices vary by team \u2192 scores are ordinal signals, not measurements" },
    { text: "CFR shares its numerator with incident frequency (bounded by sensitivity analysis)" },
    { text: "Demonstration set, not a portfolio ranking; the contribution is the instrument and its evaluation logic" },
  ], 7.2, 2.45, 5.3, { size: 13.5, space: 11, h: 3.7 });
  takeaway(s, "Declared limitations are part of the audit trail: each is stated in the thesis, and the small-n consequence is handled statistically in the evaluation.", 6.35, CW, ML);
  s.addNotes("5:15-6:15. Say the right column unprompted; every point is a question the examiner would otherwise ask. Framing: n=6 was a completeness criterion, and the consequence is handled with exact permutation p-values read as effect sizes.");
}

// ══════════ SLIDE 7 · RESULT ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Results \u00B7 2025, equal weights");
  title(s, "The priority ranking");
  rankBars(s, RANK25, ML, 2.0, 7.2, { rowH: 0.45 });

  const profiles = [
    { h: "SVC-01 \u00B7 rank 1", t: "Only 64 incidents/yr, but 4,210 unsupported component months and patch recency 63.2 \u2192 the debt an incident count cannot see" },
    { h: "SVC-04 \u00B7 rank 2", t: "574 incidents/yr, MTTR 41.9 h, CFR 3.38, yet a clean lifecycle record \u2192 architectural & process debt" },
    { h: "SVC-03 \u00B7 rank 6", t: "The portfolio's reference for a well-maintained service" },
  ];
  profiles.forEach((p, i) => {
    const y = 1.95 + i * 1.5;
    s.addShape("rect", { x: 8.45, y, w: 4.1, h: 1.34, fill: { color: i === 0 ? "FBF4E8" : "F7F9FA" } });
    s.addText(p.h, { x: 8.65, y: y + 0.1, w: 3.75, h: 0.3, fontFace: MONO, fontSize: 12.5, bold: true, color: i === 0 ? AMBER : INK, margin: 0 });
    s.addText(p.t, { x: 8.65, y: y + 0.42, w: 3.75, h: 0.85, fontFace: SANS, fontSize: 11, color: INKSOFT, margin: 0, valign: "top" });
  });
  takeaway(s, "Each position maps onto a distinct debt dimension from Table 2.3: the practical-validity argument for RQ2.", 6.5, CW, ML);
  s.addNotes("6:15-7:15. Read the ranking through the three profiles; each maps onto a distinct debt dimension, which is the practical-validity argument for RQ2. SVC-01 is the money case: quiet on incidents, dominant structural exposure, and it tops the ranking.");
}

// ══════════ SLIDE 8 · EVALUATION ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Evaluation \u00B7 Chapter 5");
  title(s, "Five strands, no single point of trust");
  const cards = [
    { h: "Stability", t: "Weight & temporal variation, Kendall's \u03C4, exact p over 720 permutations", v: "\u03C4 = 0.60\u20131.00" },
    { h: "Weight space", t: "20,000 Dirichlet-sampled weightings, rank-acceptability analysis", v: "extremes robust" },
    { h: "Convergent", t: "Re-ranked with SAW & VIKOR", v: "\u03C4 = 0.60\u20131.00" },
    { h: "Discriminant", t: "Against an incident-only baseline", v: "\u03C4 = 0.47 / 0.33" },
    { h: "Structural", t: "Leave-one-out rank reversal; absolute-mode variant", v: "reversal-free by construction", hot: true },
  ];
  const cw = 3.85, ch = 1.75, gx = 0.32;
  cards.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = ML + col * (cw + gx) + (row === 1 ? (cw + gx) / 2 : 0);
    const y = 2.05 + row * (ch + 0.35);
    s.addShape("rect", { x, y, w: cw, h: ch, fill: { color: c.hot ? "FBF4E8" : "F7F9FA" }, shadow: { type: "outer", color: "9AA7B2", blur: 5, offset: 2, angle: 90, opacity: 0.22 } });
    s.addText(c.h, { x: x + 0.2, y: y + 0.12, w: cw - 0.4, h: 0.32, fontFace: SANS, fontSize: 15, bold: true, color: INK, margin: 0 });
    s.addText(c.t, { x: x + 0.2, y: y + 0.46, w: cw - 0.4, h: 0.78, fontFace: SANS, fontSize: 11, color: INKSOFT, margin: 0, valign: "top" });
    s.addText(c.v, { x: x + 0.2, y: y + ch - 0.42, w: cw - 0.4, h: 0.3, fontFace: MONO, fontSize: 12, bold: true, color: c.hot ? AMBER : TEAL, margin: 0 });
  });
  takeaway(s, "No external ground truth exists for non-code debt, so validity is triangulated: robustness, method-independence and discriminant value are established; criterion validity is explicitly not claimed.", 6.45, CW, ML);
  s.addNotes("7:15-8:15. The evaluation architecture. Say the takeaway line verbatim: it answers the biggest examiner question (circularity, no ground truth) before it is asked. The next slides unpack the three most interesting strands.");
}

// ══════════ SLIDE 9 · ROBUSTNESS ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "RQ3 \u00B7 Stability");
  title(s, "Robust where it matters");
  colHead(s, "Discrete configurations", ML, 1.95, 5.7);
  bullets(s, [
    { text: "Weight sensitivity 2025: \u03C4 = 1.000 (identical order)" },
    { text: "Weight sensitivity 2024: \u03C4 = 0.867 (one swap at the top)" },
    { text: "Temporal 2025 vs 2024: \u03C4 = 0.600 / 0.733, tracking real profile change, above all SVC-06's broad deterioration" },
    { text: "The lowest-priority position is identical in every run", bold: true },
  ], ML, 2.45, 5.7, { size: 13.5, space: 10, h: 3.5 });

  s.addShape("rect", { x: 7.2, y: 2.0, w: 5.35, h: 3.7, fill: { color: "F7F9FA" }, shadow: { type: "outer", color: "9AA7B2", blur: 6, offset: 2, angle: 90, opacity: 0.25 } });
  s.addText("FULL WEIGHT SPACE \u00B7 20,000 DRAWS", { x: 7.5, y: 2.25, w: 4.8, h: 0.3, fontFace: MONO, fontSize: 11, bold: true, charSpacing: 2, color: STEEL, margin: 0 });
  s.addText("98.3%", { x: 7.5, y: 2.6, w: 4.8, h: 1.1, fontFace: MONO, fontSize: 60, bold: true, color: INK, margin: 0 });
  s.addText("of all admissible weightings place SVC-03 last, and rank 1 falls to SVC-01, SVC-06 or SVC-04 in every single draw (41%, 32%, 27%). The bottom is weight-independent; the single top rank is a property of the cluster.", {
    x: 7.5, y: 3.8, w: 4.8, h: 1.7, fontFace: SANS, fontSize: 12.5, color: INKSOFT, margin: 0, valign: "top", lineSpacingMultiple: 1.15,
  });
  takeaway(s, "Cross-year movement is read as descriptive context, not a quality criterion: services genuinely evolve, and a faithful ranking should follow them.", 6.35, CW, ML);
  s.addNotes("8:15-9:15. RQ3 answered: stable at the extremes, sensitive in the middle, and the middle sensitivity is a property of the 2024 data (grouped profiles), not the method, as the flatter 2024 Monte Carlo confirms. The takeaway pre-empts 'isn't temporal instability a flaw?'.");
}

// ══════════ SLIDE 10 · DISCRIMINANT ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Discriminant value");
  title(s, "Does it earn its complexity?");
  s.addText([
    { text: "Against a ranking by incident frequency alone:  ", options: {} },
    { text: "\u03C4 = 0.467", options: { fontFace: MONO, bold: true } },
    { text: " (2025),  ", options: {} },
    { text: "\u03C4 = 0.333", options: { fontFace: MONO, bold: true } },
    { text: " (2024).", options: {} },
  ], { x: ML, y: 1.95, w: CW, h: 0.4, fontFace: SANS, fontSize: 15, color: INK, margin: 0 });

  const two = [
    { h: "SVC-01 rises, fourth to first", t: "Infrastructure lifecycle debt (4,210 unsupported component months, patch recency 63.18) is invisible to an incident count. This is precisely the signal the framework was built to surface.", hot: true },
    { h: "SVC-05 falls, third to fifth", t: "High incident volume (171/yr) offset by full patch recency and zero unsupported components: noisy, but structurally sound.", hot: false },
  ];
  two.forEach((c, i) => {
    const x = ML + i * 6.05;
    s.addShape("rect", { x, y: 2.65, w: 5.75, h: 2.5, fill: { color: c.hot ? "FBF4E8" : "F7F9FA" }, shadow: { type: "outer", color: "9AA7B2", blur: 5, offset: 2, angle: 90, opacity: 0.22 } });
    s.addText(c.h, { x: x + 0.25, y: 2.85, w: 5.25, h: 0.35, fontFace: SANS, fontSize: 17, bold: true, color: c.hot ? AMBER : INK, margin: 0 });
    s.addText(c.t, { x: x + 0.25, y: 3.3, w: 5.25, h: 1.7, fontFace: SANS, fontSize: 13, color: INKSOFT, margin: 0, valign: "top", lineSpacingMultiple: 1.15 });
  });
  takeaway(s, "The divergence is not noise; it concentrates exactly where multi-criteria measurement should add information over a single signal (Albarak & Bahsoon, 2022).", 5.6, CW, ML);
  s.addNotes("9:15-10:00. One idea: if the framework merely reproduced the incident count, it would be redundant. It does not, and the two services that move are the ones that should move.");
}

// ══════════ SLIDE 11 · METHOD DISAGREEMENT ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Convergent validity \u00B7 Section 5.6");
  title(s, "Where the methods disagree, and why that is a finding");
  s.addText([
    { text: "In 2025 all methods agree exactly under equal weights, with SVC-01 first. The one disagreement is the 2024 equal-weights top rank, and it is a ", options: {} },
    { text: "photo-finish.", options: { bold: true, color: AMBER } },
  ], { x: ML, y: 1.95, w: CW, h: 0.45, fontFace: SANS, fontSize: 14.5, color: INK, margin: 0 });

  const rows = [
    [{ text: "2024, equal weights", options: { bold: true } }, { text: "TOPSIS classic", options: { bold: true } }, { text: "SAW \u00B7 VIKOR \u00B7 TOPSIS absolute", options: { bold: true } }],
    ["Top-ranked service", "SVC-04 (C* = 0.4847)", "SVC-01"],
    ["Margin", "\u0394C* = 0.004 to SVC-01 (0.4886)", "Each worst on exactly 2 criteria"],
    ["Agreement", "vs SAW \u03C4 = 0.600", "absolute vs VIKOR \u03C4 = 1.000"],
    ["2025 and 2024 adjusted", "SVC-01 first under every method", ""],
  ];
  s.addTable(rows, {
    x: ML, y: 2.6, w: 8.3, colW: [2.5, 2.9, 2.9],
    fontFace: SANS, fontSize: 12.5, color: INK,
    border: [{ type: "none" }, { type: "none" }, { pt: 0.75, color: "D8DFE5" }, { type: "none" }],
    rowH: 0.42, valign: "middle", margin: 0.05,
  });

  s.addShape("rect", { x: 9.35, y: 2.6, w: 3.2, h: 2.6, fill: { color: "FBF4E8" } });
  s.addText("MECHANISM", { x: 9.55, y: 2.75, w: 2.8, h: 0.25, fontFace: MONO, fontSize: 10, bold: true, charSpacing: 2, color: AMBER, margin: 0 });
  s.addText("Both are worst on exactly two criteria. SVC-04 is perfect on the other two; SVC-01 is only good. Linear aggregation puts SVC-01 first; vector normalisation, preserving SVC-04\u2019s outlying 410 incidents, reverses the pair by 0.004.", {
    x: 9.55, y: 3.05, w: 2.85, h: 2.05, fontFace: SANS, fontSize: 10.5, color: INKSOFT, margin: 0, valign: "top", lineSpacingMultiple: 1.12,
  });
  takeaway(s, "A 0.004 margin decided by normalisation, not by a real gap. Three of four scorers say SVC-01. The framework reports the photo-finish rather than hiding it; by 2025 every method agrees.", 5.55, CW, ML);
  s.addNotes("10:00-11:15. The 2024 equal-weight top rank is a photo-finish: classic TOPSIS puts SVC-04 first by 0.004; SAW, VIKOR and the absolute variant put SVC-01 first. Both services are worst on exactly two criteria; SVC-04 is perfect on its other two while SVC-01 is only good, so linear aggregation favours SVC-01 while vector normalisation, which preserves SVC-04's outlying incident count, does not. If pressed: VIKOR's utility term is algebraically 1 minus SAW, so those two are not fully independent; VIKOR adds information only through regret. In 2025 everything agrees on SVC-01.");
}

// ══════════ SLIDE 12 · DIVISION OF LABOUR ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Methodological contribution");
  title(s, "Division of labour, not a winner");
  colHead(s, "Standard TOPSIS + SAW / VIKOR", ML, 1.95, 5.8);
  bullets(s, [
    { text: "Primary prioritisation signal" },
    { text: "Triangulation, not a single number: where scorers split by 0.004, the margin is too small to carry a remediation decision" },
  ], ML, 2.45, 5.7, { size: 13.5, space: 10, h: 2.6 });

  colHead(s, "Absolute-mode TOPSIS", 7.2, 1.95, 5.3);
  bullets(s, [
    { text: "Rank-reversal free by construction: every leave-one-out removal preserved, where the classic top rank flips (Garc\u00EDa-Cascales & Lamata 2012; Yang 2020)" },
    { text: "Scores comparable across observation periods, uniquely among the methods used" },
    { text: "Complementary perspective; also powers the Monte Carlo cleanly" },
  ], 7.2, 2.45, 5.3, { size: 13.5, space: 10, h: 3.2 });
  takeaway(s, "The single top rank is contested within the SVC-01, SVC-04, SVC-06 cluster across the weight space: a compensability judgement the framework informs but does not settle, and saying so is a feature.", 6.05, CW, ML);
  s.addNotes("11:15-12:00. Disagreement as diagnostic rather than failure is the transferable design lesson beyond the case. The takeaway doubles as the answer to 'so which service is actually first?'.");
}

// ══════════ SLIDE 13 · Q&A 1 ══════════
function qaSlide(items, tagText, titleText, notes, tk) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, tagText);
  title(s, titleText);
  let y = 2.05;
  items.forEach((qa) => {
    s.addText([
      { text: "Q  ", options: { fontFace: MONO, bold: true, color: AMBER } },
      { text: qa.q, options: { bold: true, color: INK } },
    ], { x: ML, y, w: CW, h: 0.38, fontFace: SANS, fontSize: 15, margin: 0 });
    s.addText(qa.a, { x: ML + 0.55, y: y + 0.42, w: CW - 0.7, h: qa.h ?? 0.75, fontFace: SANS, fontSize: 12.5, color: INKSOFT, margin: 0, valign: "top", lineSpacingMultiple: 1.12 });
    y += 0.42 + (qa.h ?? 0.75) + 0.22;
  });
  if (tk) takeaway(s, tk, y + 0.05, CW, ML);
  s.addNotes(notes);
  return s;
}

qaSlide([
  { q: "Only six services: what can that prove?", a: "The contribution is the instrument and evaluation logic, not a portfolio ranking. Selection was by data completeness; p-values are exact over all 720 permutations and read as effect sizes; portfolio-wide deployment is stated future work.", h: 0.8 },
  { q: "You built and evaluated on the same data. Circular?", a: "Declared openly: the evaluation establishes robustness, method-independence and discriminant value, not criterion validity, because no independent measure of non-code debt exists. External validation is the primary future-work avenue.", h: 0.8 },
  { q: "Are DORA metrics really debt proxies?", a: "Treated as the central testable hypothesis, never a premise. Forsgren et al. validate the metrics; Nord et al. ground the diagnostic reading; the rankings match literature-predicted profiles. Longitudinal tracking would move it from plausible to evidenced.", h: 0.8 },
], "Anticipated questions \u00B7 1 of 2", "Anticipated questions",
"12:00-13:15. Deliver these deadpan; each answer is one breath. The move: every hard question already has a stated, chapter-referenced answer in the thesis, so the defence is consistent with the document.");

// ══════════ SLIDE 14 · Q&A 2 ══════════
qaSlide([
  { q: "Aren't the differential weights arbitrary?", a: "Yes, and they are declared as a practitioner assumption. That is why the evaluation does not depend on them: across 20,000 Dirichlet-sampled weightings the lowest priority holds in 98.3% of draws and rank 1 stays inside the same three-service cluster in all of them.", h: 0.75 },
  { q: "Could this be misused to judge teams?", a: "Governance scope was agreed with the Head of Trading IT at the outset: decision-support for portfolio conversations, not a binding instrument. High-debt profiles typically reflect historical design decisions, not current custodians (Ahmad et al., 2026). No team, vendor or individual identifiers exist in the dataset.", h: 1.0 },
], "Anticipated questions \u00B7 2 of 2", "Anticipated questions, continued",
"13:15-14:00. The takeaway restates the scope sentence from Chapter 1: 'measuring' means a quantitative, reproducible ordering, not a claim to have quantified the debt itself. Ending the pre-emption block on it shows claim discipline from first page to last.",
"The framework measures debt indirectly and expresses the result as a relative priority: a quantitative, reproducible ordering, not a claim to have quantified the debt itself.");

// ══════════ SLIDE 15 · CONTRIBUTIONS ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "Chapter 6");
  title(s, "Contributions");
  const items = [
    { h: "First application", t: "(to the best of current knowledge) of TOPSIS to live ITSM/CMDB records for TD prioritisation in financial trading IT, closing the gap Lenarduzzi et al. identify field-wide" },
    { h: "An operationally defined indicator set", t: "with explicit literature mapping to debt dimensions, plus evidence of its behaviour under a four-strand evaluation" },
    { h: "A methodological finding of independent interest", t: "sample-relative and absolutely anchored methods respond differently to concentrated debt profiles, consequential for the top of a ranking" },
  ];
  items.forEach((c, i) => {
    const y = 2.05 + i * 1.28;
    s.addShape("ellipse", { x: ML, y: y + 0.06, w: 0.5, h: 0.5, fill: { color: i === 2 ? AMBER : INK } });
    s.addText(String(i + 1), { x: ML, y: y + 0.06, w: 0.5, h: 0.5, fontFace: MONO, fontSize: 17, bold: true, color: PAPER, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: c.h + ": ", options: { bold: true } },
      { text: c.t, options: {} },
    ], { x: ML + 0.75, y, w: CW - 0.9, h: 1.1, fontFace: SANS, fontSize: 14, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.12 });
  });
  takeaway(s, "Practically: a portfolio-wide, auditable priority ordering from data organisations already hold, surfacing exactly the debt current governance misses.", 6.1, CW, ML);
  s.addNotes("14:00-14:40. Three academic contributions, one practical. If pressed on novelty, the four-element combination from the gap table in Chapter 2 is the defensible claim: each element exists separately, no study combines them.");
}

// ══════════ SLIDE 16 · CLOSE (dark) ══════════
{
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addText("CLOSE", { x: ML, y: 0.7, w: 4, h: 0.3, fontFace: MONO, fontSize: 11, bold: true, charSpacing: 3, color: AMBER, margin: 0 });
  s.addText([
    { text: "The framework does not measure technical debt.\n", options: {} },
    { text: "It orders services by the ", options: {} },
    { text: "operational shadow debt casts", options: { bold: true, color: "F0C67A" } },
    { text: ", and within stated limits it does so reproducibly, defensibly and in a form a regulated institution can act on.", options: {} },
  ], { x: ML, y: 1.6, w: 11.4, h: 2.3, fontFace: SANS, fontSize: 25, color: PAPER, margin: 0, lineSpacingMultiple: 1.25, valign: "top" });

  rankBars(s, [RANK25[0], RANK25[5]].map((r, i) => ({ ...r, ci: i === 0 ? "R1" : "R6" })), ML, 4.5, 7.2, { dark: true, rowH: 0.48 });
  s.addText("Thank you. I welcome your questions.", {
    x: ML, y: 6.4, w: 8, h: 0.4, fontFace: SANS, fontSize: 15, italic: true, color: "AFC2D4", margin: 0,
  });
  s.addImage({ path: "logo_white.png", x: 10.6, y: 6.1, w: 1.96, h: 0.98 });
  s.addText("Tobias Zeier \u00B7 University of Essex", {
    x: ML, y: 6.85, w: 8, h: 0.3, fontFace: MONO, fontSize: 10, charSpacing: 2, color: "8FA6BC", margin: 0,
  });
  s.addNotes("14:40-15:00. The closing sentence is the final sentence of Chapter 6, so the defence ends exactly where the thesis does. Then stop talking.");
}

// ══════════ SLIDE 17 · REFERENCES ══════════
{
  const s = pres.addSlide();
  s.background = { color: PAPER };
  tag(s, "References \u00B7 Cite Them Right Harvard");
  title(s, "References");
  const refs = require("./refs.json"); // generated from references.bib via pandoc + CTR (no et-al) CSL
  const est = (r) => Math.ceil(r.length / 86); // lines at 9.5pt in a 5.8in column
  const eh = (r) => est(r) * 0.165 + 0.05;
  // balance columns by cumulative height
  const total = refs.reduce((a, r) => a + eh(r) + 0.14, 0);
  let acc = 0, split = refs.length;
  for (let i = 0; i < refs.length; i++) { acc += eh(refs[i]) + 0.14; if (acc >= total / 2) { split = i + 1; break; } }
  function refCol(list, x) {
    let y = 2.0;
    list.forEach((r) => {
      const h = eh(r);
      s.addText(r, { x, y, w: 5.8, h, fontFace: SANS, fontSize: 9.5, color: INKSOFT, margin: 0, valign: "top", lineSpacingMultiple: 1.05 });
      y += h + 0.14;
    });
  }
  refCol(refs.slice(0, split), ML);
  refCol(refs.slice(split), ML + 6.05);
  s.addNotes("Backup slide; not part of the 15 minutes. Full reference list formatted in Cite Them Right Harvard with all authors listed. If asked for a source mid-defence, jump here, answer, and return.");
}

pres.writeFile({ fileName: "/home/claude/defense/defense.pptx" }).then(() => console.log("written"));
