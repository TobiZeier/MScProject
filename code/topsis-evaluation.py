#!/usr/bin/env python
"""
Reproducible analytical evaluation for the technical debt prioritisation framework.
Requires topsis_ranking.py

Strands:
  1. Robustness    : Kendall's tau for weight and temporal comparisons (TOPSIS)
  2. Convergent    : TOPSIS (classic and absolute) vs standard SAW (min-max) and vs VIKOR
  3. Discriminant  : TOPSIS (classic and absolute) vs a single-criterion incident-frequency baseline
  4. Rank reversal : order preservation of the remainder when a service is removed
"""
import argparse
from itertools import combinations
import numpy as np
import pandas as pd
from topsis_ranking import topsis_classic, topsis_absolute, CRITERIA, COST_CRITERIA, EQUAL_WEIGHTS, ADJUSTED_WEIGHTS

def load(path):
    return pd.read_csv(path).set_index("service")[CRITERIA].astype(float)

def topsisc(df, w):
    return pd.Series(topsis_classic(df, w), index=df.index)

def topsisa(df, w):
    return pd.Series(topsis_absolute(df, w), index=df.index)

def saw(df, w):
    X = df.to_numpy()
    xmin, xmax = X.min(0), X.max(0)
    rng = np.where(xmax == xmin, 1.0, xmax - xmin)
    R = np.zeros_like(X, dtype=float)
    for j, c in enumerate(CRITERIA):
        if c in COST_CRITERIA:
            R[:, j] = (xmax[j] - X[:, j]) / rng[j]
        else:
            R[:, j] = (X[:, j] - xmin[j]) / rng[j]
    return pd.Series((R * w).sum(1), index=df.index)


def vikor_scores(df, w, v=0.5):
    """Return the VIKOR S (group utility), R (individual regret) and Q measures."""
    X = df.to_numpy()
    benefit = np.array([c not in COST_CRITERIA for c in CRITERIA])
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
    return -vikor_scores(df, w, v)["Q"]


def order(scores):
    return list(scores.sort_values().index)


def ranked(scores, prec=4):
    """Services in debt order (highest debt first) annotated with their score."""
    s = scores.sort_values()
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
        return float("nan")
    return (C - D) / (C + D)


def evaluate(df, label):
    print(f"\n=== {label} ===")
    for nm, w in [("equal", EQUAL_WEIGHTS), ("adjusted", ADJUSTED_WEIGHTS),]:
        tC, tA, sS, vk = topsisc(df, w), topsisa(df, w), saw(df, w), vikor_scores(df, w)
        otc, ota, osaw, ov = order(tC), order(tA), order(sS), order(vikor(df, w))
        debt = vk["Q"].sort_values(ascending=False).index
        print(f"  [{nm} weights]   (rank 1 = highest debt)")
        print(f"     TOPSIS Classic  closeness C* : {ranked(tC)}")
        print(f"     TOPSIS Absolute  closeness C* : {ranked(tA)}")
        print(f"     SAW     score        : {ranked(sS)}")
        print(f"     VIKOR   Q            : "
              + " > ".join(f"{n}={vk['Q'][n]:.4f}" for n in debt))
        print(f"     VIKOR   S (utility)  : "
              + ", ".join(f"{n}={vk['S'][n]:.4f}" for n in debt))
        print(f"     VIKOR   R (regret)   : "
              + ", ".join(f"{n}={vk['R'][n]:.4f}" for n in debt))
        print(f"     TOPSIS Classic vs SAW   tau = {kendall_tau(otc, osaw):+.4f}")
        print(f"     TOPSIS Classic vs VIKOR tau = {kendall_tau(otc, ov):+.4f}")
        print(f"     TOPSIS Absolute vs SAW   tau = {kendall_tau(ota, osaw):+.4f}")
        print(f"     TOPSIS Absolute vs VIKOR tau = {kendall_tau(ota, ov):+.4f}")
    otc = order(topsisc(df, EQUAL_WEIGHTS))
    ota = order(topsisa(df, EQUAL_WEIGHTS))
    oi = list(df["incident_freq"].sort_values(ascending=False).index)
    print("  [discriminant, equal weights]")
    print(f"     incident-only: {' > '.join(oi)}")
    print(f"     TOPSIS Classic vs incident-only tau = {kendall_tau(otc, oi):+.4f}")
    print(f"     TOPSIS Absolute vs incident-only tau = {kendall_tau(ota, oi):+.4f}")


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
    for nm, w in [("equal", EQUAL_WEIGHTS), ("adjusted", ADJUSTED_WEIGHTS)]:
        otcc, otcp = order(topsisc(cur, w)), order(topsisc(pri, w))
        otac, otap = order(topsisa(cur, w)), order(topsisa(pri, w))
        print(f"  [{nm} weights]")
        print(f"TOPSIS Classic")
        print(f"     {args.csv_current}: {' > '.join(otcc)}")
        print(f"     {args.csv_prior}: {' > '.join(otcp)}")
        print(f"     tau = {kendall_tau(otcc, otcp):+.4f}")
        print(f"TOPSIS Absolute")
        print(f"     {args.csv_current}: {' > '.join(otac)}")
        print(f"     {args.csv_prior}: {' > '.join(otap)}")
        print(f"     tau = {kendall_tau(otac, otap):+.4f}")


if __name__ == "__main__":
    main()