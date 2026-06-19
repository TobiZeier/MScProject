#!/usr/bin/env python
"""
Reproducible analytical evaluation for the technical debt prioritisation framework.

Strands:
  1. Robustness    : Kendall's tau for weight and temporal comparisons (TOPSIS)
  2. Convergent    : TOPSIS vs standard SAW (min-max) and vs VIKOR
  3. Discriminant  : TOPSIS vs a single-criterion incident-frequency baseline
  4. Rank reversal : order preservation of the remainder when a service is removed
"""
import argparse
from itertools import combinations
import numpy as np
import pandas as pd

CRITERIA = ["incident_freq", "mttr_hrs", "cfr", "patch_recency", "unsupported_months"]
COST = {"incident_freq", "mttr_hrs", "cfr", "unsupported_months"}  # patch_recency is benefit
W_EQUAL = np.array([0.20, 0.20, 0.20, 0.20, 0.20])
# 0.30 on mttr_hrs and patch_recency, the remaining 0.40 split equally over the
# other three. Use the exact fraction so the weights sum to exactly 1.0.
W_ADJ = np.array([0.4 / 3, 0.30, 0.4 / 3, 0.30, 0.4 / 3])


def load(path):
    return pd.read_csv(path).set_index("service")[CRITERIA].astype(float)


def topsis(df, w):
    X = df.to_numpy()
    norms = np.sqrt((X ** 2).sum(axis=0))
    norms = np.where(norms == 0, 1.0, norms)         # guard all-zero column
    V = (X / norms) * w
    benefit = np.array([c not in COST for c in CRITERIA])
    ideal_best = np.where(benefit, V.max(0), V.min(0))
    ideal_worst = np.where(benefit, V.min(0), V.max(0))
    d_best = np.sqrt(((V - ideal_best) ** 2).sum(1))
    d_worst = np.sqrt(((V - ideal_worst) ** 2).sum(1))
    denom = d_best + d_worst
    # guard 0/0: identical alternatives sit on both ideals -> neutral 0.5
    closeness = np.divide(
        d_worst, denom, out=np.full_like(d_worst, 0.5), where=denom != 0
    )
    return pd.Series(closeness, index=df.index)      # higher = lower debt


def saw(df, w):
    X = df.to_numpy()
    xmin, xmax = X.min(0), X.max(0)
    rng = np.where(xmax == xmin, 1.0, xmax - xmin)   # guard constant column
    R = np.zeros_like(X, dtype=float)
    for j, c in enumerate(CRITERIA):
        if c in COST:                                # smaller is better
            R[:, j] = (xmax[j] - X[:, j]) / rng[j]
        else:                                        # larger is better
            R[:, j] = (X[:, j] - xmin[j]) / rng[j]
    return pd.Series((R * w).sum(1), index=df.index)  # higher = lower debt


def vikor_scores(df, w, v=0.5):
    """Return the VIKOR S (group utility), R (individual regret) and Q measures."""
    X = df.to_numpy()
    benefit = np.array([c not in COST for c in CRITERIA])
    f_star = np.where(benefit, X.max(0), X.min(0))
    f_minus = np.where(benefit, X.min(0), X.max(0))
    den = np.where(f_star == f_minus, 1.0, f_star - f_minus)
    d = (f_star - X) / den
    S = (w * d).sum(1)
    Rr = (w * d).max(1)

    def scale(a):
        r = a.max() - a.min()
        return np.zeros_like(a) if r == 0 else (a - a.min()) / r

    Q = v * scale(S) + (1 - v) * scale(Rr)
    return pd.DataFrame({"S": S, "R": Rr, "Q": Q}, index=df.index)


def vikor(df, w, v=0.5):
    return -vikor_scores(df, w, v)["Q"]              # higher = lower debt (low Q is best)


def order(scores):
    return list(scores.sort_values().index)          # rank 1 = lowest score = highest debt


def ranked(scores, prec=3):
    """Services in debt order (highest debt first) annotated with their score."""
    s = scores.sort_values()                         # ascending score = highest debt first
    return " > ".join(f"{n}={v:.{prec}f}" for n, v in s.items())


def kendall_tau(a, b):
    """Kendall's tau over the services common to both rankings.

    Restricting to the intersection lets temporal comparisons tolerate
    year-over-year changes in the service set. For identical sets this is
    the ordinary tau (no ties, so tau-a == tau-b)."""
    pa = {s: i for i, s in enumerate(a)}
    pb = {s: i for i, s in enumerate(b)}
    common = [s for s in a if s in pb]
    C = D = 0
    for x, y in combinations(common, 2):
        s1 = np.sign(pa[x] - pa[y])
        s2 = np.sign(pb[x] - pb[y])
        C += s1 == s2
        D += s1 != s2
    if C + D == 0:
        return float("nan")                          # fewer than 2 common services
    return (C - D) / (C + D)


def evaluate(df, label):
    print(f"\n=== {label} ===")
    for nm, w in [("equal", W_EQUAL), ("adjusted", W_ADJ)]:
        tC, sS, vk = topsis(df, w), saw(df, w), vikor_scores(df, w)
        ot, osaw, ov = order(tC), order(sS), order(vikor(df, w))
        debt = vk["Q"].sort_values(ascending=False).index   # highest debt (highest Q) first
        print(f"  [{nm} weights]   (rank 1 = highest debt)")
        print(f"     TOPSIS  closeness C* : {ranked(tC)}")
        print(f"     SAW     score        : {ranked(sS)}")
        print(f"     VIKOR   Q            : "
              + " > ".join(f"{n}={vk['Q'][n]:.3f}" for n in debt))
        print(f"     VIKOR   S (utility)  : "
              + ", ".join(f"{n}={vk['S'][n]:.3f}" for n in debt))
        print(f"     VIKOR   R (regret)   : "
              + ", ".join(f"{n}={vk['R'][n]:.3f}" for n in debt))
        print(f"     TOPSIS vs SAW   tau = {kendall_tau(ot, osaw):+.3f}")
        print(f"     TOPSIS vs VIKOR tau = {kendall_tau(ot, ov):+.3f}")
    ot = order(topsis(df, W_EQUAL))
    oi = list(df["incident_freq"].sort_values(ascending=False).index)
    print("  [discriminant, equal weights]")
    print(f"     incident-only: {' > '.join(oi)}")
    print(f"     TOPSIS vs incident-only tau = {kendall_tau(ot, oi):+.3f}")
    print("  [rank reversal, equal weights]")
    for rm in df.index:
        sub = order(topsis(df.drop(index=rm), W_EQUAL))
        ref = [s for s in ot if s != rm]
        print(f"     remove {rm}: {'preserved' if sub == ref else 'changed -> ' + ' > '.join(sub)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv_current")
    ap.add_argument("csv_prior")
    args = ap.parse_args()
    cur, pri = load(args.csv_current), load(args.csv_prior)
    evaluate(cur, args.csv_current)
    evaluate(pri, args.csv_prior)
    print("\n=== temporal stability ===")
    missing = set(cur.index) ^ set(pri.index)
    if missing:
        print(f"  note: {len(missing)} service(s) not in both years "
              f"({', '.join(sorted(missing))}); tau uses the common set")
    for nm, w in [("equal", W_EQUAL), ("adjusted", W_ADJ)]:
        oc, op = order(topsis(cur, w)), order(topsis(pri, w))
        print(f"  [{nm} weights]")
        print(f"     {args.csv_current}: {' > '.join(oc)}")
        print(f"     {args.csv_prior}: {' > '.join(op)}")
        print(f"     tau = {kendall_tau(oc, op):+.3f}")


if __name__ == "__main__":
    main()